import { objectType } from 'nexus';

export const DaySlot = objectType({
  name: 'DaySlot',
  definition(t) {
    t.field('date', {
      type: 'DateTime',
    });
    t.string('duration');
    // Todo
    /*     t.nullable.string('bookedStartTime');
    t.nullable.string('bookedEndTime'); */
    /*  t.field('propertySlot', {
      type: PropertySlot,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.propertySlot.findUnique({
          where: {
            id: parent.propertySlotId,
          },
        });
      },
    }); */
    /* t.field('booking', {
      type: Booking,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.booking.findUnique({
          where: {
            id: parent.bookingId,
          },
        });
      },
    }); */
  },
});
