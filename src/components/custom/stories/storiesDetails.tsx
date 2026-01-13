'use client'

import Link from 'next/link'

import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {ArrowLeft, Calendar, Users, MapPin, Eye, BookOpen} from 'lucide-react'
import {Textarea} from '@/components/ui/textarea'

import type {InvestigationSessionDetailDto} from '@/types/investigationSession'

type Props = {
  session: InvestigationSessionDetailDto
}

export default function SessionDetailClient({session}: Props) {
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
              <span>{session.date.toDateString()}</span>
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
                  {session.investigators.map(inv => (
                    <div key={inv.id} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground">
                        {inv.name}
                        {inv.occupation}
                      </span>
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
                      <span className="text-foreground">{location.name}</span>
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
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                    <Badge variant="default" className="mt-0.5 shrink-0">
                      {i + 1}
                    </Badge>
                    <span className="text-sm text-foreground">{clue.title}</span>
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
                    <span className="text-sm text-foreground">{npc.name}</span>
                    <span className="text-sm text-foreground">{npc.npcRole}</span>
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
