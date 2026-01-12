import {getSessionFromCookie} from '@/lib/sessionUtils'
import {getAllClues, getClueById, createClue, updateClue, deleteClue} from '@/dal/clue'
import type {ClueDto} from '@/types/clue'

export async function proxyGetAllClues(): Promise<ClueDto[]> {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  const clues = await getAllClues()

  return clues.map(clue => ({
    id: clue.id,
    description: clue.description,
    createdAt: clue.createdAt,
    updatedAt: clue.updatedAt,
    discovered: clue.discovered,
  }))
}

export async function proxyGetClueById(id: string): Promise<ClueDto | null> {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  const clue = await getClueById(id)

  if (!clue) return null

  return {
    id: clue.id,
    description: clue.description,
    createdAt: clue.createdAt,
    updatedAt: clue.updatedAt,
    discovered: clue.discovered,
  }
}

export async function proxyCreateClue(data: any) {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  return createClue(data)
}

export async function proxyUpdateClue(id: string, data: any) {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  return updateClue(id, data)
}

export async function proxyDeleteClue(id: string): Promise<void> {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  await deleteClue(id)
}
