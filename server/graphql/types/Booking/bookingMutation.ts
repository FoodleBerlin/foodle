import { Booking, BookingStatus, PropertySlot, Role } from '@prisma/client';
import moment from 'moment';
import { extendType, list, nonNull, objectType, stringArg } from 'nexus';
import { FrequencyEnum } from '../EnumsScalars/Enums';
import {
  ClientErrorInvalidInput,
  ClientErrorInvalidPropertyInput,
  ClientErrorUserNotExists,
  NoAvailableSlots,
  UnknownError,
} from '../Error';
import { AvailableDay } from '../PropertySlot';
import {
  checkForSameWeekday,
  DaySlot,
  frequencyToInt,
  getAllDatesForWeekday,
  weekdayToInt,
} from '../PropertySlot/helperFunctions';
import { Booking as BookingApi } from './objects';

export const CreateBookingReturn = objectType({
  name: 'CreateBookingReturn',
  definition(t) {
    t.nullable.field('Booking', { type: BookingApi });
    t.nullable.field('ClientErrorUserNotExists', {
      type: ClientErrorUserNotExists,
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
        userHandle: nonNull(stringArg()),
        propertyHandle: nonNull(stringArg()),
        startDate: nonNull(stringArg()),
        endDate: nonNull(stringArg()),
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
            handle: args.userHandle,
          },
        });
        if (user === null) {
          return {
            ClientErrorUserNotExists: {
              message: `User for userHandle ${args.userHandle} does not exist`,
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

        // calculate every date and save all in daySlotDates
        const startDate = moment(new Date(args.startDate));
        const endDate = moment(new Date(args.endDate));
        const frequency = frequencyToInt(args.frequency);

        let daySlotDates: DaySlot[] = [];

        args.daySlots.forEach((availabeDay) => {
          var nextWeekday = startDate;
          // find first date for weekday
          while (checkForSameWeekday(nextWeekday, availabeDay.weekday)) {
            nextWeekday = moment(nextWeekday).add(1, 'days');
          }
          // get all dates for the weekday in the timeslot, according to the frequency
          let datesForWeekday = getAllDatesForWeekday(
            nextWeekday,
            frequency,
            endDate,
            weekdayToInt(availabeDay.weekday),
            availabeDay.startTime,
            availabeDay.endTime
          );
          datesForWeekday.forEach((date) => {
            daySlotDates.push(date);
          });
        });

        // check if matching propertySlot exists
        // ?  should all have an index? Is it more efficient the more detailed where {} is?
        let possiblePropertySlots = await ctx.prisma.propertySlot.findMany({
          where: {
            propertyId: property.id,
            frequency: args.frequency,
            minimumBookings: {
              gte: daySlotDates.length,
            },
            /*  weekdays: {
              contains: WeekDay.fri
            } 
            possiblity to filter also by startDate? E.g. where startDate before daySlot.startDate
            */
          },
        });

        // filter possible slots for start and endDates
        let count = 0;
        let propertySlot: PropertySlot | null = null;
        while (count < (await possiblePropertySlots).length) {
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
        if (propertySlot === null) {
          return {
            NoAvailableSlots: {
              message: `No available property slot for booking request.`,
            },
          };
        }

        // check availability for every daySlot in daySlotDates
        daySlotDates.forEach(async (day) => {
          let daySlot = await ctx.prisma.daySlot.findFirst({
            where: {
              date: day.date.toISOString(),
              propertySlotId: propertySlot!.id,
            },
          });
          if (daySlot !== null) {
            if (daySlot.bookingId === null && daySlot.bookedStartTime === null && daySlot.bookedEndTime === null) {
              return {
                NoAvailableSlots: {
                  message: `No available daySlot on ${day.date} for booking request.`,
                },
              };
            }
          }
        });

        // create Booking
        let booking: Booking;
        try {
          booking = await ctx.prisma.booking.create({
            data: {
              tenantId: user.id,
              propertyId: property.id,
              bookingStatus: BookingStatus.pending,
              totalPrice: 12, // Todo calculate total price
              startDate: args.startDate,
              endDate: args.endDate,
              frequency: args.frequency,
            },
          });
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

        // update all daySlots with bookingId to mark them as booked
        const dateArray: string[] = [];
        daySlotDates.forEach((day) => {
          dateArray.push(day.date.toISOString());
        });

        // updateMany is transactional, will either update all or none
        try {
          await ctx.prisma.daySlot.updateMany({
            where: {
              date: {
                in: dateArray,
              },
            },
            data: {
              bookingId: '', // Todo bookingslot
              bookedStartTime: '',
              bookedEndTime: '',
            },
          });
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

        /*
        calculate every single date with daySlots, frequency, start and endDate
        loop over every date and check if daySlot with start and end time exists.
        check if daySlot is still free

        check if there is an existing propertySlot that matches with start, endDate, frequency, days

        index on date
        */

        // check if slot is available
        // create booking or return error
      },
    });
  },
});
