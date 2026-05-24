'use server'

import {createCharacter, updateCharacter} from '@/dal/characters'
import {createCharacterSchema, updateCharacterSchema} from '@/schemas/character.schema'
import {protectedFormAction} from '@/lib/serverFunctions'


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

// 'use server'
//
// import { createCharacter, updateCharacter } from '@/dal/characters'
// import {createCharacterSchema, updateCharacterSchema} from '@/schemas/character.schema'
// import {protectedFormAction, publicFormAction} from '@/lib/serverFunctions'
// import {redirect} from 'next/navigation'
//
// export const createCharacterAction = publicFormAction({
//   schema: createCharacterSchema,
//   serverFn: async ({data, logger}) => {
//     try {
//       const character = await createCharacter(data)
//       logger.info(`Character created successfully: ${character.id}`)
//
//       redirect('/characters')
//     } catch (error) {
//       logger.error(`Failed to create character: ${error instanceof Error ? error.message : 'Unknown error'}`)
//       return {
//         success: false,
//         errors: {errors: ['Failed to create character. Please try again.']},
//       }
//     }
//   },
//   functionName: 'Create Character Action',
//   globalErrorMessage: "We couldn't create the character, please try again.",
// })
//
// export const updateCharacterAction = protectedFormAction({
//   schema: updateCharacterSchema,
//   serverFn: async ({data, logger}) => {
//     try {
//       const characteristicsData = {
//         update: {
//           ...data.characteristics,
//         },
//       }
//       const derivedStatsData = {
//         update: {
//           ...data.derivedStats,
//         },
//       }
//
//       const skillsData = {
//         update: data.skills.map(skill => ({
//           where: {id: skill.id},
//           data: {value: skill.value},
//         })),
//       }
//       const possessionsData = {
//         update: data.possessions.map(possession => ({
//           where: {id: possession.id},
//           data: {
//             quantity: possession.quantity,
//             item: {
//               update: {
//                 name: possession.item.name,
//                 category: possession.item.category,
//                 description: possession.item.description,
//                 value: possession.item.value,
//                 weight: possession.item.weight,
//               },
//             },
//           },
//         })),
//       }
//
//       const contactsData = {
//         update: data.contacts.map(contact => ({
//           where: {id: contact.id},
//           data: {
//             name: contact.name,
//             relationship: contact.relationship,
//             description: contact.description ?? '',
//           },
//         })),
//       }
//
//       const character = await updateCharacter(data.id, {
//         ...data,
//         characteristics: characteristicsData,
//         derivedStats: derivedStatsData,
//         skills: skillsData,
//         possessions: possessionsData,
//         contacts: contactsData,
//       })
//
//       logger.info(`Character updated successfully: ${character.id}`)
//
//       redirect('/characters')
//     } catch (error) {
//       logger.error(`Failed to update character: ${(error instanceof Error) ? error.message : 'Unknown error'}`)
//       return {
//         success: false,
//         errors: {errors: ['Failed to update character. Please try again.']},
//       }
//     }
//   },
//   functionName: 'Update Character Action',
//   globalErrorMessage: "We couldn't update the character, please try again.",
// })
