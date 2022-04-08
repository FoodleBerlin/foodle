/*
  Warnings:

  - You are about to drop the column `weekday` on the `BookingSlot` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');

-- AlterTable
ALTER TABLE "BookingSlot" DROP COLUMN "weekday",
ADD COLUMN     "weekdays" "WeekDay"[];

-- AlterTable
ALTER TABLE "PropertySlot" ADD COLUMN     "weekdays" "WeekDay"[];
