import { redirect } from 'next/navigation'
import Container from '@components/_elements/container'
import EndgameTrainer from '@components/training/endgames/EndgameTrainer'
import Backdrop from '~/components/_elements/backdrop'
import Heading from '~/components/_elements/heading'
import { getUserServer } from '@utils/getUserServer'

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
