import { PropertySlot } from '@prisma/client';
import moment from 'moment';
import { extendType, inputObjectType, intArg, list, nonNull, objectType, stringArg } from 'nexus';
import { FrequencyEnum, WeekDayEnum } from '../EnumsScalars/Enums';
import {
  ClientErrorInvalidInput,
  ClientErrorInvalidPropertyInput,
  ClientErrorUserNotExists,
  UnknownError,
} from '../Error';
import { checkForSameWeekday, DaySlot, frequencyToInt, getAllDatesForWeekday, weekdayToInt } from './helperFunctions';
import { checkForEmptyList, validateStartEndDate } from './validation';

export const CreatePropertySlotReturn = objectType({
  name: 'CreatePropertySlotReturn',
  definition(t) {
    t.nullable.field('PropertySlot', { type: 'PropertySlot' });
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
function example(availableDay: typeof AvailableDay) {}

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
        availableDays: nonNull(list(nonNull(AvailableDay))),
      },

      async resolve(_root, args, ctx) {
        // validate input
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
              message: `Property for propertyHandle ${args.propertyHandle} does not exist`,
            },
          };
        }
        if (validateStartEndDate(moment(args.startDate), moment(args.endDate))) {
          return {
            ClientErrorInvalidInput: {
              message: `startDate should be before endDate`,
            },
          };
        }
        if (validateStartEndDate(moment(args.startDate), moment(args.endDate))) {
          return {
            ClientErrorInvalidInput: {
              message: `Starttime of daySlot should be before endTime, day slot should be at least 3 h.`,
            },
          };
        }

        if (checkForEmptyList(args.availableDays.length)) {
          return {
            ClientErrorInvalidInput: {
              message: `List argument availableDays must not be empty.`,
            },
          };
        }

        // check if slot overlaps with already existing slot
        let slots = await ctx.prisma.propertySlot.findMany();
        slots = slots.filter((slot) => {
          moment(startDate).isAfter(moment(slot.startDate)) && moment(startDate).isBefore(moment(slot.startDate));
        });
        slots.forEach((slot) => {
          slot.weekdays.forEach((weekday) => {
            args.availableDays.forEach((day) => {
              if (day.weekday === weekday) {
                return {
                  ClientErrorInvalidInput: {
                    message: `Existing property slot overlaps with selected dates.`,
                  },
                };
              }
            });
          });
        });

        let propSlot: PropertySlot;
        try {
          // create PropertySlot
          propSlot = await ctx.prisma.propertySlot.create({
            data: {
              minimumBookings: args.minimumBookings,
              frequency: args.frequency,
              startDate: args.startDate,
              endDate: args.endDate,
              propertyId: property.id,
            },
          });
        } catch (error) {
          console.log({ error });
          let errorMessage = 'Unknown error when creating a proeprtySlot';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          return {
            UnknownError: {
              message: errorMessage,
            },
          };
        }

        const startDate = moment(new Date(args.startDate));
        const endDate = moment(new Date(args.endDate));
        const frequency = frequencyToInt(args.frequency);
        // push all specific dates between startDate and endDate to daySlotDates[]
        let daySlotDates: DaySlot[] = [];

        // loop through availableDays and get all specific dates for each generic day
        args.availableDays.forEach((availabeDay) => {
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

        // throw error if more than 26 day slots would be created
        if (daySlotDates.length > 26) {
          return {
            ClientErrorInvalidInput: {
              message: `${daySlotDates.length} daySlots, max 26 day slots for 1 propertySlot allowed.`,
            },
          };
        }
        // for each entry in daySlotDates[] create a daySlot and save it to the db
        try {
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
          let errorMessage = 'Unknown error when creating a daySlots ';
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

export const AvailableDay = inputObjectType({
  name: 'AvailableDay',
  definition(t) {
    t.nonNull.string('endTime');
    t.nonNull.string('startTime');
    t.nonNull.field('weekday', { type: WeekDayEnum });
  },
});

/*
  for a specific weekday push all the specific dates according to frequency 
  between startDate and endDate to daySlotDates[]
*/

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

function test(
  availableDays: { endTime: string; startTime: string; weekday: 'mon' | 'thu' | 'wed' | 'fri' | 'sat' | 'sun' }[]
) {
  // pretty sure that there is a better way to do this...
}
