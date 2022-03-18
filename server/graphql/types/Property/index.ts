
import { Context } from '../../../context';
import { extendType, objectType, nonNull, intArg, stringArg, booleanArg, nullable, list } from 'nexus';
import {
  ClientErrorUserNotExists,
  ClientErrorInvalidHandle,
  ClientErrorInvalidPropertyInput,
  UnknownError,
  ClientErrorPropertyNotExists,
} from '../Error';
import { User } from '../User';
import { Booking } from '../Booking';
import { PropertySlot } from '../PropertySlot';

export const Property = objectType({
  name: 'Property',
  definition(p) {
    p.int('size');
    p.nullable.field('owner', {
      type: User,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.user.findUnique({
          where: {
            id: parent.ownerId,
          },
        });
      },
    });
    p.string('kind');
    p.list.field('bookings', {
      type: Booking,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.booking.findMany({
          where: {
            propertyId: parent.id,
          },
        });
      },
    });
    p.string('street');
    p.int('streetNumber');
    p.int('zip');
    p.string('city');
    p.string('description');
    p.boolean('pickup');
    p.list.string('facilities');
    p.int('deposit');
    p.list.string('images');
    p.boolean('partialSpace');
    p.int('minStayHours');
    p.int('minStayWeeks');
    p.boolean('isVerified');
    p.int('hourlyPrice');
    p.int('serviceFee');
    p.list.string('rules');
    p.nullable.field('availabilities', {
      type: PropertySlot,
      async resolve(parent, args, ctx: Context) {
        const slot = await ctx.prisma.propertySlot.findUnique({
          where: {
            propertyId: parent.id,
          },
        });
        if (slot) {
          return slot;
        } else {
          return null;
        }
      },
    });
  },
});

export const FindPropertyResult = objectType({
  name: 'findPropertyResult',
  definition(t) {
    t.nullable.field('Property', { type: 'Property' });
    t.nullable.field('ClientErrorPropertyNotExists', {
      type: ClientErrorPropertyNotExists,
    });
    t.nullable.field('ClientErrorInvalidHandle', {
      type: ClientErrorInvalidHandle,
    });
  },
});

export const FindPropertyById = extendType({
  type: 'Query',
  definition(t) {
    t.field('findProperty', {
      type: FindPropertyResult,
      description: 'Takes a propertyId and returns the property',
      args: { id: stringArg() },
      resolve: async (_, args, ctx: Context) => {
        console.log(!args.id);
        if (!args.id) {
          return {
            ClientErrorInvalidHandle: {
              message: 'id can not be null',
            },
          };
        } else {
          try {
            const property = await ctx.prisma.property.findUnique({
              where: {
                id: args.id,
              },
            });
            if (property) {
              return { Property: property };
            } else {
              return {
                ClientErrorPropertyNotExists: {
                  message: `no property exists with id ${args.id}`,
                },
              };
            }
          } catch (e) {
            return {
              ClientErrorPropertyNotExists: {
                message: `no property exists with id ${args.id}`,
              },
            };
          }
        }
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
        minStayHours: nonNull(intArg()),
        minStayWeeks: nonNull(intArg()),
      },

      //check user exists, street length not empty, not longer than 200, zip code lengt, city, enumsn nullable in db? rules
      resolve(_root, args, ctx) {
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
        const newProperty = {
          size: args.size,
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
          minStayHours: args.minStayHours,
          minStayWeeks: args.minStayWeeks
        };
        try {
          const prop = ctx.prisma.property.create({ data: newProperty });
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

export const findAllPropertiesReturn = objectType({
  name: 'findAllPropertiesReturn',
  definition(t) {
    t.nullable.list.field('Properties', {
      type: Property,
    });
    t.nullable.field('UnknownError', {
      type: UnknownError,
    });
  },
});

export const findAllProperties = extendType({
  type: 'Query',
  definition(t) {
    t.field('findAllProperties', {
      type: findAllPropertiesReturn,
      resolve: async (_, args, ctx: Context) => {
        try {
          let properties = await ctx.prisma.property.findMany();
          return { Properties: properties };
        } catch (e) {
          return {
            UnknownError: {
              message: 'Erorr fetching properties from database',
            },
          };
        }
      },
    });
  },
});
