import type { Puzzle } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import type { ResponseJson } from '~/app/api/responses'

// Additional puzzle types for training
export interface TrainingPuzzle {
  puzzleid: string
  fen: string
  rating: number
  ratingdeviation: number
  moves: string[]
  themes: string[]
  directStart?: boolean
  sortOrder?: number
  comment?: string
}

// Puzzle Queries
export function usePuzzleQueries() {
  // Factory function for individual puzzle queries
  const usePuzzleQuery = (puzzleId: string) =>
    useQuery({
      queryKey: ['puzzle', puzzleId],
      queryFn: async ({ queryKey }): Promise<TrainingPuzzle> => {
        const [, id] = queryKey
        const response = await fetch(`/api/puzzles/getPuzzleById/${id}`)
        const json = (await response.json()) as ResponseJson

        return json.data?.puzzle as unknown as TrainingPuzzle
      },
      enabled: !!puzzleId,
    })

  // Factory function for filtered puzzles using POST method
  const usePuzzlesQuery = (filters?: { rating?: number; themes?: string[] }) =>
    useQuery({
      queryKey: ['puzzles', filters],
      queryFn: async ({ queryKey }): Promise<Puzzle[]> => {
        const [, filters] = queryKey as [
          string,
          { rating?: number; themes?: string[] } | undefined,
        ]

        // Prepare POST body with filters
        const requestBody = {
          rating: filters?.rating || 1500, // Default rating
          count: 100, // Default count
          themesType: filters?.themes?.length ? 'include' : undefined,
          themes: filters?.themes?.join(','),
        }

        const response = await fetch('/api/puzzles/getPuzzles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
        const json = (await response.json()) as ResponseJson

        return json.data?.puzzles as unknown as Puzzle[]
      },
      enabled: !!filters, // Only enable when filters are provided
    })

  // Factory function for random training puzzle with parameters (used by all trainers)
  const useRandomTrainingPuzzleQuery = (params?: {
    rating?: number
    themes?: string
    themesType?: string
    count?: string
    playerMoves?: number
  }) =>
    useQuery({
      queryKey: ['random-training-puzzle', params],
      queryFn: async ({ queryKey }): Promise<TrainingPuzzle> => {
        const [, queryParams] = queryKey as [
          string,
          (
            | {
                rating?: number
                themes?: string[]
                themesType?: string
                count?: string
                playerMoves?: number
              }
            | undefined
          ),
        ]

        const response = await fetch('/api/puzzles/getPuzzles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(queryParams),
        })
        const json = (await response.json()) as ResponseJson

        const puzzles = json.data?.puzzles as TrainingPuzzle[]
        if (!puzzles || puzzles.length === 0) {
          throw new Error('No puzzles found')
        }
        return puzzles[0]! // Return the first puzzle
      },
    })

  return {
    usePuzzleQuery,
    usePuzzlesQuery,
    useRandomTrainingPuzzleQuery,
  }
}
