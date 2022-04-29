import { extendType, stringArg } from "nexus";
import { Context } from "../../../context";

export const Query = extendType({
  type: "Query",
  definition(t) {
    t.field("findUser", {
      type: "findUserResult",
      description: "Takes a handle and returns the user",
      args: { handle: stringArg() },
      resolve: async (_, args, ctx: Context) => {
        if (!args.handle) {
          return {
            ClientErrorInvalidHandle: {
              message: "handle is invalid",
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
                  message: "no user exists with this handle",
                },
              };
            }
          } catch (e) {
            return {
              ClientErrorUserNotExists: {
                message: "no user exists with this handle",
              },
            };
          }
        }
      },
    });
  },
});