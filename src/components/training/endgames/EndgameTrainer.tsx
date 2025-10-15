'use client'

import { useEffect, useState } from 'react'
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
  const { useRandomEndgameQuery, updateEndgameStreak } = useEndgameQueries()
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
  const [loading, setLoading] = useState(true)
  const [puzzleStatus, setPuzzleStatus] = useState<
    'none' | 'correct' | 'incorrect'
  >('none')
  const [mode, setMode] = useState<'training' | 'settings'>('settings')

  const [xpCounter, setXpCounter] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

  const handlePuzzleComplete = async (status: 'correct' | 'incorrect') => {
    setLoading(true)
    setPuzzleStatus(status)

    // Increase the "Last Trained" on the profile
    updateStreak.mutate()

    // Increase the streak if correct
    // and send it to the server incase a badge needs adding
    if (status == 'correct') {
      trackEventOnClient('endgame_correct', {})
      updateEndgameStreak.mutate({ currentStreak: currentStreak + 1 })
      setCurrentStreak(currentStreak + 1)
      setXpCounter(xpCounter + 1)
    } else if (status == 'incorrect') {
      trackEventOnClient('endgame_incorrect', {})
    }

    // Refetch a new puzzle instead of calling getPuzzle
    await endgameQuery.refetch()

    setPuzzleStatus('none')
    setLoading(false)
  }

  const exit = async () => {
    setXpCounter(0)
    setCurrentStreak(0)
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
    // The puzzle data will be fetched automatically by React Query
    // when the component mounts or filters change
    setLoading(endgameQuery.isLoading)
  }, [mode, endgameQuery.isLoading])

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
      error={endgameQuery.error?.message}
    />
  ) : (
    <EndgameTrain
      type={type}
      rating={rating}
      difficulty={difficulty}
      getDifficulty={getDifficulty}
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
