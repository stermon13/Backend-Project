import { prismaClient } from "@/dal/prismaClient"
import CharactersList from "../../../components/custom/character/charactersList"

export default async function CharactersPage() {
  const characters = await prismaClient.character.findMany({
    select: {
      id: true,
      name: true,
      occupation: true,
      age: true,
      campaignName: true,
      isNpc: true,
      derivedStats: {
        select: {
          hitPointsCurrent: true,
          hitPointsMax: true,
          sanityCurrent: true,
          sanityMax: true,
          magicPointsCurrent: true,
          magicPointsMax: true,
        },
      },
    },
  })

  return <CharactersList characters={characters} />
}
