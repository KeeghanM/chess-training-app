'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import { usePuzzleQueries } from '@hooks/use-puzzle-queries'
import { useTacticsQueries } from '@hooks/use-tactics-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import type { Puzzle } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { useAppStore } from '@stores/app-store'
import Tippy from '@tippyjs/react'
import trackEventOnClient from '@utils/trackEventOnClient'
import type { Move } from 'chess.js'
import { Chess } from 'chess.js'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import useSound from 'use-sound'
import { queryClient } from '~/hooks/query-client'

import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import TimeSince from '@components/general/TimeSince'
import XpTracker from '@components/general/XpTracker'
import ThemeSwitch from '@components/template/header/ThemeSwitch'

import ChessBoard from '../ChessBoard'
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
  const { usePuzzleQuery } = usePuzzleQueries()
  const { increaseCorrect, increaseIncorrect, increaseTimeTaken, createRound } =
    useTacticsQueries()

  const { preferences, setSoundEnabled, setAutoNext } = useAppStore()
  const { soundEnabled, autoNext } = preferences

  const { user } = useKindeBrowserClient()
  const router = useRouter()

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

  // Setup SFX
  const [correctSound] = useSound('/sfx/correct.mp3')
  const [incorrectSound] = useSound('/sfx/incorrect.mp3')

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

  const PgnDisplay = game.history().map((move, index) => {
    const moveNumber =
      Math.floor(index / 2) + 1 + (game.moveNumber() - game.history().length)
    const moveColour = game.history({ verbose: true })[index]!.color
    const FlexText = () => (
      <p>
        {(moveColour == 'w' || (moveColour == 'b' && index == 0)) && (
          <span className="font-bold">
            {/* This weird calc is to fix the first black number being too high */}
            {moveNumber - (moveColour == 'b' && index == 0 ? 1 : 0)}.
            {moveColour == 'b' && index == 0 && '..'}
          </span>
        )}{' '}
        <span>{move}</span>
      </p>
    )

    if (puzzleFinished) {
      return (
        <button
          key={'btn' + moveNumber.toString() + move + moveColour}
          className="h-max max-h-fit bg-none px-1 py-1 hover:bg-purple-800 hover:text-white"
          onClick={async () => {
            const newGame = new Chess(currentPuzzle!.fen)
            for (let i = 0; i <= index; i++) {
              newGame.move(game.history()[i]!)
            }
            setPosition(newGame.fen())
            trackEventOnClient('tactics_set_jump_to_move', {})
          }}
        >
          <FlexText />
        </button>
      )
    } else {
      return (
        <div
          key={moveNumber.toString() + move + moveColour}
          className="px-1 py-1 text-black dark:text-white"
        >
          <FlexText />
        </div>
      )
    }
  })

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
    // Performance API is more accurate if available
    const newTime =
      typeof performance !== 'undefined' ? performance.now() : Date.now()
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
    <div className="relative border border-gray-300 dark:text-white dark:border-slate-600 shadow-md dark:shadow-slate-900 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)]">
      {
        // While we are loading a new puzzle or creating a new round, we don't want the user to interact so we show a full overlay spinner
        (puzzleQuery.isFetching || createRound.isPending) && (
          <div className="absolute inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.3)]">
            <Spinner />
          </div>
        )
      }
      <div className="flex flex-wrap items-center justify-between px-2 py-1 border-b border-gray-300 dark:border-slate-600 font-bold text-orange-500">
        <p className="text-lg font-bold">{props.set.name}</p>
        <div className="flex items-center gap-2 text-black dark:text-white">
          <ThemeSwitch />
          <div
            className="flex cursor-pointer flex-row items-center gap-1 hover:text-orange-500"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            <Tippy content={`Sound ${soundEnabled ? 'On' : 'Off'}`}>
              {soundEnabled ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M1.75 5.75v4.5h2.5l4 3V2.75l-4 3zm9 .5s1 .5 1 1.75s-1 1.75-1 1.75"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M1.75 5.75v4.5h2.5l4 3V2.75l-4 3zm12.5 0l-3.5 4.5m0-4.5l3.5 4.5"
                  />
                </svg>
              )}
            </Tippy>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col">
          <div className="flex gap-1 mt-1 justify-center text-xs md:text-sm lg:text-base">
            <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
              <p className="font-bold py-1 px-1 border-b border-gray-300 dark:border-slate-600">
                Round:
              </p>
              <p>{props.set.rounds.length}/8</p>
            </div>
            <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
              <p className="font-bold py-1 px-1 border-b border-gray-300 dark:border-slate-600">
                Completed:
              </p>
              <p>
                {CompletedPuzzles}/{props.set.size}
              </p>
            </div>
            <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
              <p className="font-bold py-1 px-1 border-b border-gray-300 dark:border-slate-600">
                Accuracy:
              </p>
              <p>
                {currentRound.correct == 0 && currentRound.incorrect == 0
                  ? '0'
                  : Math.round(
                      (currentRound.correct /
                        (currentRound.correct + currentRound.incorrect)) *
                        100,
                    )}
                %
              </p>
            </div>
            <div className="flex flex-col items-center border border-gray-300 dark:border-slate-600">
              <p className="font-bold py-1 px-1 border-b border-gray-300 dark:border-slate-600">
                Session:
              </p>
              <p>
                <TimeSince date={sessionTimeStarted} />
              </p>
            </div>
          </div>
          <div>
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
            <XpTracker counter={xpCounter} type={'tactic'} />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 p-1">
          {!puzzleFinished && (
            <p className="flex items-center gap-2 text-black dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className={
                  orientation === 'white'
                    ? 'text-white'
                    : 'rotate-180 transform text-black'
                }
              >
                <path fill="currentColor" d="M1 21h22L12 2" />
              </svg>
              {orientation === 'white' ? 'White' : 'Black'} to move
            </p>
          )}
          {puzzleStatus === 'correct' && (
            <div className="z-50 flex flex-wrap  items-center gap-2 text-black dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 512 512"
                className="text-lime-500"
              >
                <path
                  fill="currentColor"
                  d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2h144c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48h-97.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192h64c17.7 0 32 14.3 32 32v224c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
                />
              </svg>
              <p>Correct!</p>
              <Link
                href={`https://lichess.org/training/${currentPuzzle?.puzzleid}`}
                target="_blank"
              >
                <span className="flex flex-row items-center gap-1 text-sm text-black dark:text-white underline">
                  Lichess
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2l8-8m0 0v5m0-5h-5"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          )}
          {puzzleStatus === 'incorrect' && (
            <>
              <div className="z-50 flex flex-wrap items-center gap-2 text-black dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                  className="text-red-500"
                >
                  <path
                    fill="currentColor"
                    d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2h144c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48h-97.5c-19 0-37.5 5.6-53.3 16.1l-38.5 25.7C176 91.6 160 121.6 160 153.7v111.2c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384h64c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32v224c0 17.7 14.3 32 32 32z"
                  />
                </svg>
                <p>Incorrect!</p>
                <Link
                  href={`https://lichess.org/training/${currentPuzzle?.puzzleid}`}
                  target="_blank"
                >
                  <span className="flex flex-row items-center gap-1 text-sm text-black dark:text-white underline">
                    Lichess
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2l8-8m0 0v5m0-5h-5"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
              {currentPuzzle?.comment && (
                <p className="p-2 border lg:border-4 border-orange-500 bg-orange-500 bg-opacity-20 text-black dark:text-white text-sm overflow-y-auto">
                  {currentPuzzle?.comment}
                </p>
              )}
            </>
          )}
          <div className="flex flex-1 flex-col-reverse gap-2 lg:flex-col">
            <div className="flex h-full flex-wrap content-start gap-1 border lg:border-4 border-purple-700 p-2 bg-purple-700 bg-opacity-20 text-black dark:text-white">
              {PgnDisplay.map((item) => item)}
            </div>
            <label className="ml-auto flex items-center gap-2 text-sm text-black dark:text-white">
              {/* @ts-expect-error - react-toggle type compatibility issue */}
              <Toggle
                defaultChecked={autoNext}
                onChange={async () => {
                  setAutoNext(!autoNext)
                  if (puzzleFinished && puzzleStatus == 'correct')
                    await goToNextPuzzle()
                }}
              />
              <span>Auto Next on correct</span>
            </label>
            <div className="flex flex-col gap-2">
              {puzzleFinished ? (
                (!autoNext || puzzleStatus == 'incorrect') && (
                  <Button variant="primary" onClick={() => goToNextPuzzle()}>
                    Next
                  </Button>
                )
              ) : (
                <>
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      setPuzzleStatus('incorrect')
                      setReadyForInput(false)
                      await showIncorrectSequence()
                      setReadyForInput(true)
                      setPuzzleFinished(true)
                    }}
                  >
                    Skip/Show Solution
                  </Button>
                </>
              )}

              <Button variant="danger" onClick={exit}>
                Exit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
