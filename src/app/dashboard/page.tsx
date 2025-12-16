"use client"

import { useState } from "react"
import {CampaignNav} from '@/components/custom/campaign-nav'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Users, BookOpen, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface Campaign {
  id: string
  title: string
  description: string
  status: "active" | "planning" | "completed"
  lastPlayed: string
  playerCount: number
  sessionCount: number
}

export default function CampaignsPage() {
  const router = useRouter()

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "The Haunting",
      description: "A classic introduction to the horrors that await investigators in the Corbitt House.",
      status: "active",
      lastPlayed: "2 days ago",
      playerCount: 4,
      sessionCount: 3,
    },
    {
      id: "2",
      title: "Masks of Nyarlathotep",
      description: "A globe-spanning campaign of epic proportions, uncovering a worldwide conspiracy.",
      status: "planning",
      lastPlayed: "Never",
      playerCount: 5,
      sessionCount: 0,
    },
    {
      id: "3",
      title: "Dead Light",
      description: "Investigators must survive a night stranded on a country road with something lurking.",
      status: "completed",
      lastPlayed: "3 weeks ago",
      playerCount: 3,
      sessionCount: 1,
    },
  ])

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-accent text-accent-foreground"
      case "planning":
        return "bg-secondary text-secondary-foreground"
      case "completed":
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <CampaignNav />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Your Campaigns</h1>
            <p className="text-muted-foreground">Manage your investigations into the unknown</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="font-serif text-xl">{campaign.title}</CardTitle>
                <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Last played {campaign.lastPlayed}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{campaign.playerCount} players</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{campaign.sessionCount} sessions</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  variant="secondary"
                  onClick={() => router.push(`/campaigns/${campaign.id}`)}
                >
                  View Campaign
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
