import { redirect } from 'next/navigation'
import Container from '@components/_elements/container'
import PageHeader from '@components/_layouts/pageHeader'
import VisualisationTrainer from '@components/training/visualisation/VisualisationTrainer'
import { getUserServer } from '@utils/getUserServer'

export default async function VisualisationTrainPage() {
  const { user } = await getUserServer()
  if (!user) redirect('/auth/signin')

  return (
    <>
      <PageHeader
        title="Visualisation Training"
        image={{
          src: '/images/hero.avif',
          alt: 'Strategic chess endgame setup on a chess board',
        }}
      />
      <div className="bg-gray-100 ">
        <Container>
          <VisualisationTrainer />
        </Container>
      </div>
    </>
  )
}
