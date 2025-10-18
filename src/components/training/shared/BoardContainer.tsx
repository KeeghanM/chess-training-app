'use client'

import { type ReactNode, useEffect, useRef } from 'react'

interface BoardContainerProps {
  children: ReactNode
}

/**
 * A resizable container for chess boards that maintains consistent styling
 * across all trainers. Provides the card background and resize functionality
 * without the move validation logic of the full ChessBoard component.
 */
export default function BoardContainer({ children }: BoardContainerProps) {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!divRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLDivElement
        el.style.width = `${el.offsetHeight}px`

        if (el.offsetHeight > el.offsetWidth) {
          el.style.maxHeight = `${el.offsetWidth}px`
        }
      }
    })

    resizeObserver.observe(divRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div
      ref={divRef}
      className="relative resize-y overflow-auto p-4 bg-card-light/20 rounded-lg min-h-[300px]"
    >
      {children}
    </div>
  )
}
