'use client'

import Link from 'next/link'

import { useEffect, useMemo, useState } from 'react'

import type { Course, Group } from '@prisma/client'
import posthog from 'posthog-js'

import Button from '@components/_elements/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/_elements/tooltip'
import Spinner from '@components/general/Spinner'
import TextEditor from '@components/general/TextEditor'

import { useCourseQueries } from '@hooks/use-course-queries'

import type { LineWithMoves } from './GroupEditor'
import GroupsListEditor from './GroupsListEditor'

type CourseAdminPanelProps = {
  course: Course & {
    lines: LineWithMoves[]
  } & { groups: Group[] }
}
export default function CourseAdminPanel({ course }: CourseAdminPanelProps) {
  const [saving, setSaving] = useState(false)
  const [hasHadChanges, setHasHadChanges] = useState(false)
  const [lines, setLines] = useState(course.lines)
  const sortedLines = useMemo(() => {
    return [...lines].sort((a, b) => a.sortOrder - b.sortOrder)
  }, [lines])
  const [linesToDelete, setLinesToDelete] = useState<number[]>([])

  const { updateCourse } = useCourseQueries()
  const [groups, setGroups] = useState(course.groups)
  const [courseName, setCourseName] = useState(course.courseName)
  const [courseDescription, setCourseDescription] = useState(
    course.courseDescription ?? '',
  )
  const [shortDescription, setShortDescription] = useState(
    course.shortDescription ?? '',
  )

  const saveCourse = async () => {
    if (!hasHadChanges) return
    if (!confirm('Are you sure you want to save these changes?')) return

    setSaving(true)
    try {
      await updateCourse.mutateAsync({
        courseId: course.id,
        courseName,
        courseDescription,
        shortDescription,
        linesToDelete,
        lines: lines.map((line) => ({
          id: line.id,
          sortOrder: line.sortOrder,
          trainable: line.trainable,
        })),
        groups: groups.map((group) => ({
          id: parseInt(group.id),
          groupName: group.groupName,
          sortOrder: group.sortOrder,
        })),
      })

      setLines(lines.filter((line) => !linesToDelete.includes(line.id)))
      setLinesToDelete([])
    } catch (e) {
      posthog.captureException(e)
    }
    setSaving(false)
    setHasHadChanges(false)
  }

  const exit = () => {
    if (
      hasHadChanges &&
      !confirm('Are you sure you want to exit, changes will be lost?')
    )
      return
    window.location.href = '/training/courses'
  }

  useEffect(() => {
    if (
      courseName != course.courseName ||
      courseDescription != course.courseDescription ||
      lines != course.lines ||
      groups != course.groups ||
      shortDescription != course.shortDescription ||
      linesToDelete.length > 0
    ) {
      setHasHadChanges(true)
    } else {
      setHasHadChanges(false)
    }
  }, [courseName, courseDescription, lines, groups, shortDescription])

  return (
    <div className="p-4 bg-card-light/20 rounded-lg">
      <div className="bg-card rounded-lg p-4 shadow space-y-6">
        <div>
          <label className="font-bold">Course Name:</label>
          <input
            className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            type="text"
          />
        </div>
        {course.published && (
          <div>
            <label className="font-bold">Short Description:</label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </div>
        )}
        <div>
          <label className="font-bold">Course Description:</label>
          <TextEditor
            value={courseDescription}
            onChange={setCourseDescription}
          />
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-2">
          <Button
            disabled={saving || !hasHadChanges}
            variant="success"
            onClick={saveCourse}
          >
            {saving ? (
              <>
                Saving... <Spinner />
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
          <Link href={`/training/courses/admin/${course.id}/add-lines`}>
            <Button variant="accent">Add New Lines</Button>
          </Link>
          <Button onClick={exit}>Exit</Button>
          <Tooltip>
            <TooltipTrigger asChild={true}>
              <Button disabled variant="warning">
                Publish Course
              </Button>
            </TooltipTrigger>
            <TooltipContent>Coming Soon!</TooltipContent>
          </Tooltip>
        </div>
        <GroupsListEditor
          groups={groups}
          lines={sortedLines}
          setGroups={setGroups}
          setLines={setLines}
          addIdToDelete={(id) => setLinesToDelete([...linesToDelete, id])}
        />
      </div>
    </div>
  )
}
