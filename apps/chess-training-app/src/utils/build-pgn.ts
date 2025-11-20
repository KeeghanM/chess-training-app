type LineMove = {
  notation: string
  number: number
  colour: boolean
  comment?: string
  arrows: string | null
  lineId: number
}

export type Move = {
  notation: string
  number: number
  colour: boolean
  variations: Move[][]
  comment?: string
  arrows: string | null
  lineId: number
}

export type PGN = {
  moves: Move[]
}

export default function buildPgn(lines: LineMove[][]): PGN {
  const pgn: PGN = { moves: [] }
  let lineToAddTo: Move[] = []

  for (const line of lines) {
    // Whenever we start a new line, we reset the lineToAddTo
    lineToAddTo = pgn.moves

    if (pgn.moves.length === 0) {
      // If this is the first line, we need to add all the moves
      line.forEach((move) => {
        pgn.moves.push({
          notation: move.notation,
          number: move.number,
          colour: move.colour,
          variations: [],
          comment: move.comment,
          arrows: move.arrows,
          lineId: move.lineId,
        })
      })

      // And move to the next line
      continue
    }

    // Go through each move in the line and decide if we need to add it or not
    // If there's a move already in the right position, but it's the wrong move, we then check the variations
    // If there is no variation with the right move, which is always in the first position, we add a new variation and reset the lineToAddTo to that variation
    // This is because we now only want to add moves to the variation, and we know everything before it has already been checked
    // If we ever find a match, i.e that move already exists in the right pos, we just move to the next move in the line
    for (const move of line) {
      let found = false
      for (const existingMove of lineToAddTo) {
        if (
          existingMove.number != move.number ||
          existingMove.colour != move.colour
        )
          continue

        // Here, we are at an existing move in the right position, but we need to check if it's the right notation
        // If it is, we just move to the next move in the line
        if (existingMove.notation === move.notation) {
          found = true
          break
        }

        // If it's not, we need to check the variations and see if the move is in the first position of any of them
        // If it is, we switch to that variation and move to the next move in the line
        // if it's not, we add a new variation and switch to that
        for (const variation of existingMove.variations) {
          if (variation[0]?.notation === move.notation) {
            lineToAddTo = variation
            found = true
            break
          }
        }

        // If we found the move in a variation, we move to the next move in the line
        if (found) break

        // If we reach this point, we know that the move is not in the first position of any variation
        // So we add a new variation and switch to that
        existingMove.variations.push([
          {
            notation: move.notation,
            number: move.number,
            colour: move.colour,
            variations: [],
            comment: move.comment,
            arrows: move.arrows,
            lineId: move.lineId,
          },
        ])

        lineToAddTo =
          existingMove.variations[existingMove.variations.length - 1]!
        found = true
        break
      }

      // If we haven't found the move in the right position, we add it to the current line
      if (!found) {
        lineToAddTo.push({
          notation: move.notation,
          number: move.number,
          colour: move.colour,
          variations: [],
          comment: move.comment,
          arrows: move.arrows,
          lineId: move.lineId,
        })
      }
    }
  }

  return pgn
}
