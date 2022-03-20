import { objectType } from 'nexus';
import { Context } from '~/server/context';
import { BookingSlot } from '../BookingSlot';
import { PropertySlot } from '../PropertySlot';

export const GenericDaySlot = objectType({
  name: 'GenericDaySlot',
  definition(s) {
    s.string('id');
    s.string('startTime');
    s.string('endTime');
    s.string('weekday');
    s.field('propertySlot', {
      type: PropertySlot,
      async resolve(parent, args, ctx: Context) {
        const propertySlot = await ctx.prisma.propertySlot.findUnique({
          where: {
            id: parent.propertySlotId,
          },
        });
        if (propertySlot === null) {
          throw Error(`Error fetching fetching propertySlot for genericDaySlot with id ${parent.id} `);
        }
        return propertySlot;
      },
    }),
      s.field('bookingSlot', {
        type: BookingSlot,
        async resolve(parent, args, ctx: Context) {
          const bookingSlot = await ctx.prisma.bookingSlot.findUnique({
            where: {
              id: parent.bookingSlotId,
            },
          });
          if (bookingSlot === null) {
            throw Error(`Error fetching fetching bookingSlot for genericDaySlot with id ${parent.id} `);
          }
          return bookingSlot;
        },
      });
  },
});
