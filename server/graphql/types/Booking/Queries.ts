import { extendType, objectType } from 'nexus';
import { Context } from '../../../context';
import { ValidatorService } from '../../../singletons/validatorService';
import { ClientErrorUserNotExists } from '../Error';

export const GetBookingsOfUser = objectType({
  name: 'GetBookingsOfUser',
  definition(t) {
    t.nullable.list.field('Bookings', { type: 'Booking' });
    t.nullable.field('ClientErrorUserNotExists', {
      type: ClientErrorUserNotExists,
    });
  },
});

export const FindBookingsOfUser = extendType({
  type: 'Query',
  definition(t) {
    t.field('findBookingsOfUser', {
      type: GetBookingsOfUser,
      description: 'Takes user handle and returns all bookings of user',
      resolve: async (_, args, ctx: Context) => {
        if (ctx.user?.id == undefined) {
          return {
            ClientErrorUserNotExists: { message: `User needs to log in when requesting bookings.` },
          };
        }
        const user = await ValidatorService.userExists(ctx.user?.id);
        if (user === null) {
          return {
            ClientErrorUserNotExists: { message: `User not found.` },
          };
        } else {
          const bookings = await ctx.prisma.booking.findMany({
            where: {
              tenantId: user.id,
            },
          });
          return { Bookings: bookings };
        }
      },
    });
  },
});
