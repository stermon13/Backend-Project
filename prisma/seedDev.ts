import type { PrismaClient } from '@/generated/prisma/client'
import { Role } from '@/generated/prisma/client'

export const seedDev = async (prisma: PrismaClient) => {
  console.log('Running DEVELOPMENT seed (strict compliance)')

/**
 * CoC 7e "common" skills (investigator sheet skills).
 * Source: Chaosium Call of Cthulhu RPG Wiki skill descriptions list. :contentReference[oaicite:1]{index=1}
 */
const COC_COMMON_SKILLS: Array<{name: string; category: string}> = [
  {name: 'Accounting', category: 'Knowledge'},
  {name: 'Anthropology', category: 'Knowledge'},
  {name: 'Appraise', category: 'Knowledge'},
  {name: 'Archaeology', category: 'Knowledge'},
  {name: 'Art/Craft', category: 'Technical'},
  {name: 'Charm', category: 'Social'},
  {name: 'Climb', category: 'Physical'},
  {name: 'Credit Rating', category: 'Social'},
  {name: 'Cthulhu Mythos', category: 'Knowledge'},
  {name: 'Disguise', category: 'Social'},
  {name: 'Dodge', category: 'Combat'},
  {name: 'Drive Auto', category: 'Technical'},
  {name: 'Electrical Repair', category: 'Technical'},
  {name: 'Fast Talk', category: 'Social'},
  {name: 'Fighting', category: 'Combat'},
  {name: 'Firearms', category: 'Firearms'},
  {name: 'First Aid', category: 'Knowledge'},
  {name: 'History', category: 'Knowledge'},
  {name: 'Intimidate', category: 'Social'},
  {name: 'Jump', category: 'Physical'},
  {name: 'Language (Other)', category: 'Knowledge'},
  {name: 'Language (Own)', category: 'Knowledge'},
  {name: 'Law', category: 'Knowledge'},
  {name: 'Library Use', category: 'Investigation'},
  {name: 'Listen', category: 'Investigation'},
  {name: 'Locksmith', category: 'Technical'},
  {name: 'Mechanical Repair', category: 'Technical'},
  {name: 'Medicine', category: 'Knowledge'},
  {name: 'Natural World', category: 'Knowledge'},
  {name: 'Navigate', category: 'Knowledge'},
  {name: 'Occult', category: 'Knowledge'},
  {name: 'Operate Heavy Machinery', category: 'Technical'},
  {name: 'Persuade', category: 'Social'},
  {name: 'Pilot', category: 'Technical'},
  {name: 'Psychoanalysis', category: 'Knowledge'},
  {name: 'Psychology', category: 'Social'},
  {name: 'Ride', category: 'Physical'},
  {name: 'Science', category: 'Knowledge'},
  {name: 'Sleight of Hand', category: 'Physical'},
  {name: 'Spot Hidden', category: 'Investigation'},
  {name: 'Stealth', category: 'Physical'},
  {name: 'Survival', category: 'Physical'},
  {name: 'Swim', category: 'Physical'},
  {name: 'Throw', category: 'Combat'},
  {name: 'Track', category: 'Investigation'},
]

// 10+ items (1920s-ish, CoC-appropriate)
const ITEMS: Array<{
  name: string
  category: string
  description: string
  value: string
  weight: string
}> = [
  {name: 'Revolver (.38)', category: 'weapon', description: 'Common sidearm.', value: '$25', weight: '2 lbs'},
  {
    name: 'Shotgun (12-gauge)',
    category: 'weapon',
    description: 'Hunting / self-defense.',
    value: '$40',
    weight: '7 lbs',
  },
  {name: 'Notebook', category: 'equipment', description: 'Notes, sketches, clues.', value: '$1', weight: '0.5 lbs'},
  {name: 'Flashlight', category: 'equipment', description: 'Electric flashlight.', value: '$3', weight: '1 lb'},
  {name: 'First Aid Kit', category: 'equipment', description: 'Bandages and supplies.', value: '$5', weight: '2 lbs'},
  {name: 'Camera', category: 'equipment', description: 'Early 20th century camera.', value: '$20', weight: '4 lbs'},
  {name: 'Lockpicks', category: 'equipment', description: 'Tools for opening locks.', value: '$10', weight: '0.3 lbs'},
  {name: 'Rope (10m)', category: 'equipment', description: 'Sturdy rope.', value: '$2', weight: '5 lbs'},
  {name: 'Crowbar', category: 'equipment', description: 'Prying and leverage tool.', value: '$4', weight: '5 lbs'},
  {
    name: 'Occult Notes (Folder)',
    category: 'book',
    description: 'Handwritten notes on folklore and rites.',
    value: 'Priceless',
    weight: '1 lb',
  },
]

// 10 canonical spell names (descriptions kept generic to avoid reproducing book text)
const SPELLS: Array<{name: string; manaCost: number; castTime: number; range: string}> = [
  {name: 'Contact Ghoul', manaCost: 3, castTime: 5, range: 'Varies'},
  {name: 'Contact Deep One', manaCost: 4, castTime: 10, range: 'Varies'},
  {name: 'Bind Byakhee', manaCost: 10, castTime: 60, range: 'Sight'},
  {name: 'Elder Sign', manaCost: 5, castTime: 10, range: 'Touch'},
  {name: 'Shrivelling', manaCost: 8, castTime: 1, range: 'Sight'},
  {name: 'Flesh Ward', manaCost: 6, castTime: 10, range: 'Touch'},
  {name: 'Summon Dark Young', manaCost: 15, castTime: 120, range: 'Special'},
  {name: 'Call/Dismiss Cthonian', manaCost: 20, castTime: 120, range: 'Special'},
  {name: 'Create Zombie', manaCost: 8, castTime: 60, range: 'Touch'},
  {name: 'Call Forth the Dead', manaCost: 12, castTime: 60, range: 'Special'},
]

// 10 canonical mythos entity names; numeric fields are consistent placeholders (not verbatim stat blocks)
const MONSTERS: Array<{name: string; sanityLoss: string; description: string}> = [
  {name: 'Deep One', sanityLoss: '1/1d6', description: 'Amphibious mythos humanoid.'},
  {name: 'Ghoul', sanityLoss: '0/1d6', description: 'Carrion-eating subterranean creature.'},
  {name: 'Byakhee', sanityLoss: '1/1d8', description: 'Winged interstellar servant creature.'},
  {name: 'Dark Young', sanityLoss: '1d6/1d20', description: 'Shub-Niggurath’s monstrous spawn.'},
  {name: 'Star Spawn of Cthulhu', sanityLoss: '1d6/1d20', description: 'Towering mythos entity.'},
  {name: 'Cthonian', sanityLoss: '1d6/1d20', description: 'Burrowing titan from deep earth.'},
  {name: 'Fire Vampire', sanityLoss: '1/1d6', description: 'Invisible burning predator.'},
  {name: 'Shoggoth', sanityLoss: '1d6/1d20', description: 'Protoplasmic shapechanging mass.'},
  {name: 'Dimensional Shambler', sanityLoss: '1d3/1d10', description: 'Hunter between dimensions.'},
  {name: 'Hound of Tindalos', sanityLoss: '1d3/1d10', description: 'Angular time-hunting horror.'},
]

// 10 NPCs (all belong to ONE Keeper account)
const NPCS: Array<{
  name: string
  occupation: string
  age: number
  sex: string
  residence: string
  birthplace: string
  npcRole: string
  npcDescription: string
}> = [
  {
    name: 'Professor Albert Wilmarth',
    occupation: 'Professor',
    age: 38,
    sex: 'M',
    residence: 'Arkham, MA',
    birthplace: 'Massachusetts',
    npcRole: 'Academic',
    npcDescription: 'Miskatonic academic with unsettling correspondence.',
  },
  {
    name: 'Dr. Lillian Harper',
    occupation: 'Physician',
    age: 42,
    sex: 'F',
    residence: 'Arkham, MA',
    birthplace: 'New England',
    npcRole: 'Doctor',
    npcDescription: 'Experienced doctor; skeptical but practical.',
  },
  {
    name: 'Detective Frank Malone',
    occupation: 'Police Detective',
    age: 35,
    sex: 'M',
    residence: 'Arkham, MA',
    birthplace: 'Massachusetts',
    npcRole: 'Detective',
    npcDescription: 'Hard-boiled investigator with street contacts.',
  },
  {
    name: 'Agnes Ward',
    occupation: 'Librarian',
    age: 29,
    sex: 'F',
    residence: 'Arkham, MA',
    birthplace: 'Massachusetts',
    npcRole: 'Researcher',
    npcDescription: 'Quiet librarian who knows what should not be read.',
  },
  {
    name: 'Silas Bishop',
    occupation: 'Journalist',
    age: 33,
    sex: 'M',
    residence: 'Arkham, MA',
    birthplace: 'Vermont',
    npcRole: 'Reporter',
    npcDescription: 'Chases leads, scandal, and strange rural rumors.',
  },
  {
    name: 'Eleanor Finch',
    occupation: 'Antiquarian',
    age: 46,
    sex: 'F',
    residence: 'Boston, MA',
    birthplace: 'Massachusetts',
    npcRole: 'Antiquarian',
    npcDescription: 'Dealer in artifacts with too many private buyers.',
  },
  {
    name: 'Thomas Keane',
    occupation: 'Private Investigator',
    age: 40,
    sex: 'M',
    residence: 'Arkham, MA',
    birthplace: 'New York',
    npcRole: 'PI',
    npcDescription: 'Takes cases others refuse; keeps a low profile.',
  },
  {
    name: 'Martha Caldwell',
    occupation: 'Occultist',
    age: 51,
    sex: 'F',
    residence: 'Providence, RI',
    birthplace: 'Rhode Island',
    npcRole: 'Occultist',
    npcDescription: 'Knows folklore, rites, and the cost of knowledge.',
  },
  {
    name: 'Harold Price',
    occupation: 'Engineer',
    age: 37,
    sex: 'M',
    residence: 'Arkham, MA',
    birthplace: 'Massachusetts',
    npcRole: 'Engineer',
    npcDescription: 'Fixes machines; sometimes finds impossible designs.',
  },
  {
    name: 'Ruth Sullivan',
    occupation: 'Nurse',
    age: 31,
    sex: 'F',
    residence: 'Arkham, MA',
    birthplace: 'Massachusetts',
    npcRole: 'Medic',
    npcDescription: 'Calm in emergencies; sees what fear does to people.',
  },
]

function pickOutcomeFromTarget(result: number, target: number) {
  // Simple deterministic outcomes for seed data
  if (result === 1) return 'critical'
  if (result >= 96) return 'fumble'
  if (result <= Math.floor(target / 5)) return 'extreme'
  if (result <= Math.floor(target / 2)) return 'hard'
  return result <= target ? 'success' : 'failure'
}

async function clearDatabase() {
  // Order matters due to FK constraints
  await prisma.rollHistory.deleteMany()
  await prisma.clue.deleteMany()
  await prisma.location.deleteMany()
  await prisma.investigationSession.deleteMany()

  await prisma.characterSkill.deleteMany()
  await prisma.characterPossession.deleteMany()
  await prisma.characterContact.deleteMany()

  // many-to-many join tables are implicit; Prisma handles via disconnect on deleteMany
  await prisma.monster.deleteMany()
  await prisma.spell.deleteMany()
  await prisma.item.deleteMany()
  await prisma.skill.deleteMany()

  await prisma.characterDerivedStats.deleteMany()
  await prisma.characterCharacteristics.deleteMany()
  await prisma.character.deleteMany()

  await prisma.campaign.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
}
  await clearDatabase()
   /* source of skills and other items */
  /* https://cthulhuwiki.chaosium.com */

  /* ================= USERS (3 roles) ================= */

  const admin = await prisma.user.create({
    data: {email: 'admin@arkham.edu', username: 'admin', password: 'password123', role: Role.Admin},
  })

  const keeper = await prisma.user.create({
    data: {email: 'keeper@arkham.edu', username: 'keeper', password: 'password123', role: Role.Keeper},
  })

  const user = await prisma.user.create({
    data: {email: 'user@arkham.edu', username: 'user', password: 'password123', role: Role.User},
  })

  /* ================= SESSION (allowed exception: 1 is fine) ================= */
  await prisma.session.create({
    data: {userId: admin.id, activeUntil: new Date(Date.now() + 1000 * 60 * 60 * 24)},
  })

  /* ================= SKILL (>=10; we create full list) ================= */
  const skillRows = await Promise.all(
    COC_COMMON_SKILLS.map(s =>
      prisma.skill.create({
        data: {
          name: s.name,
          category: s.category,
          description: 'CoC 7e common skill (seed)',
        },
      }),
    ),
  )

  /* ================= ITEM (10) ================= */
  await prisma.item.createMany({data: ITEMS})
  const itemRows = await prisma.item.findMany()

  /* ================= SPELL (10) ================= */
  const spellRows = await Promise.all(
    SPELLS.map(sp =>
      prisma.spell.create({
        data: {
          name: sp.name,
          description: 'CoC spell (seed; generic description)',
          manaCost: sp.manaCost,
          castTime: sp.castTime,
          range: sp.range,
        },
      }),
    ),
  )

  /* ================= MONSTER (10) ================= */
  const monsterRows = await Promise.all(
    MONSTERS.map((m, idx) =>
      prisma.monster.create({
        data: {
          name: m.name,
          category: 'mythos',
          // Deterministic, consistent numeric placeholders (not verbatim rulebook stat blocks)
          str: 70 + (idx % 3) * 5,
          con: 60 + (idx % 4) * 5,
          siz: 70 + (idx % 5) * 5,
          dex: 45 + (idx % 4) * 5,
          int: 35 + (idx % 3) * 5,
          pow: 55 + (idx % 4) * 5,
          hp: 14 + (idx % 5) * 2,
          mp: 10 + (idx % 4) * 2,
          moveRate: '8',
          damageBonus: '+1d4',
          build: 1 + (idx % 3),
          armor: '2',
          attacks: 'Claw/Bite (seed)',
          skills: 'Stealth/Spot Hidden (seed)',
          sanityLoss: m.sanityLoss,
          description: m.description,
          spells: {connect: [{id: spellRows[idx % spellRows.length].id}]},
        },
      }),
    ),
  )

  /* ================= CHARACTER (10, all NPCs owned by Keeper) ================= */
  const characterRows = []
  for (let i = 0; i < NPCS.length; i++) {
    const n = NPCS[i]

    const c = await prisma.character.create({
      data: {
        name: n.name,
        occupation: n.occupation,
        age: n.age,
        sex: n.sex,
        residence: n.residence,
        birthplace: n.birthplace,
        isNpc: true,
        npcRole: n.npcRole,
        npcDescription: n.npcDescription,
        userId: keeper.id,

        // Each character gets exactly one of each => 10 records in each of these tables
        characteristics: {
          create: {
            strength: 45 + (i % 5) * 5,
            constitution: 45 + (i % 4) * 5,
            size: 50 + (i % 4) * 5,
            dexterity: 45 + (i % 5) * 5,
            appearance: 40 + (i % 5) * 5,
            intelligence: 60 + (i % 3) * 5,
            power: 50 + (i % 4) * 5,
            education: 55 + (i % 4) * 5,
          },
        },
        derivedStats: {
          create: {
            hitPointsCurrent: 11 + (i % 3),
            hitPointsMax: 11 + (i % 3),
            sanityCurrent: 55 + (i % 4) * 5,
            sanityMax: 99,
            magicPointsCurrent: 10 + (i % 4),
            luck: 40 + (i % 6) * 5,
            movement: 8,
            build: 0,
            damageBonus: '0',
          },
        },

        // M2M with spells: connect 1 spell per character (10 total connections)
        Spell: {connect: [{id: spellRows[i % spellRows.length].id}]},
      },
    })

    characterRows.push(c)
  }

  /* ================= CharacterSkill (>=10; we make 10*8 = 80) ================= */
  for (let i = 0; i < characterRows.length; i++) {
    const character = characterRows[i]
    for (let s = 0; s < 8; s++) {
      const skill = skillRows[(i * 8 + s) % skillRows.length]
      const value = 40 + s * 5 // deterministic
      await prisma.characterSkill.create({
        data: {
          characterId: character.id,
          skillId: skill.id,
          value,
        },
      })
    }
  }

  /* ================= CharacterPossession (>=10; we make 10*3 = 30) ================= */
  for (let i = 0; i < characterRows.length; i++) {
    const character = characterRows[i]
    for (let p = 0; p < 3; p++) {
      await prisma.characterPossession.create({
        data: {
          characterId: character.id,
          itemId: itemRows[(i + p) % itemRows.length].id,
          quantity: 1,
        },
      })
    }
  }

  /* ================= CharacterContact (10; 1 per character) ================= */
  for (let i = 0; i < characterRows.length; i++) {
    await prisma.characterContact.create({
      data: {
        characterId: characterRows[i].id,
        name: 'Miskatonic University Archivist',
        relationship: 'Professional Contact',
        description: 'A helpful archivist who can request restricted materials (seed).',
      },
    })
  }

  /* ================= RollHistory (10; 1 per character) ================= */
  // Create one deterministic skill check per character.
  for (let i = 0; i < characterRows.length; i++) {
    const character = characterRows[i]
    const skill = skillRows[i % skillRows.length]
    const target = 50 // seeded target assumption for display purposes
    const result = 10 + i * 7 // deterministic 10,17,24,...
    const outcome = pickOutcomeFromTarget(result, target)

    await prisma.rollHistory.create({
      data: {
        type: 'skillCheck',
        characterId: character.id,
        skillId: skill.id,
        result,
        breakdown: `1d100=${result} vs ${skill.name}(${target})`,
        outcome,
        currentLuck: null,
      },
    })
  }

  /* ================= Campaign (10) + InvestigationSession (10) + Clue (10) + Location (10) ================= */
  for (let i = 1; i <= 10; i++) {
    const campaign = await prisma.campaign.create({
      data: {
        title: `Arkham Casefile #${i}`,
        edition: 'Call of Cthulhu 7e',
        description: 'Seed campaign for testing (CoC-themed).',
        status: 'active',
        startedDate: new Date(1928, i - 1, 1),
        sessionCount: 1,
        keeperId: keeper.id,
        investigators: {
          // connect 3 investigators per campaign (still only 10 characters total)
          connect: [
            {id: characterRows[(i - 1) % characterRows.length].id},
            {id: characterRows[i % characterRows.length].id},
            {id: characterRows[(i + 1) % characterRows.length].id},
          ],
        },
      },
    })

    // One investigation session per campaign => 10 sessions
    await prisma.investigationSession.create({
      data: {
        title: `Session ${i}: Unnatural Findings`,
        date: new Date(1928, i - 1, 15),
        campaign: campaign.title,
        sessionNumber: 1,
        summary: 'Leads, witnesses, and unsettling evidence.',
        details: 'Seed session text for testing long fields and relations.',
        campaignId: campaign.id,

        // 1 clue per session => 10 clues
        clues: {
          create: [
            {
              description: `Clue ${i}: A fragment of correspondence mentioning forbidden names.`,
              discoveredAt: new Date(1928, i - 1, 15),
            },
          ],
        },

        // 1 location per session => 10 locations
        locations: {
          create: [
            {
              name: i % 2 === 0 ? 'Miskatonic University Library' : 'Arkham Woods',
              description: 'A seed location for testing session mapping.',
            },
          ],
        },

        // link NPCs + participants (M:N)
        npcs: {
          connect: [{id: characterRows[(i - 1) % characterRows.length].id}],
        },
        participants: {
          connect: [
            {id: characterRows[i % characterRows.length].id},
            {id: characterRows[(i + 1) % characterRows.length].id},
          ],
        },
      },
    })
  }

  console.log(' Seed complete and STRICTLY compliant:')
  console.log('   - Users: 3 (Admin/Keeper/User)')
  console.log('   - Sessions: 1 (allowed exception)')
  console.log('   - Every other model: 10+ records')
}
