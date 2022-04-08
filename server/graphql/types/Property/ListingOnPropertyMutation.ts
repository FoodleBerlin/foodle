import { Frequency, WeekDay } from '@prisma/client';
import moment from 'moment';
import { extendType, inputObjectType, intArg, list, nonNull, objectType, stringArg } from 'nexus';
import { FrequencyEnum, WeekDayEnum } from '../EnumsScalars/Enums';
import {
  ClientErrorInvalidInput,
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
    t.nullable.field('ClientErrorInvalidInput', {
      type: ClientErrorInvalidInput,
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

export const AvailableDay = inputObjectType({
  name: 'AvailableDay',
  definition(t) {
    t.nonNull.string('endTime');
    t.nonNull.string('startTime');
    t.nonNull.field('weekday', { type: WeekDayEnum });
  },
});

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
        propertyHandle: nonNull(stringArg()),
        availableDays: list(AvailableDay), // Todo: fix adding nonNull => at least one entry
      },

      async resolve(_root, args, ctx) {
        let a = args.availableDays!;

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
        // check startDate before Enddate
        // startDate equals with weekday
        // starttime not after endtime, at least 5 h
        // weekdays not empty
        // minimum bookings < 30
        // as much availableDays as weekdays

        // Todo: validate Input
        // Tdodo: fix nullability ! bad practice
        // Todo: check if slot overlaps with existing slot
        // Todo: date input with scalar
        // Todo: logging statements?

        try {
          // create PropertySlot
          const propSlot = await ctx.prisma.propertySlot.create({
            data: {
              minimumBookings: args.minimumBookings,
              frequency: args.frequency,
              startDate: args.startDate,
              endDate: args.endDate,
              propertyId: property.id,
            },
          });

          const startDate = moment(new Date(args.startDate));
          const endDate = moment(new Date(args.endDate));
          const frequency = frequencyToInt(args.frequency);
          // push all specific dates between startDate and endDate to daySlotDates[]
          let daySlotDates: DaySlot[] = [];

          // loop through availableDays and get all specific dates for each generic day
          args.availableDays!.forEach((availabeDay) => {
            var nextWeekday = startDate;
            // find first date for weekday
            while (checkForSameWeekday(nextWeekday, availabeDay!.weekday)) {
              nextWeekday = moment(nextWeekday).add(1, 'days');
            }
            // get all dates for the weekday in the timeslot, according to the frequency
            let datesForWeekday = getAllDatesForWeekday(
              nextWeekday,
              frequency,
              endDate,
              weekdayToInt(availabeDay!.weekday),
              availabeDay!.startTime,
              availabeDay!.endTime
            );
            datesForWeekday.forEach((date) => {
              daySlotDates.push(date);
            });
          });

          // throw error if more than 26 day slots would be created
          if (daySlotDates.length > 26) {
            return {
              ClientErrorInvalidInput: {
                message: `${daySlotDates.length} daySlots, max 26 day slots for 1 propertySlot allowed.`,
              },
            };
          }
          // for each entry in daySlotDates[] create a daySlot and save it to the db
          daySlotDates.forEach(async (day) => {
            const daySlot = await ctx.prisma.daySlot.create({
              data: {
                date: day.date.toISOString(),
                startTime: day.startTime,
                endTime: day.endTime,
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

function checkForSameWeekday(date: moment.Moment, weekday: WeekDay): boolean {
  if (date.isoWeekday() === weekdayToInt(weekday)) {
    return true;
  } else {
    return false;
  }
}

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

function weekdayToInt(weekday: WeekDay): number {
  switch (weekday) {
    case WeekDay.mon: {
      return 1;
    }
    case WeekDay.tue: {
      return 2;
    }
    case WeekDay.wed: {
      return 3;
    }
    case WeekDay.thu: {
      return 4;
    }
    case WeekDay.fri: {
      return 5;
    }
    case WeekDay.sat: {
      return 6;
    }
    default: {
      return 7;
    }
  }
}

// for a specific weekday push all the specific dates according to frequency between startDate and endDate to daySlotDates[]
function getAllDatesForWeekday(
  loopDay: moment.Moment,
  frequency: number,
  endDate: moment.Moment,
  weekday: number,
  startTime: string,
  endTime: string
): DaySlot[] {
  let allDates: DaySlot[] = [];
  const firstDay: DaySlot = { date: loopDay, startTime: startTime, endTime: endTime };
  allDates.push(firstDay);
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
      const daySlot: DaySlot = { date: loopDay, startTime: startTime, endTime: endTime };
      allDates.push(daySlot);
    }
  }
  return allDates;
}

interface DaySlot {
  date: moment.Moment;
  startTime: string;
  endTime: string;
}
