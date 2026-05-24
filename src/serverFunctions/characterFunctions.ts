'use server'

import {createCharacter, deleteCharacter, updateCharacter} from '@/dal/characters'
import {createCharacterSchema, updateCharacterSchema} from '@/schemas/character.schema'
import {protectedFormAction} from '@/lib/serverFunctions'
import {revalidatePath} from 'next/cache'
import {z} from 'zod'


export const createCharacterAction = protectedFormAction({
  schema: createCharacterSchema,
  serverFn: async ({data, logger, profile}) => {
    if (!profile) {
      logger.error('No authenticated profile found while creating character')
      return {success: false, errors: {errors: ['Authentication required']}}
    }

    try {
      const character = await createCharacter({...data, userId: profile.id})
      logger.info(`Character created successfully: ${character.id}`)

      return {success: true}
    } catch (error) {
      logger.error(`Failed to create character: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return {
        success: false,
        errors: {errors: ['Failed to create character. Please try again.']},
      }
    }
  },
  functionName: 'Create Character Action',
  globalErrorMessage: "We couldn't create the character, please try again.",
})


export const updateCharacterAction = protectedFormAction({
  schema: updateCharacterSchema,
  serverFn: async ({data, logger}) => {
    try {
      const updatedCharacter = await updateCharacter(data.id, data)
      logger.info(`Character updated successfully: ${updatedCharacter.id}`)
      return {success: true}
    } catch (error) {
      logger.error(`Failed to update character: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return {
        success: false,
        errors: {errors: ['Failed to update character. Please try again.']},
      }
    }
  },
  functionName: 'Update Character Action',
  globalErrorMessage: "We couldn't update the character, please try again.",
})

export const deleteCharacterAction = protectedFormAction({
  schema: z.object({id: z.string().uuid()}),
  serverFn: async ({data, logger}) => {
    try {
      await deleteCharacter(data.id)
      revalidatePath('/characters')
      logger.info(`Character deleted successfully: ${data.id}`)
      return {success: true}
    } catch (error) {
      logger.error(`Failed to delete character: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return {
        success: false,
        errors: {errors: ['Failed to delete character. Please try again.']},
      }
    }
  },
  functionName: 'Delete Character Action',
  globalErrorMessage: "We couldn't delete the character, please try again.",
})
