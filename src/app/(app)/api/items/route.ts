import { NextResponse } from 'next/server'
import { GetAllItems, CreateItem, UpdateItem, DeleteItem } from '@/serverFunctions/items'
import {createItemSchema, updateItemSchema} from '@/schemas/item.schema'
import {requireRole} from '@/lib/auth'

export async function POST(request: Request) {
  await requireRole(['Admin', 'Keeper'])
  try {
    const parsedData = await request.json()
    console.error('Validation error:', parsedData)
    const result = createItemSchema.safeParse(parsedData)
    console.error(result)
    if (!result.success) {
      console.error('Validation error:', result.error)
      return NextResponse.json({error: result.error}, {status: 400})
    }

    const newItem = await CreateItem(result.data)
    return NextResponse.json(newItem, {status: 201})
  } catch (error) {
    console.error('Error creating item:', error)
    return NextResponse.json({error: 'Failed to create item'}, {status: 500})
  }
}

export async function PUT(request: Request) {
  await requireRole(['Admin', 'Keeper'])
  try {
    const parsedData = await request.json()
    const {id, ...updatedData} = parsedData

    const result = updateItemSchema.safeParse(updatedData)
    if (!result.success) {
      console.error('Validation error:', result.error)
      return NextResponse.json({error: result.error}, {status: 400})
    }

    const updatedItem = await UpdateItem(id, result.data)
    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating item:', error)
    return NextResponse.json({error: 'Failed to update item'}, {status: 500})
  }
}



export async function DELETE(request: Request) {
  await requireRole(['Admin', 'Keeper'])

  const {id} = await request.json()

  if (!id) {
    return NextResponse.json({error: 'Missing id'}, {status: 400})
  }

  try {
    await DeleteItem(id)
    return NextResponse.json({success: true})
  } catch (error) {
    console.error('Error deleting item:', error)
    return NextResponse.json({error: 'Failed to delete item'}, {status: 500})
  }
}





