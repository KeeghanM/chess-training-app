import type {
  Course as PrismaCourse,
  UserCourse,
  UserLine,
} from '@prisma/client'
import type { CreateCourseData } from '@schemas/courses'
import {
  AddLinesSchema,
  CheckCourseNameSchema,
  CourseIdSchema,
  CreateCourseSchema,
  MarkGroupForReviewSchema,
  MarkLineForReviewSchema,
  PurchaseCourseSchema,
  UpdateCourseSchema,
  UpdateLineStatsSchema,
  UploadTrainedFensSchema,
  UserCourseIdSchema,
} from '@schemas/courses'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { CleanMove } from '@components/training/courses/create/parse/ParsePGNtoLineData'

import type { ResponseJson } from '@utils/server-responses'

// Types
export type PrismaUserCourse = UserCourse & {
  course: PrismaCourse
  lines?: UserLine[]
}

export type Course = {
  id: string
  title: string
  description: string
  price: number
  featured: boolean
  // Add other course fields as needed
}

// Types for course training operations
export type TrainingFen = {
  fen: string
  commentId?: number | undefined
}

export type LineStatsUpdate = {
  lineCorrect: boolean
  revisionDate: Date
}

// Course Queries
export function useCourseQueries() {
  const queryClient = useQueryClient()

  // --- Data fetching ---
  const useUserCoursesQuery = (type: 'active' | 'archived' = 'active') =>
    useQuery({
      queryKey: ['user-courses', type],
      queryFn: async (): Promise<PrismaUserCourse[]> => {
        const response = await fetch(`/api/courses/user/${type}`)
        const json = (await response.json()) as ResponseJson

        return (json.data?.courses as PrismaUserCourse[]) || []
      },
    })

  const useUserCourseQuery = (courseId: string) =>
    useQuery({
      queryKey: ['user-course', courseId],
      queryFn: async ({
        queryKey,
      }): Promise<{
        course: PrismaUserCourse
        nextReview?: string | undefined
      }> => {
        const [, id] = queryKey
        const response = await fetch(`/api/courses/user/${id}`)
        const json = (await response.json()) as ResponseJson

        return {
          course: json.data?.course as PrismaUserCourse,
          nextReview: json.data?.nextReview as string | undefined,
        }
      },
      enabled: !!courseId,
    })

  // --- Mutations ---
  const purchaseCourse = useMutation({
    mutationFn: async ({ courseId }: { courseId: string }) => {
      const validatedData = PurchaseCourseSchema.parse({ courseId })
      await fetch('/api/ecomm/purchaseCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  // Upload trained FENs
  const uploadTrainedFens = useMutation({
    mutationFn: async (data: { userCourseId: string; fens: TrainingFen[] }) => {
      const validatedData = UploadTrainedFensSchema.parse(data)
      await fetch(`/api/courses/user/${data.userCourseId}/fens/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fens: validatedData.fens,
        }),
      })
    },
    onSuccess: () => {
      // Invalidate course-related queries
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  // Update line stats and revision date
  const updateLineStats = useMutation({
    mutationFn: async (data: {
      userCourseId: string
      lineId: string
      lineCorrect: boolean
      revisionDate: Date
    }) => {
      const validatedData = UpdateLineStatsSchema.parse(data)
      await fetch(
        `/api/courses/user/${data.userCourseId}/stats/${data.lineId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lineCorrect: validatedData.lineCorrect,
            revisionDate: validatedData.revisionDate,
          }),
        },
      )
    },
    onSuccess: () => {
      // Invalidate course-related queries
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
      queryClient.invalidateQueries({ queryKey: ['user-lines'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  // Course creation mutations
  const createCourse = useMutation({
    mutationFn: async (data: CreateCourseData) => {
      const validatedData = CreateCourseSchema.parse(data)
      await fetch('/api/courses/create/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const checkCourseName = useMutation({
    mutationFn: async (courseName: string): Promise<boolean> => {
      const validatedData = CheckCourseNameSchema.parse({ name: courseName })
      const response = await fetch('/api/courses/create/checkName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })
      return response.ok
    },
  })

  const checkCanCreateCourse = useQuery({
    queryKey: ['can-create-course'],
    queryFn: async (): Promise<boolean> => {
      const response = await fetch('/api/courses/user/canCreate')
      return response.ok
    },
  })

  // Course management mutations
  const deleteCourse = useMutation({
    mutationFn: async (userCourseId: string) => {
      const validatedData = UserCourseIdSchema.parse({ userCourseId })
      await fetch(`/api/courses/user/${validatedData.userCourseId}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const restoreCourse = useMutation({
    mutationFn: async (userCourseId: string) => {
      const validatedData = UserCourseIdSchema.parse({ userCourseId })
      await fetch(`/api/courses/user/${validatedData.userCourseId}/restore`, {
        method: 'POST',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
      queryClient.invalidateQueries({ queryKey: ['archived-courses'] })
    },
  })

  const updateCourse = useMutation({
    mutationFn: async (data: {
      courseId: string
      courseName: string
      courseDescription: string
      shortDescription: string
      linesToDelete: number[]
      lines: Array<{
        id: number
        sortOrder: number
        trainable: boolean
      }>
      groups: Array<{
        id: number
        groupName: string
        sortOrder: number
      }>
    }) => {
      const validatedData = UpdateCourseSchema.parse(data)
      await fetch('/api/courses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const addLines = useMutation({
    mutationFn: async (data: {
      courseId: string
      groupNames: string[]
      lines: Array<{
        groupName: string
        colour: string
        moves: CleanMove[]
      }>
    }) => {
      const validatedData = AddLinesSchema.parse(data)
      await fetch('/api/courses/create/addLines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const getCourseLines = useMutation({
    mutationFn: async (data: { courseId: string }): Promise<unknown> => {
      const validatedData = CourseIdSchema.parse(data)
      const response = await fetch('/api/courses/create/getLines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      const json = (await response.json()) as ResponseJson

      return json.data?.course
    },
  })

  const markLineForReview = useMutation({
    mutationFn: async (data: {
      courseId: string
      lineId: string
      minDate: string
    }) => {
      const validatedData = MarkLineForReviewSchema.parse(data)
      await fetch(
        `/api/courses/user/${data.courseId}/lines/markLineForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lineId: validatedData.lineId,
            minDate: validatedData.minDate,
          }),
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const markGroupForReview = useMutation({
    mutationFn: async (data: { courseId: string; groupId: number }) => {
      const validatedData = MarkGroupForReviewSchema.parse(data)
      await fetch(
        `/api/courses/user/${data.courseId}/lines/markGroupForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ groupId: validatedData.groupId }),
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const markAllForReview = useMutation({
    mutationFn: async (data: { courseId: string }) => {
      const validatedData = CourseIdSchema.parse(data)
      await fetch(
        `/api/courses/user/${validatedData.courseId}/lines/markAllForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  return {
    useUserCourseQuery,
    purchaseCourse,
    uploadTrainedFens,
    updateLineStats,
    createCourse,
    checkCourseName,
    checkCanCreateCourse,
    deleteCourse,
    restoreCourse,
    updateCourse,
    addLines,
    getCourseLines,
    markLineForReview,
    markGroupForReview,
    markAllForReview,
    useUserCoursesQuery,
  }
}
