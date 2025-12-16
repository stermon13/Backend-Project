"use client"

import { useState } from "react"
import {CampaignNav} from '@/components/custom/campaign-nav'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dices, Swords, Sparkles, User } from "lucide-react"
import {CharacteristicRoller} from '@/components/custom/characteristic-roller'
import { CombatTracker } from "@/components/custom/combat-tracker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DiceRoll {
  id: string
  formula: string
  result: number
  breakdown: string
  timestamp: Date
  type: "standard" | "luck" | "sanity" | "damage"
}

interface SkillCheckResult {
  id: string
  character: string
  skill: string
  skillValue: number
  roll: number
  result: "success" | "failure" | "hard" | "extreme" | "critical" | "fumble"
  timestamp: Date
}

interface LuckCheckResult {
  id: string
  character: string
  currentLuck: number
  roll: number
  result: "success" | "failure" | "hard" | "extreme" | "critical" | "fumble"
  timestamp: Date
}

export default function ToolsPage() {
  const [diceFormula, setDiceFormula] = useState("1d100")
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([])
  const [isRolling, setIsRolling] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<string>("")
  const [selectedSkill, setSelectedSkill] = useState<string>("")
  const [skillCheckResults, setSkillCheckResults] = useState<SkillCheckResult[]>([])

  const [selectedLuckCharacter, setSelectedLuckCharacter] = useState<string>("")
  const [currentLuck, setCurrentLuck] = useState(50)
  const [luckCheckResults, setLuckCheckResults] = useState<LuckCheckResult[]>([])

  const quickRolls = [
    { label: "1d100", formula: "1d100" },
    { label: "1d6", formula: "1d6" },
    { label: "1d8", formula: "1d8" },
    { label: "1d10", formula: "1d10" },
    { label: "2d6", formula: "2d6" },
    { label: "1d3", formula: "1d3" },
  ]

  const rollDice = (formula: string, type: DiceRoll["type"] = "standard") => {
    setIsRolling(true)
    setTimeout(() => {
      // Parse dice formula (simple implementation)
      const match = formula.match(/(\d+)d(\d+)(?:\+(\d+))?/i)
      if (!match) {
        setIsRolling(false)
        return
      }

      const [, numDice, sides, bonus] = match
      const rolls: number[] = []
      let total = 0

      for (let i = 0; i < Number.parseInt(numDice); i++) {
        const roll = Math.floor(Math.random() * Number.parseInt(sides)) + 1
        rolls.push(roll)
        total += roll
      }

      if (bonus) {
        total += Number.parseInt(bonus)
      }

      const breakdown = bonus ? `[${rolls.join(", ")}] + ${bonus}` : `[${rolls.join(", ")}]`

      const newRoll: DiceRoll = {
        id: Date.now().toString(),
        formula,
        result: total,
        breakdown,
        timestamp: new Date(),
        type,
      }

      setRollHistory((prev) => [newRoll, ...prev.slice(0, 19)])
      setIsRolling(false)
    }, 300)
  }

  const getRollTypeColor = (type: DiceRoll["type"]) => {
    switch (type) {
      case "luck":
        return "bg-chart-2 text-primary-foreground"
      case "sanity":
        return "bg-chart-5 text-primary-foreground"
      case "damage":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-primary text-primary-foreground"
    }
  }

  // Mock character data
  const characters = [
    {
      id: "1",
      name: "Dr. Eleanor Blackwood",
      luck: 65,
      skills: [
        { name: "Archaeology", value: 75 },
        { name: "History", value: 70 },
        { name: "Library Use", value: 65 },
        { name: "Spot Hidden", value: 60 },
        { name: "Occult", value: 50 },
        { name: "Persuade", value: 60 },
        { name: "Listen", value: 50 },
      ],
    },
    {
      id: "2",
      name: "Detective James Cole",
      luck: 50,
      skills: [
        { name: "Spot Hidden", value: 70 },
        { name: "Psychology", value: 65 },
        { name: "Intimidate", value: 60 },
        { name: "Handgun", value: 65 },
        { name: "Brawl", value: 55 },
        { name: "Fast Talk", value: 50 },
        { name: "Law", value: 45 },
      ],
    },
    {
      id: "3",
      name: "Sarah Whitmore",
      luck: 70,
      skills: [
        { name: "Fast Talk", value: 70 },
        { name: "Charm", value: 65 },
        { name: "Library Use", value: 60 },
        { name: "Psychology", value: 55 },
        { name: "History", value: 50 },
        { name: "Persuade", value: 65 },
        { name: "Spot Hidden", value: 50 },
      ],
    },
  ]

  const getSelectedCharacterSkills = () => {
    const char = characters.find((c) => c.id === selectedCharacter)
    return char?.skills || []
  }

  const performSkillCheck = () => {
    if (!selectedCharacter || !selectedSkill) return

    const character = characters.find((c) => c.id === selectedCharacter)
    const skill = character?.skills.find((s) => s.name === selectedSkill)
    if (!character || !skill) return

    const roll = Math.floor(Math.random() * 100) + 1
    const skillValue = skill.value
    const half = Math.floor(skillValue / 2)
    const fifth = Math.floor(skillValue / 5)

    let result: "success" | "failure" | "hard" | "extreme" | "critical" | "fumble"

    if (roll === 1) {
      result = "critical"
    } else if (roll === 100 || (roll >= 96 && skillValue < 50)) {
      result = "fumble"
    } else if (roll <= fifth) {
      result = "extreme"
    } else if (roll <= half) {
      result = "hard"
    } else if (roll <= skillValue) {
      result = "success"
    } else {
      result = "failure"
    }

    const newResult: SkillCheckResult = {
      id: Date.now().toString(),
      character: character.name,
      skill: selectedSkill,
      skillValue,
      roll,
      result,
      timestamp: new Date(),
    }

    setSkillCheckResults((prev) => [newResult, ...prev.slice(0, 19)])
  }

  const performLuckCheck = () => {
    if (!selectedLuckCharacter) return

    const character = characters.find((c) => c.id === selectedLuckCharacter)
    if (!character) return

    const roll = Math.floor(Math.random() * 100) + 1
    const luckValue = currentLuck
    const half = Math.floor(luckValue / 2)
    const fifth = Math.floor(luckValue / 5)

    let result: "success" | "failure" | "hard" | "extreme" | "critical" | "fumble"

    if (roll === 1) {
      result = "critical"
    } else if (roll === 100 || (roll >= 96 && luckValue < 50)) {
      result = "fumble"
    } else if (roll <= fifth) {
      result = "extreme"
    } else if (roll <= half) {
      result = "hard"
    } else if (roll <= luckValue) {
      result = "success"
    } else {
      result = "failure"
    }

    const newResult: LuckCheckResult = {
      id: Date.now().toString(),
      character: character.name,
      currentLuck: luckValue,
      roll,
      result,
      timestamp: new Date(),
    }

    setLuckCheckResults((prev) => [newResult, ...prev.slice(0, 19)])
  }

  const handleLuckCharacterSelect = (characterId: string) => {
    setSelectedLuckCharacter(characterId)
    const character = characters.find((c) => c.id === characterId)
    if (character) {
      setCurrentLuck(character.luck)
    }
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
    <div className="min-h-screen bg-background">
      <CampaignNav />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Game Tools</h1>
          <p className="text-muted-foreground">Essential tools for running your Call of Cthulhu games</p>
        </div>

        <Tabs defaultValue="dice" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dice" className="gap-2">
              <Dices className="w-4 h-4" />
              Dice Roller
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <User className="w-4 h-4" />
              Skill Checks
            </TabsTrigger>
            <TabsTrigger value="characteristics" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Characteristic Checks
            </TabsTrigger>
            <TabsTrigger value="combat" className="gap-2">
              <Swords className="w-4 h-4" />
              Combat Tracker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dice" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Dice Roller</CardTitle>
                  <CardDescription>Roll dice for skill checks, combat, and more</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Dice Formula</Label>
                    <div className="flex gap-2">
                      <Input
                        value={diceFormula}
                        onChange={(e) => setDiceFormula(e.target.value)}
                        placeholder="e.g., 1d100, 2d6+3"
                        className="flex-1"
                      />
                      <Button onClick={() => rollDice(diceFormula)} disabled={isRolling} className="min-w-24" size="lg">
                        {isRolling ? "Rolling..." : "Roll"}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Quick Rolls</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {quickRolls.map((roll) => (
                        <Button
                          key={roll.formula}
                          variant="outline"
                          onClick={() => {
                            setDiceFormula(roll.formula)
                            rollDice(roll.formula)
                          }}
                          disabled={isRolling}
                        >
                          {roll.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => rollDice("1d100", "luck")}
                        disabled={isRolling}
                        className="flex-1"
                      >
                        Luck Roll
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => rollDice("1d100", "sanity")}
                        disabled={isRolling}
                        className="flex-1"
                      >
                        Sanity Check
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Roll History</CardTitle>
                  <CardDescription>Recent dice rolls</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {rollHistory.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No rolls yet. Start rolling some dice!
                      </div>
                    ) : (
                      rollHistory.map((roll) => (
                        <div
                          key={roll.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Badge className={getRollTypeColor(roll.type)} variant="secondary">
                              {roll.formula}
                            </Badge>
                            <div>
                              <div className="font-mono font-bold text-lg text-foreground">{roll.result}</div>
                              <div className="text-xs text-muted-foreground">{roll.breakdown}</div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">{roll.timestamp.toLocaleTimeString()}</div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Character Skill Checks</CardTitle>
                  <CardDescription>Roll skill checks for your investigators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Character</Label>
                    <Select value={selectedCharacter} onValueChange={setSelectedCharacter}>
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
                      <Label>Select Skill</Label>
                      <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a skill..." />
                        </SelectTrigger>
                        <SelectContent>
                          {getSelectedCharacterSkills().map((skill) => (
                            <SelectItem key={skill.name} value={skill.name}>
                              {skill.name} ({skill.value}%)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button
                    onClick={performSkillCheck}
                    disabled={!selectedCharacter || !selectedSkill}
                    className="w-full"
                    size="lg"
                  >
                    Roll Skill Check
                  </Button>

                  {selectedCharacter && selectedSkill && (
                    <div className="p-4 rounded-lg bg-muted/50 space-y-1">
                      <p className="text-xs text-muted-foreground">Success Thresholds:</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Regular: </span>
                          <span className="font-bold">
                            ≤
                            {
                              characters
                                .find((c) => c.id === selectedCharacter)
                                ?.skills.find((s) => s.name === selectedSkill)?.value
                            }
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Hard: </span>
                          <span className="font-bold">
                            ≤
                            {Math.floor(
                              (characters
                                .find((c) => c.id === selectedCharacter)
                                ?.skills.find((s) => s.name === selectedSkill)?.value || 0) / 2,
                            )}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Extreme: </span>
                          <span className="font-bold">
                            ≤
                            {Math.floor(
                              (characters
                                .find((c) => c.id === selectedCharacter)
                                ?.skills.find((s) => s.name === selectedSkill)?.value || 0) / 5,
                            )}
                          </span>
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
                  <CardTitle className="font-serif">Skill Check History</CardTitle>
                  <CardDescription>Recent skill check results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {skillCheckResults.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No skill checks yet. Select a character and skill to begin!
                      </div>
                    ) : (
                      skillCheckResults.map((check) => (
                        <div
                          key={check.id}
                          className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors space-y-2"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-semibold text-sm text-foreground">{check.character}</div>
                              <div className="text-xs text-muted-foreground">
                                {check.skill} ({check.skillValue}%)
                              </div>
                            </div>
                            <Badge className={getResultColor(check.result)} variant="secondary">
                              {check.result.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono font-bold text-lg">Rolled: {check.roll}</span>
                            <span className="text-muted-foreground">{check.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="characteristics" className="space-y-6">
            <CharacteristicRoller />
          </TabsContent>

          <TabsContent value="combat" className="space-y-6">
            <CombatTracker />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
