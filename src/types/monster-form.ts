import type {z} from 'zod'
import type {createMonsterSchema} from '@/schemas/monster.schema'

export type MonsterFormValues = z.infer<typeof createMonsterSchema>

