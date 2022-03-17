import { enumType, extendType, intArg, nonNull, nullable, objectType, stringArg } from 'nexus';
import { BookingSlot } from '../../BookingSlot';
import { Property } from '../Property';
import { User } from '../User';
import { Context } from '../../../context';
import { ApolloError } from 'apollo-server';
import { UnknownError } from '../Error';
import { resolve } from 'path';
import { BookingStatus, Frequency, User as PrismaUser } from '@prisma/client';

export const Booking = objectType({
  name: 'Booking',
  definition(b) {
    b.string('id');
    b.string('kind');
    b.field('tenant', {
      type: User,
      async resolve(parent, args, ctx) {
        let user;
        try {
          user = await ctx.prisma.user.findUnique({
            where: {
              id: parent.tenantId,
            },
          });
        } catch (e) {
          throw new ApolloError('No tenant found');
        }
        if (user != null) {
          return user;
        } else {
          throw new ApolloError('No tenant found');
        }
      },
    });
    b.field('property', {
      type: Property,
      async resolve(parent, args, ctx) {
        let property;
        property = await ctx.prisma.property.findUnique({
          where: {
            id: parent.propertyId,
          },
        });
        if (property != null) {
          return property;
        } else {
          throw new ApolloError('No tenant found');
        }
      },
    });
    b.string('bookingStatus');
    b.int('totalPrice');
    b.string('startDate');
    b.string('endDate');
    b.list.field('bookingSlot', {
      type: BookingSlot,
      async resolve(parent, args, ctx) {
        return ctx.prisma.bookingSlot.findMany({
          where: {
            bookingId: parent.id,
          },
        });
      },
    });
    b.field('frequency', {
      type: FrequencyApi
    })
  },
});

export const CreateBookingReturn = objectType({
  name: 'createBookingReturn',
  definition(t) {
    t.nullable.field('Booking', { type: Booking });
    t.nullable.field('UnknownError', {
      type: UnknownError,
    });
  },
});

export const CreateBookingForProperty = extendType({
  type: 'Mutation',
  definition(b) {
    b.field('createBooking', {
      type: CreateBookingReturn,
      args: {
        propertyId: nonNull(stringArg()),
        totalPrice: nullable(intArg()),
        //bookingstatus
        startDate: nonNull(stringArg()),
        endDate: nonNull(stringArg()),
        tenantHandle: nonNull(stringArg()),
        //bookingSlot
        frequency: nonNull(FrequencyApi)
      },
      async resolve(_, args, ctx) {
        // TODO: validate input

        const tenant = await ctx.prisma.user.findUnique({
          where: {
            handle: args.tenantHandle,
          },
        });
        if (tenant === null) {
          return {
            ClientErrorUserNotExists: {
              message: `tenant for tenantHandle ${args.tenantHandle} does not exist`,
            },
          };
        }
        const property = await ctx.prisma.property.findUnique({
          where: {
            id: args.propertyId,
          },
        });
        if (property === null) {
          return {
            ClientErrorPropertyNotExists: {
              message: `property for propertyId ${args.propertyId} does not exist`,
            },
          };
        }
        try {
          const savedBooking = ctx.prisma.booking.create({
            data: {
              tenantId: tenant.id,
              propertyId: args.propertyId,
              bookingStatus: BookingStatus.accepted,
              totalPrice: 0, // args.totalPrice,
              startDate: args.startDate,
              endDate: args.endDate,
              frequency: args.frequency,
            },
          });
          return { Booking: savedBooking };
        } catch (error) {
          let errorMessage = 'Unknown error when saving a new booking: ';
          if (error instanceof Error) {
            errorMessage += error.message;
          }
          return {
            UnknownError: {
              message: errorMessage,
            },
          };
        }
      },
    });
  },
});

const FrequencyApi = enumType({
  name: 'Frequency',
  members: {
    NONE: Frequency.none,
    WEEKLY: Frequency.weekly,
    BIWEEKLY: Frequency.biweekly,
    TRIWEEKLY: Frequency.none,
  },
});