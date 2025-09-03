import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ResponseJson } from '~/app/api/responses'

// Types based on the TacticsTrainer component
export interface TacticsRound {
  id: string
  roundNumber: number
  correct: number
  incorrect: number
  setId: string
  // Add other round fields as needed
}

export interface TacticsSet {
  id: string
  name: string
  size: number
  rating: number
  rounds: TacticsRound[]
  puzzles: Array<{ puzzleid: string }>
  // Add other set fields as needed
}

export interface CreateRoundData {
  setId: string
  roundNumber: number
  puzzleRating: number
}

export interface UpdateStatsData {
  roundId: string
  timeTaken?: number
  currentStreak?: number
  setId?: string
}

// Tactics Queries
export function useTacticsQueries() {
  const queryClient = useQueryClient()

  // --- Data fetching ---
  const tacticsSetQuery = useQuery({
    queryKey: ['tactics', 'sets'],
    queryFn: async (): Promise<TacticsSet[]> => {
      const response = await fetch('/api/tactics/sets')
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Sets found') {
        throw new Error(json.message || 'Failed to fetch tactics sets')
      }
      
      return json.data?.sets as unknown as TacticsSet[]
    },
  })

  // Factory function for individual tactics set queries
  const useTacticsSetQuery = (setId: string) =>
    useQuery({
      queryKey: ['tactics', 'set', setId],
      queryFn: async ({ queryKey }): Promise<TacticsSet> => {
        const [, , id] = queryKey
        const response = await fetch(`/api/tactics/sets/${id}`)
        const json = (await response.json()) as ResponseJson
        
        if (!response.ok || json.message !== 'Set found') {
          throw new Error(json.message || 'Failed to fetch tactics set')
        }
        
        return json.data?.set as unknown as TacticsSet
      },
      enabled: !!setId,
    })

  // --- Mutations ---
  const createRound = useMutation({
    mutationFn: async (data: CreateRoundData): Promise<void> => {
      const response = await fetch('/api/tactics/createRound', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Round created') {
        throw new Error(json.message || 'Failed to create round')
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tactics', 'set', variables.setId] })
      queryClient.invalidateQueries({ queryKey: ['tactics', 'sets'] })
    },
  })

  const increaseCorrect = useMutation({
    mutationFn: async (data: UpdateStatsData): Promise<void> => {
      const response = await fetch('/api/tactics/stats/increaseCorrect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok) {
        throw new Error(json.message || 'Failed to update correct stat')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  const increaseIncorrect = useMutation({
    mutationFn: async (data: { roundId: string }): Promise<void> => {
      const response = await fetch('/api/tactics/stats/increaseIncorrect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok) {
        throw new Error(json.message || 'Failed to update incorrect stat')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  const increaseTimeTaken = useMutation({
    mutationFn: async (data: UpdateStatsData): Promise<void> => {
      const response = await fetch('/api/tactics/stats/increaseTimeTaken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok) {
        throw new Error(json.message || 'Failed to update time taken')
      }
    },
  })

  const archiveTactic = useMutation({
    mutationFn: async ({ tacticId }: { tacticId: string }): Promise<void> => {
      const response = await fetch('/api/tactics/archive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tacticId }),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Tactic archived') {
        throw new Error(json.message || 'Failed to archive tactic')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics'] })
    },
  })

  return {
    tacticsSetQuery,
    useTacticsSetQuery,
    createRound,
    increaseCorrect,
    increaseIncorrect,
    increaseTimeTaken,
    archiveTactic,
  }
}
