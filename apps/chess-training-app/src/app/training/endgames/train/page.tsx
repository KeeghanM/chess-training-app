import { redirect } from 'next/navigation'

import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import EndgameTrainer from '@components/training/endgames/EndgameTrainer'

import { getUserServer } from '@utils/get-user-server'

export default async function EndgameTrainPage() {
  const { user } = await getUserServer()
  if (!user) redirect('/auth/signin')

  return (
    <div className="relative">
      <Backdrop />
      <Container size="wide">
        <Heading as="h1" className="text-white">
          Endgame Trainer
        </Heading>
        <EndgameTrainer />
      </Container>
    </div>
  )
}
