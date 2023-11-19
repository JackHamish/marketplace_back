/*
  Warnings:

  - A unique constraint covering the columns `[notificationToken]` on the table `NotificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NotificationToken_notificationToken_key" ON "NotificationToken"("notificationToken");
