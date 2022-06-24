import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { Context } from '../../../context';
import { ValidatorService } from '../../../singletons/validatorService';
import { ClientErrorInvalidInput, ClientErrorPropertyNotExists, UnknownError } from '../Error';
import { Property } from './Objects';

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

export const FindPropertyResult = objectType({
  name: 'findPropertyResult',
  definition(t) {
    t.nullable.field('Property', { type: 'Property' });
    t.nullable.field('ClientErrorPropertyNotExists', {
      type: ClientErrorPropertyNotExists,
    });
    t.nullable.field('ClientErrorInvalidInput', {
      type: ClientErrorInvalidInput,
    });
  },
});

export const FindPropertyById = extendType({
  type: 'Query',
  definition(t) {
    t.field('findProperty', {
      type: FindPropertyResult,
      description: 'Takes a propertyId and returns the property',
      args: {
        handle: nonNull(stringArg()),
      },
      resolve: async (_, args, ctx: Context) => {
        const prop = await ValidatorService.propertyExists(args.handle);
        if (prop === null) {
          return {
            ClientErrorPropertyNotExists: {
              message: `No property exists with handle ${args.handle}.`,
            },
          };
        } else {
          return { Property: prop };
        }
      },
    });
  },
});
