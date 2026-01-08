import type { CharacterFormValues } from '@/schemas/character.schema'

export type FormSkill = NonNullable<
  CharacterFormValues['skills']
>[number]


