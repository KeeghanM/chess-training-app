'use client'

import { useEffect, useState } from 'react'
import { useProfileQueries } from '@hooks/use-profile-queries'
import { type TrainingPuzzle } from '@hooks/use-puzzle-queries'
import { useVisualisationQueries } from '@hooks/use-visualisation-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import * as Sentry from '@sentry/nextjs'
import trackEventOnClient from '@utils/trackEventOnClient'
import VisualisationConfigure from './VisualisationConfigure'
import VisualisationTrain from './VisualisationTrain'

export default function VisualisationTrainer() {
  const { user } = useKindeBrowserClient()

  // --- Hooks ---
  const { updateStreak } = useProfileQueries()
  const { useRandomVisualisationQuery, updateVisualisationStreak } =
    useVisualisationQueries()

  // Setup state for settings
  const [length, setLength] = useState(6)
  const [rating, setRating] = useState(1500)
  const [difficulty, setDifficulty] = useState(1)

  // Setup state for the settings/general
  const [autoNext, setAutoNext] = useState(false)
  const [loading, setLoading] = useState(true)
  const [puzzleStatus, setPuzzleStatus] = useState<
    'none' | 'correct' | 'incorrect'
  >('none')
  const [mode, setMode] = useState<'training' | 'settings'>('settings')
  const [error, setError] = useState('')

  const [xpCounter, setXpCounter] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [currentPuzzle, setCurrentPuzzle] = useState<TrainingPuzzle>()
  const [fetchPuzzle, setFetchPuzzle] = useState(false)

  // Setup SFX
  const [soundEnabled] = useState(true)

  // React Query for puzzle fetching
  const puzzleQuery = useRandomVisualisationQuery({
    rating,
    difficulty,
    length,
  })

  // Update current puzzle when query succeeds
  useEffect(() => {
    if (puzzleQuery.data && fetchPuzzle) {
      setCurrentPuzzle(puzzleQuery.data)
      setFetchPuzzle(false)
      setLoading(false)
      setError('')
    }
  }, [puzzleQuery.data, fetchPuzzle])

  // Handle query errors
  useEffect(() => {
    if (puzzleQuery.error) {
      Sentry.captureException(puzzleQuery.error)
      setError(puzzleQuery.error.message || 'Failed to fetch puzzle')
      setLoading(false)
    }
  }, [puzzleQuery.error])

  const difficultyAdjuster = (d: number) => {
    return d == 0 ? 0.9 : d == 1 ? 1 : 1.2
  }

  const getNewPuzzle = () => {
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

    setFetchPuzzle(true)
    setLoading(true)
    puzzleQuery.refetch()
  }

  const handlePuzzleComplete = async (status: 'correct' | 'incorrect') => {
    setLoading(true)
    setPuzzleStatus(status)

    // Increase the "Last Trained" on the profile
    updateStreak.mutate(undefined, {
      onError: (e) => Sentry.captureException(e),
    })

    // Increase the streak if correct
    // and send it to the server incase a badge needs adding
    if (status == 'correct') {
      trackEventOnClient('Visualisation_correct', {})
      updateVisualisationStreak.mutate(
        { currentStreak: currentStreak + 1 },
        {
          onError: (e) => Sentry.captureException(e),
        },
      )
      setCurrentStreak(currentStreak + 1)
      setXpCounter(xpCounter + 1)
    } else if (status == 'incorrect') {
      trackEventOnClient('visualisation_incorrect', {})
    }
    getNewPuzzle()

    setPuzzleStatus('none')
  }

  const exit = async () => {
    setXpCounter(0)
    setCurrentStreak(0)
    setCurrentPuzzle(undefined)
    setMode('settings')
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

  // Here are all our useEffect functions
  useEffect(() => {
    if (mode == 'settings') return
    getNewPuzzle()
  }, [mode])

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
      error={error}
    />
  ) : (
    <VisualisationTrain
      rating={rating}
      difficulty={difficulty}
      getDifficulty={getDifficulty}
      length={length}
      currentPuzzle={currentPuzzle}
      soundEnabled={soundEnabled}
      loading={loading}
      puzzleStatus={puzzleStatus}
      puzzleId={currentPuzzle?.puzzleid}
      xpCounter={xpCounter}
      autoNext={autoNext}
      setAutoNext={setAutoNext}
      onPuzzleComplete={handlePuzzleComplete}
      onExit={exit}
    />
  )
}
