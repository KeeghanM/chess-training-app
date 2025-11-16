'use client'

import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import type { ParseTree } from '@mliebelt/pgn-parser'
import { parse } from '@mliebelt/pgn-parser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'
import type { ResponseJson } from '~/app/api/responses'

export default function CreateCustom() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async () => {
      const pgn = prompt('Enter PGN(s) to import')
      if (!pgn) return
      const directStart =
        prompt('Are the first moves the player to move? (y/n)') === 'y'

      const parsed = parse(pgn, { startRule: 'games' }) as ParseTree[]
      const puzzles: {
        id: string
        fen: string
        moves: string
        rating: number
        comment: string
        directStart: boolean
      }[] = []
      // Check all games have a FEN
      for (const game of parsed) {
        if (!game.tags?.FEN) {
          alert('All games must have a FEN')
          return
        }
      }

      parsed.map((game) =>
        puzzles.push({
          id: 'cta_' + uuidv4().split('-')[4],
          fen: game.tags!.FEN,
          moves: game.moves.map((m) => m.notation.notation).join(','),
          rating: 1500,
          comment: game.gameComment?.comment ?? '',
          directStart: directStart,
        }),
      )

      // Send to database
      const response = await fetch('/api/admin/curated-sets/customPuzzle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puzzles }),
      })
      const json = (await response.json()) as ResponseJson
      if (json?.message != 'Puzzles created')
        throw new Error(json?.message ?? 'Error importing puzzles')

      queryClient.invalidateQueries({ queryKey: ['puzzles'] })
    },
  })

  return (
    <>
      <Button
        variant="primary"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <>
            Importing... <Spinner />
          </>
        ) : (
          'Import Custom Puzzle(s)'
        )}
      </Button>
      {mutation.isError && (
        <p className="text-red-500">{mutation.error.message}</p>
      )}
    </>
  )
}
