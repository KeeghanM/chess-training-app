import * as Sentry from '@sentry/nextjs'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'
import type { TrainingPuzzle } from '~/app/components/training/tactics/TacticsTrainer'

export async function POST(request: Request) {
  const session = getKindeServerSession(request)
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { rating, themesType, themes, count } = (await request.json()) as {
    rating: number
    themesType: string
    themes: string
    count: number
  }

  if (!rating || count == undefined || (themes && !themesType))
    return errorResponse('Missing required fields', 400)

  if (count < 1 || count > 500)
    return errorResponse('Count must be between 1 and 500', 400)

  let params: {
    rating: string
    count: string
    themesType?: string
    themes?: string
  } = {
    rating: rating.toString(),
    count: count.toString(),
  }

  if (themes) params = { ...params, themesType, themes }

  try {
    const paramsString = new URLSearchParams(params).toString()
    const resp = await fetch(
      'https://chess-puzzles.p.rapidapi.com/?' + paramsString,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'chess-puzzles.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPIDAPI_KEY!,
        },
      },
    )
    const json = (await resp.json()) as { puzzles: TrainingPuzzle[] }
    const puzzles = json.puzzles

    if (!puzzles) return errorResponse('Puzzles not found', 404)

    return successResponse('Puzzles found', { puzzles }, 200)
  } catch (e) {
    Sentry.captureException(e)
    return errorResponse('Internal Server Error', 500)
  }
}
