import { redirect } from 'next/navigation'
import { prisma } from '~/server/db'
import * as Sentry from '@sentry/nextjs'
import Container from '@components/_elements/container'
import type { PrismaTacticsSetWithPuzzles } from '@components/training/tactics/TacticsTrainer'
import TacticsTrainer from '@components/training/tactics/TacticsTrainer'
import { getUserServer } from '@utils/getUserServer'

export default async function TacticsTrainPage(props: {
  params: Promise<{ setId: string }>
}) {
  const params = await props.params
  const { user, profile } = await getUserServer()
  if (!user) redirect('/auth/signin')
  let set: PrismaTacticsSetWithPuzzles | null = null

  try {
    const userId = user.id ?? profile?.id ?? ''
    if (!userId) return redirect('/auth/signin')

    set = (await prisma.tacticsSet.findUnique({
      where: { id: params.setId, userId },
      include: {
        puzzles: {
          orderBy: [
            {
              sortOrder: 'asc',
            },
            {
              puzzleid: 'asc',
            },
          ],
        },
        rounds: true,
      },
    })) as PrismaTacticsSetWithPuzzles | null
  } catch (e) {
    Sentry.captureException(e)
    return redirect('/training/tactics/list')
  }

  if (!set) {
    Sentry.captureEvent({
      message: `User tried to access set but not found`,
      extra: { userId: user.id, setId: params.setId },
    })
    return redirect('/training/tactics/list')
  }

  return (
    <div className="">
      <Container>
        <TacticsTrainer set={set} />
      </Container>
    </div>
  )
}
