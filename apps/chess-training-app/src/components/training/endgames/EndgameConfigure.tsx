import Button from '@components/_elements/button'

import trackEventOnClient from '@utils/track-event-on-client'

type EndgameConfigureProps = {
  type: 'Queen' | 'Rook' | 'Knight' | 'Bishop' | 'Pawn' | 'All'
  setType: (
    type: 'Queen' | 'Rook' | 'Knight' | 'Bishop' | 'Pawn' | 'All',
  ) => void
  rating: number
  setRating: (rating: number) => void
  difficulty: number
  setDifficulty: (difficulty: number) => void
  onStartTraining: () => void
  error?: string
}

/**
 * EndgameConfigure Component
 *
 * Allows the user to configure settings for endgame training,
 * including rating, difficulty, and piece type.
 */
export default function EndgameConfigure({
  type,
  setType,
  rating,
  setRating,
  difficulty,
  setDifficulty,
  onStartTraining,
  error,
}: EndgameConfigureProps) {
  return (
    <div className="p-4 bg-card-light/20 rounded-lg">
      <div className="p-4 bg-card rounded-lg space-y-4">
        <div>
          <p className="font-bold mb-2">Your Rating</p>
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
          <p className="font-bold mb-2">Difficulty</p>
          <div className="flex gap-4 flex-row max-w-md">
            <Button
              {...(difficulty == 0 ? { variant: 'accent' } : {})}
              onClick={() => setDifficulty(0)}
            >
              Easy
            </Button>
            <Button
              {...(difficulty == 1 ? { variant: 'accent' } : {})}
              onClick={() => setDifficulty(1)}
            >
              Medium
            </Button>
            <Button
              {...(difficulty == 2 ? { variant: 'accent' } : {})}
              onClick={() => setDifficulty(2)}
            >
              Hard
            </Button>
          </div>
        </div>
        <div>
          <p className="font-bold mb-2">Endgame Type</p>
          <div className="flex flex-wrap gap-2">
            <div>
              <Button
                {...(type == 'All' ? { variant: 'accent' } : {})}
                onClick={() => setType('All')}
              >
                All
              </Button>
            </div>
            <div>
              <Button
                {...(type == 'Queen' ? { variant: 'accent' } : {})}
                onClick={() => setType('Queen')}
              >
                Queen
              </Button>
            </div>
            <div>
              <Button
                {...(type == 'Rook' ? { variant: 'accent' } : {})}
                onClick={() => setType('Rook')}
              >
                Rook
              </Button>
            </div>
            <div>
              <Button
                {...(type == 'Bishop' ? { variant: 'accent' } : {})}
                onClick={() => setType('Bishop')}
              >
                Bishop
              </Button>
            </div>
            <div>
              <Button
                {...(type == 'Knight' ? { variant: 'accent' } : {})}
                onClick={() => setType('Knight')}
              >
                Knight
              </Button>
            </div>
            <div>
              <Button
                {...(type == 'Pawn' ? { variant: 'accent' } : {})}
                onClick={() => setType('Pawn')}
              >
                Pawn
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            onStartTraining()
            trackEventOnClient('endgame_start', {})
          }}
        >
          Start Training
        </Button>
        {error && <p className="bg-red-500 italic text-sm p-2 ">{error}</p>}
      </div>
    </div>
  )
}
