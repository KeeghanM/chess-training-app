import { useMutation, useQueryClient } from '@tanstack/react-query'

import { usePuzzleQueries } from './use-puzzle-queries'

// Types for endgames
export interface EndgameFilters {
  type?: 'Queen' | 'Rook' | 'Knight' | 'Bishop' | 'Pawn' | 'All'
  rating?: number
  difficulty?: number
}

// Endgame Queries
export function useEndgameQueries() {
  const queryClient = useQueryClient()
  const { useRandomTrainingPuzzleQuery } = usePuzzleQueries()

  // Helper function to get theme from type
  const getTheme = (type: EndgameFilters['type']) => {
    switch (type) {
      case 'Queen':
        return 'queenEndgame'
      case 'Rook':
        return 'rookEndgame'
      case 'Bishop':
        return 'bishopEndgame'
      case 'Knight':
        return 'knightEndgame'
      case 'Pawn':
        return 'pawnEndgame'
      default:
        return 'endgame'
    }
  }

  // Helper function to adjust difficulty
  const difficultyAdjuster = (d: number) => {
    return d === 0 ? 0.9 : d === 1 ? 1 : 1.2
  }

  // Factory function for random endgame using the generic puzzle query
  const useRandomEndgameQuery = (filters?: EndgameFilters) => {
    const adjustedRating = filters?.rating
      ? Math.round(filters.rating * difficultyAdjuster(filters.difficulty || 1))
      : 1500

    const theme = getTheme(filters?.type)

    return useRandomTrainingPuzzleQuery({
      rating: adjustedRating,
      themesType: 'ALL',
      themes: JSON.stringify([theme]),
      count: '1',
    })
  }

  // --- Mutations ---
  const updateEndgameStreak = useMutation({
    mutationFn: async (data: { currentStreak: number }) => {
      await fetch('/api/endgames/streak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['endgame-stats'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return {
    useRandomEndgameQuery,
    updateEndgameStreak,
  }
}
