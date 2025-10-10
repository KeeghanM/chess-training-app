'use client'

import { useEffect, useState } from 'react'
import { useProfileQueries } from '@hooks/use-profile-queries'
import { useRecallQueries } from '@hooks/use-recall-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useAppStore } from '@stores/app-store'
import trackEventOnClient from '@utils/trackEventOnClient'
import RecallConfigure from './RecallConfigure'
import RecallTrain from './RecallTrain'

export default function RecallTrainer() {
  const { user } = useKindeBrowserClient()

  // --- Hooks ---
  const { useRandomRecallQuery, updateRecallStreak } = useRecallQueries()
  const { updateStreak } = useProfileQueries()
  const { preferences } = useAppStore()
  const { soundEnabled } = preferences

  // Get random recall puzzle using React Query
  const recallQuery = useRandomRecallQuery()
  const currentPuzzle = recallQuery.data

  // Setup state for settings
  const [difficulty, setDifficulty] = useState(1)
  const [timed, setTimed] = useState(false)
  const [timerLength, setTimerLength] = useState(10)
  const [piecesToRecall, setPiecesToRecall] = useState(1)

  // Setup state for the settings/general
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<'training' | 'settings'>('settings')
  const [puzzleStatus, setPuzzleStatus] = useState<
    'none' | 'correct' | 'incorrect'
  >('none')
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
      trackEventOnClient('recall_correct', {})
      updateRecallStreak.mutate({ currentStreak: currentStreak + 1 })
      setCurrentStreak(currentStreak + 1)
      setXpCounter(xpCounter + 1)
    } else if (status == 'incorrect') {
      trackEventOnClient('recall_incorrect', {})
    }

    // Refetch a new puzzle instead of calling getPuzzle
    await recallQuery.refetch()

    setPuzzleStatus('none')
    setLoading(false)
  }

  const exit = async () => {
    setXpCounter(0)
    setCurrentStreak(0)
    setMode('settings')
    recallQuery.refetch()
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
    // when the component mounts or mode changes
    setLoading(recallQuery.isLoading)
  }, [mode, recallQuery.isLoading])

  if (!user) return null

  return recallQuery.error ? (
    <div className="p-4 bg-card-light/20 rounded-lg">
      <h2 className="text-red-500 text-xl font-bold mb-4">
        Oops, something went wrong
      </h2>
      <div className="text-white">{recallQuery.error.message}</div>
    </div>
  ) : mode == 'settings' ? (
    <RecallConfigure
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      piecesToRecall={piecesToRecall}
      setPiecesToRecall={setPiecesToRecall}
      timed={timed}
      setTimed={setTimed}
      timerLength={timerLength}
      setTimerLength={setTimerLength}
      onStartTraining={() => setMode('training')}
    />
  ) : (
    <RecallTrain
      difficulty={difficulty}
      getDifficulty={getDifficulty}
      piecesToRecall={piecesToRecall}
      timed={timed}
      timerLength={timerLength}
      currentPuzzle={currentPuzzle}
      soundEnabled={soundEnabled}
      loading={loading}
      puzzleStatus={puzzleStatus}
      xpCounter={xpCounter}
      onPuzzleComplete={handlePuzzleComplete}
      onExit={exit}
    />
  )
}
