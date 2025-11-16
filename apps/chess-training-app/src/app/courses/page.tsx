import Link from 'next/link'
import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import BigText from '@components/_layouts/bigText'
import GetCourse from '@components/ecomm/GetCourse'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { prisma } from '~/server/db'
import Backdrop from '~/components/_elements/backdrop'

export const metadata = {
  title:
    'Master Chess Openings with Courses Using Natural Play Learning - ChessTraining.app',
  description:
    "Embark on a chess learning adventure with ChessTraining.app's courses, featuring our unique Natural Play Learning method. Our courses are designed to help you learn and remember chess openings more effectively and enjoyably. Utilizing spaced repetition with a creative twist, we ensure you grasp every move without tedious repetition. While our own courses are in development, there's nothing stopping you creating your own. Stay updated with our upcoming courses and feature releases to enhance your chess journey!",
}

export default async function Courses() {
  const session = getKindeServerSession()
  const user = await session.getUser()
  const courses = await prisma.course.findMany({
    where: { published: true },
    include: {
      createdByProfile: true,
    },
  })

  const userCourses = user
    ? await prisma.userCourse.findMany({
        where: {
          userId: user.id,
          active: true,
        },
      })
    : []

  return (
    <div className="relative">
      <Backdrop />
      <Container>
        <Heading as="h1" className="text-white">
          Study Chess Openings with Natural Play Learning
        </Heading>
        <Heading as="h2" className="text-primary">
          The best way to improve your Chess Openings and beyond
        </Heading>
      </Container>
      <Container className="space-y-4 bg-card-dark rounded-lg shadow">
        <Heading as="h2">All Available Courses</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {courses
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((course) => (
              <div key={course.id}>
                <div className="flex flex-col gap-0 bg-card rounded-lg shadow-lg overflow-hidden">
                  <div className="px-4 py-3 bg-card-light border-b border-gray-200 font-bold text-orange-500 flex items-center flex-wrap justify-between">
                    <Link href={`/courses/${course.slug}`}>
                      <Heading as="h4">{course.courseName}</Heading>
                    </Link>
                    <p className="font-bold text-green-600">
                      {course.price > 0 ? <>£{course.price / 100}</> : 'FREE'}
                    </p>
                  </div>
                  <p className="w-full text-center  py-2 italic text-sm">
                    Created By:{' '}
                    {course.createdByProfile.public ? (
                      <StyledLink
                        href={`/members/${course.createdByProfile.username}`}
                      >
                        {course.createdByProfile.username}
                      </StyledLink>
                    ) : (
                      course.createdByProfile.username
                    )}
                  </p>
                  {course.shortDescription && (
                    <div
                      className="p-4 text-gray-800"
                      dangerouslySetInnerHTML={{
                        __html: course.shortDescription,
                      }}
                    />
                  )}
                  <div className="flex flex-col md:flex-row gap-2 p-4 items-center justify-center">
                    <GetCourse
                      courseId={course.id}
                      price={course.price}
                      slug={course.slug}
                      userCourseId={
                        userCourses.find((c) => c.courseId === course.id)?.id
                      }
                      showPrice={false}
                    />
                    <Link href={`/courses/${course.slug}`}>
                      <Button>View Course</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <Heading as="h3">
          <em>More Courses Coming Soon!</em>
        </Heading>
      </Container>
      <BigText size="small" color="accent">
        Learn about Natural Play Learning, our innovative chess training method{' '}
        <StyledLink href="/about/features/natural-play-learning">
          here
        </StyledLink>
        .
      </BigText>
    </div>
  )
}
