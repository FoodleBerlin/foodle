import { objectType } from 'nexus';
import { Context } from '~/server/context';
import { Booking } from '../Booking';
import { FrequencyEnum } from '../EnumTypes/FrequencyEnum';
import { GenericDaySlot } from '../GenericDaySlot';

export const BookingSlot = objectType({
  name: 'BookingSlot',
  definition(s) {
    s.string('id');
    s.string('startDate');
    s.string('endDate');
    s.string('repeats');
    s.string('bookingId');
    s.field('frequency', {
      type: FrequencyEnum,
    });
    s.list.field('genericDaySlot', {
      type: GenericDaySlot,
      async resolve(parent, args, ctx: Context) {
        return await ctx.prisma.genericDaySlot.findMany({
          where: {
            bookingSlotId: parent.id,
          },
        });
      },
    });
    s.field('booking', {
      type: Booking,
      async resolve(parent, args, ctx: Context) {
        const booking = await ctx.prisma.booking.findUnique({
          where: {
            id: parent.bookingId,
          },
        });
        if (booking === null) {
          throw Error(`Error fetching fetching booking with for bookingSlot with id ${parent.id} `);
        }
        return booking;
      },
    });
  },
});
