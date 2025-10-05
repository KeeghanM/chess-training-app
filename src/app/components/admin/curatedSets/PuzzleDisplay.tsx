'use client'

import { useContext, useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { Chess } from 'chess.js'
import type { ResponseJson } from '~/app/api/responses'

import Button from '../../_elements/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../_elements/tooltip'
import Spinner from '../../general/Spinner'
import ChessBoard from '../../training/ChessBoard'
import {
  CuratedSetBrowserContext,
  type CuratedSetPuzzle,
} from './CuratedSetsBrowser'

export default function PuzzleDisplay() {
  const { puzzle, mode } = useContext(CuratedSetBrowserContext)

  const getOrientation = (
    puzzle: CuratedSetPuzzle | undefined,
  ): 'white' | 'black' =>
    puzzle
      ? puzzle.directStart
        ? puzzle.fen.split(' ')[1] == 'w'
          ? 'white'
          : 'black'
        : puzzle.fen.split(' ')[1] == 'w'
          ? 'black'
          : 'white'
      : 'white'

  // Puzzle Display
  const [game] = useState(new Chess())
  const [position, setPosition] = useState(puzzle?.fen ?? '')
  const [readyForInput] = useState(false)

  // Puzzle Editing
  const [rating, setRating] = useState(puzzle?.rating ?? 1500)
  const [comment, setComment] = useState(puzzle?.comment ?? '')

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!puzzle) throw new Error('No puzzle selected')
      const resp = await fetch('/api/admin/curated-sets/curatedPuzzle', {
        method: 'PATCH',
        body: JSON.stringify({
          id: puzzle.curatedPuzzleId,
          rating,
          comment,
          moves: puzzle.moves,
        }),
      })
      const json = (await resp.json()) as ResponseJson
      if (json.message != 'Puzzle updated') throw new Error(json.message)
      return json
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!puzzle) throw new Error('No puzzle selected')
      const resp = await fetch('/api/admin/curated-sets/curatedPuzzle', {
        method: 'DELETE',
        body: JSON.stringify({ id: puzzle.curatedPuzzleId }),
      })
      const json = (await resp.json()) as ResponseJson
      if (json?.message != 'Puzzle deleted') throw new Error(json.message)
      return json
    },
  })

  const PgnDisplay = game.history().map((move, index) => {
    const moveNumber = Math.floor(index / 2) + 1 + game.moveNumber()
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
    return (
      <button
        key={'btn' + moveNumber.toString() + move + moveColour}
        className="h-max max-h-fit bg-none px-1 py-1 hover:bg-purple-800 hover:text-white"
        onClick={() => {
          const newGame = new Chess(puzzle!.fen)
          for (let i = 0; i <= index; i++) {
            newGame.move(game.history()[i]!)
          }
          setPosition(newGame.fen())
        }}
      >
        <FlexText />
      </button>
    )
  })

  return (
    <div className="flex">
      <ChessBoard
        game={game}
        position={position}
        orientation={getOrientation(puzzle)}
        readyForInput={readyForInput}
        soundEnabled={true}
        additionalSquares={{}}
        additionalArrows={[]}
        enableArrows={false}
        enableHighlights={false}
        moveMade={null}
      />
      {puzzle && (
        <div className="flex flex-row">
          {/* PGN Display */}
          <div className="flex flex-1 h-full flex-wrap content-start gap-1 border lg:border-4 border-purple-700 p-2 bg-purple-700 bg-opacity-20 text-black ">
            <button
              className="h-max max-h-fit bg-none p-1 hover:bg-purple-800 hover:text-white"
              onClick={() => {
                setPosition(puzzle!.fen)
              }}
            >
              Start
            </button>
            {PgnDisplay.map((item) => item)}
          </div>

          {mode === 'list' && (
            <div className="flex flex-1 flex-col gap-2 border lg:border-4 border-purple-700 p-2 bg-purple-700 bg-opacity-20 text-black ">
              <>
                {/* Puzzle Details Editor */}
                <div>
                  <label htmlFor="rating">Puzzle Rating</label>
                  <input
                    className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild={true}>
                      <label htmlFor="rating">Puzzle Comment</label>
                    </TooltipTrigger>
                    <TooltipContent>
                      This is the comment that will be displayed to the user if
                      they get it wrong
                    </TooltipContent>
                  </Tooltip>
                  <textarea
                    className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
                    value={comment}
                    rows={5}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <Button
                    variant="primary"
                    onClick={() => saveMutation.mutate()}
                    disabled={saveMutation.isPending || puzzle === undefined}
                  >
                    {saveMutation.isPending ? (
                      <>
                        Saving... <Spinner />
                      </>
                    ) : (
                      'Save'
                    )}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (
                        confirm('Are you sure you want to delete this puzzle?')
                      )
                        deleteMutation.mutate()
                    }}
                    disabled={deleteMutation.isPending || puzzle === undefined}
                  >
                    {deleteMutation.isPending ? (
                      <>
                        Deleting... <Spinner />
                      </>
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </div>
                {saveMutation.isError && (
                  <p className="text-red-500">{saveMutation.error.message}</p>
                )}
                {deleteMutation.isError && (
                  <p className="text-red-500">{deleteMutation.error.message}</p>
                )}
              </>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
