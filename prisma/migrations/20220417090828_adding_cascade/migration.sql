-- DropForeignKey
ALTER TABLE "DaySlot" DROP CONSTRAINT "DaySlot_bookingId_fkey";

-- AddForeignKey
ALTER TABLE "DaySlot" ADD CONSTRAINT "DaySlot_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
