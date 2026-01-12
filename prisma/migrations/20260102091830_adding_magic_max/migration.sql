/*
  Warnings:

  - Added the required column `magicPointsMax` to the `CharacterDerivedStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharacterDerivedStats" ADD COLUMN     "magicPointsMax" INTEGER NOT NULL;
