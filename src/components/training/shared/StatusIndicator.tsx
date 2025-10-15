import Link from 'next/link'
import { ExternalLink, ThumbsDown, ThumbsUp } from 'lucide-react'

interface StatusIndicatorProps {
  status: 'none' | 'correct' | 'incorrect'
  orientation?: 'white' | 'black'
  puzzleId?: string
}

export default function StatusIndicator({
  status,
  orientation,
  puzzleId,
}: StatusIndicatorProps) {
  if (status === 'none' && orientation) {
    return (
      <div className="flex items-center gap-2 text-black bg-card-dark rounded-lg w-fit py-1 px-2 shadow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className={
            orientation === 'white'
              ? 'text-white'
              : 'rotate-180 transform text-black'
          }
        >
          <path fill="currentColor" d="M1 21h22L12 2" />
        </svg>
        {orientation === 'white' ? 'White' : 'Black'} to move
      </div>
    )
  }

  if (status === 'correct') {
    return (
      <div className="flex items-center gap-2">
        <ThumbsUp className="text-lime-500" />
        <p>Correct!</p>
        {puzzleId && (
          <Link
            href={`https://lichess.org/training/${puzzleId}`}
            target="_blank"
          >
            <span className="flex flex-row items-center gap-1 text-sm text-black underline">
              Lichess
              <ExternalLink />
            </span>
          </Link>
        )}
      </div>
    )
  }

  if (status === 'incorrect') {
    return (
      <div className="flex items-center gap-2">
        <ThumbsDown className="text-red-500" />
        <p>Incorrect!</p>
        {puzzleId && (
          <Link
            href={`https://lichess.org/training/${puzzleId}`}
            target="_blank"
          >
            <span className="flex flex-row items-center gap-1 text-sm text-black underline">
              Lichess
              <ExternalLink />
            </span>
          </Link>
        )}
      </div>
    )
  }

  return null
}
