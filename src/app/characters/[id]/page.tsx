"use client"
import { useParams, useRouter } from "next/navigation"
import {CampaignNav} from '@/components/custom/campaign-nav'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Skull, Brain, Heart, Zap, Plus, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"

export default function CharacterDetailPage() {
  const params = useParams()
  const router = useRouter()

  // Mock data - replace with your backend logic
  const character = {
    id: params.id,
    name: "Dr. Eleanor Blackwood",
    occupation: "Archaeologist",
    age: 34,
    sex: "Female",
    residence: "Boston, Massachusetts",
    birthplace: "London, England",
    portrait: "/woman-archaeologist-1920s.jpg",
    campaign: "The Haunting",

    // Characteristics
    characteristics: {
      STR: { value: 50, half: 25, fifth: 10 },
      CON: { value: 60, half: 30, fifth: 12 },
      SIZ: { value: 55, half: 27, fifth: 11 },
      DEX: { value: 70, half: 35, fifth: 14 },
      APP: { value: 65, half: 32, fifth: 13 },
      INT: { value: 80, half: 40, fifth: 16 },
      POW: { value: 65, half: 32, fifth: 13 },
      EDU: { value: 85, half: 42, fifth: 17 },
    },

    // Derived Attributes
    hitPoints: { current: 12, max: 14 },
    sanity: { current: 58, max: 65, start: 65 },
    magicPoints: { current: 13, max: 13 },
    luck: 60,
    movement: 8,
    build: 0,
    damageBonus: "None",

    // Combat
    combat: {
      dodge: 35,
      weapons: [
        { name: ".32 Revolver", skill: 45, damage: "1D8", range: "15 yds", attacks: 3, ammo: 6 },
        { name: "Knife", skill: 30, damage: "1D4+DB", range: "Touch", attacks: 1 },
        { name: "Brawl", skill: 50, damage: "1D3+DB", range: "Touch", attacks: 1 },
      ],
    },

    // Skills - Chaosium organized
    skills: {
      // Fighting Skills
      fighting: [
        { name: "Brawl", value: 50 },
        { name: "Dodge", value: 35 },
        { name: "Fighting (Axe)", value: 20 },
        { name: "Fighting (Chainsaw)", value: 10 },
        { name: "Fighting (Flail)", value: 10 },
        { name: "Fighting (Garrote)", value: 15 },
        { name: "Fighting (Spear)", value: 20 },
        { name: "Fighting (Sword)", value: 20 },
        { name: "Fighting (Whip)", value: 5 },
      ],
      // Firearms
      firearms: [
        { name: "Handgun", value: 45 },
        { name: "Rifle/Shotgun", value: 30 },
        { name: "Firearms (Bow)", value: 15 },
        { name: "Firearms (Flamethrower)", value: 10 },
        { name: "Firearms (Heavy Weapons)", value: 10 },
        { name: "Firearms (Machine Gun)", value: 10 },
        { name: "Firearms (Submachine Gun)", value: 15 },
      ],
      // Social Skills
      social: [
        { name: "Charm", value: 55 },
        { name: "Fast Talk", value: 40 },
        { name: "Intimidate", value: 35 },
        { name: "Persuade", value: 60 },
      ],
      // Investigation Skills
      investigation: [
        { name: "Archaeology", value: 75 },
        { name: "History", value: 70 },
        { name: "Library Use", value: 65 },
        { name: "Spot Hidden", value: 60 },
        { name: "Track", value: 40 },
      ],
      // Academic Skills
      academic: [
        { name: "Accounting", value: 20 },
        { name: "Anthropology", value: 50 },
        { name: "Appraise", value: 40 },
        { name: "Language (Latin)", value: 60 },
        { name: "Language (Ancient Greek)", value: 55 },
        { name: "Natural World", value: 45 },
        { name: "Occult", value: 50 },
        { name: "Science (Geology)", value: 60 },
        { name: "Computer Use", value: 20 },
        { name: "Electronics", value: 20 },
        { name: "Law", value: 25 },
        { name: "Medicine", value: 30 },
        { name: "Science (Astronomy)", value: 20 },
        { name: "Science (Biology)", value: 20 },
        { name: "Science (Botany)", value: 20 },
        { name: "Science (Chemistry)", value: 20 },
        { name: "Science (Cryptography)", value: 20 },
        { name: "Science (Engineering)", value: 20 },
        { name: "Science (Mathematics)", value: 20 },
        { name: "Science (Meteorology)", value: 20 },
        { name: "Science (Pharmacy)", value: 20 },
        { name: "Science (Physics)", value: 20 },
        { name: "Science (Zoology)", value: 20 },
      ],
      // Practical Skills
      practical: [
        { name: "Art/Craft (Photography)", value: 50 },
        { name: "Drive Auto", value: 40 },
        { name: "First Aid", value: 55 },
        { name: "Mechanical Repair", value: 30 },
        { name: "Navigate", value: 45 },
        { name: "Operate Heavy Machinery", value: 20 },
        { name: "Ride", value: 35 },
        { name: "Survival", value: 40 },
        { name: "Climb", value: 40 },
        { name: "Disguise", value: 20 },
        { name: "Diving", value: 20 },
        { name: "Electrical Repair", value: 20 },
        { name: "Hypnosis", value: 10 },
        { name: "Jump", value: 25 },
        { name: "Locksmith", value: 20 },
        { name: "Pilot (Aircraft)", value: 10 },
        { name: "Pilot (Boat)", value: 20 },
        { name: "Swim", value: 35 },
        { name: "Throw", value: 25 },
      ],
      // Perception Skills
      perception: [
        { name: "Listen", value: 50 },
        { name: "Psychology", value: 45 },
        { name: "Sleight of Hand", value: 25 },
        { name: "Stealth", value: 40 },
        { name: "Read Lips", value: 10 },
      ],
    },

    // Background
    background: {
      backstory:
        "Born in London to a family of academics, Eleanor showed an early fascination with ancient civilizations. After completing her doctorate at Cambridge, she moved to Boston to work with the Museum of Archaeology. Her expertise in ancient texts and artifacts has made her invaluable to expeditions seeking lost knowledge.",
      ideologyBeliefs: "Knowledge must be preserved and shared. The past holds secrets that can enlighten the present.",
      significantPeople: "Professor James Hartford - her mentor and father figure",
      meaningfulLocations: "The British Museum Reading Room - where she first discovered her passion",
      treasuredPossessions: "Her grandfather's compass, an ancient Egyptian scarab amulet",
      traits: "Curious, methodical, brave but cautious",
      injuriesScars: "Scar on left forearm from a tomb collapse in Egypt",
      phobiasManias: "Slight claustrophobia from being trapped in a collapsed excavation",
    },

    // Possessions & Equipment
    gear: {
      weapons: [".32 Revolver with 18 rounds", "Hunting knife"],
      equipment: [
        "Leather journal and pencils",
        "Camera with flash powder",
        "Excavation tools set",
        "Flashlight and spare batteries",
        "Rope (50 ft)",
        "Magnifying glass",
        "First aid kit",
      ],
      cashAssets: "$425 in cash, $2,000 in savings",
    },

    // Allies & Contacts
    connections: [
      { name: "Professor Hartford", relationship: "Mentor", description: "Museum curator, expert in Egyptology" },
      { name: "Inspector Morrison", relationship: "Police Contact", description: "Boston PD, owes her a favor" },
      { name: "Samuel Chen", relationship: "Antiquarian", description: "Dealer in rare artifacts and texts" },
    ],

    // New Possessions array for inventory management
    possessions: [
      {
        id: "1",
        name: "Leather Journal",
        description: "Well-worn journal containing field notes",
        quantity: 1,
        category: "equipment",
      },
      {
        id: "2",
        name: ".38 Revolver",
        description: "Standard issue revolver",
        quantity: 1,
        category: "weapon",
      },
      {
        id: "3",
        name: "Ammunition",
        description: ".38 caliber rounds",
        quantity: 24,
        category: "ammunition",
      },
      {
        id: "4",
        name: "Flashlight",
        description: "Battery-powered torch",
        quantity: 1,
        category: "equipment",
      },
      {
        id: "5",
        name: "First Aid Kit",
        description: "Basic medical supplies",
        quantity: 1,
        category: "medical",
      },
    ],

    cash: "$127.50",
    assets: "Small apartment in Arkham, personal library worth approximately $500",
  }

  const getStatPercentage = (current: number, max: number) => (current / max) * 100

  const getSkillColor = (value: number) => {
    if (value >= 75) return "text-accent"
    if (value >= 50) return "text-chart-4"
    return "text-muted-foreground"
  }

  return (
    <div className="min-h-screen bg-background">
      <CampaignNav />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 gap-2" onClick={() => router.push("/characters")}>
            <ArrowLeft className="w-4 h-4" />
            Back to Characters
          </Button>

          <div className="flex items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={character.portrait || "/placeholder.svg"} alt={character.name} />
              <AvatarFallback className="text-3xl font-serif">
                {character.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-4xl font-serif font-bold text-foreground mb-1">{character.name}</h1>
                  <p className="text-xl text-muted-foreground">{character.occupation}</p>
                </div>
                <Button>Edit Character</Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Age:</span> <span className="ml-2">{character.age}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Sex:</span> <span className="ml-2">{character.sex}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Residence:</span>{" "}
                  <span className="ml-2">{character.residence}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Birthplace:</span>{" "}
                  <span className="ml-2">{character.birthplace}</span>
                </div>
              </div>

              <Badge className="mt-4 bg-primary">Campaign: {character.campaign}</Badge>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Heart className="w-4 h-4 text-destructive" />
                Hit Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {character.hitPoints.current} / {character.hitPoints.max}
              </div>
              <Progress
                value={getStatPercentage(character.hitPoints.current, character.hitPoints.max)}
                className="h-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Brain className="w-4 h-4 text-chart-5" />
                Sanity Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {character.sanity.current} / {character.sanity.max}
              </div>
              <Progress value={getStatPercentage(character.sanity.current, character.sanity.max)} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Starting: {character.sanity.start}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                Magic Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {character.magicPoints.current} / {character.magicPoints.max}
              </div>
              <Progress
                value={getStatPercentage(character.magicPoints.current, character.magicPoints.max)}
                className="h-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Skull className="w-4 h-4" />
                Luck
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{character.luck}</div>
              <div className="text-xs text-muted-foreground mt-2">
                <div>Movement: {character.movement}</div>
                <div>Build: {character.build}</div>
                <div>DB: {character.damageBonus}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="stats" className="w-full space-y-6">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="combat">Combat</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="possessions">Possessions</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Characteristics */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Characteristics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {Object.entries(character.characteristics).map(([key, values]) => (
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

              {/* Derived Attributes */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Derived Attributes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hit Points</span>
                    <span className="text-sm font-bold">
                      {character.hitPoints.current} / {character.hitPoints.max}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sanity Points</span>
                    <span className="text-sm font-bold">
                      {character.sanity.current} / {character.sanity.max}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Magic Points</span>
                    <span className="text-sm font-bold">
                      {character.magicPoints.current} / {character.magicPoints.max}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Luck</span>
                    <span className="text-sm font-bold">{character.luck}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Movement</span>
                    <span className="text-sm font-bold">{character.movement}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Build</span>
                    <span className="text-sm font-bold">{character.build}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Damage Bonus</span>
                    <span className="text-sm font-bold">{character.damageBonus}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fighting Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Fighting Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {character.skills.fighting.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Firearms */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Firearms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {character.skills.firearms.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Social Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {character.skills.social.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Investigation Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Investigation Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {character.skills.investigation.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Academic Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Academic Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {character.skills.academic.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Practical Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Practical Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {character.skills.practical.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className={`text-sm font-bold ${getSkillColor(skill.value)}`}>{skill.value}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Perception Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-lg">Perception Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {character.skills.perception.map((skill, idx) => (
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
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground">Dodge</div>
                  <div className="text-2xl font-bold">{character.combat.dodge}%</div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  {character.combat.weapons.map((weapon, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="font-semibold mb-2">{weapon.name}</div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
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
                        {weapon.ammo && (
                          <div>
                            <span className="text-muted-foreground">Ammo:</span> {weapon.ammo}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Background Tab */}
          <TabsContent value="background">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Backstory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{character.background.backstory}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Ideology & Beliefs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{character.background.ideologyBeliefs}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Significant People</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{character.background.significantPeople}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Meaningful Locations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{character.background.meaningfulLocations}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Treasured Possessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{character.background.treasuredPossessions}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Traits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{character.background.traits}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Injuries & Scars</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{character.background.injuriesScars}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Phobias & Manias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{character.background.phobiasManias}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Allies & Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {character.connections.map((connection, idx) => (
                      <div key={idx} className="pb-3 border-b last:border-0">
                        <div className="font-semibold">{connection.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {connection.relationship} - {connection.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Possessions Tab */}
          <TabsContent value="possessions">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-serif">Inventory</CardTitle>
                      <CardDescription>Carried items and equipment</CardDescription>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Item
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {character.possessions.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{item.name}</span>
                              {item.quantity > 1 && (
                                <Badge variant="secondary" className="text-xs">
                                  x{item.quantity}
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs capitalize">
                                {item.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Cash & Assets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Cash on Hand</Label>
                      <p className="text-xl font-bold font-mono text-foreground">{character.cash}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <Label className="text-xs text-muted-foreground">Assets</Label>
                      <p className="text-sm text-foreground mt-1">{character.assets}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Money
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Asset
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full h-60 p-4 border rounded-lg resize-none"
                  placeholder="Add your notes here..."
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
