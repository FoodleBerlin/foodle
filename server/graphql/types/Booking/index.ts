import { extendType, intArg, nonNull, nullable, objectType, stringArg } from 'nexus';
import { BookingSlot } from '../BookingSlot';
import { Property } from '../Property';
import { User } from '../User';
import { ClientErrorPropertyNotExists, ClientErrorUserNotExists, UnknownError } from '../Error';
import { FrequencyEnum } from '../EnumTypes/FrequencyEnum';
import { BookingStatusEnum } from '../EnumTypes/BookingStatusEnum';
import { Context } from '~/server/context';

export const Booking = objectType({
  name: 'Booking',
  definition(b) {
    b.string('id');
    b.string('kind');
    b.field('tenant', {
      type: User,
      async resolve(parent, args, ctx: Context) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: parent.tenantId,
          },
        });
        if (user === null) {
          throw Error(
            `Error fetching fetching user with id ${parent.tenantId} when creating booking with id ${parent.id} `
          );
        } else {
          return user;
        }
      },
    });
    b.field('property', {
      type: Property,
      async resolve(parent, args, ctx: Context) {
        let prop = await ctx.prisma.property.findUnique({
          where: {
            id: parent.propertyId,
          },
        });
        if (prop === null) {
          throw Error(
            `Error fetching fetching property with id ${parent.propertyId} for when creating booking with id ${parent.id} `
          );
        }
        return prop;
      },
    });
    b.int('totalPrice');
    b.string('startDate');
    b.string('endDate');
    b.list.field('bookingSlot', {
      type: BookingSlot,
      async resolve(parent, args, ctx: Context) {
        return await ctx.prisma.bookingSlot.findMany({
          where: {
            bookingId: parent.id,
          },
        });
      },
    });
    b.field('frequency', {
      type: FrequencyEnum,
    });
    b.field('bookingStatus', {
      type: BookingStatusEnum,
    });
  },
});

export const CreateBookingReturn = objectType({
  name: 'createBookingReturn',
  definition(t) {
    t.nullable.field('Booking', { type: Booking });
    t.nullable.field('UnknownError', {
      type: UnknownError,
    });
    t.nullable.field('ClientErrorUserNotExists', {
      type: ClientErrorUserNotExists,
    });
    t.nullable.field('ClientErrorPropertyNotExists', {
      type: ClientErrorPropertyNotExists,
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
        bookingstatus: nonNull(BookingStatusEnum),
        startDate: nonNull(stringArg()),
        endDate: nonNull(stringArg()),
        tenantHandle: nonNull(stringArg()),
        frequency: nonNull(FrequencyEnum),
      },
      async resolve(_, args, ctx: Context) {
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
              bookingStatus: args.bookingstatus,
              totalPrice: args.totalPrice ?? 0,
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
