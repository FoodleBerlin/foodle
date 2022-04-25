import { Property, PropertySlot } from '@prisma/client';
import moment from 'moment';
import { booleanArg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from 'nexus';
import { bookingService } from '../../../singletons/BookingService';
import { FrequencyEnum } from '../EnumsScalars/Enums';
import { ClientErrorInvalidInput, ClientErrorUserNotExists, NoAvailableSlots, UnknownError } from '../Error';
import { createHandle } from '../PropertySlot/helperFunctions';
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
        // Todo: back to id from context
        ownerHandle: nonNull(stringArg()),
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
        availableDays: nonNull(list(nonNull(AvailableDay))),
      },
      async resolve(_root, args, ctx) {
        // validate input

        const user = await ctx.prisma.user.findUnique({
          where: {
            // Todo id from context
            handle: args.ownerHandle,
          },
        });
        if (user === null) {
          return {
            ClientErrorUserNotExists: {
              message: `owner for ownerHandle ${args.ownerHandle} does not exist`,
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

        const startDate = moment(new Date(args.startDate));
        const endDate = moment(new Date(args.endDate));
        const frequency = args.frequency;

        // check if slot overlaps with already existing slot
        let slots = await ctx.prisma.propertySlot.findMany();
        slots = slots.filter((slot: any) => {
          moment(startDate).isAfter(moment(slot.startDate)) && moment(startDate).isBefore(moment(slot.startDate));
        });
        slots.forEach((slot: any) => {
          slot.weekdays.forEach((weekday: any) => {
            args.availableDays.forEach((day: any) => {
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

        // calculate concrete dates of propertySlot to create DaySlots
        const daySlotDates: DaySlotInterface[] = bookingService.calculateDates(
          args.availableDays,
          endDate,
          startDate,
          frequency
        );

        // throw error if more than 100 day slots would be created
        if (daySlotDates.length > 100) {
          return {
            ClientErrorInvalidInput: {
              message: `${daySlotDates.length} daySlots, max 100 day slots for 1 propertySlot allowed.`,
            },
          };
        }

        // create property
        let prop: Property;
        try {
          prop = await ctx.prisma.property.create({
            data: {
              size: args.size,
              ownerId: user.id,
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

        // create PropertySlot
        let propSlot: PropertySlot;
        try {
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

          // if no error occured so far, listing was succesfully created and property can be returned
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
