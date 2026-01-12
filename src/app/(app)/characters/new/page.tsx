import {fetchItems} from '@/lib/utils/characterUtils'
import {createEmptyCharacter} from '@/components/custom/character/character.logic'
import {CharacterDetail} from '@/components/custom/character/characterDetail'


export const dynamic = 'force-dynamic'

export default async function NewCharacterPage() {
  const character = await createEmptyCharacter()

  const items = await fetchItems()

  return <CharacterDetail character={character} items={items} mode="create" backHref="/characters" />
}
