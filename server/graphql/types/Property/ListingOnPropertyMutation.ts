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
        weekdays: list(WeekDayEnum),
        propertyHandle: nonNull(stringArg()),
        // time of dayslot
      },

      async resolve(_root, args, ctx) {
        async function findProperty() {
          return await ctx.prisma.user.findUnique({
            where: {
              id: args.propertyHandle,
            },
          });
        }

        var property = await findProperty();
        if (property == null) {
          return {
            ClientErrorUserNotExists: {
              message: `proeprty for propertyId ${args.propertyHandle} does not exist`,
            },
          };
        }
        var propertyId = property.id;
        // Todo: validate Input

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

          // create and save dayslots
          // var a = new Date('234').toISOString();
          // TODO multiple weekdays?
          var startDate = new Date(args.startDate);
          var endDate = new Date(args.endDate);
          var weekday = startDate.getDay;
          var loopDay = moment(startDate);
          var daySlots = [startDate];

          while (moment(loopDay).isBefore(endDate)) {
            loopDay = moment(loopDay).add(5, 'days');
            daySlots.push(loopDay.toDate());
          }
          daySlots.forEach(async (day) => {
            const daySlot = await ctx.prisma.daySlot.create({
              data: {
                date: day.toISOString(),
                //fix
                startTime: day.toISOString(),
                endTime: day.toISOString(),
                propertySlotId: propSlot.id,
              },
            });
          });
          // get weekDay of input startDate
          // for each weekdayInput
          // calculate the date of the first DaySlot, create DaySlot
          // in a while loop add 7 days and check if date is still before endDate, if yes create an other DaySlot
          // create Dayslots
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

// TODO create an array
/*     availableDays: {
                create: {
                  endTime: args.availabilities.endDate,
                  startTime: args.availabilities.startDate,
                  weekday: args.availabilities.weekday,
                },
              }, */
