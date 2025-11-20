import { Chess } from 'chess.js'

/**
 * Safely makes a move on a chess game without throwing errors
 */
export function makeMove(game: Chess, move: string): boolean {
  try {
    game.move(move)
    return true
  } catch {
    // Suppress premove/chess.js errors that don't affect functionality
    return false
  }
}

/**
 * Shows a sequence of moves with delays
 */
export async function showMoveSequence(
  _game: Chess,
  moves: string[],
  startIndex: number,
  onMove: (move: string) => void,
  delay = 1000,
): Promise<void> {
  const timeouts = []
  let counter = 0

  for (let i = startIndex; i < moves.length; i++) {
    counter++
    const move = moves[i]
    if (!move) continue

    const timeoutPromise = new Promise<void>((resolve) => {
      setTimeout(
        () => {
          onMove(move)
          resolve()
        },
        delay * counter + 200,
      )
    })

    timeouts.push(timeoutPromise)
  }

  await Promise.all(timeouts)
}
