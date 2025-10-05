import { redirect } from 'next/navigation'
import Container from '@components/_elements/container'
import PageHeader from '@components/_layouts/pageHeader'
import CourseList from '@components/training/courses/list/CoursesList'
import { getUserServer } from '@utils/getUserServer'

export const metadata = {
  title: 'Your Courses - ChessTraining.app',
}

export default async function Courses() {
  const { user, isPremium } = await getUserServer()

  if (!user) redirect('/auth/signin')

  return (
    <>
      <PageHeader
        title="Opening Courses"
        subTitle="Your Courses"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <div className="">
        <Container>
          <CourseList hasUnlimitedCourses={isPremium} />
        </Container>
      </div>
    </>
  )
}
