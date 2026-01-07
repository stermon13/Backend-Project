import {z} from 'zod'

export const characteristicsSchema = z.object({
  strength: z.number().int(),
  constitution: z.number().int(),
  size: z.number().int(),
  dexterity: z.number().int(),
  appearance: z.number().int(),
  intelligence: z.number().int(),
  power: z.number().int(),
  education: z.number().int(),
})

export const derivedStatsSchema = z.object({
  hitPointsCurrent: z.number().int(),
  hitPointsMax: z.number().int(),
  sanityCurrent: z.number().int(),
  sanityMax: z.number().int(),
  magicPointsCurrent: z.number().int(),
  magicPointsMax: z.number().int(),
  luck: z.number().int(),
  movement: z.number().int(),
  build: z.number().int(),
  damageBonus: z.string(),
})

export const characterSkillFormSchema = z.object({
  id: z.string(),
  skillId: z.string(),
  value: z.number().int().min(0).max(100),
  skill: z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
  }),
})

export const characterPossessionFormSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  quantity: z.number().int().min(1),
  item: z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    value: z.string(),
    weight: z.string(),
    damage: z.string().optional(),
    range: z.string().optional(),
    attacks: z.number().int().optional(),
    ammo: z.number().int().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
})

export const characterContactFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  relationship: z.string().min(1),
  description: z.string().optional(),
})


export const characterSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  age: z.number().int().min(0),
  sex: z.string().min(1),
  residence: z.string().min(1),
  birthplace: z.string().min(1),
  isNpc: z.boolean(),
  portraitUrl: z.string().default(''),
  campaignName: z.string().default(''),

  characteristics: characteristicsSchema,
  derivedStats: derivedStatsSchema,
  skills: z.array(characterSkillFormSchema),
  possessions: z.array(characterPossessionFormSchema),
  contacts: z.array(characterContactFormSchema).default([]),

  backstory: z.string().default(''),
  ideologyBeliefs: z.string().default(''),
  significantPeople: z.string().default(''),
  meaningfulLocations: z.string().default(''),
  treasuredPossessions: z.string().default(''),
  traits: z.string().default(''),
  injuriesScars: z.string().default(''),
  phobiasManias: z.string().default(''),

  cash: z.string().default(''),
  assets: z.string().default(''),
  notes: z.string().default(''),
})

export type CharacterFormValues = z.input<typeof characterSchema>
export type CharacterFormResolved = z.output<typeof characterSchema>


export const createCharacterSchema = characterSchema

export const updateCharacterSchema = characterSchema.extend({
  id: z.uuid({message: 'Invalid UUID'}),
})


export const updateCharacteristicsSchema = z.object({
  characterId: z.uuid({message: 'Invalid UUID'}),
  characteristics: characteristicsSchema,
})

export const updateDerivedStatsSchema = z.object({
  characterId: z.uuid({message: 'Invalid UUID'}),
  derivedStats: derivedStatsSchema,
})

export const deleteCharacterSchema = z.object({
  id: z.uuid({message: 'Invalid UUID'}),
})
