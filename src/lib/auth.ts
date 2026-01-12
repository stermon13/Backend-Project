import {redirect} from 'next/navigation'
import type {Role} from '@/generated/prisma/client'
import {getSessionProfileFromCookie} from '@/lib/sessionUtils'
import type {Route} from 'next'

/**
 * Require the user to have one of the given roles.
 * Can be used in layouts, route handlers, or server functions.
 */
export async function requireRole(
  allowedRoles: Role[],
  options?: {
    redirectTo?: Route
  },
) {
  const profile = await getSessionProfileFromCookie(true)

  if (!profile || !allowedRoles.includes(profile.role)) {
    if (options?.redirectTo) {
      redirect(options.redirectTo)
    }

    throw new Error('Forbidden')
  }

  return profile
}
