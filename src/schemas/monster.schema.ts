import {z} from 'zod'
import type {MonsterCategory} from '@/types/monster'

const monsterCategories: readonly MonsterCategory[] = [
  'mythos',
  'major',
  'minor',
  'humanoid',
  'undead',
  'beast',
  'other',
]

export const monsterBaseSchema = z.object({
  name: z.string().min(1),
  category: z.enum(monsterCategories),
  description: z.string().min(10),

  str: z.number().int().positive(),
  con: z.number().int().positive(),
  siz: z.number().int().positive(),
  dex: z.number().int().positive(),
  int: z.number().int().positive(),
  pow: z.number().int().positive(),

  hp: z.number().int().positive(),
  mp: z.number().int().positive(),
  moveRate: z.string().min(1),
  damageBonus: z.string().min(1),
  build: z.number().int().nonnegative(),
  armor: z.string().min(1),
  attacks: z.string().min(1),
  skills: z.string().min(1),
  sanityLoss: z.string().min(1),

  spellIds: z.array(z.string()),
})

export const createMonsterSchema = monsterBaseSchema
export type CreateMonsterInput = z.infer<typeof createMonsterSchema>
export const updateMonsterSchema = monsterBaseSchema
export type UpdateMonsterInput = z.infer<typeof updateMonsterSchema>