import moment from 'moment';
import { inputObjectType, objectType } from 'nexus';
import { Booking } from '../Booking';
import { DaySlot } from '../DaySlot/Objects';
import { FrequencyEnum } from '../EnumsScalars/Enums';

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
    p.list.field('daySlots', {
      type: DaySlot,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.daySlot.findMany({
          where: {
            propertyId: parent.id,
          },
        });
      },
    });
    p.string('street');
    p.string('streetNumber');
    p.int('zip');
    p.string('city');
    p.string('description');
    p.nullable.boolean('pickup');
    p.int('deposit');
    p.list.string('images');
    p.boolean('partialSpace');
    p.boolean('isVerified');
    p.int('hourlyPrice');
    p.int('serviceFee');
    p.list.string('rules');
    p.list.string('facilities');
    p.field('frequency', { type: FrequencyEnum });
    p.string('startDate');
    p.string('endDate');
  },
});

export const AvailableDay = inputObjectType({
  name: 'AvailableDay',
  definition(t) {
    t.nonNull.field('startTime', {
      type: 'DateTime',
    });
    t.nonNull.field('endTime', {
      type: 'DateTime',
    });
  },
});

export interface AvailableDayInterface {
  endTime: moment.Moment;
  startTime: moment.Moment;
}

export interface DaySlotInterface {
  startTime: moment.Moment;
  endTime: moment.Moment;
  daySlotId?: string;
}
