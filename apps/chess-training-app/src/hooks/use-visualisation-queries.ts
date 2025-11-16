import { useMutation, useQueryClient } from '@tanstack/react-query'

import { usePuzzleQueries } from './use-puzzle-queries'

// Visualisation Queries
export function useVisualisationQueries() {
  const queryClient = useQueryClient()
  const { useRandomTrainingPuzzleQuery } = usePuzzleQueries()

  // Helper function to adjust difficulty
  const difficultyAdjuster = (d: number) => {
    return d === 0 ? 0.9 : d === 1 ? 1 : 1.2
  }

  // Factory function for random visualisation puzzle
  const useRandomVisualisationQuery = (params: {
    rating: number
    difficulty: number
    length: number
  }) => {
    const trueRating = Math.round(
      params.rating * difficultyAdjuster(params.difficulty),
    )

    return useRandomTrainingPuzzleQuery({
      rating: trueRating,
      count: '1',
      playerMoves: params.length / 2,
    })
  }

  // --- Mutations ---
  const updateVisualisationStreak = useMutation({
    mutationFn: async (data: { currentStreak: number }) => {
      await fetch('/api/visualisation/streak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visualisation-stats'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return {
    difficultyAdjuster,
    useRandomVisualisationQuery,
    updateVisualisationStreak,
  }
}
