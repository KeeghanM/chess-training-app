'use client'

import { useContext, useEffect, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import Spinner from '@components/general/Spinner'

import type { ResponseJson } from '@utils/server-responses'

import {
  CuratedSetBrowserContext,
  type CuratedSetPuzzle,
} from '../CuratedSetsBrowser'
import CreateCustom from './CreateCustom'
import LiChessSearch from './LiChessSearch'

export default function PuzzleSearch() {
  const queryClient = useQueryClient()
  const { setPuzzle } = useContext(CuratedSetBrowserContext)
  const [mode, setMode] = useState<'LiChess' | 'Custom'>('LiChess')
  const [puzzles, setPuzzles] = useState<CuratedSetPuzzle[]>([])
  const [selectedPuzzle, setSelectedPuzzle] = useState<CuratedSetPuzzle>()

  const { isLoading } = useQuery({
    queryKey: ['puzzles'],
    queryFn: async () => {
      const response = await fetch('/api/admin/curated-sets/customPuzzle')
      const json = (await response.json()) as ResponseJson
      if (!json.data?.puzzles) return
      setPuzzles(json.data.puzzles as CuratedSetPuzzle[])
    },
  })

  useEffect(() => {
    if (mode === 'LiChess') {
      setPuzzles([])
    } else {
      queryClient.invalidateQueries({ queryKey: ['puzzles'] })
    }
  }, [mode])

  return (
    <div className="flex flex-1 flex-col gap-2 border lg:border-4 border-purple-700 p-2 bg-purple-700 bg-opacity-20 text-black  max-h-[70vh]">
      <div className="flex items-center justify-around text-sm">
        <p
          className={
            'font-bold text-white px-4 py-1 ' +
            (mode === 'LiChess'
              ? 'bg-green-500'
              : 'bg-gray-700 hover:bg-purple-600 cursor-pointer')
          }
          onClick={() => setMode('LiChess')}
        >
          LiChess
        </p>
        <p
          className={
            'font-bold text-white px-4 py-1 ' +
            (mode === 'Custom'
              ? 'bg-green-500'
              : 'bg-gray-700 hover:bg-purple-600 cursor-pointer')
          }
          onClick={() => setMode('Custom')}
        >
          Custom
        </p>
      </div>
      {mode === 'LiChess' ? (
        <LiChessSearch />
      ) : (
        <>
          <CreateCustom />
          {isLoading ? (
            <Spinner />
          ) : (
            <ul className="h-full max-h-[50vh] overflow-y-auto text-black">
              {puzzles.map((puzzle) => (
                <li
                  key={puzzle.puzzleid}
                  className={
                    'cursor-pointer bg-gray-50 border-b border-slate-500 hover:bg-orange-200 p-2 text-sm' +
                    (selectedPuzzle?.puzzleid == puzzle.puzzleid
                      ? ' bg-purple-200'
                      : '')
                  }
                  onClick={() => {
                    setSelectedPuzzle(puzzle)
                    setPuzzle(puzzle)
                  }}
                >
                  {puzzle.puzzleid} ({puzzle.rating} - {puzzle.moves.length} )
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
