import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest, NotFound } from '@utils/errors'
import getPuzzleById from '@utils/get-puzzle-by-id'
import { successResponse } from '@utils/server-responses'

export async function GET(
  request: Request,
  props: { params: Promise<{ puzzleid: string }> },
) {
  return apiWrapper(async () => {
    const params = await props.params
    const puzzleid = params.puzzleid
    if (!puzzleid) throw new BadRequest('Missing required fields')

    const puzzle = await getPuzzleById(puzzleid)
    if (!puzzle) throw new NotFound('Puzzle not found')

    return successResponse('Puzzle found', { puzzle })
  })(request)
}
