/*
  Warnings:

  - Added the required column `ref` to the `Nft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nft" ADD COLUMN     "ref" TEXT NOT NULL;
