/*
  Warnings:

  - Added the required column `setno` to the `Resevation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resevation" ADD COLUMN     "setno" TEXT NOT NULL;
