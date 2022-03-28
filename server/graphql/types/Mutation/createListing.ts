import { extendType, objectType, nonNull, intArg, stringArg, booleanArg, nullable, list } from 'nexus';
import {
  ClientErrorUserNotExists,
  ClientErrorInvalidHandle,
  ClientErrorInvalidPropertyInput,
  UnknownError,
} from '../Error';
import { v4 as uuidv4 } from 'uuid';
import {notEmpty, checkUserExists, checkinvalidInputLength} from "../../../validation/index";
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
        const isInvalidZipLength = checkinvalidInputLength("Zip code",args.zip.toString(), 5);
        if(isInvalidZipLength) return isInvalidZipLength;
        const isInvalidCityLength = checkinvalidInputLength("City name",args.city, 200);
        if(isInvalidCityLength) return isInvalidCityLength;
        const isInvalidStreetLength = checkinvalidInputLength("Street name", args.street, 200);
        if(isInvalidStreetLength) return isInvalidStreetLength;
        const isInvalidDescriptionLength = checkinvalidInputLength("Description", args.description, 1000);
        if(isInvalidDescriptionLength) return isInvalidDescriptionLength;

        try {
          const prop = await ctx.prisma.property.create({ data: {size: args.size,
          ownerId: args.ownerId,
          handle: createHandle(args.title),
          title:args.title,
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
            data: args.availabilities.availableDays.filter(notEmpty)
            }}
          }},

        } });
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
