import { inputObjectType, objectType } from 'nexus';
import { DaySlot } from '../DaySlot';

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
    t.list.field('availableDays', {
      type: DaySlot,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.daySlot.findMany({
          where: {
            propertySlotId: parent.id,
          },
        });
      },
    });
  },
});

export const SlotInput = inputObjectType({
  name: 'PropertySlotInput',
  description: 'PropertySlot input',
  definition(t) {
    t.nonNull.field('startDate', { type: 'DateTime' });
    t.nonNull.field('endDate', { type: 'DateTime' });
    t.nonNull.string('weekday');
  },
});
