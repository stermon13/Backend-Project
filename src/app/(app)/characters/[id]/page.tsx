import {fetchCharacter, fetchItems} from '@/lib/utils/characterUtils'
import {notFound} from 'next/navigation'
import {CharacterDetail} from '@/components/custom/character/characterDetail'

export const dynamic = 'force-dynamic'

export default async function CharacterDetailPage({params}: {params: Promise<{id?: string}>}) {
  const {id} = await params

  console.log('Character ID param:', id)

  if (!id) {
    notFound()
  }

  const items = await fetchItems()

  const character = await fetchCharacter(id)

  if (!character) {
    notFound()
  }

  return <CharacterDetail character={character} items={items} mode="view" backHref="/characters" />
}
