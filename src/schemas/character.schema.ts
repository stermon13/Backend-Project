import {z} from 'zod'

const intPositive = z.coerce.number().int().positive()
const intNonNegative = z.coerce.number().int().nonnegative()
const intPercentage = z.coerce.number().int().min(0).max(100)
const checkboxBoolean = z.preprocess(value => {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    if (value === 'true' || value === 'on') {
      return true
    }

    if (value === 'false') {
      return false
    }
  }

  return value
}, z.boolean())

export const characteristicsSchema = z.object({
  strength: intPositive,
  constitution: intPositive,
  size: intPositive,
  dexterity: intPositive,
  appearance: intPositive,
  intelligence: intPositive,
  power: intPositive,
  education: intPositive,
})

export const derivedStatsSchema = z.object({
  hitPointsCurrent: intPositive,
  hitPointsMax: intPositive,
  sanityCurrent: intPositive,
  sanityMax: intPositive,
  magicPointsCurrent: intPositive,
  magicPointsMax: intPositive,
  luck: intPositive,
  movement: intPositive,
  build: intNonNegative,
  damageBonus: z.string(),
})

export const characterSkillFormSchema = z.object({
  id: z.string(),
  skillId: z.string(),
  value: intPercentage,
  skill: z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
  }),
})

export const characterPossessionFormSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  quantity: intPositive,
  item: z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    value: z.string(),
    weight: z.string(),
    damage: z.string().optional(),
    range: z.string().optional(),
    attacks: intPositive.optional(),
    ammo: intPositive.optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
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
  age: intPositive,
  sex: z.string().min(1),
  residence: z.string().min(1),
  birthplace: z.string().min(1),
  isNpc: checkboxBoolean,
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

export type CharacterFormValues = z.output<typeof characterSchema>
export type CharacterFormResolved = z.output<typeof characterSchema>


export const createCharacterSchema = characterSchema.omit({
  userId: true,
})

export const updateCharacterSchema = characterSchema.extend({
  id: z.uuid({message: 'Invalid UUID'}),
})


export const updateCharacteristicsSchema = z.object({
  characterId: z.uuid({message: 'Invalid UUID'}),
  characteristics: characteristicsSchema,
})
