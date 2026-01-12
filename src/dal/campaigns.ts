import {prismaClient} from '@/dal/prismaClient'
import type {UpdateCampaignInput, CreateCampaignInput} from '@/schemas/campaign.schema'

export async function getAllCampaigns() {
  return prismaClient.campaign.findMany({
    orderBy: {createdAt: 'desc'},
    include: {
      keeper: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      investigators: {select: {id: true}},
      investigationSessions: {
        select: {updatedAt: true},
        orderBy: {updatedAt: 'desc'},
        take: 1,
      },
    },
  })
}

export async function getCampaignsByKeeper(keeperId: string) {
  return prismaClient.campaign.findMany({
    where: {keeperId},
    orderBy: {createdAt: 'desc'},
    include: {
      keeper: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      investigators: {select: {id: true}},
      investigationSessions: {
        select: {updatedAt: true},
        orderBy: {updatedAt: 'desc'},
        take: 1,
      },
    },
  })
}

export async function getCampaignById(id: string) {
  if (!id) {
    throw new Error('Invalid campaign ID')
  }

  const campaign = await prismaClient.campaign.findUnique({
    where: {id},
    include: {
      keeper: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      investigators: {
        select: {
          id: true,
          name: true,
          occupation: true,
          portraitUrl: true,
          derivedStats: {
            select: {
              hitPointsCurrent: true,
              hitPointsMax: true,
              sanityCurrent: true,
              sanityMax: true,
              magicPointsCurrent: true,
              magicPointsMax: true,
              luck: true,
              movement: true,
              build: true,
              damageBonus: true,
            },
          },
        },
      },
      investigationSessions: {
        select: {
          id: true,
          title: true,
          sessionNumber: true,
          summary: true,
          details: true,
          clues: {
            select: {
              id: true,
              description: true,
            },
          },
          locations: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
          npcs: {
            select: {
              id: true,
              name: true,
              npcRole: true,
              npcDescription: true,
              portraitUrl: true,
            },
          },
        },
      },
    },
  })

  if (!campaign) {
    return null
  }
  const investigators = campaign.investigators.map(investigator => ({
    ...investigator,
    portraitUrl: investigator.portraitUrl || '/placeholder.svg',
    derivedStats: investigator.derivedStats || {
      hitPointsCurrent: 0,
      hitPointsMax: 0,
      sanityCurrent: 0,
      sanityMax: 0,
      magicPointsCurrent: 0,
      magicPointsMax: 0,
      luck: 0,
      movement: 0,
      build: 0,
      damageBonus: '0',
    },
  }))

  const investigationSessions = campaign.investigationSessions.map(session => ({
    ...session,
    date: new Date(),
    locations: session.locations.map(location => ({
      ...location,
      description: location.description === null ? undefined : location.description,
    })),
    npcs: session.npcs.map(npc => ({
      ...npc,
      isNPC: true,
    })),
  }))

  return {
    id: campaign.id,
    title: campaign.title,
    edition: campaign.edition,
    description: campaign.description,
    status: campaign.status,
    startedDate: campaign.startedDate,
    sessionCount: campaign.sessionCount,
    investigators,
    investigationSessions,
    createdAt: campaign.createdAt,
    updatedAt: campaign.updatedAt,
    keeper: campaign.keeper,
  }
}

export async function createCampaign(data: CreateCampaignInput) {
  const {investigators, investigationSessions, ...campaignData} = data

  return prismaClient.campaign.create({
    data: {
      ...campaignData,
      keeper: {connect: {id: data.keeper.id}},
      investigators: {
        connect: investigators?.map(investigator => ({id: investigator.id})),
      },
      investigationSessions:
        investigationSessions && investigationSessions.length > 0
          ? {
              connect: investigationSessions.map(session => ({id: session.id})),
            }
          : undefined,
    },
    include: {
      investigators: true,
      investigationSessions: true,
    },
  })
}

export async function updateCampaign(id: string, data: UpdateCampaignInput) {
  const {investigators, investigationSessions, ...campaignData} = data

  return prismaClient.campaign.update({
    where: {id},
    data: {
      ...campaignData,
      keeper: {connect: {id: data.keeper.id}},
      investigators: {
        set: investigators?.map(investigator => ({id: investigator.id})),
      },
      investigationSessions: {
        update: investigationSessions?.map(session => ({
          where: {id: session.id},
          data: {
            title: session.title,
            sessionNumber: session.sessionNumber,
            summary: session.summary,
            details: session.details,
          },
        })),
      },
    },
    include: {
      investigators: true,
      investigationSessions: true,
    },
  })
}

export async function deleteCampaign(campaignId: string) {
    return prismaClient.campaign.delete({
      where: {id: campaignId},
      include: {
        investigationSessions: true,
        investigators: true,
      },
    })
}
