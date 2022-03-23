
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
import { PropertySlot, PropertySlotInput } from '../PropertySlot';

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
    p.nullable.boolean('pickup');
    p.list.string('facilities');
    p.int('deposit');
    p.list.string('images');
    p.boolean('partialSpace');
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
