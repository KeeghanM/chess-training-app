'use client'

import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import XpTracker from '@components/general/XpTracker'
import { queryClient } from '@hooks/query-client'
import { usePuzzleQueries } from '@hooks/use-puzzle-queries'
import { useTacticsQueries } from '@hooks/use-tactics-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import type { Puzzle } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { useAppStore } from '@stores/app-store'
import trackEventOnClient from '@utils/trackEventOnClient'
import type { Move } from 'chess.js'
import { Chess } from 'chess.js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import TimeAgo from 'react-timeago'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { useSounds } from '~/hooks/use-sound'
import ChessBoard from '../ChessBoard'
import BoardContainer from '../shared/BoardContainer'
import PgnNavigator from '../shared/PgnNavigator'
import StatusIndicator from '../shared/StatusIndicator'
import type { PrismaTacticsSet } from './create/TacticsSetCreator'

export type PrismaTacticsSetWithPuzzles = PrismaTacticsSet & {
  puzzles: Puzzle[]
}

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

// TODO: "Show solution" button

export default function TacticsTrainer(props: {
  set: PrismaTacticsSetWithPuzzles
}) {
  const { user } = useKindeBrowserClient()
  const router = useRouter()

  const { usePuzzleQuery } = usePuzzleQueries()
  const { increaseCorrect, increaseIncorrect, increaseTimeTaken, createRound } =
    useTacticsQueries()

  const { preferences, setAutoNext } = useAppStore()
  const { soundEnabled, autoNext } = preferences
  const { correctSound, incorrectSound } = useSounds()

  // Setup main state for the game/puzzles
  const [currentRound, setCurrentRound] = useState(
    props.set.rounds[props.set.rounds.length - 1]!,
  )
  const [CompletedPuzzles, setCompletedPuzzles] = useState(
    currentRound.correct + currentRound.incorrect,
  )
  const [game, setGame] = useState(new Chess())
  const [gameReady, setGameReady] = useState(false)
  const [orientation, setOrientation] = useState<'white' | 'black'>('white')
  const [position, setPosition] = useState(game.fen())

  // Setup state for the game and training
  const [readyForInput, setReadyForInput] = useState(false)
  const [puzzleFinished, setPuzzleFinished] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [sessionTimeStarted] = useState(new Date())
  const [puzzleStatus, setPuzzleStatus] = useState<
    'none' | 'correct' | 'incorrect'
  >('none')
  const [xpCounter, setXpCounter] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

  // Get current puzzle data using React Query
  const currentPuzzleIndex = CompletedPuzzles
  const currentPuzzleId = props.set.puzzles[currentPuzzleIndex]?.puzzleid || ''

  const puzzleQuery = usePuzzleQuery(currentPuzzleId)
  const currentPuzzle = puzzleQuery.data

  const makeMove = (move: string) => {
    try {
      game.move(move)
      setPosition(game.fen())
      // eslint-disable-next-line
    } catch (e) {
      // honestly, do nothing
      // I dunno why this is firing, I replicated it once but it didn;t actually affect the usage
      // I think it's to do with premoving and the chess.js library, but nothing actually breaks
      // so this is just here to stop logging it in sentry as an "unhandled error"
    }
  }

  // Makes a move for the "opponent"
  const makeBookMove = () => {
    setReadyForInput(false)
    const currentMove = currentPuzzle?.moves[game.history().length]
    if (!currentMove) return

    const timeoutId = setTimeout(() => {
      makeMove(currentMove)
      setReadyForInput(true)
    }, 500)
    return timeoutId
  }

  const makeFirstMove = (move: string) => {
    const timeoutId = setTimeout(() => {
      makeMove(move)
      setReadyForInput(true)
    }, 500)
    return timeoutId
  }

  const goToNextPuzzle = async () => {
    // First log all the stats re:current puzzle
    // Check if we've completed the set, in which case we need to create a new round & exit
    // If we haven't then load the next puzzle

    const currentPuzzleIndex = props.set.puzzles.findIndex(
      (item) => item.puzzleid == currentPuzzle!.puzzleid,
    )

    if (
      currentPuzzleIndex + 1 >= props.set.size ||
      CompletedPuzzles >= props.set.size
    ) {
      // We have completed the set

      if (user) {
        try {
          trackEventOnClient('tactics_set_round_completed', {
            roundNumber: currentRound.roundNumber.toString(),
            correct: currentRound.correct.toString(),
            incorrect: currentRound.incorrect.toString(),
          })

          // Use React Query mutation for creating new round
          await createRound.mutateAsync({
            setId: props.set.id,
            roundNumber: currentRound.roundNumber + 1,
            puzzleRating: props.set.rating ?? 1500, // Default to 1500 if null
          })
        } catch (e) {
          Sentry.captureException(e)
        }
      }

      // Return to the main lister
      await exit()
      return
    }

    // We haven't completed the set so we need to change the puzzle
    setPuzzleStatus('none')
    setCompletedPuzzles(currentPuzzleIndex + 1)
    // React Query will automatically fetch the new puzzle when currentPuzzleIndex changes
  }

  const checkEndOfLine = async () => {
    if (game.history().length >= currentPuzzle!.moves.length) {
      // We have reached the end of the line
      if (soundEnabled) correctSound()
      setPuzzleStatus('correct')
      setPuzzleFinished(true)
      setXpCounter(xpCounter + 1)

      increaseTimeTaken.mutate({
        roundId: currentRound.id,
        timeTaken: (Date.now() - startTime) / 1000,
        setId: props.set.id,
      })

      increaseCorrect.mutate({
        roundId: currentRound.id,
        currentStreak: currentStreak + 1,
      })
      setCurrentStreak(currentStreak + 1)
      setCurrentRound({
        ...currentRound,
        correct: currentRound.correct + 1,
      })

      if (autoNext && puzzleStatus != 'incorrect') {
        await goToNextPuzzle()
      }
      return true
    }
    return false
  }

  const showIncorrectSequence = async () => {
    let counter = 0
    const timeouts = []
    for (let i = game.history().length; i < currentPuzzle!.moves.length; i++) {
      counter++
      const move = currentPuzzle?.moves[i]
      if (!move) return

      const timeoutPromise = new Promise((resolve) => {
        const timeoutId = setTimeout(
          () => {
            makeMove(move)
            resolve(timeoutId)
          },
          1000 * counter + 200,
        )
      })

      timeouts.push(timeoutPromise)
    }

    await Promise.all(timeouts)
  }

  const handleMove = async (playerMove: Move) => {
    const correctMove = currentPuzzle!.moves[game.history().length - 1]

    if (
      correctMove !== playerMove.lan &&
      correctMove !== playerMove.san &&
      !game.isCheckmate()
    ) {
      // We played the wrong move
      setPuzzleStatus('incorrect')
      if (soundEnabled) incorrectSound()
      game.undo()
      setReadyForInput(false)
      await showIncorrectSequence()
      increaseIncorrect.mutate({
        roundId: currentRound.id,
      })
      setCurrentStreak(0)
      setReadyForInput(true)
      setPuzzleFinished(true)
      setCurrentRound({
        ...currentRound,
        incorrect: currentRound.incorrect + 1,
      })

      return false
    }
    setPosition(game.fen())
    makeBookMove()
    await checkEndOfLine()
    return true
  }

  const handleMoveClick = (moveIndex: number) => {
    if (!currentPuzzle) return
    const newGame = new Chess(currentPuzzle.fen)
    for (let i = 0; i <= moveIndex; i++) {
      newGame.move(game.history()[i]!)
    }
    setPosition(newGame.fen())
    trackEventOnClient('tactics_set_jump_to_move', {})
  }

  const exit = async () => {
    queryClient.invalidateQueries({ queryKey: ['tactics', 'sets'] })
    trackEventOnClient('tactics_set_closed', {})
    router.push('/training/tactics/list')
    return
  }

  useEffect(() => {
    // Create a new game from the puzzle whenever it changes
    if (!currentPuzzle) return
    const newGame = new Chess(currentPuzzle.fen)
    setGame(newGame)
    setGameReady(false)
  }, [currentPuzzle])

  useEffect(() => {
    // We need to ensure the game is set before we can make a move
    setGameReady(true)
  }, [game])

  useEffect(() => {
    // Now, whenever any of the elements associated with the game/puzzle
    // change we can check if we need to make the first move
    if (gameReady && currentPuzzle) {
      setPuzzleFinished(false)
      setPosition(currentPuzzle.fen)
      if (currentPuzzle.directStart) {
        // The first move is the players
        setOrientation(game.turn() == 'w' ? 'white' : 'black')
        setReadyForInput(true)
      } else {
        // The first move is the opponents
        setOrientation(game.turn() == 'w' ? 'black' : 'white') // reversed because the first move is opponents
        const firstMove = currentPuzzle?.moves[0]
        const timeoutId = makeFirstMove(firstMove!)
        return () => clearTimeout(timeoutId)
      }
    }
  }, [gameReady, game, currentPuzzle])

  // Listen for spacebar as a way to press the "next" button
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault()
        if (puzzleFinished && puzzleStatus == 'correct')
          goToNextPuzzle().catch((e) => Sentry.captureException(e))
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [puzzleFinished, puzzleStatus])

  // Increase timer whenever puzzle is finished
  useEffect(() => {
    const newTime = Date.now()
    if (puzzleFinished) {
      increaseTimeTaken.mutate({
        roundId: currentRound.id,
        timeTaken: (newTime - startTime) / 1000,
        setId: props.set.id,
      })
    } else {
      setStartTime(newTime)
    }
  }, [puzzleFinished])

  // Last check to ensure we have a user
  if (!user) return null

  return (
    <>
      <div className="flex gap-4 flex-wrap text-white text-lg mb-4">
        <p>
          <span className="font-bold">Round: </span>
          {props.set.rounds.length}/8
        </p>
        <p>
          <span className="font-bold">Completed: </span>
          {CompletedPuzzles}/{props.set.size}
        </p>
        <p>
          <span className="font-bold">Accuracy: </span>
          {currentRound.correct == 0 && currentRound.incorrect == 0
            ? '0'
            : Math.round(
                (currentRound.correct /
                  (currentRound.correct + currentRound.incorrect)) *
                  100,
              )}
          %
        </p>
        <p className="flex gap-2">
          <span className="font-bold">Started:</span>
          <TimeAgo date={sessionTimeStarted} />
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative">
          <BoardContainer>
            {
              // While we are loading a new puzzle or creating a new round, we don't want the user to interact so we show a full overlay spinner
              (puzzleQuery.isFetching || createRound.isPending) && (
                <div className="absolute inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.3)]">
                  <Spinner />
                </div>
              )
            }
            <ChessBoard
              game={game}
              position={position}
              orientation={orientation}
              readyForInput={readyForInput}
              soundEnabled={soundEnabled}
              additionalSquares={{}}
              moveMade={handleMove}
              additionalArrows={[]}
              enableHighlights={true}
              enableArrows={true}
            />
          </BoardContainer>
          <XpTracker counter={xpCounter} type={'tactic'} />
        </div>
        <div className="lg:w-1/3 lg:min-w-1/3 p-4 bg-card-light/20 rounded-lg h-fit my-auto">
          <div className="flex flex-col gap-2 bg-card rounded-lg p-4">
            <StatusIndicator
              status={puzzleStatus}
              orientation={orientation}
              puzzleId={currentPuzzle?.puzzleid}
            />
            {puzzleStatus === 'incorrect' && currentPuzzle?.comment && (
              <p>{currentPuzzle.comment}</p>
            )}
            <PgnNavigator
              game={game}
              puzzleFinished={puzzleFinished}
              onMoveClick={handleMoveClick}
            />
            <div className="flex justify-between gap-2">
              {puzzleFinished ? (
                (!autoNext || puzzleStatus == 'incorrect') && (
                  <Button variant="primary" onClick={() => goToNextPuzzle()}>
                    Next
                  </Button>
                )
              ) : (
                <>
                  <Button
                    variant="dark"
                    onClick={async () => {
                      setPuzzleStatus('incorrect')
                      setReadyForInput(false)
                      await showIncorrectSequence()
                      setReadyForInput(true)
                      setPuzzleFinished(true)
                    }}
                  >
                    Skip
                  </Button>
                </>
              )}
              <label className="ml-auto flex items-center gap-2 text-xs text-black ">
                <span>Auto Next on correct</span>
                <Toggle
                  defaultChecked={autoNext}
                  onChange={async () => {
                    setAutoNext(!autoNext)
                    if (puzzleFinished && puzzleStatus == 'correct')
                      await goToNextPuzzle()
                  }}
                />
              </label>
            </div>
            <Button className="w-full" variant="danger" onClick={exit}>
              Exit
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
