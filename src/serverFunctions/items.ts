import {type Item} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'

interface CreateItemInput {
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

export async function GetAllItems(): Promise<Item[]> {
  return prismaClient.item.findMany()
}

export async function CreateItem(data: CreateItemInput) {
  return prismaClient.item.create({data})
}

export async function UpdateItem(id: string, data: Partial<CreateItemInput>) {
  return prismaClient.item.update({where: {id}, data})
}

export async function DeleteItem(id: string) {
  try {
    return await prismaClient.item.delete({
      where: {
        id: id,
      },
    })
  } catch (error) {
    console.error('Prisma Error on DELETE:', error)
    throw error
  }
}
