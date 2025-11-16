'use client'

import { useContext } from 'react'

import { useAdminQueries } from '@hooks/use-admin-queries'

import Spinner from '../../general/Spinner'
import { CuratedSetBrowserContext } from './CuratedSetsBrowser'

export default function PuzzleList() {
  const { useCuratedSetPuzzlesQuery } = useAdminQueries()
  const { selectedSet, puzzle, setPuzzle } = useContext(
    CuratedSetBrowserContext,
  )

  const {
    data: puzzles = [],
    isLoading,
    error,
  } = useCuratedSetPuzzlesQuery(selectedSet?.id || null)

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-2 border lg:border-4 border-purple-700 p-2 bg-purple-700 bg-opacity-20 max-h-[70vh]">
        <p className="text-red-500">Error loading puzzles: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-2 border lg:border-4 border-purple-700 p-2 bg-purple-700 bg-opacity-20 max-h-[70vh]">
      <ul className="h-full max-h-[50vh] overflow-y-auto text-black">
        {isLoading ? (
          <Spinner />
        ) : (
          puzzles
            .sort((a, b) => {
              // Sort order then puzzleId
              if (a.sortOrder != b.sortOrder)
                return (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
              return a.puzzleid.localeCompare(b.puzzleid)
            })
            .map((p) => (
              <li
                key={p.puzzleid}
                className={
                  'cursor-pointer bg-gray-50 border-b border-slate-500 hover:bg-orange-200 p-2 text-sm' +
                  (puzzle?.puzzleid === p.puzzleid ? ' bg-purple-200' : '')
                }
                onClick={() => setPuzzle(p)}
              >
                {p.puzzleid} ({p.rating} - {p.moves.length} moves)
              </li>
            ))
        )}
      </ul>
    </div>
  )
}
