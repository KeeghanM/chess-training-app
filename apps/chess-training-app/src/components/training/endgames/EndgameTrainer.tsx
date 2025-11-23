'use client'

import { useState } from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

import { useEndgameQueries } from '@hooks/use-endgame-queries'
import { useProfileQueries } from '@hooks/use-profile-queries'

import { useAppStore } from '@stores/app-store'

import trackEventOnClient from '@utils/track-event-on-client'

import EndgameConfigure from './EndgameConfigure'
import EndgameTrain from './EndgameTrain'

export default function EndgameTrainer() {
  const { user } = useKindeBrowserClient()

  // --- Hooks ---
  const { useRandomEndgameQuery, updateEndgameStreak, difficultyAdjuster } =
    useEndgameQueries()
  const { updateStreak } = useProfileQueries()
  const { preferences, setAutoNext } = useAppStore()
  const { soundEnabled, autoNext } = preferences

  // Setup state for endgame filters
  const [type, setType] = useState<
    'Queen' | 'Rook' | 'Knight' | 'Bishop' | 'Pawn' | 'All'
  >('All')
  const [rating, setRating] = useState(1500)
  const [difficulty, setDifficulty] = useState(1)

  // Setup state for the settings/general
  const [puzzleStatus, setPuzzleStatus] = useState<
    'none' | 'correct' | 'incorrect'
  >('none')
  const [mode, setMode] = useState<'training' | 'settings'>('settings')
  const [error, setError] = useState('')

  // Get random endgame using React Query - only enabled when in training mode
  const endgameQuery = useRandomEndgameQuery(
    { type, rating, difficulty },
    mode === 'training', // Only fetch when training
  )
  const currentPuzzle = endgameQuery.data

  const [xpCounter, setXpCounter] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

  const nextPuzzle = async () => {
    const trueRating = Math.max(
      Math.round(rating * difficultyAdjuster(difficulty)),
      500,
    )
    if (trueRating < 500 || trueRating > 3000) {
      setError(
        'Puzzle ratings must be between 500 & 3000, try adjusting the difficulty or the base rating',
      )
      return
    }

    await endgameQuery.refetch()
    setPuzzleStatus('none')
  }

  const handlePuzzleComplete = async (status: 'correct' | 'incorrect') => {
    setPuzzleStatus(status)

    updateStreak.mutate()

    if (status === 'incorrect') {
      trackEventOnClient('endgame_incorrect', {})
      return
    }

    trackEventOnClient('endgame_correct', {})
    updateEndgameStreak.mutate({ currentStreak: currentStreak + 1 })
    setCurrentStreak(currentStreak + 1)
    setXpCounter(xpCounter + 1)
  }

  const exit = async () => {
    setXpCounter(0)
    setCurrentStreak(0)
    setMode('settings')
    nextPuzzle()
  }

  const getDifficulty = () => {
    switch (difficulty) {
      case 0:
        return 'Easy'
      case 1:
        return 'Medium'
      case 2:
        return 'Hard'
      default:
        return 'Medium'
    }
  }

  if (!user) return null

  if (mode === 'training' && endgameQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (mode === 'training' && (endgameQuery.isError || !currentPuzzle)) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h3 className="text-xl font-bold text-red-500">Error loading puzzle</h3>
        <p className="text-gray-300">
          {endgameQuery.error?.message || 'Could not find a suitable puzzle.'}
        </p>
        <button
          onClick={() => setMode('settings')}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
        >
          Back to Settings
        </button>
      </div>
    )
  }

  return mode == 'settings' ? (
    <EndgameConfigure
      type={type}
      setType={setType}
      rating={rating}
      setRating={setRating}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      onStartTraining={() => setMode('training')}
      error={endgameQuery.error?.message || error}
    />
  ) : (
    <EndgameTrain
      type={type}
      rating={rating}
      getDifficulty={getDifficulty}
      currentPuzzle={currentPuzzle}
      soundEnabled={soundEnabled}
      loading={endgameQuery.isFetching}
      puzzleStatus={puzzleStatus}
      puzzleId={currentPuzzle?.puzzleid}
      xpCounter={xpCounter}
      nextPuzzle={nextPuzzle}
      autoNext={autoNext}
      setAutoNext={setAutoNext}
      onPuzzleComplete={handlePuzzleComplete}
      onExit={exit}
    />
  )
}
