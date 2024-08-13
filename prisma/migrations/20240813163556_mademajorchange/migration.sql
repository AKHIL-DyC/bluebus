-- CreateTable
CREATE TABLE "BlueBusOwner" (
    "bid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bname" TEXT NOT NULL,
    "regno" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'busowner',

    CONSTRAINT "BlueBusOwner_pkey" PRIMARY KEY ("bid")
);

-- CreateTable
CREATE TABLE "BlueBusRoute" (
    "rid" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "BlueBusRoute_pkey" PRIMARY KEY ("rid")
);

-- CreateTable
CREATE TABLE "Routebus" (
    "id" SERIAL NOT NULL,
    "bid" INTEGER NOT NULL,
    "rid" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "s1" BOOLEAN NOT NULL DEFAULT false,
    "s2" BOOLEAN NOT NULL DEFAULT false,
    "s3" BOOLEAN NOT NULL DEFAULT false,
    "s4" BOOLEAN NOT NULL DEFAULT false,
    "arrivaltime" TIMESTAMP(3) NOT NULL,
    "deptrtime" TIMESTAMP(3) NOT NULL,
    "remaining" INTEGER NOT NULL DEFAULT 40,

    CONSTRAINT "Routebus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resevation" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "bid" INTEGER NOT NULL,
    "rid" INTEGER NOT NULL,
    "sid" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resevation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlueBusOwner_regno_key" ON "BlueBusOwner"("regno");

-- CreateIndex
CREATE UNIQUE INDEX "BlueBusOwner_phone_key" ON "BlueBusOwner"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Routebus_bid_rid_date_key" ON "Routebus"("bid", "rid", "date");

-- AddForeignKey
ALTER TABLE "Routebus" ADD CONSTRAINT "Routebus_bid_fkey" FOREIGN KEY ("bid") REFERENCES "BlueBusOwner"("bid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routebus" ADD CONSTRAINT "Routebus_rid_fkey" FOREIGN KEY ("rid") REFERENCES "BlueBusRoute"("rid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resevation" ADD CONSTRAINT "Resevation_uid_fkey" FOREIGN KEY ("uid") REFERENCES "BlueBusUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resevation" ADD CONSTRAINT "Resevation_bid_rid_date_fkey" FOREIGN KEY ("bid", "rid", "date") REFERENCES "Routebus"("bid", "rid", "date") ON DELETE CASCADE ON UPDATE CASCADE;
