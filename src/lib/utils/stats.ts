export function getStatPercentage(current: number, max: number) {
  return max ? (current / max) * 100 : 0
}

export function getSkillColor(value: number) {
  if (value >= 75) return 'text-accent'
  if (value >= 50) return 'text-chart-4'
  return 'text-muted-foreground'
}
