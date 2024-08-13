/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `BlueBusOwner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BlueBusOwner_email_key" ON "BlueBusOwner"("email");
