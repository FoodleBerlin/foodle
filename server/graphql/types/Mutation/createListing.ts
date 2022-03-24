
import { Context } from '../../../context';
import { extendType, objectType, nonNull, intArg, stringArg, booleanArg, nullable, list } from 'nexus';
import {
  ClientErrorUserNotExists,
  ClientErrorInvalidHandle,
  ClientErrorInvalidPropertyInput,
  UnknownError,
} from '../Error';
import {PropertySlotInput } from '../PropertySlot';

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
        availabilities: nonNull(PropertySlotInput)
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
        const invalidInputLengthError = (inputType:string, arg: string) =>{
          return {
            ClientErrorInvalidPropertyInput: {
              message: `${inputType} ${arg} is invalid, must have a max length of 5`,
            },
          };
        }
        const isOverMaxLength = (str: string, maxLength: number)=>{
          return str.length > maxLength;
        }
        if (isOverMaxLength(args.zip.toString(), 5)) {
          return invalidInputLengthError("Zip code", args.zip.toString())
        }
        if (isOverMaxLength(args.city, 200)) {
          return invalidInputLengthError("City name", args.city);
        }
        if (isOverMaxLength(args.street, 200)) {
          return invalidInputLengthError("Street name", args.street);
        }
        if (isOverMaxLength(args.description, 1000)) {
          return invalidInputLengthError("Description", args.description);
        }
        function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}
        try {
        const slots :{startTime:string, endTime:string, weekday: string   }[]= args.availabilities.genericDaySlots.filter(notEmpty);
        

          const prop = await ctx.prisma.property.create({ data: {size: args.size,
          ownerId: args.ownerId,
          street: args.street,
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
          partialSpace:args.partialSpace,
          pickup:args.pickup ?? false,
          availabilities: {create: 
            {endDate: args.availabilities.endDate,
            startDate: args.availabilities.startDate,
            frequency: args.availabilities.frequency,
            minMonths: args.availabilities.minMonths,
            availableDays:{ createMany:{
            data: slots
            }}
          }},

        } });
          return { Property: prop };
        } catch (error) {
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