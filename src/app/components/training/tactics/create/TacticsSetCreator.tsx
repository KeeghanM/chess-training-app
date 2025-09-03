'use client'

import { useState } from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import type { TacticsSet, TacticsSetRound } from '@prisma/client'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Sentry from '@sentry/nextjs'
import Select from 'react-select'
import type { ResponseJson } from '~/app/api/responses'

import Button from '~/app/components/_elements/button'
import StyledLink from '~/app/components/_elements/styledLink'
import GetPremiumButton from '~/app/components/ecomm/GetPremiumButton'
import Spinner from '~/app/components/general/Spinner'
import type { TrainingPuzzle } from '~/app/components/training/tactics/TacticsTrainer'

import trackEventOnClient from '~/app/_util/trackEventOnClient'

export type PrismaTacticsSet = TacticsSet & { rounds: TacticsSetRound[] }
interface TacticsSetCreatorProps {
  setCount: number
  maxSets: number
  loading: boolean
  setCreated: (set: PrismaTacticsSet) => void
  hasUnlimitedSets: boolean
}
export default function TacticsSetCreator(props: TacticsSetCreatorProps) {
  const { user } = useKindeBrowserClient()
  const { setCount, maxSets, setCreated, hasUnlimitedSets } = props
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [size, setSize] = useState(300)
  const [themesList, setThemesList] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState(1)
  const [rating, setRating] = useState(1500)
  const options = [
    { value: 'pin', label: 'Pin' },
    { value: 'fork', label: 'Fork' },
    { value: 'skewer', label: 'Skewer' },
    { value: 'xRayAttack', label: 'X-Ray' },
    { value: 'discoveredAttack', label: 'Discovered attack' },
    { value: 'sacrifice', label: 'Sacrifice' },
    { value: 'attraction', label: 'Attraction' },
    { value: 'deflection', label: 'Deflection' },
    { value: 'interference', label: 'Interference' },
    { value: 'clearance', label: 'Clearance' },
    { value: 'capturingDefender', label: 'Capture the defender' },
    { value: 'intermezzo', label: 'Intermezzo' },
    { value: 'zugzwang', label: 'Zugzwang' },
    { value: 'quietMove', label: 'Quiet move' },
    { value: 'defensiveMove', label: 'Defensive move' },
    { value: 'opening', label: 'Opening' },
    { value: 'middlegame', label: 'Middlegame' },
    { value: 'endgame', label: 'Endgame' },
    { value: 'mate', label: 'Checkmate' },
    { value: 'enPassant', label: 'En Passant' },
  ]

  const difficultyAdjuster = (d: number) => {
    return d == 0 ? 0.9 : d == 1 ? 1 : 1.2
  }
  const GetPuzzlesForSet = async (
    rating: number,
    count: number,
    themes: string[],
  ) => {
    const params: {
      rating: string
      count: string
      themesType: 'ONE' | 'ALL'
      themes?: string
    } = {
      rating: Math.round(rating * difficultyAdjuster(difficulty)).toString(),
      count: count.toString(),
      themesType: 'ONE',
    }
    if (themes.length > 0) {
      params.themes = JSON.stringify(themes)
    }

    try {
      const resp = await fetch('/api/puzzles/getPuzzles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const json = (await resp.json()) as ResponseJson
      if (json.message != 'Puzzles found') throw new Error(json.message)

      const puzzles = json.data?.puzzles as TrainingPuzzle[]
      if (!puzzles || puzzles.length == 0) throw new Error('No puzzles found')

      return puzzles as {
        puzzleid: string
        fen: string
        moves: string[]
        rating: number
        themes: string[]
      }[]
    } catch (e) {
      Sentry.captureException(e)
      return []
    }
  }
  const resetForm = () => {
    setName('')
    setSize(300)
    setRating(1500)
    setDifficulty(1)
    setThemesList([])
    setError('')
    setMessage('')
    setLoading(false)
  }
  const validForm = () => {
    setError('')
    setMessage('')

    if (name.length < 5) {
      setMessage('Name must be at least 5 characters')
      return false
    }
    if (name.length > 150) {
      setMessage('Name must be below 150 characters')
      return false
    }
    // Regex to check for potentially risky special chars
    const regex = /[@?#%^\*]/g
    if (regex.test(name)) {
      setMessage('Name must not include special characters')
      return false
    }
    if (rating < 500 || rating > 3000) {
      setMessage('Rating must be between 500 & 3000')
      return false
    }
    if (size < 20 || size > 500) {
      setMessage('Set must be between 20 & 500 Puzzles')
      return false
    }

    return true
  }
  const createSet = async () => {
    setLoading(true)
    if (!validForm()) {
      setLoading(false)
      return
    }

    const puzzles = await GetPuzzlesForSet(rating, size, themesList)
    if (!puzzles || puzzles.length == 0) {
      setError('No puzzles found')
      setLoading(false)
      return
    }

    const puzzleIds = puzzles.map((puzzle) => {
      return { puzzleid: puzzle.puzzleid }
    })

    try {
      if (!user) throw new Error('Not logged in')
      const resp = await fetch('/api/tactics/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          puzzleIds,
          rating,
        }),
      })
      const json = (await resp.json()) as ResponseJson

      if (json.message != 'Set Created') {
        setError('Oops! Something went wrong: ' + json?.message)
        return
      }

      const set = json.data?.set as PrismaTacticsSet | undefined
      if (!set) {
        throw new Error('Something went wrong')
      }

      trackEventOnClient('create_tactics_set_success', {
        setName: name,
        setSize: puzzleIds.length.toString(),
        themesList: themesList.join(','),
        rating: rating.toString(),
        difficulty:
          difficulty == 0 ? 'Easy' : difficulty == 1 ? 'Medium' : 'Hard',
      })
      resetForm()
      setCreated(set)
      setOpen(false)
    } catch (e) {
      Sentry.captureException(e)
    }
  }

  const close = async () => {
    resetForm()
    setOpen(false)
  }

  return (
    <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4">
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <Button
          variant="primary"
          onClick={() => {
            setOpen(true)
            trackEventOnClient('create_tactics_set_opened', {})
          }}
          className="flex items-center gap-2 bg-purple-700 px-4 py-2 text-white hover:bg-purple-600"
        >
          <p>Create New Set</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
            />
          </svg>
        </Button>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]"
            onClick={close}
          />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-4 shadow-md md:p-6">
            <AlertDialog.Title className="text-lg font-bold text-purple-700">
              Create a new Tactics Set
            </AlertDialog.Title>
            {hasUnlimitedSets || setCount < maxSets ? (
              <>
                <div className="mb-4 flex flex-col gap-2">
                  <div className="">
                    <label>Set Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
                      value={name}
                      onInput={(e) => {
                        setName(e.currentTarget.value)
                      }}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="">Set Size</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
                      min={'20'}
                      max={'500'}
                      value={size}
                      onChange={(e) => {
                        setSize(parseInt(e.currentTarget.value))
                      }}
                    />
                    <p className="text-sm italic">
                      300 is recommended for maximal effect, but lower numbers
                      will make for faster training
                    </p>
                  </div>
                  <div className="">
                    <label>Your Rating</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
                      min={'500'}
                      max={'3000'}
                      step={'10'}
                      value={rating}
                      onInput={(e) => {
                        setRating(parseInt(e.currentTarget.value))
                      }}
                    />
                  </div>
                  <div className="">
                    <label>Difficulty</label>
                    <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                      <Button
                        variant={difficulty == 0 ? 'success' : 'accent'}
                        onClick={() => setDifficulty(0)}
                      >
                        Easy
                      </Button>
                      <Button
                        variant={difficulty == 1 ? 'success' : 'accent'}
                        onClick={() => setDifficulty(1)}
                      >
                        Medium
                      </Button>
                      <Button
                        variant={difficulty == 2 ? 'success' : 'accent'}
                        onClick={() => setDifficulty(2)}
                      >
                        Hard
                      </Button>
                    </div>
                  </div>
                  <div className="">
                    <label>Themes to include</label>
                    <Select
                      className="bg-gray-100 text-black"
                      defaultValue={[]}
                      isMulti
                      name={'themes'}
                      // @ts-expect-error - react-select types are wrong
                      options={options}
                      onChange={(e) => {
                        const themes = e.map(
                          (theme: { label: string; value: string }) =>
                            theme.value,
                        )
                        setThemesList(themes)
                      }}
                    />
                    <p className="text-sm italic">
                      Leave blank for a random mix of all
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="primary"
                    onClick={async () => await createSet()}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        Creating <Spinner />
                      </>
                    ) : (
                      'Create'
                    )}
                  </Button>
                  <Button variant="secondary" onClick={close}>
                    Cancel
                  </Button>
                </div>
                {message && <p className="italic text-red-500">{message}</p>}
                {error && <p className="italic text-red-500">{error}</p>}
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <p>
                  You have reached the maximum number of sets ({maxSets}) you
                  can create as a free user.
                </p>
                <p className="italic">
                  Either delete some of your existing sets or upgrade to
                  premium.
                </p>
                <p className="font-bold p-4 rounded bg-green-200">
                  It's only £2.99/month to upgrade to premium!{' '}
                  <StyledLink href="/premium">Learn more.</StyledLink>
                </p>
                <p>
                  You get both unlimited tactics sets and openings courses plus
                  a <strong>5%</strong> discount on all products.
                </p>
                <GetPremiumButton />
                <Button variant="secondary" onClick={close}>
                  Cancel
                </Button>
              </div>
            )}
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  )
}
