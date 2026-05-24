'use server'

import {redirect} from 'next/navigation'
import {proxyCreateClue, proxyUpdateClue, proxyDeleteClue} from '@/proxy/clue'
import {createClueInput, updateClueInput} from '@/schemas/clue.schema'
import {protectedFormAction, protectedServerFunction} from '@/lib/serverFunctions'
import {z} from 'zod'

export const createClueAction = protectedFormAction({
  schema: createClueInput,
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Create clue action',
  globalErrorMessage: 'We could not create the clue. Please try again.',
  serverFn: async ({data}) => {
    await proxyCreateClue(data)
    redirect('/stories')
  },
})

export const updateClueAction = protectedFormAction({
  schema: updateClueInput.extend({id: z.string().min(1)}),
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Update clue action',
  globalErrorMessage: 'We could not update the clue. Please try again.',
  serverFn: async ({data}) => {
    const {id, ...clueData} = data
    await proxyUpdateClue(id, clueData)
    redirect('/stories')
  },
})

export const deleteClueAction = protectedServerFunction({
  schema: z.object({id: z.string().min(1)}),
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Delete clue action',
  globalErrorMessage: 'We could not delete the clue. Please try again.',
  serverFn: async ({data}) => {
    await proxyDeleteClue(data.id)
    redirect('/stories')
  },
})

