/*
  Warnings:

  - You are about to drop the column `ref` on the `Nft` table. All the data in the column will be lost.
  - Added the required column `dbRef` to the `Nft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nft" DROP COLUMN "ref",
ADD COLUMN     "dbRef" TEXT NOT NULL;
