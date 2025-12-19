import type {PrismaClient} from '@/generated/prisma/client'
import {Role} from '@/generated/prisma/client'

export const seedProd = async (prisma: PrismaClient) => {
  console.log('Running PRODUCTION seed (minimal, no bcrypt)')
  await prisma.user.create({
    data: {
      email: 'admin@yourapp.com',
      username: 'admin',
      password: 'change-me',
      role: Role.Admin,
    },
  })
}
