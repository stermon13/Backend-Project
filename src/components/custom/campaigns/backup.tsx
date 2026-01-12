'use client'
import {useParams, useRouter} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Separator} from '@/components/ui/separator'
import {ArrowLeft, Users, Calendar, BookOpen, Eye, Brain, Heart, UserX} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function CampaignDetail() {
  const params = useParams()
  const router = useRouter()

  // Mock data - replace with your backend logic
  const campaign = {
    id: params.id,
    title: 'The Haunting',
    edition: '1920s',
    description:
      'A classic introduction to the horrors that await investigators in the Corbitt House. When the investigators are asked to look into a supposedly haunted house, they discover a dark history of murder, madness, and unspeakable rituals.',
    status: 'active',
    startedDate: 'January 15, 2024',
    sessionCount: 3,
    keeper: 'Sarah Johnson',
  }

  const investigators = [
    {
      id: '1',
      name: 'Dr. Eleanor Blackwood',
      occupation: 'Archaeologist',
      portrait: '/woman-archaeologist-1920s.jpg',
      hp: {current: 12, max: 14},
      sanity: {current: 58, max: 65},
      status: 'alive',
    },
    {
      id: '2',
      name: 'Detective Marcus Cole',
      occupation: 'Private Investigator',
      portrait: '/detective-man-1920s.jpg',
      hp: {current: 8, max: 15},
      sanity: {current: 45, max: 60},
      status: 'injured',
    },
    {
      id: '3',
      name: 'Thomas Winchester',
      occupation: 'Journalist',
      portrait: '/journalist-man-1920s.jpg',
      hp: {current: 11, max: 11},
      sanity: {current: 55, max: 55},
      status: 'alive',
    },
    {
      id: '4',
      name: 'Catherine Devereaux',
      occupation: 'Dilettante',
      portrait: '/wealthy-woman-1920s.jpg',
      hp: {current: 9, max: 9},
      sanity: {current: 62, max: 70},
      status: 'alive',
    },
  ]

  const storyDetails = {
    synopsis:
      "The Corbitt House stands as a monument to madness in Boston's South Side. Built in 1835 by Walter Corbitt, a respected merchant who dabbled in forbidden knowledge, the house has seen countless tragedies. The current owner seeks brave souls to investigate strange noises and unexplained phenomena.",

    currentSituation:
      "The investigators have just completed their second visit to the Corbitt House. They've discovered evidence of cult activity in the basement and narrowly escaped an encounter with something supernatural. Detective Cole was injured during the escape, and the group is regrouping to plan their next move.",

    keyNPCs: [
      {
        id: 'walter-corbitt',
        name: 'Walter Corbitt',
        role: 'Antagonist',
        description: 'Former owner (deceased 1866). Leader of a death cult. His spirit may still haunt the house.',
        portrait: '/elderly-victorian-gentleman-ghost.jpg',
      },
      {
        id: 'elias-macario',
        name: 'Elias Macario',
        role: 'Quest Giver',
        description: "Current owner. Desperate to be rid of the property. Knows more than he's telling.",
        portrait: '/worried-middle-aged-man-1920s.jpg',
      },
      {
        id: 'chapel-congregation',
        name: 'The Chapel Congregation',
        role: 'Minions',
        description: 'Mysterious cultists who meet in the chapel behind the house on new moon nights.',
        portrait: '/hooded-cultist-figures-dark.jpg',
      },
    ],

    importantLocations: [
      {
        name: 'The Corbitt House',
        description:
          'A three-story Victorian mansion at 1810 South Street. Rotting from within, filled with dark secrets.',
      },
      {
        name: 'The Basement',
        description: 'Contains a hidden room with ritual materials and disturbing writings on the walls.',
      },
      {
        name: 'The Chapel',
        description: 'A small abandoned church behind the house. Site of cult gatherings.',
      },
    ],

    clues: [
      "Corbitt's diary detailing his descent into madness",
      'Newspaper clippings about mysterious deaths in the house',
      'Strange symbols carved into basement walls',
      'A locked chest containing ritual implements',
      'Records of property transfers showing suspicious circumstances',
    ],
  }

  const getStatPercentage = (current: number, max: number) => (current / max) * 100

  const handleRemoveInvestigator = (investigatorId: string) => {
    // Backend logic would go here
    console.log('[v0] Removing investigator:', investigatorId)
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 gap-2" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-serif font-bold text-foreground">{campaign.title}</h1>
                <Badge className="bg-accent text-accent-foreground">{campaign.status}</Badge>
              </div>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium">Edition:</span> {campaign.edition}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Started:</span> {campaign.startedDate}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Keeper:</span> {campaign.keeper}
                </div>
              </div>
            </div>
            <Button>Edit Campaign</Button>
          </div>

          <p className="mt-4 text-muted-foreground max-w-3xl">{campaign.description}</p>
        </div>

        <Separator className="my-8" />

        {/* Investigators Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-foreground">Investigators</h2>
            <Button variant="outline">Add Investigator</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {investigators.map(investigator => (
              <Card key={investigator.id} className="hover:border-primary/50 transition-colors">
                <CardHeader className="text-center pb-3">
                  <Avatar className="w-24 h-24 mx-auto mb-3">
                    <AvatarImage src={investigator.portrait || '/placeholder.svg'} alt={investigator.name} />
                    <AvatarFallback className="text-2xl font-serif">
                      {investigator.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="font-serif text-lg">{investigator.name}</CardTitle>
                  <CardDescription className="text-xs">{investigator.occupation}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* HP Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-destructive" />
                        <span>HP</span>
                      </div>
                      <span className="text-muted-foreground">
                        {investigator.hp.current}/{investigator.hp.max}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-destructive transition-all"
                        style={{width: `${getStatPercentage(investigator.hp.current, investigator.hp.max)}%`}}
                      />
                    </div>
                  </div>

                  {/* Sanity Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Brain className="w-3 h-3 text-chart-5" />
                        <span>SAN</span>
                      </div>
                      <span className="text-muted-foreground">
                        {investigator.sanity.current}/{investigator.sanity.max}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-chart-5 transition-all"
                        style={{
                          width: `${getStatPercentage(investigator.sanity.current, investigator.sanity.max)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      className="gap-2"
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(`/characters/${investigator.id}`)}>
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="gap-2">
                          <UserX className="w-3 h-3" />
                          Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Investigator?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove {investigator.name} from this campaign? This action cannot
                            be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemoveInvestigator(investigator.id)}>
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Story Details Section */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Story Details</h2>

          <Tabs defaultValue="synopsis" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="synopsis">Synopsis</TabsTrigger>
              <TabsTrigger value="situation">Current Situation</TabsTrigger>
              <TabsTrigger value="npcs">NPCs</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="clues">Clues</TabsTrigger>
            </TabsList>

            <TabsContent value="synopsis">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Campaign Synopsis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{storyDetails.synopsis}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="situation">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Current Situation</CardTitle>
                  <CardDescription>Where the story stands now</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{storyDetails.currentSituation}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="npcs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {storyDetails.keyNPCs.map(npc => (
                  <Card key={npc.id} className="hover:border-primary/50 transition-colors">
                    <CardHeader className="text-center pb-3">
                      <Avatar className="w-20 h-20 mx-auto mb-3">
                        <AvatarImage src={npc.portrait || '/placeholder.svg'} alt={npc.name} />
                        <AvatarFallback className="text-xl font-serif">
                          {npc.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle className="font-serif text-lg">{npc.name}</CardTitle>
                      <CardDescription className="text-xs">
                        <Badge variant="secondary" className="mt-1">
                          {npc.role}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground text-center">{npc.description}</p>
                      <Button
                        className="w-full gap-2 bg-transparent"
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/npcs/${npc.id}`)}>
                        <Eye className="w-3 h-3" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="locations">
              <div className="space-y-4">
                {storyDetails.importantLocations.map((location, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg">{location.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{location.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="clues">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Discovered Clues</CardTitle>
                  <CardDescription>Evidence uncovered by the investigators</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {storyDetails.clues.map((clue, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{clue}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}
