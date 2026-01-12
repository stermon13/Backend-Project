import { prismaClient } from '@/dal/prismaClient'
import type {ItemDto, ItemCategory} from '@/types/item'
import {nullToUndefined} from '@/lib/utils/normalize'

export async function fetchItems(): Promise<ItemDto[]> {
  const items = await prismaClient.item.findMany()

  return items.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category as ItemCategory,
    description: item.description,
    value: item.value,
    weight: item.weight,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    damage: nullToUndefined(item.damage),
    range: nullToUndefined(item.range),
    attacks: nullToUndefined(item.attacks),
    ammo: nullToUndefined(item.ammo),
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