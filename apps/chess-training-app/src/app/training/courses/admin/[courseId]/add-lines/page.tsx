import { redirect } from 'next/navigation'
import Container from '@components/_elements/container'
import PageHeader from '@components/_layouts/pageHeader'
import AddLines from '@components/training/courses/admin/AddLines'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import posthog from 'posthog-js'
import { prisma } from '~/server/db'

export default async function AddLinesPage(props: {
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
      })

      if (!course) throw new Error('Course not found')

      return {
        course,
      }
    } catch (e) {
      posthog.captureException(e)
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
      <PageHeader title={course.courseName} subTitle="Add Lines" />
      <div className="">
        <Container>
          <AddLines courseId={courseId} />
        </Container>
      </div>
    </>
  )
}
