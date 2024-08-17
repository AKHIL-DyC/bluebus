-- DropForeignKey
ALTER TABLE "Resevation" DROP CONSTRAINT "Resevation_bid_rid_date_fkey";

-- AlterTable
ALTER TABLE "Resevation" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Routebus" ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "arrivaltime" SET DATA TYPE TEXT,
ALTER COLUMN "deptrtime" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Resevation" ADD CONSTRAINT "Resevation_bid_rid_date_fkey" FOREIGN KEY ("bid", "rid", "date") REFERENCES "Routebus"("bid", "rid", "date") ON DELETE CASCADE ON UPDATE CASCADE;
