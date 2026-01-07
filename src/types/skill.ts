import type { CharacterFormValues } from '@/lib/validation/character.schema'

export type FormSkill = NonNullable<
  CharacterFormValues['skills']
>[number]


