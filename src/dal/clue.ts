import {prismaClient} from '@/dal/prismaClient'
import type {CreateClueInput, UpdateClueInput} from '@/schemas/clue.schema'
import type {ClueDto} from '@/types/clue'

export async function getAllClues(): Promise<ClueDto[]> {
  const clues = await prismaClient.clue.findMany({
    orderBy: {description: 'asc'},
    select: {
      id: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      discovered: true,
      title: true,
      relatedTo: true,
      investigationSession: {
        select: {
          Campaign: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  })

  return clues.map(clue => ({
    id: clue.id,
    description: clue.description,
    createdAt: clue.createdAt,
    updatedAt: clue.updatedAt,
    discovered: clue.discovered,
    title: clue.title,
    relatedTo: clue.relatedTo,
    campaign: clue.investigationSession.Campaign.title,
  }))
}

export async function getClueById(id: string): Promise<ClueDto | null> {
  const clue = await prismaClient.clue.findUnique({
    where: {id},
    select: {
      id: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      discovered: true,
      title: true,
      relatedTo: true,
      investigationSession: {
        select: {
          Campaign: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  })

  if (!clue) return null

  return {
    id: clue.id,
    description: clue.description,
    createdAt: clue.createdAt,
    updatedAt: clue.updatedAt,
    discovered: clue.discovered,
    title: clue.title,
    relatedTo: clue.relatedTo,
    campaign: clue.investigationSession.Campaign.title,
  }
}

export async function createClue(data: CreateClueInput) {
  return prismaClient.clue.create({
    data,
  })
}

export async function updateClue(id: string, data: UpdateClueInput) {
  return prismaClient.clue.update({
    where: {id},
    data,
  })
}

export async function deleteClue(id: string): Promise<void> {
  await prismaClient.clue.delete({
    where: {id},
  })
}
