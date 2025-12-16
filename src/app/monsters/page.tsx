"use client"

import {CampaignNav} from '@/components/custom/campaign-nav'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Skull } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function MonstersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const monsters = [
    {
      id: "1",
      name: "Deep One",
      category: "mythos" as const,
      hp: "21",
      mp: "10",
      moveRate: "8 / 10 swimming",
      armor: "2-point scales and hide",
      sanityLoss: "0/1D6",
      description:
        "Amphibious humanoids that serve the Great Old Ones. They possess fish-like features and an unsettling intelligence.",
    },
    {
      id: "2",
      name: "Ghoul",
      category: "undead" as const,
      hp: "13",
      mp: "10",
      moveRate: "8 / 12 burrow",
      armor: "None, but regenerates 1 HP per round",
      sanityLoss: "0/1D6",
      description:
        "Corpse-eating creatures that dwell in graveyards and underground tunnels. Former humans twisted by forbidden practices.",
    },
    {
      id: "3",
      name: "Byakhee",
      category: "mythos" as const,
      hp: "16",
      mp: "12",
      moveRate: "8 / 20 flying",
      armor: "2-point hide",
      sanityLoss: "1/1D6",
      description:
        "Interstellar creatures often summoned to serve as mounts. They resemble hideous bat-winged hybrids with insectoid features.",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "mythos":
        return "bg-destructive text-destructive-foreground"
      case "major":
        return "bg-chart-4 text-primary-foreground"
      case "minor":
        return "bg-chart-2 text-primary-foreground"
      case "humanoid":
        return "bg-chart-3 text-primary-foreground"
      case "undead":
        return "bg-chart-5 text-primary-foreground"
      case "beast":
        return "bg-chart-1 text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filterByCategory = (category: string) => {
    if (category === "all") return monsters
    return monsters.filter((monster) => monster.category === category)
  }

  return (
    <div className="min-h-screen bg-background">
      <CampaignNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Monster Compendium</h1>
            <p className="text-muted-foreground">Manage creatures, horrors, and adversaries for your campaigns</p>
          </div>
          <Link href="/monsters/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Monster
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <Label className="mb-2 block">Filter by Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Monsters</SelectItem>
              <SelectItem value="minor">Minor Creatures</SelectItem>
              <SelectItem value="major">Major Threats</SelectItem>
              <SelectItem value="mythos">Mythos Entities</SelectItem>
              <SelectItem value="humanoid">Humanoids</SelectItem>
              <SelectItem value="undead">Undead</SelectItem>
              <SelectItem value="beast">Beasts/Animals</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterByCategory(selectedCategory).length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Skull className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No monsters in this category yet.</p>
            </div>
          ) : (
            filterByCategory(selectedCategory).map((monster) => (
              <Card key={monster.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(monster.category)}>{monster.category}</Badge>
                  </div>
                  <CardTitle className="font-serif text-lg">{monster.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{monster.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>HP: {monster.hp}</span>
                      <span>MP: {monster.mp}</span>
                      <span>Move: {monster.moveRate}</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium">Armor:</span> {monster.armor}
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium">Sanity Loss:</span> {monster.sanityLoss}
                    </div>
                  </div>
                  <Link href={`/monsters/${monster.id}`}>
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
