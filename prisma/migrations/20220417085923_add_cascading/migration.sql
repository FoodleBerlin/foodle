/*
  Warnings:

  - The values [biweekly] on the enum `Frequency` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `minimumBookings` on the `PropertySlot` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Frequency_new" AS ENUM ('none', 'weekly', 'monthly');
ALTER TABLE "PropertySlot" ALTER COLUMN "frequency" TYPE "Frequency_new" USING ("frequency"::text::"Frequency_new");
ALTER TABLE "Booking" ALTER COLUMN "frequency" TYPE "Frequency_new" USING ("frequency"::text::"Frequency_new");
ALTER TYPE "Frequency" RENAME TO "Frequency_old";
ALTER TYPE "Frequency_new" RENAME TO "Frequency";
DROP TYPE "Frequency_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "PropertySlot" DROP CONSTRAINT "PropertySlot_propertyId_fkey";

-- AlterTable
ALTER TABLE "PropertySlot" DROP COLUMN "minimumBookings";

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertySlot" ADD CONSTRAINT "PropertySlot_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "The_Date_within_same_PropertySlot_unique_constraint" RENAME TO "date_within_same_propertySlot_unique_constraint";
