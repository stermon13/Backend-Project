import {prismaClient} from './prismaClient'
import {type CharacterFormValues, updateCharacteristicsSchema} from '@/schemas/character.schema'

/**
 * Create a new character in the database
 *
 * @param data The character data to be saved
 */
export async function createCharacter(data: CharacterFormValues) {
  console.log('Creating character with data:', data);

  try {
    const character = await prismaClient.character.create({
      data: {
        name: data.name,
        occupation: data.occupation,
        age: data.age,
        sex: data.sex,
        residence: data.residence,
        birthplace: data.birthplace,
        isNpc: data.isNpc,
        portraitUrl: data.portraitUrl,
        campaignName: data.campaignName,
        backstory: data.backstory,
        ideologyBeliefs: data.ideologyBeliefs,
        characteristics: { create: data.characteristics },
        derivedStats: { create: data.derivedStats },
        skills: {
          create: data.skills.map(skill => ({
            skillId: skill.skillId,
            value: skill.value,
          })),
        },
        possessions: {
          create: data.possessions.map(p => ({
            itemId: p.itemId,
            quantity: p.quantity,
          })),
        },
        contacts: {
          create: (data.contacts ?? []).map(c => ({
            name: c.name,
            relationship: c.relationship,
            description: c.description || '',
          })),
        },
        user: { connect: { id: data.userId } },
      },
    });

    console.log('Character created:', character);
    return character;
  } catch (error) {
    console.error('Error during character creation:', error);
    throw error;
  }
}


export async function updateCharacter(id: string, data: CharacterFormValues) {
  const validatedCharacteristics = updateCharacteristicsSchema.parse(data.characteristics)

  console.log('Validated Characteristics:', validatedCharacteristics.characteristics)

  const transformedData = {
    name: data.name,
    occupation: data.occupation,
    age: data.age,
    sex: data.sex,
    residence: data.residence,
    birthplace: data.birthplace,
    isNpc: data.isNpc,
    portraitUrl: data.portraitUrl,
    campaignName: data.campaignName,
    backstory: data.backstory,
    ideologyBeliefs: data.ideologyBeliefs,

    characteristics: {
      update: {
        strength: {set: validatedCharacteristics.characteristics.strength},
        constitution: {set: validatedCharacteristics.characteristics.constitution},
        size: {set: validatedCharacteristics.characteristics.size},
        dexterity: {set: validatedCharacteristics.characteristics.dexterity},
        appearance: {set: validatedCharacteristics.characteristics.appearance},
        intelligence: {set: validatedCharacteristics.characteristics.intelligence},
        power: {set: validatedCharacteristics.characteristics.power},
        education: {set: validatedCharacteristics.characteristics.education},
      },
    },

    derivedStats: {update: data.derivedStats},

    skills:
      data.skills && Array.isArray(data.skills)
        ? {
            update: data.skills.map((skill: {id: string; value: number}) => ({
              where: {id: skill.id},
              data: {value: skill.value},
            })),
          }
        : undefined,

    possessions:
      data.possessions && Array.isArray(data.possessions)
        ? {
            update: data.possessions.map((possession: {id: string; quantity: number}) => ({
              where: {id: possession.id},
              data: {quantity: possession.quantity},
            })),
          }
        : undefined,

    contacts:
      data.contacts && Array.isArray(data.contacts)
        ? {
            update: data.contacts.map((contact: {id: string; description?: string}) => ({
              where: {id: contact.id},
              data: {description: contact.description ?? ''},
            })),
          }
        : undefined,
  }

  console.log('Transformed Data:', transformedData)

  return prismaClient.character.update({
    where: {id},
    data: transformedData,
  })
}
