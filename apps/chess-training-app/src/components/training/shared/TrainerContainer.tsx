import { ReactNode } from 'react'

import Spinner from '@components/general/Spinner'

type TrainerContainerProps = {
  loading?: boolean
  children: ReactNode
}

export default function TrainerContainer({
  loading,
  children,
}: TrainerContainerProps) {
  return (
    <div className="relative border border-gray-300 text-black shadow-md bg-[rgba(0,0,0,0.03)]">
      {loading && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.3)]">
          <Spinner />
        </div>
      )}
      {children}
    </div>
  )
}
