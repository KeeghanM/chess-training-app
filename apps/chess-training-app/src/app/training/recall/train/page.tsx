import { redirect } from 'next/navigation'
import Container from '@components/_elements/container'
import RecallTrainer from '@components/training/recall/RecallTrainer'
import { getUserServer } from '@utils/getUserServer'
import Backdrop from '~/components/_elements/backdrop'
import Heading from '~/components/_elements/heading'

export default async function RecallTrainPage() {
  const { user } = await getUserServer()
  if (!user) redirect('/auth/signin')

  return (
    <div className="relative">
      <Backdrop />
      <Container size="wide">
        <Heading as="h1" className="text-white">
          Recall Trainer
        </Heading>
        <RecallTrainer />
      </Container>
    </div>
  )
}
