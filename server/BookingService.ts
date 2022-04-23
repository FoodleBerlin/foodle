/* import { Context } from '@apollo/client';
import { Booking, BookingStatus, Frequency } from '@prisma/client';

export function findDaySlots() {}

export function mapRequestedSlotsToExistingSlots() {}

export async function createBooking(
  ctx: Context,
  userId: string,
  propertyId: string,
  price: number,
  startDate: Date,
  endDate: Date,
  frequency: Frequency
): Booking {
  return await ctx.prisma.booking.create({
    data: {
      tenantId: userId,
      propertyId: propertyId,
      bookingStatus: BookingStatus.pending,
      totalPrice: price,
      startDate: startDate,
      endDate: endDate,
      frequency: frequency,
    },
  });
}
 */
