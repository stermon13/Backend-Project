"use client"

import { useParams } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Users, MapPin, Eye, BookOpen } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function SessionDetailPage() {
  const params = useParams()

  // Mock data - in real app, fetch based on params.id
  const session = {
    id: params.id,
    title: "The Corbitt House Investigation",
    date: "Dec 10, 2024",
    campaign: "The Haunting",
    sessionNumber: 1,
    summary:
      "Investigators arrived at the Corbitt House after reports of strange occurrences. The team spent hours investigating the decrepit mansion, uncovering dark secrets that had been hidden for decades.",
    details: `The team arrived at the Corbitt House at approximately 2:00 PM. The house appeared abandoned, with boarded windows and overgrown vegetation surrounding the property.

Upon entering, the investigators immediately noticed an oppressive atmosphere. The air was thick and musty, and strange shadows seemed to move in the corners of their vision.

Dr. Blackwood led the team to the basement, where they discovered strange symbols carved into the floor. She recognized them as pre-Sumerian in origin, predating known civilization by thousands of years. The symbols formed a circle approximately 6 feet in diameter, with strange glyphs radiating outward.

Detective Cole found evidence of recent activity despite the house being supposedly abandoned for 30 years. Fresh footprints in the dust, recently moved furniture, and signs of a makeshift camp in one of the upper bedrooms.

As night fell, the investigators experienced several disturbing phenomena: unexplained cold spots, whispered voices in languages none of them recognized, and the sensation of being watched. The session concluded with the team retreating to regroup and research their findings.`,
    clues: [
      "Pre-Sumerian symbols carved into basement floor",
      "Recent footprints despite 30-year abandonment",
      "Old journal fragments mentioning 'The Dweller'",
      "Strange photograph of Mr. Corbitt with unidentifiable figures",
      "Ritual dagger hidden in a wall cavity",
    ],
    npcs: [
      "Mr. Corbitt (mentioned in journals, deceased 1912)",
      "Landlord Thompson (current property owner)",
      "Mrs. Macario (neighbor who reported disturbances)",
    ],
    locations: [
      "Corbitt House - Main investigation site",
      "Arkham Library - Briefly mentioned for follow-up research",
      "Miskatonic University - Dr. Blackwood's office for analysis",
    ],
    participants: [
      "Dr. Eleanor Blackwood - Archaeology Professor",
      "Detective James Cole - Police Investigator",
      "Sarah Whitmore - Journalist",
      "Dr. Marcus Chen - Medical Doctor",
    ],
  }

  return (
    <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/stories">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Session Notes
          </Button>
        </Link>

        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="text-base px-3 py-1">
                Session {session.sessionNumber}
              </Badge>
              <Badge variant="outline" className="text-base px-3 py-1">
                {session.campaign}
              </Badge>
            </div>
            <h1 className="text-5xl font-serif font-bold text-foreground">{session.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{session.date}</span>
            </div>
          </div>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Session Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{session.summary}</p>
            </CardContent>
          </Card>

          {/* Detailed Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Detailed Investigation Notes</CardTitle>
              <CardDescription>Complete chronicle of the session events</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={session.details}
                readOnly
                className="min-h-96 bg-muted/30 font-serif text-base leading-relaxed"
              />
            </CardContent>
          </Card>

          {/* Grid of Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Participants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {session.participants.map((participant, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground">{participant}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Locations Visited
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {session.locations.map((location, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-chart-2 mt-1">•</span>
                      <span className="text-foreground">{location}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clues Discovered */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Clues Discovered
              </CardTitle>
              <CardDescription>Evidence and information uncovered during this session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {session.clues.map((clue, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <Badge variant="default" className="mt-0.5 shrink-0">
                      {i + 1}
                    </Badge>
                    <span className="text-sm text-foreground">{clue}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* NPCs Encountered */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">NPCs Encountered</CardTitle>
              <CardDescription>Characters met or referenced during the session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {session.npcs.map((npc, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded hover:bg-accent/5 transition-colors">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-sm text-foreground">{npc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
