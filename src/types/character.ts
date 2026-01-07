import type {
  Character,
  CharacterCharacteristics,
  CharacterDerivedStats,
  CharacterSkill,
  CharacterPossession,
  CharacterContact,
  Skill,
  Item,
} from '@/generated/prisma/client'

export type CharacterWithRelations = Character & {
  characteristics: CharacterCharacteristics | null
  derivedStats: CharacterDerivedStats | null
  skills: (CharacterSkill & {
    skill: Skill
  })[]
  possessions: (CharacterPossession & {
    item: Item
  })[]
  contacts: CharacterContact[]
}


