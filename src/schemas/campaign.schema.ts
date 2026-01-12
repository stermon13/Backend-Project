import {z} from 'zod'
import {derivedStatsSchema} from '@/schemas/character.schema'

const npcSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  role: z.string().optional(),
  description: z.string().optional(),
  portrait: z.string().optional(),
  isNPC: z.boolean(), // NPC flag
})

const locationSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
})

const investigationSessionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  sessionNumber: z.number().int().min(1),
  summary: z.string().min(1),
  details: z.string().min(1),
  clues: z
    .array(
      z.object({
        id: z.string(),
        description: z.string(),
      }),
    )
    .min(1, 'At least one clue is required'),
  date: z.date().refine(date => !isNaN(date.getTime()), {
    message: 'Date must be a valid date',
  }),
  npcs: z.array(npcSchema),
  locations: z.array(locationSchema),
})

const campaignBaseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  edition: z.string().min(1, 'Edition is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['planning', 'active', 'completed']),
  startedDate: z.date().refine(date => !isNaN(date.getTime()), {
    message: 'Start date must be a valid date',
  }),
  sessionCount: z.number().int().min(0, 'Session count must be a positive number'),
    keeper: z.object({
      id: z.string(),
      username: z.string(),
      email: z.string(),
    }),
  investigators: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1),
      occupation: z.string().min(1),
      portraitUrl: z.string().min(1),
      derivedStats: derivedStatsSchema,
    }),
  ),
  investigationSessions: z.array(investigationSessionSchema),
})

export const createCampaignSchema = campaignBaseSchema.extend({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const updateCampaignSchema = campaignBaseSchema.extend({
  id: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>
