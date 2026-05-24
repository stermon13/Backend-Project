'use server'

import {z} from 'zod'
import {createItem, deleteItem, updateItem} from '@/dal/items'
import {createItemSchema, updateItemSchema} from '@/schemas/item.schema'
import {revalidatePath} from 'next/cache'
import {protectedFormAction} from '@/lib/serverFunctions'

export const createItemAction = protectedFormAction({
  schema: createItemSchema,
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Create item action',
  globalErrorMessage: 'We could not create the item. Please try again.',
  serverFn: async ({data}) => {
    await createItem(data)
    revalidatePath('/items')
  },
})

export const updateItemAction = protectedFormAction({
  schema: updateItemSchema.extend({id: z.string().min(1)}),
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Update item action',
  globalErrorMessage: 'We could not update the item. Please try again.',
  serverFn: async ({data}) => {
    const {id, ...itemData} = data
    await updateItem(id, itemData)
    revalidatePath('/items')
  },
})

export const deleteItemAction = protectedFormAction({
  schema: z.object({id: z.string().min(1)}),
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Delete item action',
  globalErrorMessage: 'We could not delete the item. Please try again.',
  serverFn: async ({data}) => {
    await deleteItem(data.id)
    revalidatePath('/items')
  },
})
