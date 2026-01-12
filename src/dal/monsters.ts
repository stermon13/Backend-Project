import {prismaClient} from '@/dal/prismaClient'
import type {Monster} from '@/generated/prisma/client'
import type {CreateMonsterInput, UpdateMonsterInput} from '@/schemas/monster.schema'

export async function getAllMonsters(): Promise<Monster[]> {
  return prismaClient.monster.findMany({
    orderBy: {name: 'asc'},
  })
}

export async function deleteMonster(id: string): Promise<void> {
  await prismaClient.monster.delete({
    where: {id},
  })
}

export async function createMonster(data: CreateMonsterInput) {
  const {spellIds, ...monsterData} = data

  return prismaClient.monster.create({
    data: {
      ...monsterData,
      spells: {
        connect: spellIds.map(id => ({id})),
      },
    },
    include: {
      spells: true,
    },
  })
}

export async function updateMonster(id: string, data: UpdateMonsterInput) {
  const {spellIds, ...monsterData} = data

  return prismaClient.monster.update({
    where: {id},
    data: {
      ...monsterData,
      spells: {
        set: spellIds.map(id => ({id})),
      },
    },
    include: {
      spells: true,
    },
  })
}
