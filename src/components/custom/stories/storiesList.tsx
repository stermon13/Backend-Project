'use client'

import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Plus, Calendar, FileText, Eye, MoreVertical} from 'lucide-react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import Link from 'next/link'
import type {InvestigationSessionDto} from '@/types/investigationSession'
import type {ClueDto} from '@/types/clue'

type props ={
  sessions: InvestigationSessionDto[],
  clues: ClueDto[],
}

export default function StoriesList({sessions, clues}: props) {

  return (
    <div className="min-h-screen bg-background">
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
              {sessions.map(session => (
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
                          {session.date.toDateString()}
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
              {clues.map(clue => (
                <Card
                  key={clue.id}
                  className={`hover:border-primary/50 transition-colors ${!clue.discovered ? 'opacity-60' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={clue.discovered ? 'default' : 'outline'}
                        className="bg-primary text-primary-foreground">
                        {clue.discovered ? 'Discovered' : 'Hidden'}
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
                            {clue.discovered ? 'Mark as Hidden' : 'Mark as Discovered'}
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
