import { Context } from '../../../context';
import { extendType, objectType, stringArg } from 'nexus';
import { ClientErrorInvalidHandle, UnknownError, ClientErrorPropertyNotExists } from '../Error';
import { User } from '../User';
import { Booking } from '../Booking';
import { PropertySlot } from '../PropertySlot';
import { Frequency } from '..';

export const Property = objectType({
  name: 'Property',
  definition(p) {
    p.string('kind');
    p.string('handle');
    p.string('title');
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
    p.int('minimumBookings');
    p.nonNull.list.field('availableDays', {
      type: PropertySlot,
      async resolve(parent, args, ctx: Context) {
        return await ctx.prisma.propertySlot.findMany({
          where: {
            propertyId: parent.id,
          },
          include: {
            bookingSlot: true,
            property: true,
          },
        });
      },
    });
    p.field('frequency', { type: Frequency });
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
      args: { handle: stringArg() },
      resolve: async (_, args, ctx: Context) => {
        if (!args.handle) {
          return {
            ClientErrorInvalidHandle: {
              message: 'handle can not be null',
            },
          };
        } else {
          try {
            const property = await ctx.prisma.property.findUnique({
              where: {
                id: args.handle,
              },
            });
            if (property) {
              return { Property: property };
            } else {
              return {
                ClientErrorPropertyNotExists: {
                  message: `no property exists with handle ${args.handle}`,
                },
              };
            }
          } catch (e) {
            return {
              ClientErrorPropertyNotExists: {
                message: `no property exists with handle ${args.handle}`,
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
