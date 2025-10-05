import { ReactNode } from 'react'

export function RoundProgress({
  percentage,
  children,
}: {
  percentage: number
  children: ReactNode
}) {
  return (
    <div className="relative w-30">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200/5 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        {/* Progress circle */}
        <circle
          className="text-green-500 progress-ring__circle stroke-current"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="251.2"
          strokeDashoffset={`calc(251.2px - (251.2px * ${percentage}) / 100)`}
        ></circle>
        {/* Center text */}
        {children}
      </svg>
    </div>
  )
}

export function ProgressBar({
  percentage,
  children,
}: {
  percentage: number
  children?: ReactNode
}) {
  return (
    <div className="min-h-2 rounded-full w-full bg-bg/10 overflow-hidden relative">
      <div
        className="h-full bg-green-500 rounded-full absolute"
        style={{
          width: `${percentage}%`,
        }}
      ></div>
      <div className="relative mx-auto w-fit">{children}</div>
    </div>
  )
}
