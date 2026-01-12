/*
  Warnings:

  - Added the required column `discovered` to the `Clue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clue" ADD COLUMN     "discovered" TEXT NOT NULL;
