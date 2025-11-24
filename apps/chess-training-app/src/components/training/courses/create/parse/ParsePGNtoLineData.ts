'use client'

import { type ParseTree, parse } from '@mliebelt/pgn-parser'

import ECO from './ecoCodes'

export type CleanMove = {
  notation: string
  turn: string
  comment?: string | undefined
  arrows?: string | undefined
}
export type Tags = Record<string, string>

export type Line = {
  tags: Tags
  moves: CleanMove[]
}

export function ParsePGNtoLineData(pgnString: string) {
  if (!pgnString) return null

  // Parse PGN String, and reject request if it is invalid
  const parsedLines = parse(pgnString, { startRule: 'games' }) as ParseTree[]
  // Now split out all the variations into separate lines
  const lines: Line[] = []

  for (const line of parsedLines) {
    const tags = line.tags as unknown as Tags
    recursiveParse([], line.moves, tags, lines)
  }

  // Map the lines to a specific and a general opening name
  for (const line of lines) {
    // Specific
    let id = ''
    for (const move of line.moves) {
      id += move.notation
      const openingName = ECO[id.toLowerCase()]
      if (openingName) {
        line.tags['Opening (Specific)'] = openingName
      }
    }

    // General (min 3 moves by both sides)
    id = ''
    let moveCount = 0
    for (const move of line.moves) {
      id += move.notation
      moveCount++
      const openingName = ECO[id.toLowerCase()]
      if (openingName) {
        line.tags['Opening (General)'] = openingName
      }
      if (moveCount >= 4) {
        break
      }
    }

    // We can also pick a "colour" for the line based on the last move
    const lastMove = line.moves[line.moves.length - 1]
    if (lastMove) {
      line.tags.Colour = lastMove.turn === 'w' ? 'White' : 'Black'
    }
  }

  // because we added things recursively, the order is backwards
  // Reversing here resets things to the original PGN Order
  lines.reverse()

  return lines
}

function recursiveParse(
  movesSoFar: CleanMove[],
  newMoves: ParseTree['moves'],
  tags: Record<string, string>,
  outputArray: Line[],
) {
  const movesList = JSON.parse(JSON.stringify(movesSoFar)) as CleanMove[] // Deep Clone the array
  const clonedTags = JSON.parse(JSON.stringify(tags)) as Record<string, string> // Deep Clone the tags

  for (const move of newMoves) {
    for (const variation of move.variations) {
      recursiveParse(movesList, variation, clonedTags, outputArray)
    }
    const cleanMove: CleanMove = {
      notation: move.notation.notation,
      turn: move.turn,
      comment: move.commentDiag?.comment?.trim() ?? undefined,
      arrows: move.commentDiag?.colorArrows?.join(',') ?? undefined,
    }
    movesList.push(cleanMove)
  }
  const line = {
    tags: clonedTags,
    moves: movesList,
  }
  outputArray.push(line)
}
