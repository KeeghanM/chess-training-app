// using native Response
import * as Sentry from '@sentry/nextjs'

import { AddCuratedSetToUser } from '../functions/AddCuratedSetToUser'

/**
 * Protected endpoint to manually trigger AddCuratedSetToUser.
 * Provide header `x-admin-secret` matching process.env.ADMIN_TRIGGER_SECRET
 * and a JSON body: { setId: string, userId: string }
 */
export async function POST(request: Request) {
  try {
    const headerSecret = request.headers.get('x-admin-secret')
    const envSecret = process.env.ADMIN_TRIGGER_SECRET

    if (!envSecret) {
      Sentry.captureMessage('ADMIN_TRIGGER_SECRET not set')
      return new Response(
        JSON.stringify({ error: 'ADMIN_TRIGGER_SECRET not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    if (!headerSecret || headerSecret !== envSecret) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const body = await request.json()
    const { setId, userId } = body ?? {}

    if (!setId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing setId or userId' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const added = await AddCuratedSetToUser(setId, userId)

    if (!added) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to add curated set',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    Sentry.captureException(err)
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
