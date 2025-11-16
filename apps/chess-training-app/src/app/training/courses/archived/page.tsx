import { redirect } from 'next/navigation'

import Container from '@components/_elements/container'
import PageHeader from '@components/_layouts/pageHeader'
import ArchivedList from '@components/training/courses/list/ArhivedList'

import { getUserServer } from '@utils/getUserServer'

export const metadata = {
  title: 'Your Archived Courses - ChessTraining.app',
}

export default async function ArchivedCoursesPage() {
  const { user } = await getUserServer()

  if (!user) redirect('/auth/signin')
  return (
    <>
      <PageHeader title="Your Archived Courses" />
      <div className="">
        <Container>
          <ArchivedList />
        </Container>
      </div>
    </>
  )
}
