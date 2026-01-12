import {
  getAllCampaigns,
  getCampaignsByKeeper,
  getCampaignById,
  updateCampaign,
  createCampaign,
  deleteCampaign,
} from '@/dal/campaigns'
import type {CampaignDetailDto, CampaignDto, CampaignFormValues, CampaignStatus} from '@/types/campaign'
import {getSessionFromCookie} from '@/lib/sessionUtils'
import type {UpdateCampaignInput, CreateCampaignInput} from '@/schemas/campaign.schema'

type Args = {
  userId: string
  role: 'User' | 'Keeper' | 'Admin'
}

function mapCampaignToDto(campaign: {
  id: string
  title: string
  edition: string
  description: string
  status: string
  startedDate: Date
  sessionCount: number
  keeperId: string
  createdAt: Date
  updatedAt: Date
  investigators: {id: string}[]
  investigationSessions: {updatedAt: Date}[]
  keeper: {
    username: string | null
    email: string
  }
}): CampaignDto {
  return {
    id: campaign.id,
    title: campaign.title,
    edition: campaign.edition,
    description: campaign.description,
    status: campaign.status as CampaignStatus,
    startedDate: campaign.startedDate,
    sessionCount: campaign.sessionCount,
    keeperId: campaign.keeperId,
    playerCount: campaign.investigators.length,
    lastPlayed: campaign.investigationSessions[0]?.updatedAt ?? null,

    keeperName: campaign.keeper.username ?? campaign.keeper.email,

    createdAt: campaign.createdAt,
    updatedAt: campaign.updatedAt,
  }
}

type CampaignWithRelations = Awaited<ReturnType<typeof getAllCampaigns>>[number]

export async function proxyGetCampaignsForUser({userId, role}: Args): Promise<CampaignDto[]> {
  let campaigns: CampaignWithRelations[] = []

  if (role === 'Admin') {
    campaigns = await getAllCampaigns()
  } else if (role === 'Keeper') {
    campaigns = await getCampaignsByKeeper(userId)
  }

  return campaigns.map(mapCampaignToDto)
}

export async function proxyGetCampaignById(id: string): Promise<CampaignFormValues | null> {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  const campaign = await getCampaignById(id)

  if (!campaign) return null

  return {
    id: campaign.id,
    title: campaign.title,
    edition: campaign.edition,
    description: campaign.description,
    status: campaign.status as CampaignStatus,
    startedDate: campaign.startedDate,
    sessionCount: campaign.sessionCount,
    createdAt: campaign.createdAt,
    updatedAt: campaign.updatedAt,
    investigators: campaign.investigators,
    investigationSessions: campaign.investigationSessions,
    keeper: campaign.keeper,
  }
}

export async function proxyCreateCampaign(data: CreateCampaignInput) {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  return createCampaign(data)
}

export async function proxyUpdateCampaign(campaignId: string, data: UpdateCampaignInput) {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  return updateCampaign(campaignId, data)
}

export async function proxyDeleteCampaign(campaignId: string) {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  try {
    await deleteCampaign(campaignId)
  } catch (error) {
    throw new Error(`Error deleting campaign: ${error}`)
  }
}