import { Booking, BookingStatus, Property, PropertySlot, Role } from '@prisma/client';
import moment from 'moment';
import { extendType, list, nonNull, objectType, stringArg } from 'nexus';
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
import {
  checkForSameWeekday,
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
        // Todo: check for minimum bookings
        // Todo date from datetime

        // calculate every date and save all in daySlotDates
        const startDate = moment(args.startDate);
        const endDate = moment(args.endDate);
        const frequency = frequencyToInt(args.frequency);

        let daySlotDates: DaySlotInterface[] = [];

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
        let possiblePropertySlots = await ctx.prisma.propertySlot.findMany({
          where: {
            propertyId: property.id,
            // check for minimum bookings
            minimumBookings: {
              gte: daySlotDates.length,
            },
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
        if (propertySlot == null) {
          return {
            NoAvailableSlots: {
              message: `No available property slot for booking request.`,
            },
          };
        }
        console.log('Length: ' + daySlotDates.toString());
        // check availability for every daySlot in daySlotDates
        daySlotDates.forEach(async (day) => {
          let daySlot = await ctx.prisma.daySlot.findFirst({
            where: {
              date: day.date.toISOString(),
              propertySlotId: propertySlot!.id,
            },
          });
          if (daySlot !== null) {
            // check if slot is still available
            if (!(daySlot.bookingId === null && daySlot.bookedStartTime === null && daySlot.bookedEndTime === null)) {
              return {
                NoAvailableSlots: {
                  message: `No available daySlot on ${day.date} for booking request.`,
                },
              };
            }
            // check if start and endTime is within daySlot time frame
            if (
              !(
                moment(day.startTime).isSameOrAfter(daySlot.startTime) &&
                moment(daySlot.endTime).isSameOrAfter(day.endTime)
              )
            ) {
              return {
                NoAvailableSlots: {
                  message: `No available daySlot on ${day.date} for requested time frame.`,
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
              totalPrice: calculatePrice(daySlotDates, property),
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
        console.log(dateArray);
        // updates as transaction => if one update fails all fail
        try {
          await daySlotDates.forEach((day) => {
            ctx.prisma.$transaction([
              ctx.prisma.daySlot.update({
                where: {
                  date_propertySlotId: {
                    date: day.date.toISOString(),
                    propertySlotId: property.id,
                  },
                },
                data: {
                  bookingId: booking.id,
                  bookedStartTime: day.startTime,
                  bookedEndTime: day.endTime,
                },
              }),
            ]);
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
      },
    });
  },
});

function calculatePrice(daySlotDates: DaySlotInterface[], property: Property): number {
  let hours = 0;
  daySlotDates.forEach((day) => {
    let start = moment(day.startTime);
    let end = moment(day.endTime);
    hours += start.diff(end, 'hours');
  });
  return hours * property.hourlyPrice;
}
