import type {CharacterWithRelations} from '@/types/character'
import {CHAOSIUM_SKILL_BASES} from '@/lib/rules/chaosiumSkillBases'
import {prismaClient} from '@/dal/prismaClient'

export async function createEmptyCharacter(): Promise<CharacterWithRelations> {
  const now = new Date()

  const skillsFetch = await prismaClient.skill.findMany()

  const skills = skillsFetch.map(skill => ({
    id: 'new',
    characterId: 'new',
    skillId: skill.id,
    value: CHAOSIUM_SKILL_BASES[skill.name] ?? 0,
    createdAt: now,
    updatedAt: now,
    skill,
  }))


  return {
    id: 'new',
    name: '',
    occupation: '',
    age: 18,
    sex: '',
    residence: '',
    birthplace: '',
    portraitUrl: null,
    campaignName: null,
    isNpc: false,

    npcRole: null,
    npcDescription: null,

    userId: 'new',
    backstory: null,
    ideologyBeliefs: null,
    significantPeople: null,
    meaningfulLocations: null,
    treasuredPossessions: null,
    traits: null,
    injuriesScars: null,
    phobiasManias: null,
    cash: null,
    assets: null,
    notes: null,

    createdAt: now,
    updatedAt: now,

    characteristics: {
      id: 'new',
      characterId: 'new',
      strength: 50,
      constitution: 50,
      size: 50,
      dexterity: 50,
      appearance: 50,
      intelligence: 50,
      power: 50,
      education: 50,
    },

    derivedStats: {
      id: 'new',
      characterId: 'new',
      hitPointsCurrent: 10,
      hitPointsMax: 10,
      sanityCurrent: 50,
      sanityMax: 50,
      magicPointsCurrent: 10,
      magicPointsMax: 10,
      luck: 50,
      movement: 8,
      build: 0,
      damageBonus: '0',
      createdAt: now,
      updatedAt: now,
    },

    skills,
    possessions: [],
    contacts: [],
  }
}
