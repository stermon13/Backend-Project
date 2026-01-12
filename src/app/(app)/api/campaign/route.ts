import {NextResponse} from 'next/server'
import {createCampaignAction, updateCampaignAction, deleteCampaignAction} from '@/serverFunctions/campaignFunctions'
import {createCampaignSchema, updateCampaignSchema} from '@/schemas/campaign.schema'
import {requireRole} from '@/lib/auth'

export async function POST(request: Request) {
  await requireRole(['Admin', 'Keeper'])

  try {
    const parsedData = await request.json()
    const result = createCampaignSchema.safeParse(parsedData)

    if (!result.success) {
      return NextResponse.json({error: result.error}, {status: 400})
    }

    await createCampaignAction(result.data)
    return NextResponse.json({message: 'Campaign created successfully'}, {status: 201})
  } catch (error) {
    return NextResponse.json({error: 'Error creating campaign'}, {status: 500})
  }
}

export async function PUT(request: Request) {
  await requireRole(['Admin', 'Keeper'])

  try {
    const parsedData = await request.json()
    const {id, ...updatedData} = parsedData
    const result = updateCampaignSchema.safeParse(updatedData)

    if (!result.success) {
      return NextResponse.json({error: result.error}, {status: 400})
    }

    await updateCampaignAction(id, result.data)
    return NextResponse.json({message: 'Campaign updated successfully'})
  } catch (error) {
    return NextResponse.json({error: 'Error updating campaign'}, {status: 500})
  }
}

export async function DELETE(request: Request) {
  await requireRole(['Admin', 'Keeper'])

  try {
    const {id} = await request.json()

    if (!id) {
      return NextResponse.json({error: 'Missing campaign id'}, {status: 400})
    }

    await deleteCampaignAction(id)
    return NextResponse.json({message: 'Campaign deleted successfully'})
  } catch (error) {
    return NextResponse.json({error: 'Error deleting campaign'}, {status: 500})
  }
}
