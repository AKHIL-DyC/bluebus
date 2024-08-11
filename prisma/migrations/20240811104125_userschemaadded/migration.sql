-- CreateTable
CREATE TABLE "BlueBusUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gmail" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "BlueBusUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlueBusUser_gmail_key" ON "BlueBusUser"("gmail");

-- CreateIndex
CREATE UNIQUE INDEX "BlueBusUser_phone_key" ON "BlueBusUser"("phone");
