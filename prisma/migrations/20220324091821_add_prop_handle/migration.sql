/*
  Warnings:

  - A unique constraint covering the columns `[handle]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `handle` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "handle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_handle_key" ON "Property"("handle");
