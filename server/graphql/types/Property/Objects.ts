import { WeekDay } from '@prisma/client';
import moment from 'moment';
import { inputObjectType, objectType } from 'nexus';
import { Booking } from '../Booking';
import { WeekDayEnum } from '../EnumsScalars/Enums';
import { PropertySlot } from '../PropertySlot';

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
    p.list.field('availabilites', {
      type: PropertySlot,
      async resolve(parent, args, ctx) {
        return await ctx.prisma.propertySlot.findMany({
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
    p.int('deposit');
    p.list.string('images');
    p.boolean('partialSpace');
    p.boolean('isVerified');
    p.int('hourlyPrice');
    p.int('serviceFee');
    p.list.string('rules');
  },
});

export const AvailableDay = inputObjectType({
  name: 'AvailableDay',
  definition(t) {
    t.nonNull.string('endTime');
    t.nonNull.string('startTime');
    t.nonNull.field('weekday', { type: WeekDayEnum });
  },
});

export interface AvailableDayInterface {
  endTime: moment.Moment;
  startTime: moment.Moment;
  weekday: WeekDay;
}

export interface DaySlotInterface {
  date: moment.Moment;
  startTime: string; // Todo should also be moment.Moment
  endTime: string;
}
