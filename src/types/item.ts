export type ItemCategory = 'weapon' | 'equipment' | 'book' | 'artifact' | 'consumable' | 'other'

export type ItemDto = {
  id: string
  name: string
  category: ItemCategory
  description: string
  value: string
  weight: string
  createdAt: Date
  updatedAt: Date
  damage?: string
  range?: string
  attacks?: number
  ammo?: number
}

