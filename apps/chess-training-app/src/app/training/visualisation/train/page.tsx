import { redirect } from 'next/navigation'
import Container from '@components/_elements/container'
import VisualisationTrainer from '@components/training/visualisation/VisualisationTrainer'
import Backdrop from '~/components/_elements/backdrop'
import Heading from '~/components/_elements/heading'
import { getUserServer } from '@utils/getUserServer'

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
