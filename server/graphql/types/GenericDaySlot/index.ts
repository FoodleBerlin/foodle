import { inputObjectType, objectType } from 'nexus';
import { BookingSlot, PropertySlot } from '..';

export const GenericDaySlot = objectType({
  name: 'GenericDaySlot',
  definition(t) {
    t.string('id');
    t.field('startTime', {
      type: 'DateTime',
    });
    t.field('endTime', {
      type: 'DateTime',
    });
    t.string('weekday');
    t.nullable.field('propertySlot', {
      type: PropertySlot,
      async resolve(parent, args, ctx) {
        return null;
        // return await ctx.prisma.propertySlot.findUnique({
        //   where: {
        //     id: parent.propertySlotId,
        //   },
        // });
      },
    });
    // t.nullable.list.field('bookingSlot', {
    //   type: BookingSlot || null,
    //   async resolve(parent, args, ctx) {
    //     return await ctx.prisma.bookingSlot.findMany({
    //       where: {
    //         id: parent.bookingSlotId ?? null,
    //       },
    //     });
    //   },
    // })
  },
});

export const GenericDaySlotInput = inputObjectType({
  name: 'GenericDaySlotInput',
  description: 'GenericDaySlot input',
  definition(t) {
    t.nonNull.field('startTime', { type: 'DateTime' });
    t.nonNull.field('endTime', { type: 'DateTime' });
    t.nonNull.string('weekday');
  },
});
