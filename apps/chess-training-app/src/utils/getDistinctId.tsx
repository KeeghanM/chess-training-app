import posthog from 'posthog-js'
import { env } from '~/env'

import { getUserServer } from './getUserServer'

export default async function getDistinctId() {
  // First, try to just return the userId
  const { user } = await getUserServer()
  if (user) return user.id

  // If not, we can get the SessionID from the cookie
  // This API endpoint will set it if not already existing
  try {
    const resp = await fetch(`${env.API_BASE_URL}/auth/cookies`)
    const json = (await resp.json()) as { sessionId: string }
    if (json.sessionId) return json.sessionId
  } catch (e) {
    posthog.captureException(e)
    return 'anonymous'
  }

  return 'anonymous'
}
