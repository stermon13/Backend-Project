'use client'
import {useRouter} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Separator} from '@/components/ui/separator'
import {ArrowLeft, Users, Calendar, BookOpen, Eye, Brain, Heart} from 'lucide-react'
import type {CampaignFormValues} from '@/types/campaign'

const getStatPercentage = (current: number, max: number) => (current / max) * 100

export default function CampaignDetail({campaign}: {campaign: CampaignFormValues}) {
  const router = useRouter()

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
                  <span className="font-medium">Started:</span> {campaign.startedDate.toDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Keeper:</span> {campaign.keeper.username}
                </div>
              </div>
            </div>
            <Button onClick={() => router.push(`/campaigns/${campaign.id}/edit`)}>Edit Campaign</Button>
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
            {campaign.investigators.map(investigator => (
              <Card key={investigator.id} className="hover:border-primary/50 transition-colors">
                <CardHeader className="text-center pb-3">
                  <Avatar className="w-24 h-24 mx-auto mb-3">
                    <AvatarImage src={investigator.portraitUrl || '/placeholder.svg'} alt={investigator.name} />
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
                  {investigator.derivedStats ? (
                    <>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-destructive" />
                            <span>HP</span>
                          </div>
                          <span className="text-muted-foreground">
                            {investigator.derivedStats.hitPointsCurrent}/{investigator.derivedStats.hitPointsMax}
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-destructive transition-all"
                            style={{
                              width: `${getStatPercentage(investigator.derivedStats.hitPointsCurrent, investigator.derivedStats.hitPointsMax)}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Brain className="w-3 h-3 text-chart-5" />
                            <span>SAN</span>
                          </div>
                          <span className="text-muted-foreground">
                            {investigator.derivedStats.sanityCurrent}/{investigator.derivedStats.sanityMax}
                          </span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-chart-5 transition-all"
                            style={{
                              width: `${getStatPercentage(investigator.derivedStats.sanityCurrent, investigator.derivedStats.sanityMax)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>No stats available</div>
                  )}

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button
                      className="gap-2"
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push(`/characters/${investigator.id}`)}>
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
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

            {/* Loop over investigationSessions array */}
            {campaign.investigationSessions.map((session, index) => (
              <TabsContent key={index} value="synopsis">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Campaign Synopsis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{session.summary}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

            {campaign.investigationSessions.map((session, index) => (
              <TabsContent key={index} value="situation">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Current Situation</CardTitle>
                    <CardDescription>Where the story stands now</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{session.details}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

            {/* Render NPCs, Locations, and Clues similarly by mapping over the investigationSessions */}
            {/* NPCs */}
            {campaign.investigationSessions.map((session, index) => (
              <TabsContent key={index} value="npcs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {session.npcs.map(npc => (
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
                        <CardDescription className="text-xs">{npc.role}</CardDescription>
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
            ))}

            {/* Locations */}
            {campaign.investigationSessions.map((session, index) => (
              <TabsContent key={index} value="locations">
                <div className="space-y-4">
                  {session.locations.map((location, locationIndex) => (
                    <Card key={locationIndex}>
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
            ))}

            {/* Clues */}
            {campaign.investigationSessions.map((session, index) => (
              <TabsContent key={index} value="clues">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Discovered Clues</CardTitle>
                    <CardDescription>Evidence uncovered by the investigators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {session.clues.map((clue, clueIndex) => (
                        <li key={clueIndex} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{clue.description}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>
    </div>
  )
}


