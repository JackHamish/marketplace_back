/*
  Warnings:

  - You are about to drop the `Notifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_notificationTokenId_fkey";

-- DropTable
DROP TABLE "Notifications";

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "created_by" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notificationTokenId" UUID NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_notificationTokenId_fkey" FOREIGN KEY ("notificationTokenId") REFERENCES "NotificationToken"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
