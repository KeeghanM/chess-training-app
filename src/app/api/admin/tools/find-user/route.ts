import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import { errorResponse, successResponse } from '~/app/api/responses'

type KindeTokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
}

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const permissions = await session.getPermissions()
  if (!permissions?.permissions.includes('staff-member'))
    return errorResponse('Unauthorized', 401)

  const { email } = (await request.json()) as { email: string }
  if (!email) return errorResponse('Missing email', 400)

  const issuer = process.env.KINDE_ISSUER_URL
  const clientId = process.env.KINDE_CLIENT_ID
  const clientSecret = process.env.KINDE_CLIENT_SECRET

  if (!issuer || !clientId || !clientSecret)
    return errorResponse('Kinde not configured', 500)

  try {
    // Get token via client credentials
    const tokenRes = await fetch(`${issuer}/oauth2/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'read:users',
      }),
    })

    if (!tokenRes.ok) throw new Error('Failed to get token')
    const tokenJson = (await tokenRes.json()) as KindeTokenResponse

    // Call Kinde users endpoint (search by email)
    const usersRes = await fetch(
      `${issuer}/api/v1/users?email=${encodeURIComponent(email)}`,
      {
        headers: { Authorization: `Bearer ${tokenJson.access_token}` },
      },
    )

    if (!usersRes.ok) {
      const txt = await usersRes.text()
      throw new Error(`Failed to fetch users: ${txt}`)
    }

    const users = await usersRes.json()

    return successResponse('Found', { users }, 200)
  } catch (e) {
    Sentry.captureException(e)
    return errorResponse('An error occurred', 500)
  }
}
