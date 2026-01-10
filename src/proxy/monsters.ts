import {getSessionFromCookie} from '@/lib/sessionUtils'
import {getAllMonsters, deleteMonster, createMonster, updateMonster} from '@/dal/monsters'
import type {MonsterDto, MonsterCategory} from '@/types/monster'
import type {SpellDto} from '@/types/spell'
import {prismaClient} from '@/dal/prismaClient'
import type {CreateMonsterInput} from '@/schemas/monster.schema'

export async function proxyGetAllMonsters(): Promise<MonsterDto[]> {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  const monsters = await getAllMonsters()

  return monsters.map(monster => ({
    id: monster.id,
    name: monster.name,
    category: monster.category as MonsterCategory,
    description: monster.description,

    str: monster.str,
    con: monster.con,
    siz: monster.siz,
    dex: monster.dex,
    int: monster.int,
    pow: monster.pow,

    hp: monster.hp,
    mp: monster.mp,
    moveRate: monster.moveRate,
    damageBonus: monster.damageBonus,
    build: monster.build,
    armor: monster.armor,
    attacks: monster.attacks,
    skills: monster.skills,
    sanityLoss: monster.sanityLoss,

    createdAt: monster.createdAt,
    updatedAt: monster.updatedAt,
  }))
}

export async function proxyGetMonsterById(id: string): Promise<MonsterDto | null> {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  const monster = await prismaClient.monster.findUnique({
    where: {id},
    include: {
      spells: true,
    },
  })

  if (!monster) return null

  return {
    id: monster.id,
    name: monster.name,
    category: monster.category as MonsterCategory,
    description: monster.description,

    str: monster.str,
    con: monster.con,
    siz: monster.siz,
    dex: monster.dex,
    int: monster.int,
    pow: monster.pow,

    hp: monster.hp,
    mp: monster.mp,
    moveRate: monster.moveRate,
    damageBonus: monster.damageBonus,
    build: monster.build,
    armor: monster.armor,
    attacks: monster.attacks,
    skills: monster.skills,
    sanityLoss: monster.sanityLoss,

    spells: monster.spells.map(
      spell =>
        ({
          id: spell.id,
          name: spell.name,
          description: spell.description,
          manaCost: spell.manaCost,
          castTime: spell.castTime,
          range: spell.range,
        }) satisfies SpellDto,
    ),

    createdAt: monster.createdAt,
    updatedAt: monster.updatedAt,
  }
}

export async function proxyDeleteMonster(id: string): Promise<void> {
  const session = await getSessionFromCookie(false) // stateless JWT

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  await deleteMonster(id)
}

export async function proxyCreateMonster(data: CreateMonsterInput) {
  const session = await getSessionFromCookie(false)

  if (!session) throw new Error('Unauthorized')
  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  return createMonster(data)
}

export async function proxyUpdateMonster(monsterId: string, data: Parameters<typeof updateMonster>[1]) {
  const session = await getSessionFromCookie(false)

  if (!session) {
    throw new Error('Unauthorized')
  }

  if (session.user.role !== 'Admin' && session.user.role !== 'Keeper') {
    throw new Error('Forbidden')
  }

  return updateMonster(monsterId, data)
}