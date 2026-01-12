import type {CombatViewModel} from '@/types/combat'
import type {CharacterWithRelations} from '@/types/character'

export function getCombatViewModel(character: CharacterWithRelations, movement: number): CombatViewModel {
  return {
    dodge: Math.floor(movement * 5),
    weapons:
      character.possessions
        ?.filter(p => p.item?.category === 'weapon')
        .map(p => {
          const weaponSkill =
            character.skills?.find(
              cs =>
                cs.skill?.name.toLowerCase().includes('firearms') || cs.skill?.name.toLowerCase().includes('fighting'),
            )?.value ?? 0

          return {
            name: p.item.name,
            skill: weaponSkill,
            damage: p.item?.description ?? '-',
            range: '—',
            attacks: 1,
          }
        }) ?? [],
  }
}
