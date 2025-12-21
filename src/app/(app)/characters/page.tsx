"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreVertical, Heart, Brain, Zap } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface Character {
  id: string
  name: string
  occupation: string
  age: number
  campaign: string
  hp: { current: number; max: number }
  sanity: { current: number; max: number }
  mp: { current: number; max: number }
  status: "alive" | "injured" | "insane" | "deceased"
}

export default function CharactersPage() {
  const router = useRouter()

  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "1",
      name: "Dr. Eleanor Blackwood",
      occupation: "Archaeologist",
      age: 34,
      campaign: "The Haunting",
      hp: { current: 12, max: 14 },
      sanity: { current: 58, max: 65 },
      mp: { current: 13, max: 13 },
      status: "alive",
    },
    {
      id: "2",
      name: "Detective Marcus Cole",
      occupation: "Private Investigator",
      age: 42,
      campaign: "The Haunting",
      hp: { current: 8, max: 15 },
      sanity: { current: 45, max: 60 },
      mp: { current: 12, max: 12 },
      status: "injured",
    },
    {
      id: "3",
      name: "Professor Arthur Whitmore",
      occupation: "Occult Scholar",
      age: 56,
      campaign: "Masks of Nyarlathotep",
      hp: { current: 10, max: 10 },
      sanity: { current: 28, max: 70 },
      mp: { current: 14, max: 14 },
      status: "insane",
    },
  ])

  const getStatusColor = (status: Character["status"]) => {
    switch (status) {
      case "alive":
        return "bg-accent text-accent-foreground"
      case "injured":
        return "bg-chart-4 text-primary-foreground"
      case "insane":
        return "bg-chart-5 text-primary-foreground"
      case "deceased":
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatPercentage = (current: number, max: number) => {
    return (current / max) * 100
  }

  const getStatColor = (percentage: number) => {
    if (percentage > 66) return "bg-accent"
    if (percentage > 33) return "bg-chart-4"
    return "bg-destructive"
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Investigators</h1>
            <p className="text-muted-foreground">Manage your character sheets and track their fate</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Character
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <Card key={character.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getStatusColor(character.status)}>{character.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
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
                  <div className="text-xs text-muted-foreground mb-3">Campaign: {character.campaign}</div>

                  {/* HP Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-destructive" />
                        <span className="text-foreground">Hit Points</span>
                      </div>
                      <span className="text-muted-foreground">
                        {character.hp.current}/{character.hp.max}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${getStatColor(
                          getStatPercentage(character.hp.current, character.hp.max),
                        )}`}
                        style={{ width: `${getStatPercentage(character.hp.current, character.hp.max)}%` }}
                      />
                    </div>
                  </div>

                  {/* Sanity Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-chart-5" />
                        <span className="text-foreground">Sanity</span>
                      </div>
                      <span className="text-muted-foreground">
                        {character.sanity.current}/{character.sanity.max}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${getStatColor(
                          getStatPercentage(character.sanity.current, character.sanity.max),
                        )}`}
                        style={{
                          width: `${getStatPercentage(character.sanity.current, character.sanity.max)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* MP Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-foreground">Magic Points</span>
                      </div>
                      <span className="text-muted-foreground">
                        {character.mp.current}/{character.mp.max}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${getStatPercentage(character.mp.current, character.mp.max)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-4"
                  variant="secondary"
                  onClick={() => router.push(`/characters/${character.id}`)}
                >
                  View Full Sheet
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
