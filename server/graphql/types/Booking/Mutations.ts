import { Booking, PropertySlot, Role } from '@prisma/client';
import moment from 'moment';
import { extendType, list, nonNull, objectType, stringArg } from 'nexus';
import { bookingService } from '../../../singletons/BookingService';
import { FrequencyEnum } from '../EnumsScalars/Enums';
import {
  ClientErrorInvalidInput,
  ClientErrorInvalidPropertyInput,
  ClientErrorPropertyNotExists,
  ClientErrorUserNotExists,
  NoAvailableSlots,
  UnknownError,
} from '../Error';
import { AvailableDay, DaySlotInterface } from '../Property';
import { Booking as BookingObject } from './objects';

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
        // Todo: from context
        userHandle: nonNull(stringArg()),
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
        if (property === null) {
          return {
            ClientErrorPropertyNotExists: {
              message: `Property for propertyHandle ${args.propertyHandle} does not exist`,
            },
          };
        }

        const user = await ctx.prisma.user.findUnique({
          where: {
            // Todo: change back id: ctx.user?.id,
            handle: args.userHandle,
          },
        });
        // Todo : not working
        if (user == null || user == undefined) {
          console.log('asdf: ' + user);
          return {
            ClientErrorUserNotExists: {
              message: `User is not logged in.`,
            },
          };
        }
        if (user.role === Role.landlord) {
          return {
            ClientErrorUserNotExists: {
              message: `User for userHandle ${args.userHandle} does not have a tenant role`,
            },
          };
        }

        const startDate = moment(args.startDate);
        const endDate = moment(args.endDate);
        const frequency = args.frequency;

        // calculate every date and save all in daySlotDates
        let daySlotDates: DaySlotInterface[] = bookingService.calculateDates(
          args.daySlots,
          startDate,
          endDate,
          frequency
        );

        // check if matching propertySlot exists
        const possiblePropertySlots = await ctx.prisma.propertySlot.findMany({
          where: {
            propertyId: property.id,
            // Todo check here also for date?
          },
        });

        // filter possible slots for start and endDates
        let count = 0;
        let propertySlot: PropertySlot | null = null;
        while (count < possiblePropertySlots.length) {
          if (moment(possiblePropertySlots[count].startDate).isSameOrAfter(args.startDate)) {
            if (moment(possiblePropertySlots[count].endDate).isSameOrAfter(args.endDate)) {
              // Todo: check for start end time matching
              propertySlot = possiblePropertySlots[count];
              break;
            }
          }
          count++;
        }

        // if no free slot available return error
        if (propertySlot == null) {
          return {
            NoAvailableSlots: {
              message: `No available property slot for booking request.`,
            },
          };
        }
        // check availability for every daySlot in daySlotDates
        await Promise.all(
          daySlotDates.map(async (day) => {
            let daySlot = await ctx.prisma.daySlot.findFirst({
              where: {
                date: day.dateTime.toISOString(),
                propertySlotId: propertySlot!.id,
              },
            });
            if (daySlot !== null) {
              // check if slot is still available
              if (!(daySlot.bookingId === null && daySlot.bookedStartTime === null && daySlot.bookedEndTime === null)) {
                return {
                  NoAvailableSlots: {
                    message: `No available daySlot on ${day.dateTime} for booking request.`,
                  },
                };
              }
              // check if start and endTime is within daySlot time frame
              //Todo: unkommt
              /* if (
                !(
                  moment(day.startTime).isSameOrAfter(daySlot.startTime) &&
                  moment(daySlot.endTime).isSameOrAfter(day.endTime)
                )
              ) {
                return {
                  NoAvailableSlots: {
                    message: `No available daySlot on ${day.dateTime} for requested time frame.`,
                  },
                };
              } */
            }
          })
        );

        // create Booking
        let booking: Booking;
        try {
          booking = await bookingService.createBooking(
            user.id,
            property.id,
            12, // Todo: price
            startDate,
            endDate,
            frequency
          );
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
          bookingService.bookDaySlots(daySlotDates, property.id, booking.id);
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
