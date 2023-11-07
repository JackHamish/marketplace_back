/*
  Warnings:

  - The primary key for the `SteamUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatarfull` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `avatarhash` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `avatarmedium` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `communityvisibilitystate` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `lastlogoff` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `personastate` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `personastateflags` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `primaryclanid` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `profilestate` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `realname` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `timecreated` on the `SteamUser` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `SteamUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `SteamUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `SteamUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SteamUser" DROP CONSTRAINT "SteamUser_pkey",
DROP COLUMN "avatarfull",
DROP COLUMN "avatarhash",
DROP COLUMN "avatarmedium",
DROP COLUMN "communityvisibilitystate",
DROP COLUMN "created_at",
DROP COLUMN "id",
DROP COLUMN "lastlogoff",
DROP COLUMN "personastate",
DROP COLUMN "personastateflags",
DROP COLUMN "primaryclanid",
DROP COLUMN "profilestate",
DROP COLUMN "realname",
DROP COLUMN "timecreated",
DROP COLUMN "updated_at",
ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SteamUser_userId_key" ON "SteamUser"("userId");

-- AddForeignKey
ALTER TABLE "SteamUser" ADD CONSTRAINT "SteamUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
