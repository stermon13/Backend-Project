import 'server-only'
import type {NextRequest, NextResponse} from 'next/server'
import {publicApiRoute} from '@/lib/apiRoute'
import {getUserByEmail} from '@/dal/users'
import {verifyPassword} from '@/lib/passwordUtils'
import {createJwtToken} from '@/lib/jwtUtils'
import {badRequest, ok, unauthorized} from '@/lib/routeResponses'
import {z} from 'zod'

const bodySchema = z.object({email: z.string().email(), password: z.string()})

export const POST = publicApiRoute({
  schema: bodySchema,
  type: 'body',
  // This route is public: it returns a bearer token for valid credentials
  routeFn: async ({data}) => {
    const user = await getUserByEmail(data.email)

    // If the user doesn't exist or password is invalid, don't reveal which one failed
    const timingSafePassword = `placeholder$${Math.random()}`
    const isValid = verifyPassword(user?.password ?? timingSafePassword, data.password)

    if (!isValid || !user) {
      return unauthorized({message: 'Invalid credentials'})
    }

    // Create a short-lived JWT for mobile/third-party clients (stateless)
    const token = createJwtToken({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    })

    // Note: adjust Access-Control-Allow-Origin in production to a specific origin
    return ok({token}, {'Access-Control-Allow-Origin': '*'})
  },
})

