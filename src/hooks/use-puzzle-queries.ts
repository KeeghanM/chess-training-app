import { useQuery } from '@tanstack/react-query'

import type { Puzzle } from '@prisma/client'
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
  // --- Data fetching ---
  const puzzlesQuery = useQuery({
    queryKey: ['puzzles'],
    queryFn: async (): Promise<Puzzle[]> => {
      const response = await fetch('/api/puzzles/getPuzzles')
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Puzzles found') {
        throw new Error(json.message || 'Failed to fetch puzzles')
      }
      
      return json.data?.puzzles as unknown as Puzzle[]
    },
  })

  // Factory function for individual puzzle queries
  const usePuzzleQuery = (puzzleId: string) =>
    useQuery({
      queryKey: ['puzzle', puzzleId],
      queryFn: async ({ queryKey }): Promise<Puzzle> => {
        const [, id] = queryKey
        const response = await fetch(`/api/puzzles/${id}`)
        const json = (await response.json()) as ResponseJson
        
        if (!response.ok || json.message !== 'Puzzle found') {
          throw new Error(json.message || 'Failed to fetch puzzle')
        }
        
        return json.data as unknown as Puzzle
      },
      enabled: !!puzzleId,
    })

  // Factory function for training puzzle by ID (used in tactics trainer)
  const useTrainingPuzzleQuery = (puzzleId: string) =>
    useQuery({
      queryKey: ['training-puzzle', puzzleId],
      queryFn: async ({ queryKey }): Promise<TrainingPuzzle> => {
        const [, id] = queryKey
        const response = await fetch(`/api/puzzles/getPuzzleById/${id}`)
        const json = (await response.json()) as ResponseJson
        
        if (!response.ok || json.message !== 'Puzzle found') {
          throw new Error(json.message || 'Failed to fetch puzzle')
        }
        
        return json.data?.puzzle as unknown as TrainingPuzzle
      },
      enabled: !!puzzleId,
    })

  // Factory function for filtered puzzles
  const usePuzzlesQuery = (filters?: { rating?: number; themes?: string[] }) =>
    useQuery({
      queryKey: ['puzzles', filters],
      queryFn: async ({ queryKey }): Promise<Puzzle[]> => {
        const [, filters] = queryKey as [string, { rating?: number; themes?: string[] } | undefined]
        const searchParams = new URLSearchParams()
        
        if (filters?.rating) {
          searchParams.set('rating', filters.rating.toString())
        }
        if (filters?.themes?.length) {
          searchParams.set('themes', filters.themes.join(','))
        }
        
        const response = await fetch(`/api/puzzles/getPuzzles?${searchParams}`)
        const json = (await response.json()) as ResponseJson
        
        if (!response.ok || json.message !== 'Puzzles found') {
          throw new Error(json.message || 'Failed to fetch puzzles')
        }
        
        return json.data?.puzzles as unknown as Puzzle[]
      },
    })

  // Factory function for random training puzzle with parameters (used by all trainers)
  const useRandomTrainingPuzzleQuery = (params?: {
    rating?: number
    themes?: string[]
    themesType?: string
    count?: string
    playerMoves?: number
  }) =>
    useQuery({
      queryKey: ['random-training-puzzle', params],
      queryFn: async ({ queryKey }): Promise<TrainingPuzzle> => {
        const [, queryParams] = queryKey as [string, {
          rating?: number
          themes?: string[]
          themesType?: string
          count?: string
          playerMoves?: number
        } | undefined]
        
        const response = await fetch('/api/puzzles/getPuzzles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(queryParams),
        })
        const json = (await response.json()) as ResponseJson
        
        if (!response.ok || json.message !== 'Puzzles found') {
          throw new Error(json.message || 'Failed to fetch training puzzle')
        }
        
        const puzzles = json.data?.puzzles as TrainingPuzzle[]
        if (!puzzles || puzzles.length === 0) {
          throw new Error('No puzzles found')
        }
        return puzzles[0]! // Return the first puzzle
      },
    })

  return {
    puzzlesQuery,
    usePuzzleQuery,
    useTrainingPuzzleQuery,
    usePuzzlesQuery,
    useRandomTrainingPuzzleQuery,
  }
}
