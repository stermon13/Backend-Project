import {notFound, redirect} from 'next/navigation'
import {proxyGetInvestigationSessionById} from '@/proxy/investigationSession'
import SessionDetailClient from '@/components/custom/stories/storiesDetails'

export default async function SessionDetailPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params

  let session

  try {
    session = await proxyGetInvestigationSessionById(id)
  } catch {
    redirect('/stories')
  }

  if (!session) {
    notFound()
  }

  return <SessionDetailClient session={session} />
}
