import {type Item} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'

export interface CreateItemInput {
  name: string
  category: string
  description: string
  value: string
  weight: string
  damage?: string
  range?: string
  attacks?: number
  ammo?: number
}

export async function getAllItems(): Promise<Item[]> {
  return prismaClient.item.findMany()
}

export async function createItem(data: CreateItemInput) {
  return prismaClient.item.create({data})
}

export async function updateItem(id: string, data: Partial<CreateItemInput>) {
  return prismaClient.item.update({where: {id}, data})
}

export async function deleteItem(id: string) {
  try {
    return await prismaClient.item.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    console.error('Prisma Error on DELETE:', error)
    throw error
  }
}

