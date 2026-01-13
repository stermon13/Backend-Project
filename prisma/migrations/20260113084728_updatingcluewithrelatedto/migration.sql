/*
  Warnings:

  - Added the required column `relatedTo` to the `Clue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clue" ADD COLUMN     "relatedTo" TEXT NOT NULL;
