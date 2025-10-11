import { redirect } from 'next/navigation'
import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import CourseList from '@components/training/courses/list/CoursesList'
import { getUserServer } from '@utils/getUserServer'

export const metadata = {
  title: 'Your Courses - ChessTraining.app',
}

export default async function Courses() {
  const { user, isPremium } = await getUserServer()

  if (!user) redirect('/auth/signin')

  return (
    <div className="relative">
      <Backdrop />
      <Container size="extra-wide">
        <Heading as="h1" className="text-white">
          Opening Courses
        </Heading>
        <Heading as="h2" className="text-card-dark">
          Your Courses
        </Heading>
        <CourseList hasUnlimitedCourses={isPremium} />
      </Container>
    </div>
  )
}
