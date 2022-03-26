import { extendType, objectType, nonNull, intArg, stringArg, booleanArg, nullable, list } from 'nexus';
import {
  ClientErrorUserNotExists,
  ClientErrorInvalidHandle,
  ClientErrorInvalidPropertyInput,
  UnknownError,
} from '../Error';
import { PropertySlotInput } from '../PropertySlot';
import { v4 as uuidv4 } from 'uuid';
import { isValidListStrings, isValidStrings } from '../../validation';
import { isValidNumbers } from '../../validation';
import { isVaildObjectAvailabilitiesObject } from '../../validation';

export const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'Boolean',
      resolve() {
        return true;
      },
    });
  },
});

export const CreatePropertyReturn = objectType({
  name: 'createPropertyReturn',
  definition(t) {
    t.nullable.field('Property', { type: 'Property' });
    t.nullable.field('ClientErrorUserNotExists', {
      type: ClientErrorUserNotExists,
    });
    t.nullable.field('ClientErrorInvalidHandle', {
      type: ClientErrorInvalidHandle,
    });
    t.nullable.field('ClientErrorInvalidPropertyInput', {
      type: ClientErrorInvalidPropertyInput,
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
      type: 'createPropertyReturn', // needs to be changed
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
        availabilities: nonNull(PropertySlotInput),
      },

      //check user exists, street length not empty, not longer than 200, zip code lengt, city, enumsn nullable in db? rules
      async resolve(_root, args, ctx) {
        if (isValidListStrings(args.rules, 60)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "rules You have used special Characters or reach the max length of 60 characters"
          }}}
        if (isValidListStrings(args.facilities, 60)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "facilities You have used special Characters or reach the max length of 60 characters"
          }}}
        if (isValidStrings(args.title, 60)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "title You have used special Characters or reach the max length of 60 characters"
          }}}
        if (isValidStrings(args.street, 60)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "street You have used special Characters or reach the max length of 60 characters"
          }}}
        if (isValidStrings(args.city, 60)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "city You have used special Characters or reach the max length of 60 characters"
          }}}
        if (isValidStrings(args.description, 100)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "description You have used special Characters or reach the max length of 60 characters"
          }}}
        if (isValidNumbers(args.zip, 6)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "zip Reach the max length of 6 characters or not filled anything in"
          }}}
        if (isValidNumbers(args.hourlyPrice, 5)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "hourlyPrice Reach the max length of 5 characters or not filled anything in"
        }}}
        if (isValidNumbers(args.serviceFee, 3)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "serviceFee Reach the max length of 3 characters or not filled anything in"
        }}}
        if (isValidNumbers(args.deposit, 3)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "deposit Reach the max length of 3 characters or not filled anything in"
        }}}
        if (isValidNumbers(args.streetNumber, 5)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "streetNumber Reach the max length of 5 characters or not filled anything in"
        }}}
        if (isValidNumbers(args.size, 10)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "size Reach the max length of 10 characters or not filled anything in"
        }}}
        if (isValidStrings(args.ownerId, 600)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "ownerId Reach the max length of 600 characters or not filled anything in"
        }}}
        /*Images are just string IDs*/
        if (isValidListStrings(args.images, 200)) {
          return { ClientErrorInvalidPropertyInput: {
            message: "images Reach the max length of 600 characters or not filled anything in"
        }}}
        // if () {
        //   return { ClientErrorInvalidPropertyInput: {
        //     message: "availabilities object has reached the max length of characters"
        // }}}
        console.log(isVaildObjectAvailabilitiesObject(args.availabilities))
        //console.log(isVaildObject(args.availabilities))
        //console.log(args.availabilities)

        function findUser() {
          return ctx.prisma.user.findUnique({
            where: {
              id: args.ownerId,
            },
          });
        }
        if (!findUser()) {
          return {
            ClientErrorUserNotExists: {
              message: `owner for ownerId ${args.ownerId} does not exist`,
            },
          };
        }
        const invalidInputLengthError = (inputType: string, arg: string) => {
          return {
            ClientErrorInvalidPropertyInput: {
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
        function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
          return value !== null && value !== undefined;
        }
        try {
          const slots: { startTime: string; endTime: string; weekday: string }[] =
            args.availabilities.genericDaySlots.filter(notEmpty);

          const prop = await ctx.prisma.property.create({
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
              availabilities: {
                create: {
                  endDate: args.availabilities.endDate,
                  startDate: args.availabilities.startDate,
                  frequency: args.availabilities.frequency,
                  minMonths: args.availabilities.minMonths,
                  availableDays: {
                    createMany: {
                      data: slots,
                    },
                  },
                },
              },
            },
          });
          return { Property: prop };
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

function createHandle(title: String): string {
  const id = uuidv4().substring(0, 6);
  // TODO remove multiple spaces
  const titleFormatted = title.toLowerCase().trim().split(' ').join('_');
  return `${titleFormatted}_${id}`;
}
