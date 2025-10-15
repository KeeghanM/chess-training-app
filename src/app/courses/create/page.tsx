import { redirect } from 'next/navigation'
import PageHeader from '@components/_layouts/pageHeader'
import CreateCourseForm from '@components/training/courses/create/CreateCourse'
import { getUserServer } from '@utils/getUserServer'

export const metadata = {
  title: 'Create a new course - ChessTraining.app',
}

export default async function CreateCourse() {
  const { user } = await getUserServer()
  if (!user) redirect('/auth/signin')

  return (
    <>
      <PageHeader
        title={'Create a new course'}
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <CreateCourseForm />
    </>
  )
}
