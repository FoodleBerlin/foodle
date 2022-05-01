import { Property } from '@prisma/client';
import moment from 'moment';
import { booleanArg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from 'nexus';
import { bookingService } from '../../../singletons/BookingService';
import { FrequencyEnum } from '../EnumsScalars/Enums';
import { ClientErrorInvalidInput, ClientErrorUserNotExists, NoAvailableSlots, UnknownError } from '../Error';
import { createHandle, validateDaySlot } from '../helperFunctions';
import { checkForEmptyList, validateStartEndDate } from '../validation';
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
        ownerHandle: nonNull(stringArg()),
        street: nonNull(stringArg()),
        streetNumber: nonNull(intArg()),
        zip: nonNull(intArg()),
        city: nonNull(stringArg()),
        description: nonNull(stringArg()),
        pickup: nullable(booleanArg()),
        hourlyPrice: nonNull(intArg()),
        serviceFee: nonNull(intArg()),
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
        let id = ctx.user?.id;
        if (process.env.DEV_LOGIN === 'true') {
          id = process.env.DEV_USER_ID;
        }
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: id,
          },
        });
        console.log('user: ' + user?.id);
        if (user === null) {
          return {
            ClientErrorUserNotExists: {
              message: `owner for ownerHandle ${args.ownerHandle} does not exist`,
            },
          };
        }
        const invalidInputLengthError = (inputType: string, arg: string, maxLength: number) => {
          return {
            ClientErrorInvalidInput: {
              message: `${inputType} ${arg} is invalid, must have a max length of ${maxLength} characters.`,
            },
          };
        };
        const isOverMaxLength = (str: string, maxLength: number) => {
          return str.length > maxLength;
        };
        if (isOverMaxLength(args.zip.toString(), 5)) {
          return invalidInputLengthError('Zip code', args.zip.toString(), 5);
        }
        if (isOverMaxLength(args.city, 50)) {
          return invalidInputLengthError('City name', args.city, 50);
        }
        if (isOverMaxLength(args.street, 50)) {
          return invalidInputLengthError('Street name', args.street, 50);
        }
        if (isOverMaxLength(args.description, 1000)) {
          return invalidInputLengthError('Description', args.description, 1000);
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
        args.availableDays.forEach((day) => {
          if (validateDaySlot(day)) {
            return {
              ClientErrorInvalidInput: {
                message: `Invalid input for availableDay ${day.startTime}: startTime can't be after endTime and startTime and endTime have to be on the same day.`,
              },
            };
          }
        });

        const startDate = moment(args.startDate);
        const endDate = moment(args.endDate);
        const frequency = args.frequency;

        // calculate concrete dates of propertySlot to create DaySlots
        const daySlotDates: DaySlotInterface[] = bookingService.calculateDates(
          args.availableDays,
          startDate,
          endDate,
          frequency
        );
        console.log('finish calculation');

        // throw error if more than 100 day slots would be created
        if (daySlotDates.length > 100) {
          return {
            ClientErrorInvalidInput: {
              message: `${daySlotDates.length} daySlots, max creation of 100 day slots  at once.`,
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
        console.log('Craeted property: ' + prop);
        console.log('Calculated days ' + daySlotDates.length);

        // for each entry in daySlotDates[] create a daySlot and save it to the db
        try {
          await Promise.all(
            daySlotDates.map(async (day) => {
              console.log('loop');
              await ctx.prisma.daySlot.create({
                data: {
                  startTime: day.startTime.toISOString(),
                  endTime: day.endTime.toISOString(),
                  propertyId: prop.id,
                },
              });
            })
          );

          console.log('done');

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
