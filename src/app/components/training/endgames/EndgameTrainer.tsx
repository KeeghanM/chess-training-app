'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

import { useEndgameQueries } from '@hooks/use-endgame-queries'
import { useProfileQueries } from '@hooks/use-profile-queries'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useAppStore } from '@stores/app-store'
import trackEventOnClient from '@utils/trackEventOnClient'
import type { Move } from 'chess.js'
import { Chess } from 'chess.js'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import useSound from 'use-sound'

import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import XpTracker from '@components/general/XpTracker'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../_elements/tooltip'
import ChessBoard from '../ChessBoard'

export default function EndgameTrainer() {
  const { user } = useKindeBrowserClient()

  // --- Hooks ---
  const { useRandomEndgameQuery, updateEndgameStreak } = useEndgameQueries()
  const { updateStreak } = useProfileQueries()
  const { preferences, setSoundEnabled, setAutoNext } = useAppStore()
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

  // Setup main state for the game/puzzles
  const [game, setGame] = useState(new Chess())
  const [gameReady, setGameReady] = useState(false)
  const [orientation, setOrientation] = useState<'white' | 'black'>('white')
  const [position, setPosition] = useState(game.fen())

  // SFX
  const [correctSound] = useSound('/sfx/correct.mp3')
  const [incorrectSound] = useSound('/sfx/incorrect.mp3')

  // Setup state for the settings/general
  const [loading, setLoading] = useState(true)
  const [readyForInput, setReadyForInput] = useState(false)
  const [puzzleFinished, setPuzzleFinished] = useState(false)
  const [puzzleStatus, setPuzzleStatus] = useState<
    'none' | 'correct' | 'incorrect'
  >('none')
  const [mode, setMode] = useState<'training' | 'settings'>('settings')

  const [xpCounter, setXpCounter] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

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

  const goToNextPuzzle = async (status: string) => {
    setLoading(true)

    // Increase the "Last Trained" on the profile
    updateStreak.mutate()

    // Increase the streak if correct
    // and send it to the server incase a badge needs adding
    if (status == 'correct') {
      trackEventOnClient('endgame_correct', {})
      updateEndgameStreak.mutate({ currentStreak: currentStreak + 1 })
      setCurrentStreak(currentStreak + 1)
    } else if (status == 'incorrect') {
      trackEventOnClient('endgame_incorrect', {})
    }

    // Refetch a new puzzle instead of calling getPuzzle
    await endgameQuery.refetch()

    setPuzzleStatus('none')
    setLoading(false)
  }

  const checkEndOfLine = async () => {
    if (game.history().length >= currentPuzzle!.moves.length) {
      // We have reached the end of the line
      if (soundEnabled) correctSound()
      setPuzzleStatus('correct')
      setPuzzleFinished(true)
      setXpCounter(xpCounter + 1)

      if (autoNext && puzzleStatus != 'incorrect') {
        await goToNextPuzzle('correct')
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

    if (correctMove !== playerMove.lan && !game.isCheckmate()) {
      // We played the wrong move
      setPuzzleStatus('incorrect')
      if (soundEnabled) incorrectSound()
      game.undo()
      setReadyForInput(false)
      await showIncorrectSequence()

      setReadyForInput(true)
      setPuzzleFinished(true)
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
          className="h-max max-h-fit bg-none p-1 hover:bg-purple-800"
          onClick={async () => {
            const newGame = new Chess(currentPuzzle!.fen)
            for (let i = 0; i <= index; i++) {
              newGame.move(game.history()[i]!)
            }
            setPosition(newGame.fen())
            trackEventOnClient('endgame_set_jump_to_move', {})
          }}
        >
          <FlexText />
        </button>
      )
    } else {
      return (
        <div
          key={moveNumber.toString() + move + moveColour}
          className="px-1 py-1"
        >
          <FlexText />
        </div>
      )
    }
  })

  const exit = async () => {
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
      setOrientation(game.turn() == 'w' ? 'black' : 'white') // reversed because the first move is opponents
      const firstMove = currentPuzzle?.moves[0]
      const timeoutId = makeFirstMove(firstMove!)
      return () => clearTimeout(timeoutId)
    }
  }, [gameReady, game, currentPuzzle])

  if (!user) return null

  return mode == 'settings' ? (
    <>
      <div className="border border-gray-300 text-black   shadow-md  bg-[rgba(0,0,0,0.03)] ">
        <div className="flex flex-wrap items-center justify-between px-2 py-1 border-b border-gray-300  font-bold text-orange-500">
          <p>Adjust your settings</p>
        </div>
        <div className="flex flex-col p-2 gap-4">
          <div className="flex flex-col md:flex-row gap-1 md:gap-2">
            <div>
              <label className="font-bold">Your Rating</label>
              <input
                type="number"
                className="w-full border border-gray-300 bg-gray-100 px-4 py-1 text-black"
                min={'500'}
                max={'3000'}
                step={'10'}
                value={rating}
                onInput={(e) => {
                  setRating(parseInt(e.currentTarget.value))
                }}
              />
            </div>
            <div>
              <label className="font-bold">Difficulty</label>
              <div className="flex flex-col gap-1 md:flex-row">
                <Button
                  variant={difficulty == 0 ? 'accent' : 'secondary'}
                  onClick={() => setDifficulty(0)}
                >
                  Easy
                </Button>
                <Button
                  variant={difficulty == 1 ? 'accent' : 'secondary'}
                  onClick={() => setDifficulty(1)}
                >
                  Medium
                </Button>
                <Button
                  variant={difficulty == 2 ? 'accent' : 'secondary'}
                  onClick={() => setDifficulty(2)}
                >
                  Hard
                </Button>
              </div>
            </div>
          </div>
          <div>
            <label className="font-bold">Endgame Type</label>
            <div className="grid grid-cols-2 gap-1 lg:grid-cols-3">
              <Button
                variant={type == 'All' ? 'accent' : 'secondary'}
                onClick={() => setType('All')}
              >
                All
              </Button>
              <Button
                variant={type == 'Queen' ? 'accent' : 'secondary'}
                onClick={() => setType('Queen')}
              >
                Queen
              </Button>
              <Button
                variant={type == 'Rook' ? 'accent' : 'secondary'}
                onClick={() => setType('Rook')}
              >
                Rook
              </Button>
              <Button
                variant={type == 'Bishop' ? 'accent' : 'secondary'}
                onClick={() => setType('Bishop')}
              >
                Bishop
              </Button>
              <Button
                variant={type == 'Knight' ? 'accent' : 'secondary'}
                onClick={() => setType('Knight')}
              >
                Knight
              </Button>
              <Button
                variant={type == 'Pawn' ? 'accent' : 'secondary'}
                onClick={() => setType('Pawn')}
              >
                Pawn
              </Button>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={async () => {
              setMode('training')
              trackEventOnClient('endgame_start', {})
            }}
          >
            Start Training
          </Button>
          {endgameQuery.error && (
            <p className="bg-red-500 italic text-sm p-2 text-white">
              {endgameQuery.error.message}
            </p>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="relative border border-gray-300 text-black   shadow-md  bg-[rgba(0,0,0,0.03)] ">
        {loading && (
          <div className="absolute inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.3)]">
            <Spinner />
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between text-sm">
          <div className="flex gap-1 p-2 pb-0 justify-center text-xs md:text-sm lg:text-base">
            <div className="flex flex-col items-center border border-gray-300 ">
              <p className="w-full text-center font-bold py-1 px-1 border-b border-gray-300 ">
                Type:
              </p>
              <p className="px-1">{type} Endgames</p>
            </div>
            <div className="flex flex-col items-center border border-gray-300 ">
              <p className="font-bold py-1 px-1 border-b border-gray-300 ">
                Rating:
              </p>
              <p>{rating}</p>
            </div>
            <div className="flex flex-col items-center border border-gray-300 ">
              <p className="font-bold py-1 px-1 border-b border-gray-300 ">
                Difficulty:
              </p>
              <p>{getDifficulty()}</p>
            </div>
            <XpTracker counter={xpCounter} type={'tactic'} />
          </div>
          <div className="flex items-center gap-2 w-fit mx-auto md:mx-0">
            <div
              className="ml-auto flex cursor-pointer flex-row items-center gap-2 hover:text-orange-500"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              <Tooltip>
                <TooltipTrigger>
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
                </TooltipTrigger>
                <TooltipContent>{`Sound ${soundEnabled ? 'On' : 'Off'}`}</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
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
          <div className="flex w-full flex-col gap-2  p-2">
            <div className="flex flex-row items-center gap-2">
              <p className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              {puzzleStatus === 'correct' && (
                <div className="z-50 flex flex-wrap  items-center gap-2">
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
                    <span className="flex flex-row items-center gap-1 text-sm underline">
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
                <div className="z-50 flex flex-wrap items-center gap-2">
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
                    <span className="flex flex-row items-center gap-1 text-sm underline">
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
            </div>
            <div className="flex flex-1 flex-col-reverse gap-2 lg:flex-col">
              <div className="flex h-full flex-wrap content-start gap-1 border lg:border-4 border-purple-700 p-2 bg-purple-700 bg-opacity-20 text-black ">
                {PgnDisplay.map((item) => item)}
              </div>
              <label className="ml-auto flex items-center gap-2 text-sm">
                <Toggle
                  defaultChecked={autoNext}
                  onChange={async () => {
                    setAutoNext(!autoNext)
                    if (puzzleFinished && puzzleStatus == 'correct')
                      await goToNextPuzzle(puzzleStatus)
                  }}
                />
                <span>Auto Next on correct</span>
              </label>
              <div className="flex flex-col gap-2">
                {puzzleFinished ? (
                  (!autoNext || puzzleStatus == 'incorrect') && (
                    <Button
                      variant="primary"
                      onClick={() => goToNextPuzzle(puzzleStatus)}
                    >
                      Next
                    </Button>
                  )
                ) : (
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
                )}

                <Button variant="danger" onClick={exit}>
                  Exit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
