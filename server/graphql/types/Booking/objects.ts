import { objectType } from 'nexus';
import { DaySlot } from '../DaySlot/objects';
import { BookingStatusEnum, FrequencyEnum } from '../EnumsScalars/Enums';
import { Property } from '../Property';

export const Booking = objectType({
  name: 'Booking',
  definition(t) {
    t.string('id');
    t.nullable.field('tenant', {
      type: 'User',
      async resolve(parent, args, ctx) {
        return await ctx.prisma.user.findUnique({
          where: {
            id: parent.tenantId,
          },
        });
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
