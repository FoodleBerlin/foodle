import { booleanArg, extendType, intArg, list, nonNull, nullable, objectType, stringArg } from 'nexus';
import { v4 as uuidv4 } from 'uuid';
import {
  ClientErrorInvalidInput,
  ClientErrorInvalidPropertyInput,
  ClientErrorUserNotExists,
  UnknownError,
} from '../Error';
import { SlotInput } from '../PropertySlot';
import { Property } from './Objects';

export const CreatePropertyReturn = objectType({
  name: 'CreatePropertyReturn',
  definition(t) {
    t.nullable.field('Property', { type: Property });
    t.nullable.field('ClientErrorUserNotExists', {
      type: ClientErrorUserNotExists,
    });
    t.nullable.field('ClientErrorInvalidInput', {
      type: ClientErrorInvalidInput,
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
      type: CreatePropertyReturn, // needs to be changed
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
        availabilities: SlotInput,
      },

      //check user exists, street length not empty, not longer than 200, zip code lengt, city, enumsn nullable in db? rules
      async resolve(_root, args, ctx) {
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
              // TODO create an array
              /*     availableDays: {
                create: {
                  endTime: args.availabilities.endDate,
                  startTime: args.availabilities.startDate,
                  weekday: args.availabilities.weekday,
                },
              }, */
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
