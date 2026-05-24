import {z} from 'zod'

const clueSchema = z.object({
  id: z.string(),
  description: z.string().min(1),
  discoveredAt: z.coerce.date(),
  discovered: z.string(),
  title: z.string(),
  relatedTo: z.string(),
  InvestigationSessionId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export {clueSchema}

export const createClueInput = clueSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateClueInput = z.infer<typeof createClueInput>

export const updateClueInput = clueSchema.omit({
  id: true,
  createdAt: true,
})

export type UpdateClueInput = z.infer<typeof updateClueInput>