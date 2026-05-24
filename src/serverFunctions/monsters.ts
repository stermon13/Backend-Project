'use server'

import {proxyDeleteMonster, proxyCreateMonster, proxyUpdateMonster} from '@/proxy/monsters'
import {createMonsterSchema, updateMonsterSchema} from '@/schemas/monster.schema'
import {redirect} from 'next/navigation'
import {protectedFormAction, protectedServerFunction} from '@/lib/serverFunctions'
import {z} from 'zod'

export const deleteMonsterAction = protectedServerFunction({
  schema: z.object({id: z.string().min(1)}),
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Delete monster action',
  globalErrorMessage: 'We could not delete the monster. Please try again.',
  serverFn: async ({data}) => {
    await proxyDeleteMonster(data.id)
    redirect('/monsters')
  },
})

export const createMonsterAction = protectedFormAction({
  schema: createMonsterSchema,
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Create monster action',
  globalErrorMessage: 'We could not create the monster. Please try again.',
  serverFn: async ({data}) => {
    await proxyCreateMonster(data)
    redirect('/monsters')
  },
})

export const updateMonsterAction = protectedFormAction({
  schema: updateMonsterSchema.extend({id: z.string().min(1)}),
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Update monster action',
  globalErrorMessage: 'We could not update the monster. Please try again.',
  serverFn: async ({data}) => {
    const {id, ...monsterData} = data
    await proxyUpdateMonster(id, monsterData)
    redirect(`/monsters/${data.id}`)
  },
})
