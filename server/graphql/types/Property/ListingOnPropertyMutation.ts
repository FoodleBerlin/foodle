import { Frequency } from '@prisma/client';
import moment from 'moment';
import { extendType, intArg, list, nonNull, objectType, stringArg } from 'nexus';
import { FrequencyEnum, WeekDayEnum } from '../EnumsScalars/Enums';
import {
  ClientErrorInvalidHandle,
  ClientErrorInvalidPropertyInput,
  ClientErrorUserNotExists,
  UnknownError,
} from '../Error';
import { PropertySlot } from '../PropertySlot';

export const CreatePropertySlotReturn = objectType({
  name: 'CreatePropertySlotReturn',
  definition(t) {
    t.nullable.field('PropertySlot', { type: PropertySlot });
    t.nullable.field('ClientErrorPropertyNotExists', {
      type: ClientErrorUserNotExists,
    });
    t.nullable.field('ClientErrorInvalidHandle', {
      type: ClientErrorInvalidHandle,
    });
    t.nullable.field('ClientErrorInvalidListingInput', {
      type: ClientErrorInvalidPropertyInput,
    });
    t.nullable.field('UnknownError', {
      type: UnknownError,
    });
  },
});
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const CreatePropertySlot = extendType({
  type: 'Mutation',
  definition(l) {
    l.field('createPropertySlot', {
      type: CreatePropertySlotReturn,
      args: {
        startDate: nonNull(stringArg()),
        endDate: nonNull(stringArg()),
        frequency: nonNull(FrequencyEnum),
        minimumBookings: nonNull(intArg()),
        weekdays: list(WeekDayEnum), // Todo: fix adding nonNull
        propertyHandle: nonNull(stringArg()),
        // time of dayslot
      },

      async resolve(_root, args, ctx) {
        async function findProperty() {
          return await ctx.prisma.property.findUnique({
            where: {
              handle: args.propertyHandle,
            },
          });
        }

        var property = await findProperty();
        if (property === null) {
          return {
            ClientErrorPropertyNotExists: {
              message: `Property for propertyId ${args.propertyHandle} does not exist`,
            },
          };
        }
        var propertyId = property.id;
        // Todo: validate Input
        // Todo: check if slot overlaps with existing slot
        // Todo: max. 52 day slots at once
        // Todo: logging statements

        try {
          const propSlot = await ctx.prisma.propertySlot.create({
            data: {
              minimumBookings: args.minimumBookings,
              frequency: args.frequency,
              startDate: args.startDate,
              endDate: args.endDate,
              propertyId: propertyId,
            },
          });

          const startDate = moment(new Date(args.startDate));
          const endDate = moment(new Date(args.endDate));
          const frequency = frequencyToInt(args.frequency);
          // push all specific dates between startDate and endDate to daySlotDates[]
          let daySlotDates: moment.Moment[] = [];

          // assumed that startdate matches with first weekday

          // get dates for first weekday
          let weekday = startDate.isoWeekday();
          let loopDay = moment(startDate);
          let datesForWeekday = getAllDatesForWeekday(loopDay, frequency, endDate, weekday);
          datesForWeekday.forEach((date) => {
            daySlotDates.push(date);
          });
          // get dates for further weekdays
          let datesForMultipleWeekdays = getDaysForMultipleWeekdays(
            args.weekdays!.filter(notEmpty),
            startDate,
            endDate,
            frequency
          );
          datesForMultipleWeekdays.forEach((date) => {
            daySlotDates.push(date);
          });
          // for each date in daySlots[] create a daySlot entry and save it to the db
          daySlotDates.forEach(async (day) => {
            const daySlot = await ctx.prisma.daySlot.create({
              data: {
                date: day.toISOString(),
                //Todo: get start and Endtime from user input
                startTime: day.toISOString(),
                endTime: day.toISOString(),
                propertySlotId: propSlot.id,
              },
            });
          });

          return { PropertySlot: propSlot };
        } catch (error) {
          console.log({ error });
          let errorMessage = 'Unknown error';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          return {
            UnknownError: {
              message: errorMessage,
            },
          };
        }
      },
    });
  },
});

function frequencyToInt(frequency: Frequency): number {
  switch (frequency) {
    case Frequency.biweekly: {
      return 14;
    }
    case Frequency.weekly: {
      return 7;
    }
    case Frequency.monthly: {
      return 30;
    }
    default: {
      return 0;
    }
  }
}

// for a specific weekday push all the specific dates according to frequency between startDate and endDate to daySlotDates[]
function getAllDatesForWeekday(
  loopDay: moment.Moment,
  frequency: number,
  endDate: moment.Moment,
  weekday: number
): moment.Moment[] {
  let allDates: moment.Moment[] = [];
  allDates.push(loopDay);
  while (moment(loopDay).isBefore(endDate)) {
    if (frequency < 15) {
      loopDay = moment(loopDay).add(frequency, 'days');
    } else {
      loopDay = moment(loopDay).add(1, 'month');
      while (loopDay.isoWeekday() != weekday) {
        loopDay = moment(loopDay).add(1, 'days');
      }
    }
    if (moment(loopDay).isBefore(endDate)) {
      allDates.push(loopDay);
    }
  }
  return allDates;
}

// check for further weekdays and if yes get first date and call on first date getAllDatesForWeekday()
function getDaysForMultipleWeekdays(
  weekdays: number[],
  startDate: moment.Moment,
  endDate: moment.Moment,
  frequency: number
): moment.Moment[] {
  let daySlotDates: moment.Moment[] = [];
  if (weekdays.length > 1) {
    let count = 1;
    while (weekdays.length > count) {
      var nextWeekday = startDate;
      var nextWeekdayInt = weekdays[count];
      while (nextWeekday.isoWeekday() != nextWeekdayInt) {
        nextWeekday = moment(nextWeekday).add(1, 'days');
      }
      let datesForWeekday = getAllDatesForWeekday(nextWeekday, frequency, endDate, nextWeekdayInt);
      datesForWeekday.forEach((date) => {
        daySlotDates.push(date);
      });
      count++;
    }
  }
  return daySlotDates;
}

// TODO create an array
/*     availableDays: {
                create: {
                  endTime: args.availabilities.endDate,
                  startTime: args.availabilities.startDate,
                  weekday: args.availabilities.weekday,
                },
              }, */
