import Link from 'next/link'
import { redirect } from 'next/navigation'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import GetCourse from '@components/ecomm/GetCourse'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import type {
  Course,
  Group,
  Line,
  UserCourse,
  UserProfile,
} from '@prisma/client'
import posthog from 'posthog-js'
import { prisma } from '~/server/db'

export default async function CoursePage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const { slug } = params
  const session = getKindeServerSession()
  const user = await session.getUser()

  const {
    course,
    createdBy,
  }: {
    course: (Course & { lines: Line[] } & { groups: Group[] }) | undefined
    createdBy: UserProfile | undefined
  } = await (async () => {
    try {
      const course = await prisma.course.findUnique({
        where: {
          slug,
          OR: [
            {
              published: true,
            },
            {
              createdBy: user?.id,
            },
          ],
        },
        include: {
          lines: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
          groups: true,
        },
      })

      if (!course) throw new Error('Course not found')

      const createdBy = await prisma.userProfile.findUnique({
        where: {
          id: course.createdBy,
        },
      })

      if (!createdBy) throw new Error('Course creator not found')

      return { course, createdBy }
    } catch (e) {
      posthog.captureException(e)
      return { course: undefined, createdBy: undefined }
    }
  })()

  if (!course || !createdBy) {
    redirect('/404')
  }

  let userCourse: UserCourse | null = null
  if (user) {
    userCourse = await prisma.userCourse.findFirst({
      where: {
        userId: user.id,
        courseId: course.id,
      },
    })
  }

  const publicAuthor = createdBy.public

  const groupLineCounts = course.lines.reduce(
    (acc: Record<string, number>, line) => {
      const groupName = course.groups.find(
        (group) => group.id === line.groupId,
      )!.groupName
      if (groupName) acc[groupName] = (acc[groupName] ?? 0) + 1
      return acc
    },
    {},
  )

  const groupLineCountsArray = Object.keys(groupLineCounts).map((name) => ({
    name,
    count: groupLineCounts[name],
  }))

  return (
    <>
      <div className="w-full flex items-center justify-center py-2 bg-gray-200">
        <p className="text-xs text-gray-600">
          <Link className="text-purple-700 hover:underline" href="/">
            Home
          </Link>
          <Link
            className="text-purple-700 hover:underline cursor-pointer"
            href="/courses"
          >
            /Courses
          </Link>
          /{course.courseName}
        </p>
      </div>
      <Container>
        <div className="flex flex-col gap-2">
          <StyledLink href="/courses">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
                />
                <path
                  fill="currentColor"
                  d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
                />
              </svg>
              <span>Back to Courses</span>
            </span>
          </StyledLink>
          <div className="p-4 bg-gray-100">
            <Heading as={'h1'}>{course.courseName}</Heading>
            <p className="text-sm">
              Created By:{' '}
              {publicAuthor ? (
                <StyledLink href={`/members/${createdBy.username}`}>
                  {createdBy.username}
                </StyledLink>
              ) : (
                createdBy.username
              )}
              , making use of{' '}
              <StyledLink href="/about/features/natural-play-learning">
                Natural Play Learning
              </StyledLink>
            </p>
          </div>
          <GetCourse
            courseId={course.id}
            price={course.price}
            userCourseId={userCourse?.active ? userCourse?.id : undefined}
            slug={course.slug}
            showPrice={true}
          />
          {course.courseDescription && (
            <article
              className="p-4 bg-gray-100"
              dangerouslySetInnerHTML={{ __html: course.courseDescription }}
            />
          )}
          <div className="p-4 bg-gray-100">
            <Heading as={'h2'}>Course Contents</Heading>
            <ul>
              {groupLineCountsArray.map((group) => (
                <li key={group.name}>
                  {group.name} ({group.count})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
