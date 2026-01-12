import {getSessionFromCookie} from '@/lib/sessionUtils'
import {getAllSpells} from '@/dal/spells'

export async function proxyGetAllSpells() {
  const session = await getSessionFromCookie(false)
  if (!session) throw new Error('Unauthorized')
  return getAllSpells()
}
