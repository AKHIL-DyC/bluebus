/*
  Warnings:

  - You are about to drop the column `bid` on the `Resevation` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Resevation` table. All the data in the column will be lost.
  - You are about to drop the column `rid` on the `Resevation` table. All the data in the column will be lost.
  - You are about to drop the column `sid` on the `Resevation` table. All the data in the column will be lost.
  - Added the required column `rbid` to the `Resevation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Resevation" DROP CONSTRAINT "Resevation_bid_rid_date_fkey";

-- AlterTable
ALTER TABLE "Resevation" DROP COLUMN "bid",
DROP COLUMN "date",
DROP COLUMN "rid",
DROP COLUMN "sid",
ADD COLUMN     "rbid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Resevation" ADD CONSTRAINT "Resevation_rbid_fkey" FOREIGN KEY ("rbid") REFERENCES "Routebus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
