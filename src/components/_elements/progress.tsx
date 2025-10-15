import { ReactNode } from 'react'

export type ProgressPercentage = {
  percentage: number
  color: string
}
export function RoundProgress({
  percentages,
  children,
  bgColor,
  width,
}: {
  children?: ReactNode
  percentages: ProgressPercentage[]
  bgColor?: string
  width?: string
}) {
  const CICUMFERENCE = 251.33
  const STROKE_WIDTH = 10
  const GAP = 12
  let accumulator = 0

  return (
    <div className={`relative ${width ? width : 'w-30'}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className={`${bgColor ? bgColor : 'text-gray-200/5'} stroke-current`}
          strokeWidth={STROKE_WIDTH}
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        {/* Progress arcs */}
        {percentages.map((p, i) => {
          const percentageDecimal = p.percentage / 100
          accumulator += percentageDecimal

          return i === 0 ? (
            <circle
              key={`progress-${i}`}
              className={`${p.color} progress-ring__circle stroke-current`}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray={`${CICUMFERENCE * percentageDecimal}, 1000`}
            ></circle>
          ) : (
            <circle
              key={`progress-${i}`}
              className={`${p.color} progress-ring__circle stroke-current`}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray={`0, ${CICUMFERENCE * (accumulator - percentageDecimal) + GAP * i + STROKE_WIDTH}, ${CICUMFERENCE * percentageDecimal}, 1000`}
              strokeDashoffset={STROKE_WIDTH}
            ></circle>
          )
        })}
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
