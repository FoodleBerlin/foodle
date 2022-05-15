import { objectType } from 'nexus';
import { Booking } from '../Booking';
import { Property } from '../Property';

export const DaySlot = objectType({
  name: 'DaySlot',
  definition(t) {
    t.field('startTime', {
      type: 'DateTime',
    });
    t.field('endTime', {
      type: 'DateTime',
    });
    t.nullable.field('bookedStartTime', {
      type: 'DateTime',
      resolve(parent, args, ctx) {
        if (parent.bookedEndTime == null) {
          return null;
        } else {
          return parent.bookedEndTime;
        }
      },
    });
    t.nullable.field('bookedStartTime', {
      type: 'DateTime',
      resolve(parent, args, ctx) {
        if (parent.bookedEndTime == null) {
          return null;
        } else {
          return parent.bookedEndTime;
        }
      },
    });
    t.nullable.field('property', {
      type: Property,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.property.findUnique({
          where: {
            id: parent.propertyId,
          },
        });
      },
    });
    t.nullable.field('booking', {
      type: Booking,
      async resolve(parent, args, ctx) {
        if (parent.bookingId !== null) {
          return await ctx.prisma.booking.findUnique({
            where: {
              id: parent.bookingId,
            },
          });
        }
        return null;
      },
    });
  },
});
