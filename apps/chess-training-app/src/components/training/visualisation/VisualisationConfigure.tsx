import { useState } from 'react'

import { ArrowDownCircle, ArrowRightCircle } from 'lucide-react'

import Button from '@components/_elements/button'

import trackEventOnClient from '@utils/track-event-on-client'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../_elements/tooltip'

interface VisualisationConfigureProps {
  rating: number
  setRating: (rating: number) => void
  difficulty: number
  setDifficulty: (difficulty: number) => void
  length: number
  setLength: (length: number) => void
  onStartTraining: () => void
  error?: string
}

export default function VisualisationConfigure({
  rating,
  setRating,
  difficulty,
  setDifficulty,
  length,
  setLength,
  onStartTraining,
  error,
}: VisualisationConfigureProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4 bg-card-light/20 rounded-lg">
      <div className="p-4 bg-card rounded-lg">
        <button
          className="flex gap-2 items-center text-xl font-bold hover:text-primary cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          How to Use
          {!open ? <ArrowRightCircle /> : <ArrowDownCircle />}
        </button>
        <ul className="list-inside list-disc" hidden={!open}>
          <li>
            Set your desired rating and difficulty level using the controls
            below.
          </li>
          <li>Click "Start Training" to begin a puzzle.</li>
          <li>The board will show the starting position of the puzzle.</li>
          <li>
            A list of moves, starting with your opponent's move, will be
            displayed beside the board.
          </li>
          <li>
            Your task is to visualize the position after all the moves have been
            played.
          </li>
          <li>
            Finally, once you have it - click the squares to indicate where the
            last move <em>should</em> be played.
          </li>
        </ul>
        <div className="flex flex-col gap-4 mt-4">
          <div className="max-w-md">
            <label className="font-bold ">Your Rating</label>
            <input
              type="number"
              className="w-full border border-gray-300 bg-gray-100 px-4 py-1 text-black"
              min="500"
              max="3000"
              step="10"
              value={rating}
              onInput={(e) => {
                setRating(parseInt(e.currentTarget.value))
              }}
            />
          </div>
          <div className="max-w-md">
            <label className="font-bold ">Difficulty</label>
            <div className="flex flex-row gap-4">
              <Button
                variant={difficulty == 0 ? 'accent' : undefined}
                onClick={() => setDifficulty(0)}
              >
                Easy
              </Button>
              <Button
                variant={difficulty == 1 ? 'accent' : undefined}
                onClick={() => setDifficulty(1)}
              >
                Medium
              </Button>
              <Button
                variant={difficulty == 2 ? 'accent' : undefined}
                onClick={() => setDifficulty(2)}
              >
                Hard
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <Tooltip>
              <TooltipTrigger asChild={true}>
                <label className="font-bold ">Moves to visualise</label>
              </TooltipTrigger>
              <TooltipContent>
                This is the total moves to see, including yours and your
                opponents.
              </TooltipContent>
            </Tooltip>
            <select
              id="tooltip-1"
              className="w-fit border border-gray-300 px-4 py-1 bg-gray-100 text-black"
              value={length}
              onChange={(e) => setLength(parseInt(e.currentTarget.value))}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
            </select>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              onStartTraining()
              trackEventOnClient('Visualisation_start', {})
            }}
          >
            Start Training
          </Button>
          {error && <p className="bg-red-500 italic text-sm p-2 ">{error}</p>}
        </div>
      </div>
    </div>
  )
}
