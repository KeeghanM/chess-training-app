import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ResponseJson } from '~/app/api/responses'
import type { TrainingPuzzle } from './use-puzzle-queries'

// Types based on the TacticsTrainer component
export interface TacticsRound {
  id: string
  setId: string
  roundNumber: number
  correct: number
  incorrect: number
  timeSpent: number
  createdAt: Date
  updatedAt: Date
}

export interface TacticsSet {
  id: string
  name: string
  size: number
  rating: number | null
  userId: string
  createdAt: Date
  updatedAt: Date
  lastTrained: Date | null
  curatedSetId: string | null
  active: boolean
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
      const response = await fetch('/api/tactics/user')
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Sets found') {
        throw new Error(json.message || 'Failed to fetch tactics sets')
      }
      
      return json.data?.sets as unknown as TacticsSet[]
    },
  })

  const archivedTacticsQuery = useQuery({
    queryKey: ['tactics', 'archived'],
    queryFn: async (): Promise<{ sets: TacticsSet[]; activeCount: number }> => {
      const response = await fetch('/api/tactics/user/archived')
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Sets found') {
        throw new Error(json.message || 'Failed to fetch archived tactics sets')
      }
      
      return {
        sets: json.data?.sets as unknown as TacticsSet[],
        activeCount: json.data?.activeCount as number,
      }
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

  const fetchPuzzlesMutation = useMutation({
    mutationFn: async (params: {
      rating?: number
      ratingDeviation?: number
      themes?: string[]
      count?: string
      themesType?: string
    }): Promise<TrainingPuzzle[]> => {
      const response = await fetch('/api/puzzles/getPuzzles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Puzzles found') {
        throw new Error(json.message || 'Failed to fetch puzzles')
      }

      const puzzles = json.data?.puzzles as TrainingPuzzle[]
      if (!puzzles || puzzles.length === 0) {
        throw new Error('No puzzles found')
      }

      return puzzles
    },
  })

  const createTacticsSet = useMutation({
    mutationFn: async (data: {
      name: string
      puzzleIds: { puzzleid: string }[]
      rating: number
    }): Promise<TacticsSet> => {
      const response = await fetch('/api/tactics/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Set created') {
        throw new Error(json.message || 'Failed to create tactics set')
      }

      return json.data?.set as unknown as TacticsSet
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics'] })
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

  const deleteTactic = useMutation({
    mutationFn: async ({ setId }: { setId: string }): Promise<void> => {
      const response = await fetch('/api/tactics/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setId }),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Set Deleted') {
        throw new Error(json.message || 'Failed to delete set')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics'] })
    },
  })

  const resetTacticProgress = useMutation({
    mutationFn: async ({ setId }: { setId: string }): Promise<void> => {
      const response = await fetch('/api/tactics/resetProgress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setId }),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Progress Reset') {
        throw new Error(json.message || 'Failed to reset progress')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics'] })
    },
  })

  const updateTactic = useMutation({
    mutationFn: async ({ setId, name }: { setId: string; name: string }): Promise<void> => {
      const response = await fetch('/api/tactics/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setId, name }),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Set Updated') {
        throw new Error(json.message || 'Failed to update set')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics'] })
    },
  })

  const restoreTactic = useMutation({
    mutationFn: async ({ setId }: { setId: string }): Promise<void> => {
      const response = await fetch(`/api/tactics/user/${setId}/restore`, {
        method: 'POST',
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Set restored') {
        throw new Error(json.message || 'Failed to restore set')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics'] })
      queryClient.invalidateQueries({ queryKey: ['tactics', 'archived'] })
    },
  })

  return {
    tacticsSetQuery,
    archivedTacticsQuery,
    useTacticsSetQuery,
    createRound,
    increaseCorrect,
    increaseIncorrect,
    increaseTimeTaken,
    fetchPuzzlesMutation,
    createTacticsSet,
    archiveTactic,
    deleteTactic,
    resetTacticProgress,
    updateTactic,
    restoreTactic,
  }
}
