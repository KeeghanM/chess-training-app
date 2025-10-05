import { redirect } from 'next/navigation'
import Container from '@components/_elements/container'
import PageHeader from '@components/_layouts/pageHeader'
import RecallTrainer from '@components/training/recall/RecallTrainer'
import { getUserServer } from '@utils/getUserServer'

export default async function RecallTrainPage() {
  const { user } = await getUserServer()
  if (!user) redirect('/auth/signin')

  return (
    <>
      <PageHeader
        title="Recall Training"
        image={{
          src: '/images/hero.avif',
          alt: 'Strategic chess endgame setup on a chess board',
        }}
      />
      <div className="bg-gray-100 ">
        <Container>
          <RecallTrainer />
        </Container>
      </div>
    </>
  )
}
