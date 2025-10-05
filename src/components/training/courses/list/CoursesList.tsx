'use client'

import Link from 'next/link'
import { useCourseQueries } from '@hooks/use-course-queries'
import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import Spinner from '@components/general/Spinner'
import PremiumSubscribe from '../../../ecomm/PremiumSubscribe'
import CourseListItem from './CourseListItem'

export default function CourseList(props: { hasUnlimitedCourses: boolean }) {
  const { hasUnlimitedCourses } = props
  const maxCourses = 2

  // React Query hooks
  const { useUserCoursesQuery } = useCourseQueries()
  const {
    data: courses = [],
    isLoading: loading,
    refetch,
  } = useUserCoursesQuery('active')

  return (
    <>
      <div className={'flex flex-col md:flex-row items-center gap-2 mb-2'}>
        {courses.length < maxCourses || hasUnlimitedCourses ? (
          <Link href="/courses/create">
            <Button variant="primary">
              Create New Course
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
                />
              </svg>
            </Button>
          </Link>
        ) : (
          <PremiumSubscribe
            title="Create a new course"
            trigger={
              <Button variant="primary">
                Create New Course
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
                  />
                </svg>
              </Button>
            }
          >
            <p>
              You have reached the maximum number of courses ({maxCourses}) you
              can create as a free user.
            </p>
            <p className="italic">
              Either delete/archive some of your existing courses or upgrade to
              premium.
            </p>
            <p className="font-bold p-4 rounded bg-green-200">
              It's only £2.99/month to upgrade to premium!{' '}
              <StyledLink href="/premium">Learn more.</StyledLink>
            </p>
            <p>
              You get both unlimited tactics sets and openings courses plus a{' '}
              <strong>5%</strong> discount on all products.
            </p>
          </PremiumSubscribe>
        )}

        <Link href="/courses">
          <Button variant="secondary">Browse Courses</Button>
        </Link>
        <Link
          className="text-sm text-purple-700 hover:text-purple-600  underline md:ml-auto"
          href="/training/courses/archived"
        >
          View archived courses
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          <>
            <div className="flex flex-col h-24 gap-0 border border-gray-300   shadow-md  bg-[rgba(0,0,0,0.03)]  hover:shadow-lg transition-shadow duration-300 opacity-50">
              <p className="w-fit m-auto flex gap-1">
                Loading... <Spinner />
              </p>
            </div>
            <div className="flex flex-col h-24 gap-0 border border-gray-300   shadow-md  bg-[rgba(0,0,0,0.03)]  hover:shadow-lg transition-shadow duration-300  opacity-50">
              <p className="w-fit m-auto flex gap-1">
                Loading... <Spinner />
              </p>
            </div>
          </>
        ) : courses.length > 0 ? (
          courses
            .sort(
              (a, b) =>
                (b.active ? 1 : 0) - (a.active ? 1 : 0) ||
                (a.lastTrained === null ? 0 : 1) -
                  (b.lastTrained === null ? 0 : 1) ||
                (b.lastTrained ? new Date(b.lastTrained).getTime() : 0) -
                  (a.lastTrained ? new Date(a.lastTrained).getTime() : 0),
            )
            .map((course, index) => (
              <CourseListItem
                key={index}
                courseId={course.id}
                courseName={course.course.courseName}
                update={() => refetch()}
                hasPremium={hasUnlimitedCourses}
              />
            ))
        ) : (
          <div className="p-2 bg-gray-100 ">
            <Heading as="h3">You haven't got any courses yet</Heading>
            <p className="text-gray-500  ">
              You can browse any of our{' '}
              <StyledLink href="/courses">amazing courses</StyledLink> or try{' '}
              <StyledLink href="/courses/create">creating your own</StyledLink>.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
