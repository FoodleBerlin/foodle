/*
  Warnings:

  - You are about to drop the column `repeats` on the `BookingSlot` table. All the data in the column will be lost.
  - You are about to drop the column `minStayHours` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `minStayWeeks` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `minimumMonth` on the `PropertySlot` table. All the data in the column will be lost.
  - You are about to drop the column `repeats` on the `PropertySlot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookingSlot" DROP COLUMN "repeats";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "minStayHours",
DROP COLUMN "minStayWeeks";

-- AlterTable
ALTER TABLE "PropertySlot" DROP COLUMN "minimumMonth",
DROP COLUMN "repeats",
ADD COLUMN     "minMonths" INTEGER NOT NULL DEFAULT 0;
