import { z } from "zod";
import {clueSchema} from '@/schemas/clue.schema'
import {characterSchema} from '@/schemas/character.schema'

const locationSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  InvestigationSessionId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export {locationSchema}

const investigationSessionSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  date: z.coerce.date(),
  campaign: z.string().min(1),
  sessionNumber: z.coerce.number().int().positive(),
  summary: z.string().min(1),
  details: z.string().min(1),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  clues: z.array(clueSchema),
  locations: z.array(locationSchema),
  npcs: z.array(characterSchema),
  campaignId: z.string(),
});

export { investigationSessionSchema };

export const createInvestigationSessionInput = investigationSessionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateInvestigationSessionInput = z.infer<typeof createInvestigationSessionInput>;

export const updateInvestigationSessionInput = investigationSessionSchema.omit({
  id: true,
  createdAt: true,
});

export type UpdateInvestigationSessionInput = z.infer<typeof updateInvestigationSessionInput>;


