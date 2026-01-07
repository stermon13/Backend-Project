export type EntityStatus = 'alive' | 'injured' | 'insane' | 'deceased'

export function deriveStatusFromStats(stats: {
  hitPointsCurrent: number
  hitPointsMax: number
  sanityCurrent?: number
}): EntityStatus {
  if (stats.hitPointsCurrent <= 0) return 'deceased'
  if (stats.sanityCurrent !== undefined && stats.sanityCurrent <= 0) return 'insane'
  if (stats.hitPointsCurrent < stats.hitPointsMax) return 'injured'
  return 'alive'
}
