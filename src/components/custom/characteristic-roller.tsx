"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CharacteristicResult {
  id: string
  character: string
  characteristic: string
  currentValue: number
  roll: number
  result: "success" | "failure" | "hard" | "extreme" | "critical" | "fumble"
  timestamp: Date
}

const characters = [
  {
    id: "1",
    name: "Dr. Eleanor Blackwood",
    characteristics: {
      STR: 50,
      CON: 60,
      SIZ: 55,
      DEX: 65,
      APP: 70,
      INT: 80,
      POW: 75,
      EDU: 85,
      Luck: 65,
      Sanity: 58,
    },
  },
  {
    id: "2",
    name: "Detective Marcus Cole",
    characteristics: {
      STR: 70,
      CON: 65,
      SIZ: 70,
      DEX: 60,
      APP: 55,
      INT: 70,
      POW: 60,
      EDU: 65,
      Luck: 50,
      Sanity: 45,
    },
  },
  {
    id: "3",
    name: "Thomas Winchester",
    characteristics: {
      STR: 55,
      CON: 50,
      SIZ: 60,
      DEX: 55,
      APP: 65,
      INT: 75,
      POW: 70,
      EDU: 80,
      Luck: 55,
      Sanity: 55,
    },
  },
  {
    id: "4",
    name: "Catherine Devereaux",
    characteristics: {
      STR: 45,
      CON: 55,
      SIZ: 50,
      DEX: 70,
      APP: 80,
      INT: 75,
      POW: 80,
      EDU: 75,
      Luck: 70,
      Sanity: 62,
    },
  },
]

const characteristicNames = [
  { value: "STR", label: "Strength (STR)" },
  { value: "CON", label: "Constitution (CON)" },
  { value: "SIZ", label: "Size (SIZ)" },
  { value: "DEX", label: "Dexterity (DEX)" },
  { value: "APP", label: "Appearance (APP)" },
  { value: "INT", label: "Intelligence (INT)" },
  { value: "POW", label: "Power (POW)" },
  { value: "EDU", label: "Education (EDU)" },
  { value: "Luck", label: "Luck" },
  { value: "Sanity", label: "Sanity" },
]

export function CharacteristicRoller() {
  const [selectedCharacter, setSelectedCharacter] = useState<string>("")
  const [selectedCharacteristic, setSelectedCharacteristic] = useState<string>("")
  const [currentValue, setCurrentValue] = useState(50)
  const [checkResults, setCheckResults] = useState<CharacteristicResult[]>([])

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId)
    setSelectedCharacteristic("")
    const character = characters.find((c) => c.id === characterId)
    if (character) {
      setCurrentValue(50)
    }
  }

  const handleCharacteristicSelect = (characteristic: string) => {
    setSelectedCharacteristic(characteristic)
    const character = characters.find((c) => c.id === selectedCharacter)
    if (character) {
      setCurrentValue(character.characteristics[characteristic as keyof typeof character.characteristics])
    }
  }

  const performCheck = () => {
    if (!selectedCharacter || !selectedCharacteristic) return

    const character = characters.find((c) => c.id === selectedCharacter)
    if (!character) return

    const roll = Math.floor(Math.random() * 100) + 1
    const value = currentValue
    const half = Math.floor(value / 2)
    const fifth = Math.floor(value / 5)

    let result: "success" | "failure" | "hard" | "extreme" | "critical" | "fumble"

    if (roll === 1) {
      result = "critical"
    } else if (roll === 100 || (roll >= 96 && value < 50)) {
      result = "fumble"
    } else if (roll <= fifth) {
      result = "extreme"
    } else if (roll <= half) {
      result = "hard"
    } else if (roll <= value) {
      result = "success"
    } else {
      result = "failure"
    }

    const newResult: CharacteristicResult = {
      id: Date.now().toString(),
      character: character.name,
      characteristic: selectedCharacteristic,
      currentValue: value,
      roll,
      result,
      timestamp: new Date(),
    }

    setCheckResults((prev) => [newResult, ...prev.slice(0, 19)])
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case "critical":
        return "bg-chart-4 text-primary-foreground"
      case "extreme":
        return "bg-primary text-primary-foreground"
      case "hard":
        return "bg-chart-2 text-primary-foreground"
      case "success":
        return "bg-chart-3 text-primary-foreground"
      case "failure":
        return "bg-muted text-muted-foreground"
      case "fumble":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Characteristic Checks
          </CardTitle>
          <CardDescription>Roll checks for Luck, Sanity, STR, INT, and other characteristics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Investigator</Label>
            <Select value={selectedCharacter} onValueChange={handleCharacterSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an investigator..." />
              </SelectTrigger>
              <SelectContent>
                {characters.map((char) => (
                  <SelectItem key={char.id} value={char.id}>
                    {char.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCharacter && (
            <div className="space-y-2">
              <Label>Select Characteristic</Label>
              <Select value={selectedCharacteristic} onValueChange={handleCharacteristicSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a characteristic..." />
                </SelectTrigger>
                <SelectContent>
                  {characteristicNames.map((char) => (
                    <SelectItem key={char.value} value={char.value}>
                      {char.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedCharacter && selectedCharacteristic && (
            <div className="space-y-2">
              <Label>Current Value</Label>
              <Input
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(Number.parseInt(e.target.value) || 0)}
                min="0"
                max="99"
              />
            </div>
          )}

          <Button
            onClick={performCheck}
            disabled={!selectedCharacter || !selectedCharacteristic}
            className="w-full"
            size="lg"
          >
            Roll Check
          </Button>

          {selectedCharacter && selectedCharacteristic && (
            <div className="p-4 rounded-lg bg-muted/50 space-y-1">
              <p className="text-xs text-muted-foreground">Success Thresholds:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Regular: </span>
                  <span className="font-bold">≤{currentValue}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Hard: </span>
                  <span className="font-bold">≤{Math.floor(currentValue / 2)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Extreme: </span>
                  <span className="font-bold">≤{Math.floor(currentValue / 5)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Critical: </span>
                  <span className="font-bold">1</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Check History</CardTitle>
          <CardDescription>Recent characteristic check results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {checkResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No checks yet. Select a character and characteristic to begin!
              </div>
            ) : (
              checkResults.map((check) => (
                <div key={check.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">{check.character}</div>
                      <div className="text-xs text-muted-foreground">
                        {check.characteristic} ({check.currentValue})
                      </div>
                    </div>
                    <Badge className={getResultColor(check.result)} variant="secondary">
                      {check.result.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Rolled: {check.roll}</span>
                    <span className="text-muted-foreground">{check.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
