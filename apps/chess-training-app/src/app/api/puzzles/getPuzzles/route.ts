import { z } from 'zod'
import { env } from '~/env'

import type { TrainingPuzzle } from '@components/training/tactics/TacticsTrainer'

import { apiWrapper } from '@utils/api-wrapper'
import { InternalError } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

const GetPuzzlesSchema = z.object({
  rating: z.number().min(500).max(3000),
  themes: z.array(z.string()).optional(),
  count: z.number().min(1).max(500),
  playerMoves: z.number().optional(),
})

export const POST = apiWrapper(async (request) => {
  const { rating, themes, count, playerMoves } = await validateBody(
    request,
    GetPuzzlesSchema,
  )

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

  if (themes) {
    params = {
      ...params,
      themesType: 'OR',
      ...(themes && themes.length > 0 && { themes: JSON.stringify(themes) }),
    }
  }
  if (playerMoves) params = { ...params, playerMoves: playerMoves.toString() }

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

  if (!puzzles) throw new InternalError('Puzzles not found')

  return successResponse('Puzzles found', { puzzles })
})
