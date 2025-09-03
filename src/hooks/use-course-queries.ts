import type { Course as PrismaCourse, UserCourse, UserLine } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ResponseJson } from '~/app/api/responses'

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
  const coursesQuery = useQuery({
    queryKey: ['courses'],
    queryFn: async (): Promise<Course[]> => {
      const response = await fetch('/api/courses')
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Courses found') {
        throw new Error(json.message || 'Failed to fetch courses')
      }
      
      return json.data?.courses as unknown as Course[]
    },
  })

  // Factory function for individual course queries
  const useCourseQuery = (courseId: string) =>
    useQuery({
      queryKey: ['course', courseId],
      queryFn: async ({ queryKey }): Promise<Course> => {
        const [, id] = queryKey
        const response = await fetch(`/api/courses/${id}`)
        const json = (await response.json()) as ResponseJson
        
        if (!response.ok || json.message !== 'Course found') {
          throw new Error(json.message || 'Failed to fetch course')
        }
        
        return json.data?.course as unknown as Course
      },
      enabled: !!courseId,
    })

  // Factory function for user course queries
  const useUserCourseQuery = (courseId: string) =>
    useQuery({
      queryKey: ['user-course', courseId],
      queryFn: async ({ queryKey }): Promise<{ course: PrismaUserCourse; nextReview?: string }> => {
        const [, id] = queryKey
        const response = await fetch(`/api/courses/user/${id}`)
        const json = (await response.json()) as ResponseJson
        
        if (!response.ok || json.message !== 'Course Fetched') {
          throw new Error(json.message || 'Failed to fetch user course')
        }
        
        return {
          course: json.data?.course as PrismaUserCourse,
          nextReview: json.data?.nextReview as string | undefined,
        }
      },
      enabled: !!courseId,
    })

  // --- Mutations ---
  const purchaseCourse = useMutation({
    mutationFn: async ({ courseId }: { courseId: string }): Promise<void> => {
      const response = await fetch('/api/ecomm/purchaseCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok) {
        throw new Error(json.message || 'Failed to purchase course')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  // Upload trained FENs
  const uploadTrainedFens = useMutation({
    mutationFn: async (data: {
      userCourseId: string
      fens: TrainingFen[]
    }): Promise<void> => {
      const response = await fetch(`/api/courses/user/${data.userCourseId}/fens/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fens: data.fens,
        }),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Fens uploaded') {
        throw new Error(json.message || 'Failed to upload trained FENs')
      }
    },
    onSuccess: () => {
      // Invalidate course-related queries
      queryClient.invalidateQueries({ queryKey: ['courses'] })
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
    }): Promise<void> => {
      const response = await fetch(`/api/courses/user/${data.userCourseId}/stats/${data.lineId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lineCorrect: data.lineCorrect,
          revisionDate: data.revisionDate,
        }),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Stats updated') {
        throw new Error(json.message || 'Failed to update line stats')
      }
    },
    onSuccess: () => {
      // Invalidate course-related queries
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['user-lines'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  // Course creation mutations
  const createCourse = useMutation({
    mutationFn: async (data: {
      courseName: string
      description: string
      courseData: Record<string, unknown> // Generic object type instead of any
    }): Promise<void> => {
      const response = await fetch('/api/courses/create/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (json.message === 'Course name is not available') {
        throw new Error('Course name is not available')
      }
      
      if (!response.ok || json.message !== 'Course created') {
        throw new Error(json.message || 'Failed to create course')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })

  const checkCourseName = useMutation({
    mutationFn: async (courseName: string): Promise<boolean> => {
      const response = await fetch('/api/courses/create/checkName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseName }),
      })
      
      const json = (await response.json()) as ResponseJson
      return json.message === 'Course name is available'
    },
  })

  const checkCanCreateCourse = useQuery({
    queryKey: ['can-create-course'],
    queryFn: async (): Promise<boolean> => {
      const response = await fetch('/api/courses/user/canCreate')
      const json = (await response.json()) as ResponseJson
      return response.ok && json.message === 'User can create course'
    },
  })

  // Course management mutations
  const deleteCourse = useMutation({
    mutationFn: async (userCourseId: string): Promise<void> => {
      const response = await fetch(`/api/courses/user/${userCourseId}`, {
        method: 'DELETE',
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok) {
        throw new Error(json.message || 'Failed to delete course')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })

    const restoreCourse = useMutation({
    mutationFn: async (courseId: string): Promise<void> => {
      const response = await fetch(`/api/courses/${courseId}/restore`, {
        method: 'POST',
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok) {
        throw new Error(json.message || 'Failed to restore course')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
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
    }): Promise<void> => {
      const response = await fetch('/api/courses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Course updated') {
        throw new Error(json.message || 'Failed to update course')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })

  const addLines = useMutation({
    mutationFn: async (data: {
      courseId: string
      groupNames: string[]
      lines: Array<{
        groupName: string
        colour: string
        moves: Array<{ move: string; comment?: string }>
      }>
    }): Promise<void> => {
      const response = await fetch('/api/courses/create/addLines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Lines added') {
        throw new Error(json.message || 'Failed to add lines')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
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
      
      if (!response.ok || json.message !== 'Success') {
        throw new Error(json.message || 'Failed to get course lines')
      }

      return json.data?.course
    },
  })

  const markLineForReview = useMutation({
    mutationFn: async (data: {
      courseId: string
      lineId: string
      minDate: string
    }): Promise<void> => {
      const response = await fetch(
        `/api/courses/user/${data.courseId}/lines/markLineForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lineId: data.lineId, minDate: data.minDate }),
        },
      )

      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Lines updated') {
        throw new Error(json.message || 'Failed to mark line for review')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const markGroupForReview = useMutation({
    mutationFn: async (data: {
      courseId: string
      groupId: number
    }): Promise<void> => {
      const response = await fetch(
        `/api/courses/user/${data.courseId}/lines/markGroupForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ groupId: data.groupId }),
        },
      )

      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Lines updated') {
        throw new Error(json.message || 'Failed to mark group for review')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  const markAllForReview = useMutation({
    mutationFn: async (data: { courseId: string }): Promise<void> => {
      const response = await fetch(
        `/api/courses/user/${data.courseId}/lines/markAllForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Lines updated') {
        throw new Error(json.message || 'Failed to mark all lines for review')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
    },
  })

  // Query for user courses
  const useUserCoursesQuery = (type: 'active' | 'archived' = 'active') =>
    useQuery({
      queryKey: ['user-courses', type],
      queryFn: async (): Promise<PrismaUserCourse[]> => {
        const response = await fetch(`/api/courses/user/${type}`)
        const json = (await response.json()) as ResponseJson
        
        if (!response.ok) {
          throw new Error(json.message || `Failed to fetch ${type} courses`)
        }
        
        return (json.data?.courses as PrismaUserCourse[]) || []
      },
    })

  return {
    coursesQuery,
    useCourseQuery,
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
