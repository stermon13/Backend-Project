'use client'

import {useRouter} from 'next/navigation'
import {CharacterSheet} from '@/components/custom/character/characterSheet'
import type {CharacterWithRelations} from '@/types/character'
import type {ItemDto} from '@/types/item'

type Mode = 'view' | 'edit' | 'create'

type Href = string


interface CharacterDetailProps {
  character: CharacterWithRelations
  items: ItemDto[]
  mode: Mode
  backHref: Href
}

export function CharacterDetail({character, items, mode, backHref}: CharacterDetailProps) {
  const router = useRouter()

  return (
    <CharacterSheet
      character={character}
      items={items}
      mode={mode}
      onBack={() => router.push(backHref as Parameters<typeof router.push>[0])}
      onEditClick={mode === 'view' ? () => router.push(`/characters/${character.id}/edit?from=detail`) : undefined}
    />
  )
}


