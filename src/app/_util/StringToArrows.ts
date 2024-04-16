import type { Arrow } from 'react-chessboard/dist/chessboard/types'

export default function getArrows(arrowString: string) {
  const moveArrows = arrowString.split(',')
  const getColour = (code: string) => {
    switch (code) {
      case 'G':
        return 'green'
      case 'R':
        return 'red'
      case 'Y':
        return 'yellow'
      case 'B':
        return 'blue'
      case 'O':
        return 'orange'
      default:
        return 'green'
    }
  }
  const newArrows = moveArrows.map((arrow) => {
    const colour = getColour(arrow.charAt(0))
    const from = arrow.charAt(1) + arrow.charAt(2)
    const to = arrow.charAt(3) + arrow.charAt(4)
    return [from, to, colour] as Arrow
  })

  return newArrows
}
