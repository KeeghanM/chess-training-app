import { UploadFensSchema } from '@schemas/courses'

import { prisma } from '@server/db'

import { apiWrapper } from '@utils/api-wrapper'
import { BadRequest } from '@utils/errors'
import { successResponse } from '@utils/server-responses'
import { validateBody } from '@utils/validators'

export async function POST(
  request: Request,
  props: { params: Promise<{ courseId: string }> },
) {
  return apiWrapper(async (req) => {
    const params = await props.params
    const { courseId } = params

    const { fens } = await validateBody(req, UploadFensSchema)

    if (!courseId) throw new BadRequest('Missing courseId')

    await prisma.userFen.createMany({
      data: fens.map((fen) => ({
        fen: fen.fen,
        commentId: fen.commentId,
        userCourseId: courseId,
      })),
    })

    return successResponse('Fens uploaded', { count: fens.length })
  })(request)
}
