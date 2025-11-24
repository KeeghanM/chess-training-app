import { redirect } from 'next/navigation'

import posthog from 'posthog-js'

import { prisma } from '@server/db'

import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import type { PrismaTacticsSetWithPuzzles } from '@components/training/tactics/TacticsTrainer'
import TacticsTrainer from '@components/training/tactics/TacticsTrainer'

import { getUserServer } from '@utils/get-user-server'

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
    posthog.captureException(e)
    return redirect('/training/tactics/list')
  }

  if (!set) {
    posthog.captureException(
      new Error(`User tried to access set but not found`),
      { userId: user.id, setId: params.setId },
    )
    return redirect('/training/tactics/list')
  }

  return (
    <div className="relative">
      <Backdrop />
      <Container size="wide">
        <Heading as="h1" className="text-white">
          Tactics Trainer
        </Heading>
        <Heading as="h2" className="text-card-dark">
          {set.name}
        </Heading>
        <TacticsTrainer set={set} />
      </Container>
    </div>
  )
}
