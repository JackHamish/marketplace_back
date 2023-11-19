-- CreateTable
CREATE TABLE "Notifications" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "created_by" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notificationTokenId" UUID NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationToken" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deviceType" TEXT NOT NULL,
    "notificationToken" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "userId" UUID NOT NULL,

    CONSTRAINT "NotificationToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_notificationTokenId_fkey" FOREIGN KEY ("notificationTokenId") REFERENCES "NotificationToken"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationToken" ADD CONSTRAINT "NotificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
