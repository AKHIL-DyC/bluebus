/*
  Warnings:

  - The `setno` column on the `Resevation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Resevation" DROP COLUMN "setno",
ADD COLUMN     "setno" INTEGER[];
