/*
  Warnings:

  - You are about to drop the column `endTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `weekdays` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "weekdays";

-- AlterTable
ALTER TABLE "DaySlot" ADD COLUMN     "bookedEndTime" TIMESTAMP(3),
ADD COLUMN     "bookedStartTime" TIMESTAMP(3);
