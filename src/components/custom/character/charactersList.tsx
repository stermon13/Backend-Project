'use client'

import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Plus, MoreVertical, Heart, Brain, Zap} from 'lucide-react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {useRouter} from 'next/navigation'
import React from 'react'
import {deriveStatusFromStats, type EntityStatus} from '@/components/custom/shared/status.logic'
import {StatBar} from '@/components/custom/shared/statBar'

interface CharactersClientProps {
  characters: {
    id: string
    name: string
    occupation: string
    age: number
    campaignName: string | null
    derivedStats: {
      hitPointsCurrent: number
      hitPointsMax: number
      sanityCurrent: number
      sanityMax: number
      magicPointsCurrent: number
      magicPointsMax: number
    } | null
  }[]
}

export default function CharactersList({characters}: CharactersClientProps) {
  const router = useRouter()


  const getStatusColor = (status: EntityStatus) => {
    switch (status) {
      case 'alive':
        return 'bg-accent text-accent-foreground'
      case 'injured':
        return 'bg-chart-4 text-primary-foreground'
      case 'insane':
        return 'bg-chart-5 text-primary-foreground'
      case 'deceased':
        return 'bg-muted text-muted-foreground'
    }
  }

  const getPercentage = (current: number, max: number) => (max === 0 ? 0 : (current / max) * 100)

  const getBarColor = (percentage: number) => {
    if (percentage > 66) return 'bg-accent'
    if (percentage > 33) return 'bg-chart-4'
    return 'bg-destructive'
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Investigators</h1>
            <p className="text-muted-foreground">Manage your character sheets and track their fate</p>
          </div>
          <Button className="gap-2" onClick={() => router.push(`/characters/new`)}>
            <Plus className="w-4 h-4" />
            New Character
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map(character => {
            const stats = character.derivedStats
            const status: EntityStatus = stats ? deriveStatusFromStats(stats) : 'alive'

            return (
              <Card key={character.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getStatusColor(status)}>{status}</Badge>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/characters/${character.id}/edit?from=list`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Export PDF</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <CardTitle className="font-serif text-xl">{character.name}</CardTitle>
                  <CardDescription>
                    {character.occupation}, Age {character.age}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground mb-3">Campaign: {character.campaignName ?? '—'}</div>

                    {stats && (
                      <>
                        {/* HP */}
                        <StatBar
                          icon={<Heart className="w-4 h-4 text-destructive" />}
                          label="Hit Points"
                          current={stats.hitPointsCurrent}
                          max={stats.hitPointsMax}
                          getBarColor={getBarColor}
                          getPercentage={getPercentage}
                        />

                        {/* Sanity */}
                        <StatBar
                          icon={<Brain className="w-4 h-4 text-chart-5" />}
                          label="Sanity"
                          current={stats.sanityCurrent}
                          max={stats.sanityMax}
                          getBarColor={getBarColor}
                          getPercentage={getPercentage}
                        />

                        {/* MP */}
                        <StatBar
                          icon={<Zap className="w-4 h-4 text-accent" />}
                          label="Magic Points"
                          current={stats.magicPointsCurrent}
                          max={stats.magicPointsMax}
                          getBarColor={() => 'bg-accent'}
                          getPercentage={getPercentage}
                        />
                      </>
                    )}
                  </div>

                  <Button
                    className="w-full mt-4"
                    variant="secondary"
                    onClick={() => router.push(`/characters/${character.id}`)}>
                    View Full Sheet
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
