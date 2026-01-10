import {prismaClient} from '@/dal/prismaClient'
import type {Spell} from '@/generated/prisma/client'

export async function getAllSpells(): Promise<Spell[]> {
  return prismaClient.spell.findMany({orderBy: {name: 'asc'}})
}
