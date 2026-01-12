import {redirect} from 'next/navigation'
import {getSessionFromCookie} from '@/lib/sessionUtils'
import {proxyGetAllInvestigationSessions} from '@/proxy/investigationSession'
import {proxyGetAllClues} from '@/proxy/clue'
import StoriesList from '@/components/custom/stories/storiesList'

export default async function StoriesPage() {
  const session = await getSessionFromCookie(true)

  if (!session) {
    redirect('/')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    redirect('/')
  }

  const sessions = await proxyGetAllInvestigationSessions()
  const clues = await proxyGetAllClues()

  return <StoriesList sessions={sessions} clues = { clues } />
}
