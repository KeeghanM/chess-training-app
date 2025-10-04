'use client'

import { createContext, useEffect, useState } from 'react'

import type { CuratedSet } from '@prisma/client'
import 'react-toggle/style.css'

import Button from '~/app/components/_elements/button'
import Heading from '~/app/components/_elements/heading'
import type { TrainingPuzzle } from '~/app/components/training/tactics/TacticsTrainer'

import AddToSet from './AddToSet'
import PuzzleDisplay from './PuzzleDisplay'
import PuzzleList from './PuzzleList'
import SetEditor from './SetEditor'
import SetSelector from './SetSelector'
import PuzzleSearch from './puzzleSearch/PuzzleSearch'

export type CuratedSetPuzzle = TrainingPuzzle & { curatedPuzzleId: number }

type Modes = 'list' | 'search' | 'edit'
interface ICuratedSetBrowserContext {
  sets: CuratedSet[]
  selectedSet: CuratedSet | undefined
  setSelectedSet: (set: CuratedSet) => void
  puzzle: CuratedSetPuzzle | undefined
  setPuzzle: (puzzle: CuratedSetPuzzle) => void
  mode: Modes
  setMode: (mode: Modes) => void
}
export const CuratedSetBrowserContext =
  createContext<ICuratedSetBrowserContext>({
    sets: [],
    selectedSet: undefined,
    setSelectedSet: () => {},
    puzzle: undefined,
    setPuzzle: () => {},
    mode: 'edit',
    setMode: () => {},
  })

export default function CuratedSetsBrowser({ sets }: { sets: CuratedSet[] }) {
  const [puzzle, setPuzzle] = useState<CuratedSetPuzzle>()
  const [selectedSet, setSelectedSet] = useState<CuratedSet>()
  const [mode, setMode] = useState<Modes>('edit')

  useEffect(() => {
    setPuzzle(undefined)
  }, [selectedSet, mode])

  return (
    <CuratedSetBrowserContext.Provider
      value={{
        sets,
        selectedSet,
        setSelectedSet,
        puzzle,
        setPuzzle,
        mode,
        setMode,
      }}
    >
      {!selectedSet ? (
        <SetSelector />
      ) : (
        <>
          <div className="flex items-center justify-center gap-4">
            <Heading as={'h1'}>"{selectedSet.name}"</Heading>
            <Button variant="danger" onClick={() => setSelectedSet(undefined)}>
              Close
            </Button>
          </div>
          <div className="grid grid-cols-[350px_1fr]">
            {/* FIRST COLUMN */}
            <div className="">
              <div className="flex items-center justify-around text-sm">
                <p
                  className={
                    'font-bold text-white px-4 py-1 ' +
                    (mode === 'search'
                      ? 'bg-green-500'
                      : 'bg-gray-700 hover:bg-purple-600 cursor-pointer')
                  }
                  onClick={() => setMode('search')}
                >
                  Add New
                </p>
                <p
                  className={
                    'font-bold text-white px-4 py-1 ' +
                    (mode === 'list'
                      ? 'bg-green-500'
                      : 'bg-gray-700 hover:bg-purple-600 cursor-pointer')
                  }
                  onClick={() => setMode('list')}
                >
                  List Puzzles
                </p>
                <p
                  className={
                    'font-bold text-white px-4 py-1 ' +
                    (mode === 'edit'
                      ? 'bg-green-500'
                      : 'bg-gray-700 hover:bg-purple-600 cursor-pointer')
                  }
                  onClick={() => setMode('edit')}
                >
                  Edit Set
                </p>
              </div>
              {mode === 'list' && <PuzzleList />}
              {mode === 'search' && (
                <>
                  <PuzzleSearch />
                  <AddToSet />
                </>
              )}
            </div>

            {/* SECOND COLUMN */}
            {mode === 'edit' ? <SetEditor /> : <PuzzleDisplay />}
          </div>
        </>
      )}
    </CuratedSetBrowserContext.Provider>
  )
}
