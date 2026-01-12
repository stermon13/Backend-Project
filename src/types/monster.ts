import type {SpellDto} from '@/types/spell'

export type MonsterCategory = 'mythos' | 'major' | 'minor' | 'humanoid' | 'undead' | 'beast' | 'other'

export type MonsterDto = {
  id: string
  name: string
  category: MonsterCategory
  description: string

  str: number
  con: number
  siz: number
  dex: number
  int: number
  pow: number

  hp: number
  mp: number
  moveRate: string
  damageBonus: string
  build: number
  armor: string
  attacks: string
  skills: string
  sanityLoss: string

  spells?: SpellDto[]

  createdAt: Date
  updatedAt: Date
}

