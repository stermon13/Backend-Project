export type CoCCharacteristics = {
  strength: number
  constitution: number
  size: number
  dexterity: number
  power: number
}

export type CoCCurrentStats = {
  hitPointsCurrent: number
  sanityCurrent: number
  magicPointsCurrent: number
  luck: number
}

export type CoCDerivedStats = {
  hitPointsMax: number
  sanityMax: number
  magicPointsMax: number
  movement: number
  build: number
  damageBonus: string
}

export type CoCNextDerivedStats = CoCDerivedStats & {
  hitPointsCurrent: number
  sanityCurrent: number
  magicPointsCurrent: number
  luck: number
}

export function deriveCoCStats(input: {
  characteristics: CoCCharacteristics
  current: CoCCurrentStats
}): CoCNextDerivedStats {
  const {strength: str, constitution: con, size: siz, dexterity: dex, power: pow} = input.characteristics

  // Maxes
  const hitPointsMax = Math.floor((con + siz) / 10)
  const magicPointsMax = Math.floor(pow / 5)
  const sanityMax = pow

  // Movement
  let movement = 8
  if (str > siz && dex > siz) movement = 9
  else if (str < siz && dex < siz) movement = 7

  // Build + Damage Bonus (STR+SIZ)
  const total = str + siz
  let build = 0
  let damageBonus = '0'

  if (total <= 64) {
    build = -2
    damageBonus = '-2'
  } else if (total <= 84) {
    build = -1
    damageBonus = '-1'
  } else if (total <= 124) {
    build = 0
    damageBonus = '0'
  } else if (total <= 164) {
    build = 1
    damageBonus = '+1d4'
  } else {
    build = 2
    damageBonus = '+1d6'
  }

  const hitPointsCurrent = clampInt(input.current.hitPointsCurrent, 0, hitPointsMax)
  const magicPointsCurrent = clampInt(input.current.magicPointsCurrent, 0, magicPointsMax)
  const sanityCurrent = clampInt(input.current.sanityCurrent, 0, sanityMax)

  const luck = clampInt(input.current.luck, 0, 99)

  return {
    hitPointsMax,
    magicPointsMax,
    sanityMax,
    movement,
    build,
    damageBonus,
    hitPointsCurrent,
    magicPointsCurrent,
    sanityCurrent,
    luck,
  }
}

function clampInt(value: number, min: number, max: number) {
  const v = Number.isFinite(value) ? Math.trunc(value) : 0
  return Math.max(min, Math.min(max, v))
}
