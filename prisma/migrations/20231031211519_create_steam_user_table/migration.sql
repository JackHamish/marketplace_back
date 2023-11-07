-- CreateTable
CREATE TABLE "SteamUser" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "steamid" TEXT NOT NULL,
    "communityvisibilitystate" INTEGER NOT NULL,
    "profilestate" INTEGER NOT NULL,
    "personaname" TEXT NOT NULL,
    "profileurl" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "avatarmedium" TEXT NOT NULL,
    "avatarfull" TEXT NOT NULL,
    "avatarhash" TEXT NOT NULL,
    "lastlogoff" INTEGER NOT NULL,
    "personastate" INTEGER NOT NULL,
    "realname" TEXT NOT NULL,
    "primaryclanid" TEXT NOT NULL,
    "timecreated" INTEGER NOT NULL,
    "personastateflags" INTEGER NOT NULL,

    CONSTRAINT "SteamUser_pkey" PRIMARY KEY ("id")
);
