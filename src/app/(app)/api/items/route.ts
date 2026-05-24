import {z} from 'zod'
import {createItem, deleteItem, updateItem} from '@/dal/items'
import {createItemSchema, updateItemSchema} from '@/schemas/item.schema'
import {protectedApiRoute} from '@/lib/apiRoute'
import {created, ok} from '@/lib/routeResponses'

const updateItemRequestSchema = updateItemSchema.extend({
  id: z.string().min(1, 'Missing item id'),
})

const deleteItemRequestSchema = z.object({
  id: z.string().min(1, 'Missing item id'),
})

export const POST = protectedApiRoute({
  authenticationType: 'cookie',
  requiredRoles: ['Admin', 'Keeper'],
  schema: createItemSchema,
  routeFn: async ({data}) => created(await createItem(data)),
})

export const PUT = protectedApiRoute({
  authenticationType: 'cookie',
  requiredRoles: ['Admin', 'Keeper'],
  schema: updateItemRequestSchema,
  routeFn: async ({data}) => {
    const {id, ...updatedData} = data
    return ok(await updateItem(id, updatedData))
  },
})

export const DELETE = protectedApiRoute({
  authenticationType: 'cookie',
  requiredRoles: ['Admin', 'Keeper'],
  schema: deleteItemRequestSchema,
  routeFn: async ({data}) => {
    await deleteItem(data.id)
    return ok({success: true})
  },
})
