import type{z} from 'zod'
import type{createCampaignSchema} from '@/schemas/campaign.schema'

export type CampaignFormValues = z.infer<typeof createCampaignSchema>


export type CampaignStatus = 'planning' | 'active' | 'completed'

export type CampaignDto = {
  id: string
  title: string
  edition: string
  description: string
  status: CampaignStatus
  startedDate: Date
  sessionCount: number
  keeperId: string
  createdAt: Date
  updatedAt: Date

  keeperName?: string

  playerCount: number
  lastPlayed: Date | null
}

export type CampaignDetailDto = {
  id: string
  title: string
  edition: string
  description: string
  status: CampaignStatus
  startedDate: Date
  sessionCount: number
  createdAt: Date
  updatedAt: Date

  investigators: Array<{
    id: string
    name: string
    occupation: string
    portraitUrl: string
    derivedStats: {
      hitPointsCurrent: number
      hitPointsMax: number
      sanityCurrent: number
      sanityMax: number
    }
  }>
  keeper: {
    id: string
    username: string
    email: string
  }
  storyDetails: {
    synopsis: string
    currentSituation: string
    keyNPCs: Array<{
      id: string
      name: string
      role: string | null
      description: string | null
      portrait: string
    }>
    importantLocations: Array<{
      name: string
      description: string
    }>
    clues: string[]
  }
}


