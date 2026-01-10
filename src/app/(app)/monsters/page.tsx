import {redirect} from 'next/navigation'
import {proxyGetAllMonsters} from '@/proxy/monsters'
import MonstersClient from '@/components/custom/monsters/monstersList'

export default async function MonstersPage() {
  let monsters

  try {
    monsters = await proxyGetAllMonsters()
  } catch {
    redirect('/dashboard')
  }

  return <MonstersClient monsters={monsters}/>
}
