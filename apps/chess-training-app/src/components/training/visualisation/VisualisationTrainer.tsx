'use client'

import { useState } from 'react'
import { useProfileQueries } from '@hooks/use-profile-queries'
import { useVisualisationQueries } from '@hooks/use-visualisation-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import trackEventOnClient from '@utils/trackEventOnClient'
import VisualisationConfigure from './VisualisationConfigure'
import VisualisationTrain from './VisualisationTrain'

export default function VisualisationTrainer() {
  const { user } = useKindeBrowserClient()

  // --- Hooks ---
  const { updateStreak } = useProfileQueries()
  const {
    useRandomVisualisationQuery,
    updateVisualisationStreak,
    difficultyAdjuster,
  } = useVisualisationQueries()

  // Setup state for settings
  const [length, setLength] = useState(6)
  const [rating, setRating] = useState(1500)
  const [difficulty, setDifficulty] = useState(1)

  // Setup state for the settings/general
  const [autoNext, setAutoNext] = useState(false)
  const [puzzleStatus, setPuzzleStatus] = useState<
    'none' | 'correct' | 'incorrect'
  >('none')
  const [mode, setMode] = useState<'training' | 'settings'>('settings')
  const [error, setError] = useState('')

  const [xpCounter, setXpCounter] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

  // Setup SFX
  const [soundEnabled] = useState(true)

  // React Query for puzzle fetching
  const puzzleQuery = useRandomVisualisationQuery({
    rating,
    difficulty,
    length,
  })
  const currentPuzzle = puzzleQuery.data

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

    await puzzleQuery.refetch()
    setPuzzleStatus('none')
  }

  const handlePuzzleComplete = async (status: 'correct' | 'incorrect') => {
    setPuzzleStatus(status)

    updateStreak.mutate()

    if (status == 'incorrect') {
      trackEventOnClient('visualisation_incorrect', {})
      return
    }

    trackEventOnClient('Visualisation_correct', {})
    updateVisualisationStreak.mutate({ currentStreak: currentStreak + 1 })
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
    <VisualisationConfigure
      rating={rating}
      setRating={setRating}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      length={length}
      setLength={setLength}
      onStartTraining={() => setMode('training')}
      error={puzzleQuery.error?.message || error}
    />
  ) : (
    <VisualisationTrain
      rating={rating}
      getDifficulty={getDifficulty}
      length={length}
      currentPuzzle={currentPuzzle}
      soundEnabled={soundEnabled}
      loading={puzzleQuery.isFetching}
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
