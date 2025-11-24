import { fireEvent, render, screen } from '@testing-library/react'
import { Chess } from 'chess.js'

import ChessBoard from '../ChessBoard'

// Mock use-sound
jest.mock('use-sound', () => {
  return jest.fn(() => [jest.fn(), { stop: jest.fn() }])
})

// Mock react-chessboard
jest.mock('react-chessboard', () => ({
  Chessboard: ({ options }: { options: any }) => (
    <div data-testid="chessboard-board">
      {['e2', 'e4', 'a7', 'a8'].map((sq) => (
        <div
          key={sq}
          data-square={sq}
          onClick={() => options.onSquareClick({ square: sq })}
        />
      ))}
    </div>
  ),
  defaultPieces: {
    wQ: () => <span>Queen</span>,
    wR: () => <span>Rook</span>,
    wB: () => <span>Bishop</span>,
    wN: () => <span>Knight</span>,
    bQ: () => <span>Queen</span>,
    bR: () => <span>Rook</span>,
    bB: () => <span>Bishop</span>,
    bN: () => <span>Knight</span>,
  },
}))

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('ChessBoard', () => {
  const defaultProps = {
    game: new Chess(),
    position: 'start',
    orientation: 'white' as const,
    readyForInput: true,
    soundEnabled: false,
    additionalSquares: {},
    additionalArrows: [],
    enableArrows: true,
    enableHighlights: true,
    moveMade: jest.fn(),
  }

  it('renders the chessboard', () => {
    render(<ChessBoard {...defaultProps} />)
    const board = screen.getByTestId('chessboard-board')
    expect(board).toBeInTheDocument()
  })

  it('allows making a move', async () => {
    const moveMade = jest.fn()
    const { container } = render(
      <ChessBoard {...defaultProps} moveMade={moveMade} />,
    )

    // e2 to e4
    const e2 = container.querySelector('[data-square="e2"]')
    const e4 = container.querySelector('[data-square="e4"]')

    expect(e2).toBeInTheDocument()
    expect(e4).toBeInTheDocument()

    // Click source
    fireEvent.click(e2!) // Click the piece
    // Click target
    fireEvent.click(e4!)

    expect(moveMade).toHaveBeenCalled()
  })

  it('handles promotion', async () => {
    const game = new Chess('7k/P7/8/8/8/8/8/7K w - - 0 1')
    const moveMade = jest.fn()

    const { container } = render(
      <ChessBoard
        {...defaultProps}
        game={game}
        position={game.fen()}
        moveMade={moveMade}
      />,
    )

    const a7 = container.querySelector('[data-square="a7"]')
    const a8 = container.querySelector('[data-square="a8"]')

    expect(a7).toBeInTheDocument()
    expect(a8).toBeInTheDocument()

    // Click pawn
    fireEvent.click(a7!)
    // Click promotion square
    fireEvent.click(a8!)

    // Promotion dialog should appear
    const queenButton = screen.getByRole('button', {
      name: /promote to queen/i,
    })
    expect(queenButton).toBeInTheDocument()

    // Click queen
    fireEvent.click(queenButton)

    expect(moveMade).toHaveBeenCalled()
  })
})
