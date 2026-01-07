import { prismaClient } from '@/dal/prismaClient'

export async function fetchItems() {
  return (await prismaClient.item.findMany()).map(i => ({
    id: i.id,
    name: i.name,
    category: i.category,
    description: i.description,
    value: i.value,
    weight: i.weight,
    createdAt: i.createdAt,
    updatedAt: i.updatedAt,
    damage: i.damage ?? undefined,
    range: i.range ?? undefined,
    attacks: i.attacks ?? undefined,
    ammo: i.ammo ?? undefined,
  }))
}

export async function fetchCharacter(id: string) {
  return prismaClient.character.findUnique({
    where: { id },
    include: {
      characteristics: true,
      derivedStats: true,
      skills: { include: { skill: true } },
      possessions: { include: { item: true } },
      contacts: true,
    },
  })
}