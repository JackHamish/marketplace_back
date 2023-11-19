/*
  Warnings:

  - The `status` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `NotificationToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `deviceType` on the `NotificationToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationDeviceType" AS ENUM ('Web', 'Mobile');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('ACTIVE', 'EXPIRED');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "status",
ADD COLUMN     "status" "NotificationStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "NotificationToken" DROP COLUMN "deviceType",
ADD COLUMN     "deviceType" "NotificationDeviceType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "NotificationStatus" NOT NULL DEFAULT 'ACTIVE';
