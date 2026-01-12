export type CombatWeapon = {
  name: string
  skill: number
  damage: string
  range: string
  attacks: number
  ammo?: number
}

export type CombatViewModel = {
  dodge: number
  weapons: CombatWeapon[]
}
