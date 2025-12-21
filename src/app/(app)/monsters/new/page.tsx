"use client"

import type React from "react"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewMonsterPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // UI only - backend will handle actual creation
    router.push("/monsters")
  }

  return (
    <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/monsters">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Monsters
            </Button>
          </Link>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Add New Monster</h1>
          <p className="text-muted-foreground">Create a new creature for your compendium</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="e.g., Deep One, Shoggoth, Cultist" />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue="minor">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minor">Minor Creature</SelectItem>
                      <SelectItem value="major">Major Threat</SelectItem>
                      <SelectItem value="mythos">Mythos Entity</SelectItem>
                      <SelectItem value="humanoid">Humanoid</SelectItem>
                      <SelectItem value="undead">Undead</SelectItem>
                      <SelectItem value="beast">Beast/Animal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the creature's appearance, behavior, and special abilities..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>STR</Label>
                    <Input placeholder="e.g., 75" />
                  </div>
                  <div className="space-y-2">
                    <Label>CON</Label>
                    <Input placeholder="e.g., 65" />
                  </div>
                  <div className="space-y-2">
                    <Label>SIZ</Label>
                    <Input placeholder="e.g., 70" />
                  </div>
                  <div className="space-y-2">
                    <Label>DEX</Label>
                    <Input placeholder="e.g., 50" />
                  </div>
                  <div className="space-y-2">
                    <Label>INT</Label>
                    <Input placeholder="e.g., 60" />
                  </div>
                  <div className="space-y-2">
                    <Label>POW</Label>
                    <Input placeholder="e.g., 55" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Combat Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Hit Points</Label>
                    <Input placeholder="e.g., 13" />
                  </div>
                  <div className="space-y-2">
                    <Label>Magic Points</Label>
                    <Input placeholder="e.g., 10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Move Rate</Label>
                    <Input placeholder="e.g., 8 / 12 flying" />
                  </div>
                  <div className="space-y-2">
                    <Label>Damage Bonus</Label>
                    <Input placeholder="e.g., +1D4" />
                  </div>
                  <div className="space-y-2">
                    <Label>Build</Label>
                    <Input placeholder="e.g., 1" />
                  </div>
                  <div className="space-y-2">
                    <Label>Armor</Label>
                    <Input placeholder="e.g., 2-point hide" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Combat & Abilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Attacks</Label>
                  <Input placeholder="e.g., 2 (claws) or 1 (bite)" />
                </div>

                <div className="space-y-2">
                  <Label>Skills</Label>
                  <Textarea placeholder="e.g., Fighting 50%, Stealth 70%, Swim 80%" rows={2} />
                </div>

                <div className="space-y-2">
                  <Label>Spells & Powers</Label>
                  <Textarea placeholder="List any spells, special abilities, or powers..." rows={2} />
                </div>

                <div className="space-y-2">
                  <Label>Sanity Loss</Label>
                  <Input placeholder="e.g., 0/1D6 or 1D10/1D100" />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-end">
              <Link href="/monsters">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Create Monster</Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
