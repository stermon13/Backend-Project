"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, Trash2, Heart, Swords, Activity } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Combatant {
  id: string
  name: string
  type: "player" | "npc" | "monster"
  initiative: number
  hp: { current: number; max: number }
  ac: number
  status: "active" | "injured" | "unconscious" | "dead"
}

export function CombatTracker() {
  const [combatants, setCombatants] = useState<Combatant[]>([
    {
      id: "1",
      name: "Dr. Eleanor Blackwood",
      type: "player",
      initiative: 15,
      hp: { current: 12, max: 14 },
      ac: 10,
      status: "active",
    },
    {
      id: "2",
      name: "Detective Marcus Cole",
      type: "player",
      initiative: 12,
      hp: { current: 8, max: 15 },
      ac: 11,
      status: "injured",
    },
    {
      id: "3",
      name: "Deep One",
      type: "monster",
      initiative: 14,
      hp: { current: 18, max: 25 },
      ac: 12,
      status: "active",
    },
  ])

  const [newCombatant, setNewCombatant] = useState({
    name: "",
    type: "npc" as Combatant["type"],
    initiative: 10,
    hp: 10,
    ac: 10,
  })

  const sortedCombatants = [...combatants].sort((a, b) => b.initiative - a.initiative)

  const addCombatant = () => {
    if (!newCombatant.name) return

    const combatant: Combatant = {
      id: Date.now().toString(),
      name: newCombatant.name,
      type: newCombatant.type,
      initiative: newCombatant.initiative,
      hp: { current: newCombatant.hp, max: newCombatant.hp },
      ac: newCombatant.ac,
      status: "active",
    }

    setCombatants([...combatants, combatant])
    setNewCombatant({ name: "", type: "npc", initiative: 10, hp: 10, ac: 10 })
  }

  const updateHP = (id: string, change: number) => {
    setCombatants(
      combatants.map((c) => {
        if (c.id !== id) return c
        const newHP = Math.max(0, Math.min(c.hp.max, c.hp.current + change))
        let status = c.status
        if (newHP === 0) status = "dead"
        else if (newHP <= c.hp.max * 0.25) status = "unconscious"
        else if (newHP <= c.hp.max * 0.5) status = "injured"
        else status = "active"
        return { ...c, hp: { ...c.hp, current: newHP }, status }
      }),
    )
  }

  const removeCombatant = (id: string) => {
    setCombatants(combatants.filter((c) => c.id !== id))
  }

  const getTypeColor = (type: Combatant["type"]) => {
    switch (type) {
      case "player":
        return "bg-accent text-accent-foreground"
      case "monster":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getStatusColor = (status: Combatant["status"]) => {
    switch (status) {
      case "active":
        return "bg-accent text-accent-foreground"
      case "injured":
        return "bg-chart-4 text-primary-foreground"
      case "unconscious":
        return "bg-chart-5 text-primary-foreground"
      case "dead":
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Swords className="w-5 h-5" />
                  Combat Tracker
                </CardTitle>
                <CardDescription>Track initiative, HP, and status for combat encounters</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Combatant
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-serif">Add Combatant</DialogTitle>
                    <DialogDescription>Add a new character or creature to the combat tracker</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={newCombatant.name}
                        onChange={(e) => setNewCombatant({ ...newCombatant, name: e.target.value })}
                        placeholder="Combatant name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <select
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                          value={newCombatant.type}
                          onChange={(e) =>
                            setNewCombatant({ ...newCombatant, type: e.target.value as Combatant["type"] })
                          }
                        >
                          <option value="player">Player</option>
                          <option value="npc">NPC</option>
                          <option value="monster">Monster</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Initiative</Label>
                        <Input
                          type="number"
                          value={newCombatant.initiative}
                          onChange={(e) =>
                            setNewCombatant({ ...newCombatant, initiative: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Hit Points</Label>
                        <Input
                          type="number"
                          value={newCombatant.hp}
                          onChange={(e) => setNewCombatant({ ...newCombatant, hp: Number.parseInt(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Armor Class</Label>
                        <Input
                          type="number"
                          value={newCombatant.ac}
                          onChange={(e) => setNewCombatant({ ...newCombatant, ac: Number.parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <Button onClick={addCombatant} className="w-full">
                      Add to Combat
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sortedCombatants.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No combatants added yet</p>
                </div>
              ) : (
                sortedCombatants.map((combatant, index) => (
                  <div
                    key={combatant.id}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {combatant.initiative}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-serif font-semibold text-foreground">{combatant.name}</span>
                        <Badge className={getTypeColor(combatant.type)} variant="secondary">
                          {combatant.type}
                        </Badge>
                        <Badge className={getStatusColor(combatant.status)} variant="outline">
                          {combatant.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>AC: {combatant.ac}</span>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>
                            {combatant.hp.current}/{combatant.hp.max}
                          </span>
                        </div>
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all"
                            style={{ width: `${(combatant.hp.current / combatant.hp.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateHP(combatant.id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateHP(combatant.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeCombatant(combatant.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-base">Combat Quick Reference</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Combat Round</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>1. Determine Initiative (DEX roll)</p>
                <p>2. Declare Actions</p>
                <p>3. Resolve Actions in Initiative Order</p>
                <p>4. End of Round Effects</p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h4 className="text-sm font-semibold text-foreground">Attack Modifiers</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Point Blank: +50%</p>
                <p>Close Range: +25%</p>
                <p>Long Range: No modifier</p>
                <p>Cover (Partial): -20%</p>
                <p>Cover (Full): -40%</p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h4 className="text-sm font-semibold text-foreground">Status Effects</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Injured: Below 50% HP</p>
                <p>Unconscious: Below 25% HP or 0 HP</p>
                <p>Dead: Major wound or Keeper discretion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
