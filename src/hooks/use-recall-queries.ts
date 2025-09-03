import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ResponseJson } from '~/app/api/responses'
import { usePuzzleQueries } from './use-puzzle-queries'

// Recall Queries
export function useRecallQueries() {
  const queryClient = useQueryClient()
  const { useRandomTrainingPuzzleQuery } = usePuzzleQueries()

  // Random recall puzzle query (always middlegame, rating 1500)
  const useRandomRecallQuery = () => {
    return useRandomTrainingPuzzleQuery({
      rating: 1500,
      count: '1',
      themes: ['middlegame'],
      themesType: 'ALL',
    })
  }

  // --- Mutations ---
  const updateRecallStreak = useMutation({
    mutationFn: async (data: { currentStreak: number }): Promise<void> => {
      const response = await fetch('/api/recall/streak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Streak updated') {
        throw new Error(json.message || 'Failed to update recall streak')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recall-stats'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  const logRecallAttempt = useMutation({
    mutationFn: async (data: {
      puzzleId: string
      correct: boolean
      timeTaken: number
    }): Promise<void> => {
      const response = await fetch('/api/recall/attempt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Attempt logged') {
        throw new Error(json.message || 'Failed to log recall attempt')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recall-stats'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return {
    useRandomRecallQuery,
    updateRecallStreak,
    logRecallAttempt,
  }
}
