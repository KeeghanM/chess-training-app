'use client'

import Link from 'next/link'

import { useState } from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Cog } from 'lucide-react'

import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/_elements/tooltip'
import Spinner from '@components/general/Spinner'

import {
  type PrismaUserCourse,
  useCourseQueries,
} from '@hooks/use-course-queries'

import trackEventOnClient from '@utils/trackEventOnClient'

interface CourseSettingsProps {
  userCourse: PrismaUserCourse
  update: () => void
}

export default function CourseSettings(props: CourseSettingsProps) {
  const { userCourse, update } = props
  const { user } = useKindeBrowserClient()
  const [open, setOpen] = useState(false)

  // React Query hooks
  const { deleteCourse } = useCourseQueries()

  const close = () => {
    setOpen(false)
  }

  const archiveCourse = async () => {
    if (!userCourse) return

    const confirmString =
      userCourse.course.published == false &&
      userCourse.course.createdBy == user?.id
        ? 'Are you sure you want to archive this course? This will DELETE the course ENTIRELY.'
        : 'Are you sure you want to archive this course? This will remove your progress.'
    if (!confirm(confirmString)) return

    trackEventOnClient('course_status_set', {
      active: 'archived',
    })

    try {
      await deleteCourse.mutateAsync(userCourse.id)
      update()
    } catch (error) {
      console.error('Failed to archive course:', error)
    }
  }

  if (!userCourse) return null

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>
        <div className="text-black hover:text-orange-500 cursor-pointer transition-all hover:rotate-45 duration-300">
          <Cog />
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.5)]"
          onClick={close}
        />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-4 shadow-md md:p-6 flex flex-col gap-2 rounded-lg">
          <div className="flex flex-wrap items-center gap-2">
            <Heading as="h1">{userCourse.course.courseName}</Heading>
            <p className="text-sm italic">
              {userCourse.course.published ? '(Public)' : '(Private)'}
            </p>
          </div>
          <div className="flex gap-4 md:justify-between flex-col md:flex-row">
            <Button
              disabled={deleteCourse.isPending}
              variant="danger"
              onClick={archiveCourse}
            >
              {deleteCourse.isPending ? (
                <>
                  Archiving <Spinner />
                </>
              ) : (
                'Archive'
              )}
            </Button>
            {userCourse.course.createdBy == user?.id && (
              <div className="flex gap-1 items-center">
                <Link href={`/training/courses/admin/${userCourse.course.id}`}>
                  <Button variant="warning">
                    Admin Panel
                    <Tooltip>
                      <TooltipTrigger asChild={true}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .438-.177q.177-.177.177-.438q0-.262-.177-.439q-.176-.177-.438-.177t-.438.177q-.177.177-.177.439q0 .261.177.438q.176.177.438.177M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                          />
                        </svg>
                      </TooltipTrigger>
                      <TooltipContent>
                        Edit course details for all users of it, including
                        lines, groups, comments etc.
                      </TooltipContent>
                    </Tooltip>
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 text-sm bg-red-100 py-2 px-4">
            <p>
              Archiving a course will remove all your progress, and remove the
              ability to train the course.
            </p>
            <p>
              If it is an unpublished (private) course, this will also remove
              the course entirely, needing to be recreated.
            </p>
            <p>
              If this is a course you have purchased, you won't lose your
              purchase and can redeem it again at anytime, either from the
              course page itself or from your{' '}
              <StyledLink href="/training/courses/archived">
                archived courses
              </StyledLink>
              .
            </p>
          </div>
          <Button onClick={close}>Close</Button>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
