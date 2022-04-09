import { objectType } from 'nexus';
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

// Todo: date input with scalar => remove parsing to momentDate
// Todo: extend PropertySlot object
// Todo: logging statements?
