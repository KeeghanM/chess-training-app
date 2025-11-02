import type {
  Course as PrismaCourse,
  UserCourse,
  UserLine,
} from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ResponseJson } from '~/app/api/responses'
import { CleanMove } from '@components/training/courses/create/parse/ParsePGNtoLineData'

// Types
export type PrismaUserCourse = UserCourse & {
  course: PrismaCourse
  lines?: UserLine[]
}

export interface Course {
  id: string
  title: string
  description: string
  price: number
  featured: boolean
  // Add other course fields as needed
}

// Types for course training operations
export interface TrainingFen {
  fen: string
  commentId?: number
}

export interface LineStatsUpdate {
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
      }): Promise<{ course: PrismaUserCourse; nextReview?: string }> => {
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
      await fetch('/api/ecomm/purchaseCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
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
      await fetch(`/api/courses/user/${data.userCourseId}/fens/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fens: data.fens,
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
      await fetch(
        `/api/courses/user/${data.userCourseId}/stats/${data.lineId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lineCorrect: data.lineCorrect,
            revisionDate: data.revisionDate,
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
    mutationFn: async (data: {
      courseName: string
      slug: string
      description: string
      groupNames: {
        groupName: string
      }[]
      lines: {
        groupName: string
        colour: string
        moves: CleanMove[]
      }[]
    }) => {
      await fetch('/api/courses/create/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const checkCourseName = useMutation({
    mutationFn: async (courseName: string): Promise<boolean> => {
      const response = await fetch('/api/courses/create/checkName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: courseName }),
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
      await fetch(`/api/courses/user/${userCourseId}`, {
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
      await fetch(`/api/courses/user/${userCourseId}/restore`, {
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
      await fetch('/api/courses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
      await fetch('/api/courses/create/addLines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const getCourseLines = useMutation({
    mutationFn: async (data: { courseId: string }): Promise<unknown> => {
      const response = await fetch('/api/courses/create/getLines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
      await fetch(
        `/api/courses/user/${data.courseId}/lines/markLineForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lineId: data.lineId, minDate: data.minDate }),
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const markGroupForReview = useMutation({
    mutationFn: async (data: { courseId: string; groupId: number }) => {
      await fetch(
        `/api/courses/user/${data.courseId}/lines/markGroupForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ groupId: data.groupId }),
        },
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const markAllForReview = useMutation({
    mutationFn: async (data: { courseId: string }) => {
      await fetch(`/api/courses/user/${data.courseId}/lines/markAllForReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
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
