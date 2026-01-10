'use server'

import {proxyDeleteMonster, proxyCreateMonster, proxyUpdateMonster} from '@/proxy/monsters'
import {createMonsterSchema, updateMonsterSchema} from '@/schemas/monster.schema'
import {redirect} from 'next/navigation'

export async function deleteMonsterAction(id: string) {
  await proxyDeleteMonster(id)

  redirect('/monsters')
}

export async function createMonsterAction(formData: FormData) {
  const raw = Object.fromEntries(formData)

  const spellIds = formData.getAll('spellIds').map(String)

  const parsed = createMonsterSchema.safeParse({
    name: raw.name,
    category: raw.category,
    description: raw.description,

    str: Number(raw.str),
    con: Number(raw.con),
    siz: Number(raw.siz),
    dex: Number(raw.dex),
    int: Number(raw.int),
    pow: Number(raw.pow),

    hp: Number(raw.hp),
    mp: Number(raw.mp),
    build: Number(raw.build),

    moveRate: raw.moveRate,
    damageBonus: raw.damageBonus,
    armor: raw.armor,
    attacks: raw.attacks,
    skills: raw.skills,
    sanityLoss: raw.sanityLoss,

    spellIds,
  })

  if (!parsed.success) {
    console.error(JSON.stringify(parsed.error.flatten(), null, 2))
    throw new Error('Validation failed')
  }

  await proxyCreateMonster(parsed.data)
  redirect('/monsters')
}

export async function updateMonsterAction(monsterId: string, formData: FormData) {
  const raw = Object.fromEntries(formData.entries())
  const spellIds = formData.getAll('spellIds').map(String)

  const parsedInput = {
    name: raw.name,
    category: raw.category,
    description: raw.description,

    str: Number(raw.str),
    con: Number(raw.con),
    siz: Number(raw.siz),
    dex: Number(raw.dex),
    int: Number(raw.int),
    pow: Number(raw.pow),

    hp: Number(raw.hp),
    mp: Number(raw.mp),
    build: Number(raw.build),

    moveRate: raw.moveRate,
    damageBonus: raw.damageBonus,
    armor: raw.armor,
    attacks: raw.attacks,
    skills: raw.skills,
    sanityLoss: raw.sanityLoss,

    spellIds,
  }

  const result = updateMonsterSchema.safeParse(parsedInput)

  if (!result.success) {
    console.error(JSON.stringify(result.error.flatten(), null, 2))
    throw new Error('Invalid monster data')
  }

  await proxyUpdateMonster(monsterId, result.data)
  redirect(`/monsters/${monsterId}`)
}
