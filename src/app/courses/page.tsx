import Link from 'next/link'

import { prisma } from '~/server/db'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import Button from '../components/_elements/button'
import Container from '../components/_elements/container'
import StyledLink from '../components/_elements/styledLink'
import BigText from '../components/_layouts/bigText'
import PageHeader from '../components/_layouts/pageHeader'
import GetCourse from '../components/ecomm/GetCourse'
import Heading from '~/app/components/_elements/heading'

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
    <>
      <PageHeader
        title="Study Chess Openings with Natural Play Learning"
        image={{
          src: '/images/hero.avif',
          alt: 'Wooden chess pieces on a chess board',
        }}
        subTitle="The best way to improve your Chess Openings and beyond"
      ></PageHeader>
      <BigText size="small" color="secondary">
        Learn about Natural Play Learning, our innovative chess training method{' '}
        <StyledLink href="/about/features/natural-play-learning">
          here
        </StyledLink>
        .
      </BigText>
      <Container>
        <Heading as="h2">All Available Courses</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {courses
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((course) => (
              <div
                key={course.id}
                className="flex flex-col gap-0 border border-gray-300 shadow-md bg-[rgba(0,0,0,0.03)]"
              >
                <div className="px-2 py-1 border-b border-gray-300 font-bold  text-orange-500 flex items-center flex-wrap justify-between">
                  <Link href={`/courses/${course.slug}`}>
                    <Heading as="h4">{course.courseName}</Heading>
                  </Link>
                  <p className="font-bold text-green-500">
                    {course.price > 0 ? <>£{course.price / 100}</> : 'FREE'}
                  </p>
                </div>
                <p className="w-full text-center bg-purple-300  py-1 italic text-sm">
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
                <div
                  className="p-2"
                  dangerouslySetInnerHTML={{
                    __html: course.shortDescription ?? '',
                  }}
                />
                <div className="flex flex-col md:flex-row gap-2 p-2 items-center justify-center">
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
                    <Button variant="secondary">View Course</Button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <Heading as="h3">
          <em>More Courses Coming Soon!</em>
        </Heading>
      </Container>
    </>
  )
}
