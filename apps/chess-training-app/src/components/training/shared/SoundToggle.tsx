import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/_elements/tooltip'

type SoundToggleProps = {
  soundEnabled: boolean
  onToggle: () => void
}

export default function SoundToggle({
  soundEnabled,
  onToggle,
}: SoundToggleProps) {
  return (
    <div
      className="flex cursor-pointer flex-row items-center gap-2 hover:text-orange-500"
      onClick={onToggle}
    >
      <Tooltip>
        <TooltipTrigger asChild={true}>
          {soundEnabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1.75 5.75v4.5h2.5l4 3V2.75l-4 3zm9 .5s1 .5 1 1.75s-1 1.75-1 1.75"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1.75 5.75v4.5h2.5l4 3V2.75l-4 3zm12.5 0l-3.5 4.5m0-4.5l3.5 4.5"
              />
            </svg>
          )}
        </TooltipTrigger>
        <TooltipContent>{`Sound ${soundEnabled ? 'On' : 'Off'}`}</TooltipContent>
      </Tooltip>
    </div>
  )
}
