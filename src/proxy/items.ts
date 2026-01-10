import {getSessionFromCookie} from '@/lib/sessionUtils'
import {GetAllItems} from '@/serverFunctions/items'
import type {ItemDto, ItemCategory} from '@/types/item'
import {nullToUndefined} from '@/lib/utils/normalize'

export async function proxyGetAllItems(): Promise<ItemDto[]> {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  const items = await GetAllItems()

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

