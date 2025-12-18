-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'Admin';
ALTER TYPE "Role" ADD VALUE 'Keeper';

-- CreateTable
CREATE TABLE "Character" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "residence" TEXT NOT NULL,
    "birthplace" TEXT NOT NULL,
    "portraitUrl" TEXT,
    "campaignName" TEXT,
    "isNpc" BOOLEAN NOT NULL DEFAULT false,
    "npcRole" TEXT,
    "npcDescription" TEXT,
    "userId" UUID NOT NULL,
    "backstory" TEXT,
    "ideologyBeliefs" TEXT,
    "significantPeople" TEXT,
    "meaningfulLocations" TEXT,
    "treasuredPossessions" TEXT,
    "traits" TEXT,
    "injuriesScars" TEXT,
    "phobiasManias" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterCharacteristics" (
    "id" UUID NOT NULL,
    "strength" INTEGER NOT NULL,
    "constitution" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "appearance" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "education" INTEGER NOT NULL,
    "characterId" UUID NOT NULL,

    CONSTRAINT "CharacterCharacteristics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterDerivedStats" (
    "id" UUID NOT NULL,
    "hitPointsCurrent" INTEGER NOT NULL,
    "hitPointsMax" INTEGER NOT NULL,
    "sanityCurrent" INTEGER NOT NULL,
    "sanityMax" INTEGER NOT NULL,
    "magicPointsCurrent" INTEGER NOT NULL,
    "luck" INTEGER NOT NULL,
    "movement" INTEGER NOT NULL,
    "build" INTEGER NOT NULL,
    "damageBonus" TEXT NOT NULL,
    "characterId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterDerivedStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSkill" (
    "id" UUID NOT NULL,
    "value" INTEGER NOT NULL,
    "characterId" UUID NOT NULL,
    "skillId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterPossession" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "characterId" UUID NOT NULL,
    "itemId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterPossession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterContact" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characterId" UUID NOT NULL,

    CONSTRAINT "CharacterContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "manaCost" INTEGER NOT NULL,
    "castTime" INTEGER NOT NULL,
    "range" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "str" INTEGER NOT NULL,
    "con" INTEGER NOT NULL,
    "siz" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "pow" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "mp" INTEGER NOT NULL,
    "moveRate" TEXT NOT NULL,
    "damageBonus" TEXT NOT NULL,
    "build" INTEGER NOT NULL,
    "armor" TEXT NOT NULL,
    "attacks" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "sanityLoss" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestigationSession" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "campaign" TEXT NOT NULL,
    "sessionNumber" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "campaignId" UUID NOT NULL,

    CONSTRAINT "InvestigationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clue" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "discoveredAt" TIMESTAMP(3) NOT NULL,
    "InvestigationSessionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "InvestigationSessionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startedDate" TIMESTAMP(3) NOT NULL,
    "sessionCount" INTEGER NOT NULL,
    "keeperId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RollHistory" (
    "id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "characterId" UUID NOT NULL,
    "result" INTEGER NOT NULL,
    "breakdown" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "skillId" UUID,
    "currentLuck" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RollHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterSpells" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_CharacterSpells_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_InvestigationSessionNpcs" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_InvestigationSessionNpcs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_InvestigationSessionParticipants" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_InvestigationSessionParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MonsterSpells" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_MonsterSpells_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CampaignInvestigators" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_CampaignInvestigators_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterCharacteristics_characterId_key" ON "CharacterCharacteristics"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterDerivedStats_characterId_key" ON "CharacterDerivedStats"("characterId");

-- CreateIndex
CREATE INDEX "_CharacterSpells_B_index" ON "_CharacterSpells"("B");

-- CreateIndex
CREATE INDEX "_InvestigationSessionNpcs_B_index" ON "_InvestigationSessionNpcs"("B");

-- CreateIndex
CREATE INDEX "_InvestigationSessionParticipants_B_index" ON "_InvestigationSessionParticipants"("B");

-- CreateIndex
CREATE INDEX "_MonsterSpells_B_index" ON "_MonsterSpells"("B");

-- CreateIndex
CREATE INDEX "_CampaignInvestigators_B_index" ON "_CampaignInvestigators"("B");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterCharacteristics" ADD CONSTRAINT "CharacterCharacteristics_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterDerivedStats" ADD CONSTRAINT "CharacterDerivedStats_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterPossession" ADD CONSTRAINT "CharacterPossession_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterPossession" ADD CONSTRAINT "CharacterPossession_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterContact" ADD CONSTRAINT "CharacterContact_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestigationSession" ADD CONSTRAINT "InvestigationSession_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clue" ADD CONSTRAINT "Clue_InvestigationSessionId_fkey" FOREIGN KEY ("InvestigationSessionId") REFERENCES "InvestigationSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_InvestigationSessionId_fkey" FOREIGN KEY ("InvestigationSessionId") REFERENCES "InvestigationSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_keeperId_fkey" FOREIGN KEY ("keeperId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RollHistory" ADD CONSTRAINT "RollHistory_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RollHistory" ADD CONSTRAINT "RollHistory_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterSpells" ADD CONSTRAINT "_CharacterSpells_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterSpells" ADD CONSTRAINT "_CharacterSpells_B_fkey" FOREIGN KEY ("B") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvestigationSessionNpcs" ADD CONSTRAINT "_InvestigationSessionNpcs_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvestigationSessionNpcs" ADD CONSTRAINT "_InvestigationSessionNpcs_B_fkey" FOREIGN KEY ("B") REFERENCES "InvestigationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvestigationSessionParticipants" ADD CONSTRAINT "_InvestigationSessionParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvestigationSessionParticipants" ADD CONSTRAINT "_InvestigationSessionParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "InvestigationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterSpells" ADD CONSTRAINT "_MonsterSpells_A_fkey" FOREIGN KEY ("A") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterSpells" ADD CONSTRAINT "_MonsterSpells_B_fkey" FOREIGN KEY ("B") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignInvestigators" ADD CONSTRAINT "_CampaignInvestigators_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignInvestigators" ADD CONSTRAINT "_CampaignInvestigators_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
