'use client'

import Link from 'next/link'

import { useState } from 'react'

import {
  type PrismaUserCourse,
  useCourseQueries,
} from '@hooks/use-course-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import trackEventOnClient from '@utils/trackEventOnClient'

import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import Spinner from '@components/general/Spinner'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/app/components/_elements/tooltip'

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
        <div className="text-black  hover:text-orange-500 transition-colors duration-300 group">
          {/* Outline Cog */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 36 36"
            className="group-hover:hidden"
          >
            <path
              fill="currentColor"
              d="M18.1 11c-3.9 0-7 3.1-7 7s3.1 7 7 7s7-3.1 7-7s-3.1-7-7-7m0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5s-2.2 5-5 5"
              className="clr-i-outline clr-i-outline-path-1"
            />
            <path
              fill="currentColor"
              d="m32.8 14.7l-2.8-.9l-.6-1.5l1.4-2.6c.3-.6.2-1.4-.3-1.9l-2.4-2.4c-.5-.5-1.3-.6-1.9-.3l-2.6 1.4l-1.5-.6l-.9-2.8C21 2.5 20.4 2 19.7 2h-3.4c-.7 0-1.3.5-1.4 1.2L14 6c-.6.1-1.1.3-1.6.6L9.8 5.2c-.6-.3-1.4-.2-1.9.3L5.5 7.9c-.5.5-.6 1.3-.3 1.9l1.3 2.5c-.2.5-.4 1.1-.6 1.6l-2.8.9c-.6.2-1.1.8-1.1 1.5v3.4c0 .7.5 1.3 1.2 1.5l2.8.9l.6 1.5l-1.4 2.6c-.3.6-.2 1.4.3 1.9l2.4 2.4c.5.5 1.3.6 1.9.3l2.6-1.4l1.5.6l.9 2.9c.2.6.8 1.1 1.5 1.1h3.4c.7 0 1.3-.5 1.5-1.1l.9-2.9l1.5-.6l2.6 1.4c.6.3 1.4.2 1.9-.3l2.4-2.4c.5-.5.6-1.3.3-1.9l-1.4-2.6l.6-1.5l2.9-.9c.6-.2 1.1-.8 1.1-1.5v-3.4c0-.7-.5-1.4-1.2-1.6m-.8 4.7l-3.6 1.1l-.1.5l-.9 2.1l-.3.5l1.8 3.3l-2 2l-3.3-1.8l-.5.3c-.7.4-1.4.7-2.1.9l-.5.1l-1.1 3.6h-2.8l-1.1-3.6l-.5-.1l-2.1-.9l-.5-.3l-3.3 1.8l-2-2l1.8-3.3l-.3-.5c-.4-.7-.7-1.4-.9-2.1l-.1-.5L4 19.4v-2.8l3.4-1l.2-.5c.2-.8.5-1.5.9-2.2l.3-.5l-1.7-3.3l2-2l3.2 1.8l.5-.3c.7-.4 1.4-.7 2.2-.9l.5-.2L16.6 4h2.8l1.1 3.5l.5.2c.7.2 1.4.5 2.1.9l.5.3l3.3-1.8l2 2l-1.8 3.3l.3.5c.4.7.7 1.4.9 2.1l.1.5l3.6 1.1z"
              className="clr-i-outline clr-i-outline-path-2"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
          {/* Solid Cog */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 36 36"
            className="hidden group-hover:block"
          >
            <path
              fill="currentColor"
              d="m32.57 15.72l-3.35-1a11.65 11.65 0 0 0-.95-2.33l1.64-3.07a.61.61 0 0 0-.11-.72l-2.39-2.4a.61.61 0 0 0-.72-.11l-3.05 1.63a11.62 11.62 0 0 0-2.36-1l-1-3.31a.61.61 0 0 0-.59-.41h-3.38a.61.61 0 0 0-.58.43l-1 3.3a11.63 11.63 0 0 0-2.38 1l-3-1.62a.61.61 0 0 0-.72.11L6.2 8.59a.61.61 0 0 0-.11.72l1.62 3a11.63 11.63 0 0 0-1 2.37l-3.31 1a.61.61 0 0 0-.43.58v3.38a.61.61 0 0 0 .43.58l3.33 1a11.62 11.62 0 0 0 1 2.33l-1.64 3.14a.61.61 0 0 0 .11.72l2.39 2.39a.61.61 0 0 0 .72.11l3.09-1.65a11.65 11.65 0 0 0 2.3.94l1 3.37a.61.61 0 0 0 .58.43h3.38a.61.61 0 0 0 .58-.43l1-3.38a11.63 11.63 0 0 0 2.28-.94l3.11 1.66a.61.61 0 0 0 .72-.11l2.39-2.39a.61.61 0 0 0 .11-.72l-1.66-3.1a11.63 11.63 0 0 0 .95-2.29l3.37-1a.61.61 0 0 0 .43-.58v-3.41a.61.61 0 0 0-.37-.59M18 23.5a5.5 5.5 0 1 1 5.5-5.5a5.5 5.5 0 0 1-5.5 5.5"
              className="clr-i-solid clr-i-solid-path-1"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.5)]"
          onClick={close}
        />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-4 shadow-md md:p-6 flex flex-col gap-2">
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
                      <TooltipTrigger>
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
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
