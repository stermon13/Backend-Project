'use server'

import {createCampaign, deleteCampaign, updateCampaign} from '@/dal/campaigns'
import {createCampaignSchema, updateCampaignSchema} from '@/schemas/campaign.schema'
import {redirect} from 'next/navigation'
import {protectedFormAction} from '@/lib/serverFunctions'
import {z} from 'zod'

export const createCampaignAction = protectedFormAction({
  schema: createCampaignSchema,
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Create campaign action',
  globalErrorMessage: 'We could not create the campaign. Please try again.',
  serverFn: async ({data}) => {
    await createCampaign(data)
    redirect('/dashboard')
  },
})

export const updateCampaignAction = protectedFormAction({
  schema: updateCampaignSchema,
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Update campaign action',
  globalErrorMessage: 'We could not update the campaign. Please try again.',
  serverFn: async ({data}) => {
    await updateCampaign(data.id, data)
    redirect(`/campaigns/${data.id}`)
  },
})

export const deleteCampaignAction = protectedFormAction({
  schema: z.object({id: z.string().min(1)}),
  requiredRoles: ['Admin', 'Keeper'],
  functionName: 'Delete campaign action',
  globalErrorMessage: 'We could not delete the campaign. Please try again.',
  serverFn: async ({data}) => {
    await deleteCampaign(data.id)
    redirect('/dashboard')
  },
})
