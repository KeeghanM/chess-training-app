import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ResponseJson } from '@utils/server-responsses'

import type { TrainingPuzzle } from './use-puzzle-queries'

// Types based on existing admin components
export type CuratedSetPuzzle = TrainingPuzzle & { curatedPuzzleId: number }

export interface CuratedSet {
  id: string
  name: string
  description?: string
  puzzles: CuratedSetPuzzle[]
  // Add other set fields as needed
}

export interface Badge {
  id: string
  name: string
  description: string
  image: string
  order: number
  // Add other badge fields as needed
}

// Admin/Curated Sets Queries
export function useAdminQueries() {
  const queryClient = useQueryClient()

  // --- Data fetching ---
  const badgesQuery = useQuery({
    queryKey: ['badges'],
    queryFn: async (): Promise<Badge[]> => {
      const response = await fetch('/api/admin/badges')
      const json = (await response.json()) as ResponseJson

      return json.data?.badges as unknown as Badge[]
    },
  })

  // Factory function for curated set puzzles
  const useCuratedSetPuzzlesQuery = (setId: string | null) =>
    useQuery({
      queryKey: ['curated-set-puzzles', setId],
      queryFn: async ({ queryKey }): Promise<CuratedSetPuzzle[]> => {
        const [, id] = queryKey
        if (!id) throw new Error('No set selected')

        const response = await fetch('/api/admin/curated-sets/getPuzzles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ setId: id }),
        })
        const json = (await response.json()) as ResponseJson

        return json.data?.puzzles as unknown as CuratedSetPuzzle[]
      },
      enabled: !!setId,
    })

  // Factory function for individual curated sets
  const useCuratedSetQuery = (setId: string) =>
    useQuery({
      queryKey: ['curated-set', setId],
      queryFn: async ({ queryKey }): Promise<CuratedSet> => {
        const [, id] = queryKey
        const response = await fetch(`/api/admin/curated-sets/${id}`)
        const json = (await response.json()) as ResponseJson

        return json.data?.set as unknown as CuratedSet
      },
      enabled: !!setId,
    })

  // --- Mutations ---
  const createBadge = useMutation({
    mutationFn: async (newBadge: Omit<Badge, 'id'>) => {
      await fetch('/api/admin/badges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBadge),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] })
    },
  })

  const updateBadge = useMutation({
    mutationFn: async (updatedBadge: Badge) => {
      await fetch(`/api/admin/badges/${updatedBadge.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBadge),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] })
    },
  })

  const updateBadgeOrder = useMutation({
    mutationFn: async (badges: Badge[]) => {
      await fetch('/api/admin/badges/order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ badges }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] })
    },
  })

  const createCustomPuzzle = useMutation({
    mutationFn: async (puzzleData: Record<string, unknown>) => {
      await fetch('/api/admin/puzzles/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(puzzleData),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['puzzles'] })
    },
  })

  return {
    badgesQuery,
    useCuratedSetPuzzlesQuery,
    useCuratedSetQuery,
    createBadge,
    updateBadge,
    updateBadgeOrder,
    createCustomPuzzle,
  }
}
