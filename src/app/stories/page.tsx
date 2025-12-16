"use client"

import { useState } from "react"
import {CampaignNav} from '@/components/custom/campaign-nav'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, FileText, Eye, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface SessionNote {
  id: string
  title: string
  date: string
  campaign: string
  sessionNumber: number
  summary: string
  details: string
  clues: string[]
  npcs: string[]
  locations: string[]
}

interface Clue {
  id: string
  title: string
  description: string
  campaign: string
  discovered: boolean
  relatedTo: string
}

export default function StoriesPage() {
  const [sessions, setSessions] = useState<SessionNote[]>([
    {
      id: "1",
      title: "The Corbitt House Investigation",
      date: "Dec 10, 2024",
      campaign: "The Haunting",
      sessionNumber: 1,
      summary: "Investigators arrived at the Corbitt House after reports of strange occurrences...",
      details:
        "The team discovered strange symbols carved into the basement floor. Dr. Blackwood recognized them as pre-Sumerian in origin. Detective Cole found evidence of recent activity despite the house being supposedly abandoned.",
      clues: ["Strange symbols in basement", "Recent footprints", "Old journal fragments"],
      npcs: ["Mr. Corbitt (mentioned)", "Landlord Thompson"],
      locations: ["Corbitt House", "Arkham Library"],
    },
    {
      id: "2",
      title: "Library Research & Dark Discoveries",
      date: "Dec 7, 2024",
      campaign: "The Haunting",
      sessionNumber: 2,
      summary: "Following their investigation, the team delved into research at Miskatonic University...",
      details:
        "Professor Whitmore found disturbing references in the restricted section linking Mr. Corbitt to a cult active in the 1890s. The cult worshipped something called 'The Dweller in Darkness.'",
      clues: ["Cult connection", "1890s newspaper clippings", "Ritual diagram"],
      npcs: ["Librarian Ms. Petersen", "Professor Armitage"],
      locations: ["Miskatonic University Library", "Arkham Historical Society"],
    },
  ])

  const [clues, setClues] = useState<Clue[]>([
    {
      id: "1",
      title: "Strange Symbols in Basement",
      description: "Pre-Sumerian symbols carved into the floor, forming a circle approximately 6 feet in diameter.",
      campaign: "The Haunting",
      discovered: true,
      relatedTo: "Corbitt House",
    },
    {
      id: "2",
      title: "Cult Connection",
      description: "Evidence linking Mr. Corbitt to a secret society known as 'The Order of the Ebon Star'",
      campaign: "The Haunting",
      discovered: true,
      relatedTo: "Library Research",
    },
    {
      id: "3",
      title: "Hidden Chamber",
      description: "Rumors of a secret chamber beneath the Corbitt House that has yet to be found.",
      campaign: "The Haunting",
      discovered: false,
      relatedTo: "Unknown",
    },
  ])

  const [selectedSession, setSelectedSession] = useState<SessionNote | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <CampaignNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Session Notes & Clues</h1>
            <p className="text-muted-foreground">Track your investigations and uncover the mysteries</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Session Note
          </Button>
        </div>

        <Tabs defaultValue="sessions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sessions" className="gap-2">
              <FileText className="w-4 h-4" />
              Session Notes
            </TabsTrigger>
            <TabsTrigger value="clues" className="gap-2">
              <Eye className="w-4 h-4" />
              Clues & Evidence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {sessions.map((session) => (
                <Card key={session.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">Session {session.sessionNumber}</Badge>
                          <span className="text-xs text-muted-foreground">{session.campaign}</span>
                        </div>
                        <CardTitle className="font-serif text-xl mb-1">{session.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {session.date}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Export</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground mb-4 line-clamp-2">{session.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {session.clues.slice(0, 3).map((clue, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {clue}
                        </Badge>
                      ))}
                      {session.clues.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{session.clues.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Link href={`/stories/${session.id}`}>
                      <Button variant="secondary" className="w-full">
                        View Full Notes
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="clues" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clues.map((clue) => (
                <Card
                  key={clue.id}
                  className={`hover:border-primary/50 transition-colors ${!clue.discovered ? "opacity-60" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={clue.discovered ? "default" : "outline"}
                        className="bg-primary text-primary-foreground"
                      >
                        {clue.discovered ? "Discovered" : "Hidden"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>
                            {clue.discovered ? "Mark as Hidden" : "Mark as Discovered"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="font-serif text-base">{clue.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{clue.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Campaign:</span>
                        <span className="text-foreground">{clue.campaign}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Related to:</span>
                        <span className="text-foreground">{clue.relatedTo}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
