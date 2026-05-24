'use client'

import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Plus, Calendar, Users, BookOpen, MoreVertical} from 'lucide-react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {useRouter} from 'next/navigation'
import type {CampaignDto, CampaignStatus} from '@/types/campaign'
import {serializeFormData} from '@/lib/serializeFormData'
import type {FormAction} from '@/models/serverFunctions'

type Props = {
  campaigns: CampaignDto[]
  role: 'User' | 'Keeper' | 'Admin'
  deleteAction: FormAction<void>
}

export default function CampaignsClient({campaigns, role, deleteAction}: Props) {
  const router = useRouter()

  const onDelete = async (campaignId: string) => {
    try {
      await deleteAction({success: true}, serializeFormData({id: campaignId}))
    } catch (error) {
      if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        throw error
      }

      console.error('Error:', error)
    }
  }

  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case 'active':
        return 'bg-accent text-accent-foreground'
      case 'planning':
        return 'bg-secondary text-secondary-foreground'
      case 'completed':
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold">Campaigns</h1>
            <p className="text-muted-foreground">Manage your investigations into the unknown</p>
          </div>

          <Button className="gap-2" onClick={() => router.push('/campaigns/new')}>
            <Plus className="w-4 h-4" />
            {role === 'User' ? 'Create First Campaign' : 'New Campaign'}
          </Button>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>No campaigns yet.</p>
            {role === 'User' && <p className="mt-2 text-sm">Create a campaign to become a Keeper.</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map(campaign => (
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
                        <DropdownMenuItem onClick={() => router.push(`/campaigns/${campaign.id}/edit`)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            onDelete(campaign.id)
                          }}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <CardTitle className="font-serif text-xl">{campaign.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Last played {campaign.lastPlayed ? new Date(campaign.lastPlayed).toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{campaign.playerCount} players</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{campaign.sessionCount} sessions</span>
                      </div>
                    </div>
                    {role === 'Admin' && campaign.keeperName && (
                      <div className="text-xs text-muted-foreground mb-2">
                        Created by <span className="font-medium">{campaign.keeperName}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full mt-4"
                    variant="secondary"
                    onClick={() => router.push(`/campaigns/${campaign.id}`)}>
                    View Campaign
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

