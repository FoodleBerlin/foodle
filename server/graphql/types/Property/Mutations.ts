import { Property } from '@prisma/client';
import moment from 'moment';
import { booleanArg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from 'nexus';
import { BookingService } from '../../../singletons/bookingService';
import { ValidatorService } from '../../../singletons/validatorService';
import { FrequencyEnum } from '../EnumsScalars/Enums';
import { ClientErrorInvalidInput, ClientErrorUserNotExists, NoAvailableSlots, UnknownError } from '../Error';
import { createHandle } from '../helperFunctions';
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
        if (ctx.user?.id == undefined) {
          return {
            ClientErrorUserNotExists: { message: `User needs to log in when requesting bookings.` },
          };
        }
        const user = await ValidatorService.userExists(ctx.user?.id);
        if (user === null) {
          return {
            ClientErrorUserNotExists: { message: `User not found.` },
          };
        }
        const invalidInputLengthError = (inputType: string, arg: string, maxLength: number) => {
          return {
            ClientErrorInvalidInput: {
              message: `${inputType} ${arg} is invalid, must have a max length of ${maxLength} characters.`,
            },
          };
        };

        if (ValidatorService.isOverMaxLength(args.zip.toString(), 5)) {
          return invalidInputLengthError('Zip code', args.zip.toString(), 5);
        }
        if (ValidatorService.isOverMaxLength(args.city, 50)) {
          return invalidInputLengthError('City name', args.city, 50);
        }
        if (ValidatorService.isOverMaxLength(args.street, 50)) {
          return invalidInputLengthError('Street name', args.street, 50);
        }
        if (ValidatorService.isOverMaxLength(args.description, 1000)) {
          return invalidInputLengthError('Description', args.description, 1000);
        }
        if (!ValidatorService.validateStartEndDate(moment(args.startDate), moment(args.endDate))) {
          return {
            ClientErrorInvalidInput: {
              message: `startDate should be before endDate`,
            },
          };
        }
        if (!ValidatorService.validateStartEndDate(moment(args.startDate), moment(args.endDate))) {
          return {
            ClientErrorInvalidInput: {
              message: `Starttime of daySlot should be before endTime.`,
            },
          };
        }
        if (ValidatorService.checkForEmptyList(args.availableDays)) {
          return {
            ClientErrorInvalidInput: {
              message: `List argument availableDays must not be empty.`,
            },
          };
        }
        args.availableDays.forEach((day: { endTime: string; startTime: string }) => {
          if (ValidatorService.validateDaySlot(day)) {
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
        const a = args.availableDays;
        // calculate concrete dates of propertySlot to create DaySlots
        const daySlotDates: DaySlotInterface[] = BookingService.calculateDates(
          args.availableDays,
          startDate,
          endDate,
          frequency
        );

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

        // for each entry in daySlotDates[] create a daySlot and save it to the db
        try {
          await Promise.all(
            daySlotDates.map(async (day) => {
              await ctx.prisma.daySlot.create({
                data: {
                  startTime: day.startTime.toISOString(),
                  endTime: day.endTime.toISOString(),
                  propertyId: prop.id,
                },
              });
            })
          );

          // if no error occured so far, listing was succesfully created and property can be returned
          return { Property: prop };
        } catch (error) {
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
