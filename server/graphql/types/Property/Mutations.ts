import { Property, PropertySlot } from '@prisma/client';
import moment from 'moment';
import { booleanArg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from 'nexus';
import { FrequencyEnum } from '../EnumsScalars/Enums';
import { ClientErrorInvalidInput, ClientErrorUserNotExists, NoAvailableSlots, UnknownError } from '../Error';

import {
  compareDateWithDayOfWeek,
  createHandle,
  getAllDatesForWeekday,
  weekdayToInt,
} from '../PropertySlot/helperFunctions';
import { checkForEmptyList, validateStartEndDate } from '../PropertySlot/validation';
import { AvailableDay, DaySlotInterface } from './Objects';

export const CreateListingReturn = objectType({
  name: 'CreateListingReturn',
  definition(t) {
    t.nullable.field('Property', { type: 'Property' });
    t.nullable.field('ClientErrorUserNotExists', {
      type: ClientErrorUserNotExists,
    });
    t.nullable.field('ClientErrorInvalidInput', {
      type: ClientErrorInvalidInput,
    });
    t.nullable.field('NoAvailableSlots', {
      type: NoAvailableSlots,
    });
    t.nullable.field('UnknownError', {
      type: UnknownError,
    });
  },
});

export const CreateListing = extendType({
  type: 'Mutation',
  definition(p) {
    p.field('createListing', {
      type: CreateListingReturn,
      args: {
        size: nonNull(intArg()),
        title: nonNull(stringArg()),
        ownerId: nonNull(stringArg()),
        street: nonNull(stringArg()),
        streetNumber: nonNull(intArg()),
        zip: nonNull(intArg()),
        city: nonNull(stringArg()),
        description: nonNull(stringArg()),
        pickup: nullable(booleanArg()),
        hourlyPrice: nonNull(intArg()),
        serviceFee: nonNull(intArg()),
        facilities: nonNull(list(nonNull(stringArg()))),
        rules: nonNull(list(nonNull(stringArg()))),
        deposit: nonNull(intArg()),
        images: nonNull(list(nonNull(stringArg()))),
        partialSpace: nonNull(booleanArg()),
        startDate: nonNull('DateTime'),
        endDate: nonNull('DateTime'),
        frequency: nonNull(FrequencyEnum),
        propertyHandle: nonNull(stringArg()),
        availableDays: nonNull(list(nonNull(AvailableDay))),
      },
      // validation: endDate should equal startDate when frequency none,
      // validation: endDate and startDate should be appart at least one week month when frequency > none
      // Todo unique constraint
      /*
      create listing
 => propertySlot and DaySlot correctly added?
 => errors correctly thrown?
create booking on listing
 => booking and daySlots correctly added/ updated?
 => errors correctly thrown?
delete user cascade
delete booking cascade
delete propertySlot cascade
delete daySlot should not be possible
      */
      async resolve(_root, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: args.ownerId,
          },
        });
        if (user === null) {
          return {
            ClientErrorUserNotExists: {
              message: `owner for ownerId ${args.ownerId} does not exist`,
            },
          };
        }
        const invalidInputLengthError = (inputType: string, arg: string) => {
          return {
            ClientErrorInvalidInput: {
              message: `${inputType} ${arg} is invalid, must have a max length of 5`,
            },
          };
        };
        const isOverMaxLength = (str: string, maxLength: number) => {
          return str.length > maxLength;
        };
        if (isOverMaxLength(args.zip.toString(), 5)) {
          return invalidInputLengthError('Zip code', args.zip.toString());
        }
        if (isOverMaxLength(args.city, 200)) {
          return invalidInputLengthError('City name', args.city);
        }
        if (isOverMaxLength(args.street, 200)) {
          return invalidInputLengthError('Street name', args.street);
        }
        if (isOverMaxLength(args.description, 1000)) {
          return invalidInputLengthError('Description', args.description);
        }
        if (!validateStartEndDate(moment(args.startDate), moment(args.endDate))) {
          return {
            ClientErrorInvalidInput: {
              message: `startDate should be before endDate`,
            },
          };
        }
        if (!validateStartEndDate(moment(args.startDate), moment(args.endDate))) {
          return {
            ClientErrorInvalidInput: {
              message: `Starttime of daySlot should be before endTime.`,
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
        let prop: Property;
        try {
          prop = await ctx.prisma.property.create({
            data: {
              size: args.size,
              ownerId: args.ownerId,
              street: args.street,
              title: args.title.toLowerCase(),
              handle: createHandle(args.title),
              streetNumber: args.streetNumber,
              zip: args.zip,
              city: args.city,
              description: args.description,
              rules: args.rules,
              serviceFee: args.serviceFee,
              hourlyPrice: args.hourlyPrice,
              facilities: args.facilities,
              deposit: args.deposit,
              images: args.images,
              partialSpace: args.partialSpace,
              pickup: args.pickup ?? false,
            },
          });
        } catch (error) {
          console.log({ error });
          let errorMessage = 'Unknown error when creating a property: ';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          return {
            UnknownError: {
              message: errorMessage,
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
              frequency: args.frequency,
              startDate: args.startDate,
              endDate: args.endDate,
              propertyId: prop.id,
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
        const frequency = args.frequency;
        // push all specific dates between startDate and endDate to daySlotDates[]
        let daySlotDates: DaySlotInterface[] = [];
        // loop through availableDays and get all specific dates for each generic day
        args.availableDays.forEach((availabeDay) => {
          var nextWeekday = startDate;
          // find first date for weekday
          while (compareDateWithDayOfWeek(nextWeekday, availabeDay.weekday)) {
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
          await Promise.all(
            daySlotDates.map(async (day) => {
              await ctx.prisma.daySlot.create({
                data: {
                  date: day.date.toISOString(),
                  startTime: day.startTime,
                  endTime: day.endTime,
                  propertySlotId: propSlot.id,
                },
              });
            })
          );
          return { Property: prop };
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
