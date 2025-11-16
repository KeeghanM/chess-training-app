import { redirect } from 'next/navigation'
import CreateCourseForm from '@components/training/courses/create/CreateCourse'
import { getUserServer } from '@utils/getUserServer'
import Backdrop from '~/components/_elements/backdrop'
import Container from '~/components/_elements/container'
import Heading from '~/components/_elements/heading'

export const metadata = {
  title: 'Create a new course - ChessTraining.app',
}

export default async function CreateCourse() {
  const { user } = await getUserServer()
  if (!user) redirect('/auth/signin')

  return (
    <div className="relative">
      <Backdrop />
      <Container className="space-y-6">
        <Heading as="h1" className="text-white">
          Create a new course
        </Heading>
        <CreateCourseForm />
      </Container>
    </div>
  )
}
