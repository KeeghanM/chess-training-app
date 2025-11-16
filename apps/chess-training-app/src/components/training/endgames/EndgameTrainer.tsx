'use client'

import { useState } from 'react'
import { useEndgameQueries } from '@hooks/use-endgame-queries'
import { useProfileQueries } from '@hooks/use-profile-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useAppStore } from '@stores/app-store'
import trackEventOnClient from '@utils/trackEventOnClient'
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

  // Get random endgame using React Query
  const endgameQuery = useRandomEndgameQuery({ type, rating, difficulty })
  const currentPuzzle = endgameQuery.data

  // Setup state for the settings/general
  const [puzzleStatus, setPuzzleStatus] = useState<
    'none' | 'correct' | 'incorrect'
  >('none')
  const [mode, setMode] = useState<'training' | 'settings'>('settings')
  const [error, setError] = useState('')

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
