'use server'

import {proxyCreateCampaign, proxyDeleteCampaign, proxyUpdateCampaign} from '@/proxy/campaigns'
import {createCampaignSchema, updateCampaignSchema} from '@/schemas/campaign.schema'
import {redirect} from 'next/navigation'
import type {CampaignFormValues} from '@/types/campaign'

export async function createCampaignAction(formData: CampaignFormValues) {
  const parsed = createCampaignSchema.safeParse(formData) // Validate the form data using Zod schema

  if (!parsed.success) {
    console.error(JSON.stringify(parsed.error.flatten(), null, 2))
    throw new Error('Validation failed')
  }

  await proxyCreateCampaign(parsed.data)
  redirect('/dashboard')
}

export async function updateCampaignAction(campaignId: string, formData: CampaignFormValues) {
  const parsedInput = {
    title: formData.title,
    edition: formData.edition,
    description: formData.description,
    status: formData.status,
    startedDate: formData.startedDate.toISOString(),
    sessionCount: formData.sessionCount,
    keeper: formData.keeper,
    investigators: formData.investigators.length > 0 ? formData.investigators : undefined,
    investigationSessions: formData.investigationSessions.length > 0 ? formData.investigationSessions : undefined,
  }

  const result = updateCampaignSchema.safeParse(parsedInput)

  if (!result.success) {
    console.error(JSON.stringify(result.error.flatten(), null, 2))
    throw new Error('Invalid campaign data')
  }

  await proxyUpdateCampaign(campaignId, result.data)

  redirect(`/campaigns/${campaignId}`)
}

export async function deleteCampaignAction(campaignId: string) {
  try {
    await proxyDeleteCampaign(campaignId)
  } catch (error) {
    throw new Error(`Failed to delete campaign: ${error}`)
  }
}
