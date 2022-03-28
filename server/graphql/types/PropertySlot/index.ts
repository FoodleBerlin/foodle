import { inputObjectType, objectType } from 'nexus';
import { BookingSlot } from '../BookingSlot';

export const PropertySlot = objectType({
  name: 'PropertySlot',
  definition(t) {
    t.field('startDate', {
      type: 'DateTime',
    });
    t.field('endDate', {
      type: 'DateTime',
    });
    t.string('propertyId');
    t.nullable.field('bookingSlot', {
      type: BookingSlot,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.bookingSlot.findUnique({
          where: {
            id: parent.id,
          },
        });
      },
    });
  },
});

export const PropertySlotInput = inputObjectType({
  name: 'PropertySlotInput',
  description: 'PropertySlot input',
  definition(t) {
    t.nonNull.field('startDate', { type: 'DateTime' });
    t.nonNull.field('endDate', { type: 'DateTime' });
    t.nonNull.string('weekday');
  },
});
