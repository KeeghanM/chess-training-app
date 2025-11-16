import type { TrainingPuzzle } from '@components/training/tactics/TacticsTrainer'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '~/app/api/responses'
import { env } from '~/env'
import { getPostHogServer } from '~/server/posthog-server'

const posthog = getPostHogServer()

export async function POST(request: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  const { rating, themes, count, playerMoves } = (await request.json()) as {
    rating: number
    themes: string
    count: number
    playerMoves: number
  }

  if (!rating || count == undefined)
    return errorResponse('Missing required fields', 400)

  if (count < 1 || count > 500)
    return errorResponse('Count must be between 1 and 500', 400)

  if (rating < 500 || rating > 3000)
    return errorResponse('Rating must be between 500 & 3000', 400)

  let params: {
    rating: string
    count: string
    themesType?: 'OR'
    themes?: string
    playerMoves?: string
  } = {
    rating: rating.toString(),
    count: count.toString(),
  }

  if (themes) params = { ...params, themesType: 'OR', themes }
  if (playerMoves) params = { ...params, playerMoves: playerMoves.toString() }

  try {
    const paramsString = new URLSearchParams(params).toString()
    const resp = await fetch(`${env.PUZZLE_API_URL}/?${paramsString}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'chess-puzzles.p.rapidapi.com',
        'x-rapidapi-key': env.RAPIDAPI_KEY,
      },
    })
    const json = (await resp.json()) as { puzzles: TrainingPuzzle[] }

    const puzzles = json.puzzles

    if (!puzzles) return errorResponse('Puzzles not found', 404)

    return successResponse('Puzzles found', { puzzles }, 200)
  } catch (e) {
    posthog.captureException(e)
    return errorResponse('Internal Server Error', 500)
  }
}
