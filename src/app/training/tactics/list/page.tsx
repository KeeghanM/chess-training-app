import { redirect } from 'next/navigation'

import Backdrop from '~/app/components/_elements/backdrop'
import Container from '~/app/components/_elements/container'
import Heading from '~/app/components/_elements/heading'
import TacticsList from '~/app/components/training/tactics/list/TacticsList'

import { getUserServer } from '~/app/_util/getUserServer'

export default async function TacticsListPage() {
  const { user, isPremium } = await getUserServer()
  if (!user) redirect('/auth/signin')

  return (
    <div className="relative">
      <Backdrop />
      <Container size="extra-wide">
        <Heading as="h1" className="text-white">
          Tactics Trainer
        </Heading>
        <Heading as="h2" className="text-card-dark">
          Your puzzle sets
        </Heading>
        <TacticsList hasUnlimitedSets={isPremium} />
      </Container>
    </div>
  )
}
