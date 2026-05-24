import {z} from 'zod'
import {createCampaign, deleteCampaign, updateCampaign} from '@/dal/campaigns'
import {createCampaignSchema, updateCampaignSchema} from '@/schemas/campaign.schema'
import {protectedApiRoute} from '@/lib/apiRoute'
import {created, ok} from '@/lib/routeResponses'

const updateCampaignRequestSchema = z.object({
  campaignId: z.string().min(1, 'Missing campaign id'),
  formData: updateCampaignSchema.omit({id: true}),
})

const deleteCampaignRequestSchema = z.object({
  id: z.string().min(1, 'Missing campaign id'),
})

export const POST = protectedApiRoute({
  authenticationType: 'cookie',
  requiredRoles: ['Admin', 'Keeper'],
  schema: createCampaignSchema,
  routeFn: async ({data}) => created(await createCampaign(data)),
})

export const PUT = protectedApiRoute({
  authenticationType: 'cookie',
  requiredRoles: ['Admin', 'Keeper'],
  schema: updateCampaignRequestSchema,
  routeFn: async ({data}) => {
    const {campaignId, formData} = data
    return ok(await updateCampaign(campaignId, {...formData, id: campaignId}))
  },
})

export const DELETE = protectedApiRoute({
  authenticationType: 'cookie',
  requiredRoles: ['Admin', 'Keeper'],
  schema: deleteCampaignRequestSchema,
  routeFn: async ({data}) => {
    await deleteCampaign(data.id)
    return ok({message: 'Campaign deleted successfully'})
  },
})
