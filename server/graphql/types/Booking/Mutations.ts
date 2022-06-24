import { Booking, Role } from '@prisma/client';
import moment from 'moment';
import { extendType, list, nonNull, objectType, stringArg } from 'nexus';
import { BookingService } from '../../../singletons/bookingService';
import { ValidatorService } from '../../../singletons/validatorService';
import { FrequencyEnum } from '../EnumsScalars/Enums';
import {
  ClientErrorInvalidInput,
  ClientErrorInvalidPropertyInput,
  ClientErrorPropertyNotExists,
  ClientErrorUserNotExists,
  NoAvailableSlots,
  UnknownError,
} from '../Error';
import { calculatePrice } from '../helperFunctions';
import { AvailableDay, DaySlotInterface } from '../Property';
import { Booking as BookingObject } from './Objects';

export const CreateBookingReturn = objectType({
  name: 'CreateBookingReturn',
  definition(t) {
    t.nullable.field('Booking', { type: BookingObject });
    t.nullable.field('ClientErrorUserNotExists', {
      type: ClientErrorUserNotExists,
    });
    t.nullable.field('ClientErrorPropertyNotExists', {
      type: ClientErrorPropertyNotExists,
    });
    t.nullable.field('ClientErrorInvalidInput', {
      type: ClientErrorInvalidInput,
    });
    t.nullable.field('NoAvailableSlots', {
      type: NoAvailableSlots,
    });
    t.nullable.field('ClientErrorInvalidPropertyInput', {
      type: ClientErrorInvalidPropertyInput,
    });
    t.nullable.field('UnknownError', {
      type: UnknownError,
    });
  },
});

export const BookingOnListing = extendType({
  type: 'Mutation',
  definition(b) {
    b.field('createBooking', {
      type: CreateBookingReturn,
      args: {
        propertyHandle: nonNull(stringArg()),
        startDate: nonNull('DateTime'),
        endDate: nonNull('DateTime'),
        frequency: nonNull(FrequencyEnum),
        daySlots: nonNull(list(nonNull(AvailableDay))),
      },
      async resolve(_root, args, ctx) {
        // validate input
        const property = await ctx.prisma.property.findUnique({
          where: {
            handle: args.propertyHandle,
          },
        });
        if (property == null) {
          return {
            ClientErrorPropertyNotExists: {
              message: `Property for propertyHandle ${args.propertyHandle} does not exist`,
            },
          };
        }
        let id = ctx.user?.id;
        if (process.env.DEV_LOGIN === 'true') {
          id = process.env.DEV_USER_ID;
        }
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: id,
          },
        });
        args.daySlots.forEach((day: { endTime: string; startTime: string }) => {
          if (ValidatorService.validateDaySlot(day)) {
            return {
              ClientErrorInvalidInput: {
                message: `Invalid input for availableDay: startTime can't be after endTime, startTime and endTime have to be on the same day and have to match weekday.`,
              },
            };
          }
        });
        if (user == null || user == undefined) {
          return {
            ClientErrorUserNotExists: {
              message: `User is not logged in.`,
            },
          };
        }
        if (user.role === Role.landlord) {
          return {
            ClientErrorUserNotExists: {
              message: `User for userHandle ${user.handle} does not have a tenant role`,
            },
          };
        }
        const startDate = moment(args.startDate);
        const endDate = moment(args.endDate);
        const frequency = args.frequency;

        // calculate every date and save all in daySlotDates
        let daySlotDates: DaySlotInterface[] = BookingService.calculateDates(
          args.daySlots,
          startDate,
          endDate,
          frequency
        );

        // check availability for every daySlot in daySlotDates

        for await (const day of daySlotDates) {
          const daySlot = await ctx.prisma.daySlot.findFirst({
            where: {
              propertyId: property.id,

              startTime: {
                lte: moment(day.startTime).toISOString(),
              },
              endTime: {
                gte: moment(day.endTime).toISOString(),
              },
            },
          });
          if (daySlot !== null) {
            // check if slot is still available
            if (!(daySlot.bookingId === null && daySlot.bookedStartTime === null && daySlot.bookedEndTime === null)) {
              return {
                NoAvailableSlots: {
                  message: `No available daySlot on ${day.startTime} for booking request.`,
                },
              };
            }
            day.daySlotId = daySlot.id;
          } else {
            return {
              NoAvailableSlots: {
                message: `No available daySlot on ${day.startTime} for booking request.`,
              },
            };
          }
        }

        // create Booking
        let booking: Booking;
        const price = calculatePrice(daySlotDates, property.hourlyPrice);
        try {
          booking = await BookingService.createBooking(user.id, property.id, price, startDate, endDate, frequency);
        } catch (error) {
          let errorMessage = 'Unknown error when creating booking';
          if (error instanceof Error) {
            errorMessage = `${errorMessage}: ${error.message}.`;
          }
          return {
            UnknownError: {
              message: errorMessage,
            },
          };
        }

        // update daySlots to mark them as booked
        try {
          BookingService.bookDaySlots(daySlotDates, property.id, booking.id);
        } catch (error) {
          // if error occurs delete existing booking
          ctx.prisma.booking.delete({
            where: {
              id: booking.id,
            },
          });
          let errorMessage = 'Unknown error when updating daySlots';
          if (error instanceof Error) {
            errorMessage = `${errorMessage}: ${error.message}.`;
          }
          return {
            UnknownError: {
              message: errorMessage,
            },
          };
        }

        // if no error was returned so far every step is succeeded, booking can be returned
        return { Booking: booking };
      },
    });
  },
});
