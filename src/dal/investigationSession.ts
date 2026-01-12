import {prismaClient} from '@/dal/prismaClient'
import type {
  CreateInvestigationSessionInput,
  UpdateInvestigationSessionInput,
} from '@/schemas/investigationSessions.scheme'
import type {InvestigationSessionDto} from '@/types/investigationSession'

export async function getAllInvestigationSessions(): Promise<InvestigationSessionDto[]> {
  const sessions = await prismaClient.investigationSession.findMany({
    orderBy: {sessionNumber: 'asc'},
    include: {
      clues: true,
      locations: true,
      npcs: true,
    },
  })

  return sessions.map(session => ({
    ...session,
    clues: session.clues.map(clue => ({
      id: clue.id,
      description: clue.description,
      discoveredAt: clue.discoveredAt,
      InvestigationSessionId: clue.InvestigationSessionId,
      createdAt: clue.createdAt,
      updatedAt: clue.updatedAt,
    })),
    locations: session.locations.map(location => ({
      id: location.id,
      name: location.name,
      description: location.description ?? undefined,
    })),
    npcs: session.npcs.map(npc => ({
      id: npc.id,
      name: npc.name,
      isNpc: npc.isNpc,
      npcRole: npc.npcRole ?? undefined,
      npcDescription: npc.npcDescription ?? undefined,
    })),
  }))
}

export async function getInvestigationSessionById(id: string): Promise<InvestigationSessionDto | null> {
  const session = await prismaClient.investigationSession.findUnique({
    where: {id},
    include: {
      clues: true,
      locations: true,
      npcs: true,
    },
  })

  if (!session) return null

  return {
    ...session,
    clues: session.clues.map(clue => ({
      id: clue.id,
      description: clue.description,
      discoveredAt: clue.discoveredAt,
      InvestigationSessionId: clue.InvestigationSessionId,
      createdAt: clue.createdAt,
      updatedAt: clue.updatedAt,
    })),
    locations: session.locations.map(location => ({
      id: location.id,
      name: location.name,
      description: location.description ?? undefined,
    })),
    npcs: session.npcs.map(npc => ({
      id: npc.id,
      name: npc.name,
      isNpc: npc.isNpc,
      npcRole: npc.npcRole ?? undefined,
      npcDescription: npc.npcDescription ?? undefined,
    })),
  }
}

export async function createInvestigationSession(data: CreateInvestigationSessionInput) {
  const {clues, locations, npcs, campaignId, ...sessionData} = data

  return prismaClient.investigationSession.create({
    data: {
      ...sessionData,
      date: new Date(),
      Campaign: {
        connect: {id: campaignId},
      },
      clues:
        clues && clues.length > 0
          ? {
              connect: clues.map(clue => ({id: clue.id})),
            }
          : undefined,
      locations:
        locations && locations.length > 0
          ? {
              connect: locations.map(location => ({id: location.id})),
            }
          : undefined,
      npcs:
        npcs && npcs.length > 0
          ? {
              connect: npcs.map(npc => ({id: npc.id})),
            }
          : undefined,
    },
    include: {
      clues: true,
      locations: true,
      npcs: true,
    },
  })
}

export async function updateInvestigationSession(id: string, data: UpdateInvestigationSessionInput) {
  const {clues, locations, npcs, ...sessionData} = data

  return prismaClient.investigationSession.update({
    where: {id},
    data: {
      ...sessionData,
      date: new Date(),
      updatedAt: new Date(),
      clues:
        clues && clues.length > 0
          ? {
              set: clues.map(clue => ({id: clue.id})),
            }
          : undefined,
      locations:
        locations && locations.length > 0
          ? {
              set: locations.map(location => ({id: location.id})),
            }
          : undefined,
      npcs:
        npcs && npcs.length > 0
          ? {
              set: npcs.map(npc => ({id: npc.id})),
            }
          : undefined,
    },
    include: {
      clues: true,
      locations: true,
      npcs: true,
    },
  })
}


export async function deleteInvestigationSession(id: string): Promise<void> {
  await prismaClient.investigationSession.delete({
    where: {id},
  })
}
