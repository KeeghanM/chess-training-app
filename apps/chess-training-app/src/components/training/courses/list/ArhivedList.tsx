'use client'

import Link from 'next/link'

import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'

import { useCourseQueries } from '@hooks/use-course-queries'

export default function ArchivedList() {
  // React Query hooks
  const { useUserCoursesQuery, restoreCourse } = useCourseQueries()
  const { data: courses = [], isLoading: loading } =
    useUserCoursesQuery('archived')

  const handleRestoreCourse = async (courseId: string) => {
    try {
      await restoreCourse.mutateAsync(courseId)
    } catch (error) {
      // Error handling is done in the mutation
      console.error('Failed to restore course:', error)
    }
  }

  return (
    <>
      <div className="w-full">
        <Link
          className="text-sm text-purple-700 hover:text-purple-600 underline md:ml-auto"
          href="/training/courses"
        >
          View active courses
        </Link>
      </div>
      {loading ? (
        <div className="relative  w-full h-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-30"></div>
          <p className="flex items-center gap-4">
            Loading... <Spinner />
          </p>
        </div>
      ) : (
        <div
          className={
            'flex flex-col gap-4 ' +
            (courses.length == 0 ? ' bg-gray-100 ' : '')
          }
        >
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div
                key={index}
                className="flex relative flex-col items-center gap-4 bg-gray-100 p-2 md:px-6    md:flex-row md:justify-between"
              >
                <p>{course.course.courseName}</p>

                <Button
                  disabled={restoreCourse.isPending}
                  variant="primary"
                  onClick={() => handleRestoreCourse(course.id)}
                >
                  {restoreCourse.isPending ? (
                    <>
                      Restoring... <Spinner />
                    </>
                  ) : (
                    'Restore'
                  )}
                </Button>
              </div>
            ))
          ) : (
            <div className="p-2">
              <p className="text-gray-500  ">
                You don't have any archived courses.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
