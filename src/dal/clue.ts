import {prismaClient} from '@/dal/prismaClient'
import type {CreateClueInput, UpdateClueInput} from '@/schemas/clue.schema'
import type {ClueDto} from '@/types/clue'

export async function getAllClues(): Promise<ClueDto[]> {
  return prismaClient.clue.findMany({
    orderBy: {description: 'asc'},
    include: {
      investigationSession: true,
    },
  })
}

export async function getClueById(id: string): Promise<ClueDto | null> {
  return prismaClient.clue.findUnique({
    where: {id},
    include: {
      investigationSession: true,
    },
  })
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
