import React from 'react'

interface StatBarProps {
  icon: React.ReactNode
  label: string
  current: number
  max: number
  getPercentage: (current: number, max: number) => number
  getBarColor: (percentage: number) => string
}

export function StatBar({icon, label, current, max, getPercentage, getBarColor}: StatBarProps) {
  const percentage = getPercentage(current, max)

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <span className="text-muted-foreground">
          {current}/{max}
        </span>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full transition-all ${getBarColor(percentage)}`} style={{width: `${percentage}%`}} />
      </div>
    </div>
  )
}
