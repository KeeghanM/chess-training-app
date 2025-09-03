import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ResponseJson } from '~/app/api/responses'

// Types - you may want to import these from Prisma client once defined
export interface Course {
  id: string
  title: string
  description: string
  price: number
  featured: boolean
  // Add other course fields as needed
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

  return {
    coursesQuery,
    useCourseQuery,
    purchaseCourse,
  }
}
