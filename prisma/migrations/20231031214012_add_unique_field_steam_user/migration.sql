/*
  Warnings:

  - A unique constraint covering the columns `[steamid]` on the table `SteamUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SteamUser_steamid_key" ON "SteamUser"("steamid");
