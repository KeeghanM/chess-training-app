import { redirect } from 'next/navigation'

import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import VisualisationTrainer from '@components/training/visualisation/VisualisationTrainer'

import { getUserServer } from '@utils/get-user-server'

export default async function VisualisationTrainPage() {
  const { user } = await getUserServer()
  if (!user) redirect('/auth/signin')

  return (
    <div className="relative">
      <Backdrop />
      <Container size="wide">
        <Heading as="h1" className="text-white">
          Visualisation Trainer
        </Heading>
        <VisualisationTrainer />
      </Container>
    </div>
  )
}
