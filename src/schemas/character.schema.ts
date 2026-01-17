import {z} from 'zod'

export const characteristicsSchema = z.object({
  strength: z.number().int().positive(),
  constitution: z.number().int().positive(),
  size: z.number().int().positive(),
  dexterity: z.number().int().positive(),
  appearance: z.number().int().positive(),
  intelligence: z.number().int().positive(),
  power: z.number().int().positive(),
  education: z.number().int().positive(),
})

export const derivedStatsSchema = z.object({
  hitPointsCurrent: z.number().int().positive(),
  hitPointsMax: z.number().int().positive(),
  sanityCurrent: z.number().int().positive(),
  sanityMax: z.number().int().positive(),
  magicPointsCurrent: z.number().int().positive(),
  magicPointsMax: z.number().int().positive(),
  luck: z.number().int().positive(),
  movement: z.number().int().positive(),
  build: z.number().int().positive(),
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
  quantity: z.number().int().min(1).positive(),
  item: z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    value: z.string(),
    weight: z.string(),
    damage: z.string().optional(),
    range: z.string().optional(),
    attacks: z.number().int().positive().optional(),
    ammo: z.number().int().positive().optional(),
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
  id: z.string().optional(),
  name: z.string().min(1),
  occupation: z.string().min(1),
  age: z.number().int().min(0).positive(),
  sex: z.string().min(1),
  residence: z.string().min(1),
  birthplace: z.string().min(1),
  isNpc: z.boolean(),
  portraitUrl: z.string().default(''),
  campaignName: z.string().default(''),

  characteristics: characteristicsSchema,
  derivedStats: derivedStatsSchema,
  skills: z.array(characterSkillFormSchema),
  possessions: z.array(characterPossessionFormSchema).default([]),
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
  userId: z.string(),
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
