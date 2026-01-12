import {getSessionFromCookie} from '@/lib/sessionUtils'
import {
  getAllInvestigationSessions,
  getInvestigationSessionById,
  createInvestigationSession,
  updateInvestigationSession,
  deleteInvestigationSession,
} from '@/dal/investigationSession'
import type {InvestigationSessionDto} from '@/types/investigationSession'

export async function proxyGetAllInvestigationSessions(): Promise<InvestigationSessionDto[]> {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  const sessions = await getAllInvestigationSessions()

  return sessions.map(session => ({
    id: session.id,
    title: session.title,
    date: session.date,
    campaign: session.campaign,
    sessionNumber: session.sessionNumber,
    summary: session.summary,
    details: session.details,
    clues: session.clues,
    locations: session.locations,
    npcs: session.npcs,
    createdAt: session.createdAt,
    updatedAt: session.updatedAt,
  }))
}

export async function proxyGetInvestigationSessionById(id: string): Promise<InvestigationSessionDto | null> {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  const sessionData = await getInvestigationSessionById(id)

  if (!sessionData) return null

  return {
    id: sessionData.id,
    title: sessionData.title,
    date: sessionData.date,
    campaign: sessionData.campaign,
    sessionNumber: sessionData.sessionNumber,
    summary: sessionData.summary,
    details: sessionData.details,
    clues: sessionData.clues,
    locations: sessionData.locations,
    npcs: sessionData.npcs,
    createdAt: sessionData.createdAt,
    updatedAt: sessionData.updatedAt,
  }
}

export async function proxyCreateInvestigationSession(data: any) {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  return createInvestigationSession(data)
}

export async function proxyUpdateInvestigationSession(id: string, data: any) {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  return updateInvestigationSession(id, data)
}

export async function proxyDeleteInvestigationSession(id: string): Promise<void> {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  await deleteInvestigationSession(id)
}
