
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
      themes: JSON.stringify(['middlegame']),
      themesType: 'ALL',
    })
  }

  // --- Mutations ---
  const updateRecallStreak = useMutation({
    mutationFn: async (data: { currentStreak: number }): Promise<void> => {
      await fetch('/api/recall/streak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recall-stats'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return {
    useRandomRecallQuery,
    updateRecallStreak
  }
}
