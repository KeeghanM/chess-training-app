import { cookies } from 'next/headers'

import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  const cookiesList = await cookies()
  if (!cookiesList.get('sessionId')) {
    const sessionId = uuidv4()
    cookiesList.set('sessionId', sessionId)
  }

  const sessionId = cookiesList.get('sessionId')?.value

  return new Response(JSON.stringify({ sessionId }), {
    headers: {
      'content-type': 'application/json',
      'Set-Cookie': sessionId!,
    },
  })
}
