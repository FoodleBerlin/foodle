import { objectType } from 'nexus';
import { Frequency, PropertySlot } from '..';
import { Context } from '../../../context';
import { Booking } from '../Booking';
import { User } from '../User';

export const Property = objectType({
  name: 'Property',
  definition(p) {
    p.string('kind');
    p.string('handle');
    p.string('title');
    p.int('size');
    p.nullable.field('owner', {
      type: User,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.user.findUnique({
          where: {
            id: parent.ownerId,
          },
        });
      },
    });
    p.list.field('bookings', {
      type: Booking,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.booking.findMany({
          where: {
            propertyId: parent.id,
          },
        });
      },
    });
    p.string('street');
    p.int('streetNumber');
    p.int('zip');
    p.string('city');
    p.string('description');
    p.nullable.boolean('pickup');
    p.list.string('facilities');
    p.int('deposit');
    p.list.string('images');
    p.boolean('partialSpace');
    p.boolean('isVerified');
    p.int('hourlyPrice');
    p.int('serviceFee');
    p.list.string('rules');
    p.int('minimumBookings');
    p.nonNull.list.field('availableDays', {
      type: PropertySlot,
      async resolve(parent, args, ctx: Context) {
        return await ctx.prisma.propertySlot.findMany({
          where: {
            propertyId: parent.id,
          },
          include: {
            bookingSlot: true,
            property: true,
          },
        });
      },
    });
    p.field('frequency', { type: Frequency });
  },
});
