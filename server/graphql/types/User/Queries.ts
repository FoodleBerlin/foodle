import { extendType, objectType, stringArg } from 'nexus';
import { Context } from '../../../context';
import { ClientErrorInvalidHandle, ClientErrorInvalidInput, ClientErrorUserNotExists, UnknownError } from '../Error';

/**
 * Example apollo studio query
 * query Query($handle: String!) {
 *  findUser(handle: $handle) {
 *    User {
 *      id
 *      email
 *      handle
 *      fullName
 *      zip
 *    }
 *    ClientErrorUserNotExists {
 *      message
 *    }
 *    ClientErrorInvalidHandle {
 *      message
 *    }
 *  }
 *}
 **/

export const findUserResult = objectType({
  name: 'findUserResult',
  definition(t) {
    t.nullable.field('User', { type: 'User' });
    t.nullable.field('ClientErrorUserNotExists', {
      type: ClientErrorUserNotExists,
    });
    t.nullable.field('ClientErrorInvalidInput', {
      type: ClientErrorInvalidInput,
    });
    t.nullable.field('ClientErrorInvalidHandle', {
      type: ClientErrorInvalidHandle,
    });
    t.nullable.field('UnknownError', {
      type: UnknownError,
    });
  },
});

export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.field('findUser', {
      type: 'findUserResult',
      description: 'Takes a handle and returns the user. ',
      args: { handle: stringArg() },
      resolve: async (_, args, ctx: Context) => {
        if (!args.handle) {
          return {
            ClientErrorInvalidHandle: {
              message: 'handle is invalid',
            },
          };
        } else {
          // TODO validate handle
          try {
            const user = await ctx.prisma.user.findUnique({
              where: {
                handle: args.handle,
              },
            });
            if (user) {
              return { User: user };
            } else {
              return {
                ClientErrorUserNotExists: {
                  message: 'no user exists with this handle',
                },
              };
            }
          } catch (e) {
            return {
              ClientErrorUserNotExists: {
                message: 'no user exists with this handle',
              },
            };
          }
        }
      },
    });
  },
});
