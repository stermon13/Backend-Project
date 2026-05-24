import {z} from 'zod'

export const itemBaseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['weapon', 'equipment', 'book', 'artifact', 'consumable', 'other']),
  description: z.string().min(5, 'Description must be at least 5 characters long'),
  value: z.string().min(1, 'Value is required'),
  weight: z.string().min(1, 'Weight is required'),
  damage: z.string().optional(),
  range: z.string().optional(),
  attacks: z.preprocess(value => (value === '' || value === null || value === undefined ? undefined : Number(value)), z.number().optional()),
  ammo: z.preprocess(value => (value === '' || value === null || value === undefined ? undefined : Number(value)), z.number().optional()),
})

export const updateItemSchema = itemBaseSchema

export const createItemSchema = itemBaseSchema
  .refine(
    data => {
      if (data.category === 'weapon' && (!data.damage || !data.range)) {
        return false
      }
      return true
    },
    {
      message: 'Weapon items must have both damage and range values.',
      path: ['damage', 'range'],
    },
  )
  .refine(
    data => {
      if (data.ammo && data.ammo < 0) {
        return false
      }
      return true
    },
    {
      message: 'Ammo must be a positive number if provided.',
      path: ['ammo'],
    },
  )
