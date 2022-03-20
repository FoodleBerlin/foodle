import { CancellationType } from '@prisma/client';


import { extendType, objectType, nonNull, intArg, stringArg, booleanArg, nullable } from 'nexus';
import {
  ClientErrorUserNotExists,
  ClientErrorInvalidHandle,
  ClientErrorInvalidPropertyInput,
  UnknownError,
  ClientErrorPropertyNotExists,
} from '../Error';
import { User } from '../User';
import { Booking } from '../Booking';
import { Facility } from '../Facility';
import { PropertySlot } from '../PropertySlot';
import { Context } from '~/server/context';

export const Property = objectType({
  name: 'Property',
  definition(p) {
    p.int('size');
    p.nullable.field('owner', {
      type: User,
      async resolve(parent, args, ctx: Context) {
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
    p.list.field('facilities', {
      type: Facility,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.facility.findMany({
          where: {
            propertyId: parent.id,
          },
        });
      },
    });
    p.boolean('isVerified');
    p.int('dailyPrice');
    p.int('serviceFee');
    p.string('cancellationType');
    p.string('thingsToKnow');
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
        //kind: nullable(stringArg()),
        street: nonNull(stringArg()),
        streetNumber: nonNull(intArg()),
        zip: nonNull(intArg()),
        city: nonNull(stringArg()),
        description: nonNull(stringArg()),
        pickup: nonNull(booleanArg()),
        //isVerified: nullable(booleanArg()),
        //dailyPrice: nullable(intArg()),
        //serviceFee: nullable(intArg()),
        thingsToKnow: nonNull(stringArg()),
        rules: nonNull(stringArg()),
        cancellationType: nonNull(stringArg()),
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
        function validateCityStreet(): Boolean {
          if (args.street.length > 200 || args.city.length > 200) {
            return true;
          } else {
            return false;
          }
        }
        function validateZipCode(): Boolean {
          if (args.zip.toString().length > 5) {
            return false;
          } else {
            return true;
          }
        }
        function validateTextLength(): Boolean {
          if (args.description.length > 1000) {
            return false;
          } else {
            return true;
          }
        }
        if (!findUser()) {
          return {
            ClientErrorUserNotExists: {
              message: `owner for ownerId ${args.ownerId} does not exist`,
            },
          };
        }
        if (!validateZipCode) {
          return {
            ClientErrorInvalidPropertyInput: {
              message: `zip code ${args.zip} is invalid, must have a max length of 5`,
            },
          };
        }
        if (validateCityStreet()) {
          return {
            ClientErrorInvalidPropertyInput: {
              message: `city name ${args.city} must not contain numbers and should have a max. length of 200 characters`,
            },
          };
        }
        if (!validateTextLength) {
          return {
            ClientErrorInvalidPropertyInput: {
              message: `description ${args.description} should have a max. length of 1000 characters`,
            },
          };
        }
        if (!validateTextLength) {
          return {
            ClientErrorInvalidPropertyInput: {
              message: `description ${args.description} should have a max. length of 1000 characters`,
            },
          };
        }
        const newProperty = {
          size: args.size,
          ownerId: args.ownerId,
          street: args.street,
          streetNumber: args.streetNumber,
          zip: args.zip,
          city: args.city,
          description: args.description,
          thingsToKnow: args.thingsToKnow,
          rules:["asdf"],
          cancellationType: CancellationType.fullRefundBefore1Week,
          //pickup: true,
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
