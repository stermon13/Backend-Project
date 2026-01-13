export type InvestigationSessionDetailDto = InvestigationSessionDto & {
  investigators: {
    id: string
    name: string
    occupation: string
  }[]
}

export type InvestigationSessionDto = {
  id: string
  title: string
  campaign: string
  date: Date
  sessionNumber: number
  summary: string
  details: string
  clues: {id: string; description: string; discoveredAt: Date; discovered: string; title: string}[]
  locations: {id: string; name: string; description?: string}[]
  npcs: {id: string; name: string; isNpc: boolean; npcRole?: string; npcDescription?: string}[]
  createdAt: Date
  updatedAt: Date
}
