import { prisma } from '~/server/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { errorResponse, successResponse } from '../../responses'

export async function POST(req: Request) {
  const session = getKindeServerSession()
  if (!session) return errorResponse('Unauthorized', 401)

  const user = await session.getUser()
  if (!user) return errorResponse('Unauthorized', 401)

  try {
    const { setId } = await req.json()

    if (!setId) {
      return errorResponse('Missing setId', 400)
    }

    await prisma.tacticsSet.update({
      where: {
        id: setId,
        userId: user.id,
      },
      data: {
        status: 'ACTIVE',
      },
    })

    return successResponse('Set Restored', { setId }, 200)
  } catch (error) {
    console.error('[RESTORE_SET_ERROR]', error)
    return errorResponse('Internal Error', 500)
  }
}
