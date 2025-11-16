import { ReactNode } from 'react'

interface TrainerHeaderProps {
  children: ReactNode
}

export default function TrainerHeader({ children }: TrainerHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between px-2 py-1 border-b border-gray-300 font-bold text-orange-500">
      {children}
    </div>
  )
}
