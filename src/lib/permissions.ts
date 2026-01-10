import type {Role} from '@/generated/prisma/client'

export const rolePermissions: Record<
  Role,
  {
    canAccessItems: boolean
    canAccessMonsters: boolean
    canAccessStories: boolean
  }> = {
  Admin: {
    canAccessItems: true,
    canAccessMonsters: true,
    canAccessStories: true,
  },
  Keeper: {
    canAccessItems: true,
    canAccessMonsters: true,
    canAccessStories: true,
  },
  User: {
    canAccessItems: false,
    canAccessMonsters: false,
    canAccessStories: false,
  },
}
