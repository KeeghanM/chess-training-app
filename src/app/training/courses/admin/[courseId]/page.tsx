import { redirect } from 'next/navigation'
import { prisma } from '~/server/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import * as Sentry from '@sentry/nextjs'
import Container from '@components/_elements/container'
import PageHeader from '@components/_layouts/pageHeader'
import CourseAdminPanel from '@components/training/courses/admin/AdminPanel'

export default async function CourseAdminPage(props: {
  params: Promise<{ courseId: string }>
}) {
  const params = await props.params
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) redirect('/auth/signin')

  const { courseId } = params

  const { course } = await (async () => {
    try {
      const course = await prisma.course.findFirst({
        where: {
          id: courseId,
        },
        include: {
          lines: {
            include: {
              moves: true,
            },
          },
          groups: true,
        },
      })

      if (!course) throw new Error('Course not found')

      return {
        course,
      }
    } catch (e) {
      Sentry.captureException(e)
      return {
        course: undefined,
      }
    }
  })()

  if (!course) {
    redirect('/404')
  }

  if (course.createdBy != user.id) {
    redirect('/training/courses')
  }

  return (
    <>
      <PageHeader
        title={course.courseName}
        subTitle="Admin Panel"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
      />
      <div className="">
        <Container>
          <CourseAdminPanel course={course} />
        </Container>
      </div>
    </>
  )
}
