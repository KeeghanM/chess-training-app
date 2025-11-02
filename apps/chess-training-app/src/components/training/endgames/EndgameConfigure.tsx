import Button from '@components/_elements/button'
import trackEventOnClient from '@utils/trackEventOnClient'

interface EndgameConfigureProps {
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
        <div>
          <p className="font-bold mb-2">Endgame Type</p>
          <div className="flex flex-wrap gap-2">
            <div>
              <Button
                variant={type == 'All' ? 'accent' : undefined}
                onClick={() => setType('All')}
              >
                All
              </Button>
            </div>
            <div>
              <Button
                variant={type == 'Queen' ? 'accent' : undefined}
                onClick={() => setType('Queen')}
              >
                Queen
              </Button>
            </div>
            <div>
              <Button
                variant={type == 'Rook' ? 'accent' : undefined}
                onClick={() => setType('Rook')}
              >
                Rook
              </Button>
            </div>
            <div>
              <Button
                variant={type == 'Bishop' ? 'accent' : undefined}
                onClick={() => setType('Bishop')}
              >
                Bishop
              </Button>
            </div>
            <div>
              <Button
                variant={type == 'Knight' ? 'accent' : undefined}
                onClick={() => setType('Knight')}
              >
                Knight
              </Button>
            </div>
            <div>
              <Button
                variant={type == 'Pawn' ? 'accent' : undefined}
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
