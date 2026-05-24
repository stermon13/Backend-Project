import {prismaClient} from './prismaClient'
import {characteristicsSchema, type CharacterFormValues} from '@/schemas/character.schema'

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
          create: (data.possessions ?? []).map(p => ({
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
  const validatedCharacteristics = characteristicsSchema.parse(data.characteristics)

  console.log('Validated Characteristics:', validatedCharacteristics)

  const existingSkills = (data.skills ?? []).filter(skill => skill.id !== 'new')
  const existingPossessions = (data.possessions ?? []).filter(possession => possession.id !== 'new')
  const newPossessions = (data.possessions ?? []).filter(possession => possession.id === 'new')
  const existingContacts = (data.contacts ?? []).filter(contact => contact.id !== 'new')
  const newContacts = (data.contacts ?? []).filter(contact => contact.id === 'new')

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
        strength: {set: validatedCharacteristics.strength},
        constitution: {set: validatedCharacteristics.constitution},
        size: {set: validatedCharacteristics.size},
        dexterity: {set: validatedCharacteristics.dexterity},
        appearance: {set: validatedCharacteristics.appearance},
        intelligence: {set: validatedCharacteristics.intelligence},
        power: {set: validatedCharacteristics.power},
        education: {set: validatedCharacteristics.education},
      },
    },

    derivedStats: {update: data.derivedStats},

    skills:
      existingSkills.length > 0
        ? {
            update: existingSkills.map(skill => ({
              where: {id: skill.id},
              data: {value: skill.value},
            })),
          }
        : undefined,

    possessions:
      existingPossessions.length > 0 || newPossessions.length > 0
        ? {
            ...(existingPossessions.length > 0
              ? {
                  update: existingPossessions.map(possession => ({
                    where: {id: possession.id},
                    data: {quantity: possession.quantity},
                  })),
                }
              : {}),
            ...(newPossessions.length > 0
              ? {
                  create: newPossessions.map(possession => ({
                    itemId: possession.itemId,
                    quantity: possession.quantity,
                  })),
                }
              : {}),
          }
        : undefined,

    contacts:
      existingContacts.length > 0 || newContacts.length > 0
        ? {
            ...(existingContacts.length > 0
              ? {
                  update: existingContacts.map(contact => ({
                    where: {id: contact.id},
                    data: {
                      name: contact.name,
                      relationship: contact.relationship,
                      description: contact.description ?? '',
                    },
                  })),
                }
              : {}),
            ...(newContacts.length > 0
              ? {
                  create: newContacts.map(contact => ({
                    name: contact.name,
                    relationship: contact.relationship,
                    description: contact.description ?? '',
                  })),
                }
              : {}),
          }
        : undefined,
  }

  console.log('Transformed Data:', transformedData)

  return prismaClient.character.update({
    where: {id},
    data: transformedData,
  })
}

export async function deleteCharacter(id: string) {
  return prismaClient.character.delete({
    where: {id},
  })
}
