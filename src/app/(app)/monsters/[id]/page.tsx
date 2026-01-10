import {notFound, redirect} from 'next/navigation'
import {proxyGetMonsterById} from '@/proxy/monsters'
import MonsterDetailClient from '@/components/custom/monsters/monsterDetail'

export default async function MonsterDetailPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params

  let monster

  try {
    monster = await proxyGetMonsterById(id)
  } catch {
    redirect('/dashboard')
  }

  if (!monster) {
    notFound()
  }

  return <MonsterDetailClient monster={monster} />
}

