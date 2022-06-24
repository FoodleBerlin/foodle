import { objectType } from 'nexus';
import { DaySlot } from '../DaySlot/Objects';
import { BookingStatusEnum, FrequencyEnum } from '../EnumsScalars/Enums';
import { Property } from '../Property';

export const Booking = objectType({
  name: 'Booking',
  definition(t) {
    t.string('id');
    t.field('tenant', {
      type: 'User',
      async resolve(parent, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: parent.tenantId,
          },
        });
        if (user !== null) {
          return user;
        } else {
          throw Error('Error when fetching property.');
        }
      },
    });
    t.field('property', {
      type: Property,
      async resolve(parent, args, ctx) {
        const prop = await ctx.prisma.property.findUnique({
          where: {
            id: parent.propertyId,
          },
        });
        if (prop !== null) {
          return prop;
        } else {
          throw Error('Error when fetching property.');
        }
      },
    });
    t.list.field('daySlots', {
      type: DaySlot,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.daySlot.findMany({
          where: {
            bookingId: parent.propertyId,
          },
        });
      },
    });
    t.field('bookingStatus', { type: BookingStatusEnum });
    t.field('frequency', { type: FrequencyEnum });
    t.float('totalPrice');
    t.string('startDate');
    t.string('endDate');
  },
});
