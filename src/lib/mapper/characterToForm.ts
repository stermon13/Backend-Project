import type {CharacterWithRelations} from '@/types/character'
import type {CharacterFormValues} from '@/schemas/character.schema'

export function characterToForm(character: CharacterWithRelations): CharacterFormValues {
  return {
    id: character.id,
    name: character.name,
    occupation: character.occupation,
    age: character.age,
    sex: character.sex,
    residence: character.residence,
    birthplace: character.birthplace,
    isNpc: character.isNpc ?? false,
    portraitUrl: character.portraitUrl ?? '',
    campaignName: character.campaignName ?? '',

    characteristics: {
      strength: character.characteristics?.strength ?? 0,
      constitution: character.characteristics?.constitution ?? 0,
      size: character.characteristics?.size ?? 0,
      dexterity: character.characteristics?.dexterity ?? 0,
      appearance: character.characteristics?.appearance ?? 0,
      intelligence: character.characteristics?.intelligence ?? 0,
      power: character.characteristics?.power ?? 0,
      education: character.characteristics?.education ?? 0,
    },

    derivedStats: {
      hitPointsCurrent: character.derivedStats?.hitPointsCurrent ?? 0,
      hitPointsMax: character.derivedStats?.hitPointsMax ?? 0,
      sanityCurrent: character.derivedStats?.sanityCurrent ?? 0,
      sanityMax: character.derivedStats?.sanityMax ?? 0,
      magicPointsCurrent: character.derivedStats?.magicPointsCurrent ?? 0,
      magicPointsMax: character.derivedStats?.magicPointsMax ?? 0,
      luck: character.derivedStats?.luck ?? 0,
      movement: character.derivedStats?.movement ?? 0,
      build: character.derivedStats?.build ?? 0,
      damageBonus: character.derivedStats?.damageBonus ?? '',
    },

    skills: character.skills.map(cs => ({
      id: cs.id,
      skillId: cs.skillId,
      value: cs.value,
      skill: {
        id: cs.skill.id,
        name: cs.skill.name,
        category: cs.skill.category,
      },
    })),

    possessions: character.possessions.map(p => ({
      id: p.id,
      itemId: p.itemId,
      quantity: p.quantity ?? 1,
      item: {
        id: p.item.id,
        name: p.item.name,
        category: p.item.category,
        description: p.item.description,
        value: p.item.value,
        weight: p.item.weight,
        damage: p.item.damage ?? undefined,
        range: p.item.range ?? undefined,
        attacks: p.item.attacks ?? undefined,
        ammo: p.item.ammo ?? undefined,
        createdAt: p.item.createdAt,
        updatedAt: p.item.updatedAt,
      },
    })),

    contacts: character.contacts.map(c => ({
      id: c.id,
      name: c.name,
      relationship: c.relationship,
      description: c.description ?? '',
    })),

    backstory: character.backstory ?? '',
    ideologyBeliefs: character.ideologyBeliefs ?? '',
    significantPeople: character.significantPeople ?? '',
    meaningfulLocations: character.meaningfulLocations ?? '',
    treasuredPossessions: character.treasuredPossessions ?? '',
    traits: character.traits ?? '',
    injuriesScars: character.injuriesScars ?? '',
    phobiasManias: character.phobiasManias ?? '',

    cash: character.cash ?? '',
    assets: character.assets ?? '',
    notes: character.notes ?? '',
    userId: character.userId,
  }
}
