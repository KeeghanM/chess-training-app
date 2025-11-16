import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ResponseJson } from '@utils/server-responsses'

import type { TrainingPuzzle } from './use-puzzle-queries'

enum TacticsSetStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

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
  status: TacticsSetStatus
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
  currentStreak: number
}

export interface UpdateTimeData {
  roundId: string
  timeTaken: number
  setId: string
}

// Tactics Queries
export function useTacticsQueries() {
  const queryClient = useQueryClient()

  // --- Data fetching ---
  const tacticsSetsQuery = useQuery({
    queryKey: ['tactics', 'sets'],
    queryFn: async (): Promise<TacticsSet[]> => {
      const response = await fetch('/api/tactics/user')
      const json = (await response.json()) as ResponseJson

      return json.data?.sets as unknown as TacticsSet[]
    },
  })

  const archivedTacticsQuery = useQuery({
    queryKey: ['tactics', 'archived'],
    queryFn: async (): Promise<{ sets: TacticsSet[]; activeCount: number }> => {
      const response = await fetch('/api/tactics/user/archived')
      const json = (await response.json()) as ResponseJson

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

        return json.data?.set as unknown as TacticsSet
      },
      enabled: !!setId,
    })

  // --- Mutations ---
  const createRound = useMutation({
    mutationFn: async (data: CreateRoundData) => {
      await fetch('/api/tactics/createRound', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['tactics', 'set', variables.setId],
      })
      queryClient.invalidateQueries({ queryKey: ['tactics', 'sets'] })
    },
  })

  const increaseCorrect = useMutation({
    mutationFn: async (data: UpdateStatsData) => {
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
    mutationFn: async (data: { roundId: string }) => {
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
    mutationFn: async (data: UpdateTimeData) => {
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
      themes?: string
      count?: string
    }): Promise<TrainingPuzzle[]> => {
      const response = await fetch('/api/puzzles/getPuzzles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const json = (await response.json()) as ResponseJson

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
      puzzleIds?: { puzzleid: string }[]
      rating: number
      pgn?: string
      isPGN: boolean
    }): Promise<TacticsSet> => {
      const url = data.isPGN
        ? '/api/tactics/createFromPgn'
        : '/api/tactics/create'
      const body = data.isPGN
        ? { name: data.name, pgn: data.pgn, rating: data.rating }
        : { name: data.name, puzzleIds: data.puzzleIds, rating: data.rating }

      console.log({ url })

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const json = (await response.json()) as ResponseJson

      return json.data?.set as unknown as TacticsSet
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics', 'sets'] })
    },
  })

  const archiveTactic = useMutation({
    mutationFn: async ({ setId }: { setId: string }) => {
      await fetch('/api/tactics/archiveSet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setId }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics', 'sets'] })
    },
  })

  const deleteTactic = useMutation({
    mutationFn: async ({ setId }: { setId: string }) => {
      await fetch('/api/tactics/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setId }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics'] })
    },
  })

  const resetTacticProgress = useMutation({
    mutationFn: async ({ setId }: { setId: string }) => {
      await fetch('/api/tactics/resetProgress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setId }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics'] })
    },
  })

  const updateTactic = useMutation({
    mutationFn: async ({ setId, name }: { setId: string; name: string }) => {
      await fetch('/api/tactics/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setId, name }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics'] })
    },
  })

  const restoreTactic = useMutation({
    mutationFn: async ({ setId }: { setId: string }) => {
      await fetch('/api/tactics/restoreSet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setId }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tactics'] })
      queryClient.invalidateQueries({ queryKey: ['tactics', 'archived'] })
    },
  })

  return {
    tacticsSetsQuery,
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
