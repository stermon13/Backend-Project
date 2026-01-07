import {fetchCharacter, fetchItems} from '@/lib/utils/characterUtils'
import {notFound} from 'next/navigation'
import {CharacterDetail} from '@/components/custom/character/characterDetail'

export const dynamic = 'force-dynamic'

export default async function EditCharacterPage({
  params,
  searchParams,
}: {
  params: Promise<{id?: string}>
  searchParams?: Promise<{from?: string}>
}) {
  const {id} = await params
  const {from} = (await searchParams) ?? {}

  if (!id) {
    notFound()
  }

  const items = await fetchItems()

  const character = await fetchCharacter(id)

  if (!character) {
    notFound()
  }

  const backHref = from === 'detail' ? `/characters/${id}` : '/characters'

  return <CharacterDetail character={character} items={items} mode="edit" backHref={backHref} />
}

