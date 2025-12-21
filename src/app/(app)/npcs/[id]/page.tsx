"use client"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Skull, Brain, Heart, Zap, AlertTriangle } from "lucide-react"

export default function NPCDetailPage() {
  const params = useParams()
  const router = useRouter()

  // Mock data - replace with your backend logic
  const npc = {
    id: params.id,
    name: "Walter Corbitt",
    role: "Antagonist",
    type: "Undead Sorcerer",
    campaign: "The Haunting",
    portrait: "/elderly-victorian-gentleman-ghost.jpg",
    alive: false,

    // Characteristics
    characteristics: {
      STR: { value: 75, half: 37, fifth: 15 },
      CON: { value: 0, half: 0, fifth: 0 },
      SIZ: { value: 65, half: 32, fifth: 13 },
      DEX: { value: 40, half: 20, fifth: 8 },
      APP: { value: 10, half: 5, fifth: 2 },
      INT: { value: 85, half: 42, fifth: 17 },
      POW: { value: 90, half: 45, fifth: 18 },
      EDU: { value: 80, half: 40, fifth: 16 },
    },

    // Derived Attributes
    hitPoints: { current: 13, max: 13 },
    sanity: { current: 0, max: 0, start: 0 },
    magicPoints: { current: 18, max: 18 },
    luck: 0,
    movement: 6,
    build: 1,
    damageBonus: "+1D4",

    // Combat
    combat: {
      dodge: 20,
      armor: "None (immune to mundane weapons)",
      weapons: [
        { name: "Spectral Touch", skill: 60, damage: "1D6+DB + drain 1D10 POW", range: "Touch", attacks: 1 },
        { name: "Death Curse", skill: 75, damage: "Special", range: "50 yards", attacks: 1 },
      ],
    },

    // Skills
    skills: {
      fighting: [
        { name: "Brawl", value: 60 },
        { name: "Dodge", value: 20 },
      ],
      social: [
        { name: "Charm", value: 15 },
        { name: "Intimidate", value: 85 },
        { name: "Persuade", value: 40 },
      ],
      investigation: [
        { name: "History", value: 80 },
        { name: "Library Use", value: 75 },
        { name: "Spot Hidden", value: 65 },
      ],
      academic: [
        { name: "Anthropology", value: 60 },
        { name: "Archaeology", value: 55 },
        { name: "Language (Latin)", value: 75 },
        { name: "Language (Ancient Greek)", value: 70 },
        { name: "Occult", value: 90 },
      ],
      perception: [
        { name: "Listen", value: 70 },
        { name: "Psychology", value: 65 },
      ],
    },

    // Spells & Powers
    spells: [
      { name: "Bind Soul", description: "Can trap souls of the dying in his house" },
      { name: "Command Corpse", description: "Animates dead bodies within 100 yards" },
      { name: "Dread Curse of Azathoth", description: "Inflicts madness and death on a target" },
      { name: "Spectral Manifestation", description: "Can become invisible or semi-corporeal at will" },
      { name: "Ward of Protection", description: "Magical barriers throughout his house" },
    ],

    // Background
    background: {
      backstory:
        "Walter Corbitt was a successful merchant in 1830s Boston who became obsessed with death and the occult. He built his house on cursed ground and founded a death cult that performed horrific rituals in the basement. After his physical death in 1866, his spirit remained bound to the house, continuing his dark work from beyond the grave.",
      motivations:
        "Corbitt seeks to extend his power beyond death, collecting souls to fuel his transformation into something greater. He views living investigators as both threats and opportunities for his dark designs.",
      weaknesses:
        "Can be temporarily banished with proper rituals. His power is tied to the house and specific ritual objects.",
      tactics:
        "Prefers to terrify and disorient investigators before attacking. Uses cultist minions when possible. Will retreat if seriously threatened, only to return when victims are weakened.",
    },

    // Keeper Notes
    keeperNotes: {
      personality: "Cold, calculating, patient. Speaks in archaic English. Takes pleasure in the fear of mortals.",
      appearance:
        "A gaunt, spectral figure in Victorian funeral attire. Pale translucent skin, hollow eyes that burn with unholy light, and fingers ending in blackened nails. Surrounded by a palpable aura of dread and decay.",
      encounterTips: [
        "Build tension with sounds and shadows before revealing Corbitt",
        "He should feel immortal and powerful, but not invincible",
        "Use his knowledge of the house to strategic advantage",
        "Consider having him flee rather than fight to the death",
      ],
      connectionToStory:
        "Corbitt is the primary antagonist. His cult activities drew investigators to the house, and he views their investigation as both an intrusion and an opportunity to claim new victims.",
    },
  }

  const getStatPercentage = (current: number, max: number) => (max === 0 ? 0 : (current / max) * 100)

  const getSkillColor = (value: number) => {
    if (value >= 75) return "text-accent"
    if (value >= 50) return "text-chart-4"
    return "text-muted-foreground"
  }

  return (
    <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 gap-2" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex items-start gap-6">
            <Avatar className="w-32 h-32 border-2 border-destructive">
              <AvatarImage src={npc.portrait || "/placeholder.svg"} alt={npc.name} />
              <AvatarFallback className="text-3xl font-serif bg-destructive/10">
                {npc.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-serif font-bold text-foreground">{npc.name}</h1>
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {npc.role}
                    </Badge>
                  </div>
                  <p className="text-xl text-muted-foreground">{npc.type}</p>
                </div>
                <Button>Edit NPC</Button>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <Badge className="bg-primary">Campaign: {npc.campaign}</Badge>
                <Badge variant={npc.alive ? "default" : "secondary"}>{npc.alive ? "Alive" : "Deceased/Undead"}</Badge>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-destructive/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 text-destructive" />
                Hit Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {npc.hitPoints.current} / {npc.hitPoints.max}
              </div>
              <Progress value={getStatPercentage(npc.hitPoints.current, npc.hitPoints.max)} className="h-2" />
            </CardContent>
          </Card>

          <Card className="border-chart-5/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Brain className="w-4 h-4 text-chart-5" />
                Sanity Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {npc.sanity.max === 0 ? "N/A" : `${npc.sanity.current} / ${npc.sanity.max}`}
              </div>
              {npc.sanity.max > 0 && (
                <Progress value={getStatPercentage(npc.sanity.current, npc.sanity.max)} className="h-2" />
              )}
              {npc.sanity.max === 0 && <p className="text-xs text-muted-foreground mt-2">Sanity loss: 1D6/1D20</p>}
            </CardContent>
          </Card>

          <Card className="border-accent/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                Magic Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {npc.magicPoints.current} / {npc.magicPoints.max}
              </div>
              <Progress value={getStatPercentage(npc.magicPoints.current, npc.magicPoints.max)} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Skull className="w-4 h-4" />
                Combat Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs space-y-1">
                <div>
                  <span className="text-muted-foreground">Movement:</span> {npc.movement}
                </div>
                <div>
                  <span className="text-muted-foreground">Build:</span> {npc.build}
                </div>
                <div>
                  <span className="text-muted-foreground">DB:</span> {npc.damageBonus}
                </div>
                <div>
                  <span className="text-muted-foreground">Armor:</span> {npc.combat.armor}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="characteristics" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="characteristics">Stats</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="combat">Combat</TabsTrigger>
            <TabsTrigger value="spells">Spells & Powers</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="keeper">Keeper Notes</TabsTrigger>
          </TabsList>

          {/* Characteristics Tab */}
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Object.entries(npc.characteristics).map(([key, values]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm text-muted-foreground mb-2">{key}</div>
                      <div className="text-4xl font-bold mb-2">{values.value}</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Half: {values.half}</div>
                        <div>Fifth: {values.fifth}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Fighting Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {npc.skills.fighting.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Social Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {npc.skills.social.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Investigation Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {npc.skills.investigation.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Academic Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {npc.skills.academic.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Perception Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {npc.skills.perception.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Combat Tab */}
          <TabsContent value="combat">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Weapons & Combat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Dodge</div>
                    <div className="text-2xl font-bold">{npc.combat.dodge}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Armor</div>
                    <div className="text-lg font-bold">{npc.combat.armor}</div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  {npc.combat.weapons.map((weapon, idx) => (
                    <div key={idx} className="p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                      <div className="font-semibold mb-2">{weapon.name}</div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Skill:</span> {weapon.skill}%
                        </div>
                        <div>
                          <span className="text-muted-foreground">Damage:</span> {weapon.damage}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Range:</span> {weapon.range}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Attacks:</span> {weapon.attacks}/round
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Spells & Powers Tab */}
          <TabsContent value="spells">
            <div className="space-y-4">
              {npc.spells.map((spell, index) => (
                <Card key={index} className="border-accent/30">
                  <CardHeader>
                    <CardTitle className="font-serif text-lg flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" />
                      {spell.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{spell.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Background Tab */}
          <TabsContent value="background">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Backstory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{npc.background.backstory}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Motivations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{npc.background.motivations}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Weaknesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{npc.background.weaknesses}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Tactics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{npc.background.tactics}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Keeper Notes Tab */}
          <TabsContent value="keeper">
            <div className="space-y-6">
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-serif">Personality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{npc.keeperNotes.personality}</p>
                </CardContent>
              </Card>

              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-serif">Appearance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{npc.keeperNotes.appearance}</p>
                </CardContent>
              </Card>

              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-serif">Connection to Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{npc.keeperNotes.connectionToStory}</p>
                </CardContent>
              </Card>

              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-serif">Encounter Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {npc.keeperNotes.encounterTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
