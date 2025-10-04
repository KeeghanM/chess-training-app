import { redirect } from 'next/navigation'

import Container from '~/app/components/_elements/container'
import PageHeader from '~/app/components/_layouts/pageHeader'
import ArchivedList from '~/app/components/training/courses/list/ArhivedList'

import { getUserServer } from '~/app/_util/getUserServer'

export const metadata = {
  title: 'Your Archived Courses - ChessTraining.app',
}

export default async function ArchivedCoursesPage() {
  const { user } = await getUserServer()

  if (!user) redirect('/auth/signin')
  return (
    <>
      <PageHeader
        title="Your Archived Courses"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <div className="">
        <Container>
          <ArchivedList />
        </Container>
      </div>
    </>
  )
}
