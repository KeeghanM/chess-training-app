import Button from '@components/_elements/button'

import trackEventOnClient from '@utils/track-event-on-client'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../_elements/tooltip'

interface RecallConfigureProps {
  difficulty: number
  setDifficulty: (difficulty: number) => void
  piecesToRecall: number
  setPiecesToRecall: (count: number) => void
  timed: boolean
  setTimed: (timed: boolean) => void
  timerLength: number
  setTimerLength: (length: number) => void
  onStartTraining: () => void
  error?: string
}

export default function RecallConfigure({
  difficulty,
  setDifficulty,
  piecesToRecall,
  setPiecesToRecall,
  timed,
  setTimed,
  timerLength,
  setTimerLength,
  onStartTraining,
  error,
}: RecallConfigureProps) {
  return (
    <div className="p-4 bg-card-light/20 rounded-lg">
      <div className="p-4 bg-card rounded-lg">
        <h2 className=" text-xl font-bold mb-4">Adjust your settings</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-bold flex items-center gap-1 w-fit">
              <span id="tooltip-1">Difficulty</span>
              <Tooltip>
                <TooltipTrigger asChild={true}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .438-.177q.177-.177.177-.438q0-.262-.177-.439q-.176-.177-.438-.177t-.438.177q-.177.177-.177.439q0 .261.177.438q.176.177.438.177M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                    />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  Difficulty sets how many pieces are on the board
                </TooltipContent>
              </Tooltip>
            </label>
            <div className="flex gap-4">
              <Button
                variant={difficulty == 0 ? 'accent' : undefined}
                onClick={() => setDifficulty(0)}
              >
                Easy
              </Button>
              <Button
                variant={difficulty == 1 ? 'accent' : undefined}
                onClick={() => setDifficulty(1)}
              >
                Medium
              </Button>
              <Button
                variant={difficulty == 2 ? 'accent' : undefined}
                onClick={() => setDifficulty(2)}
              >
                Hard
              </Button>
            </div>
          </div>
          <div>
            <label className=" w-fit font-bold flex items-center h-fit gap-1">
              <span id="tooltip-2">Number to recall</span>
              <Tooltip>
                <TooltipTrigger asChild={true}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .438-.177q.177-.177.177-.438q0-.262-.177-.439q-.176-.177-.438-.177t-.438.177q-.177.177-.177.439q0 .261.177.438q.176.177.438.177M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                    />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  The number of pieces in a row you'll have to recall from a
                  single position
                </TooltipContent>
              </Tooltip>
            </label>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={piecesToRecall}
                onChange={(e) => setPiecesToRecall(parseInt(e.target.value))}
              />
              <span className="text-sm italic">
                {piecesToRecall} piece{piecesToRecall > 1 && 's'}
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <label
                htmlFor="timed"
                className=" w-fit font-bold flex items-center h-fit gap-1"
              >
                <span>Timed Mode</span>
                <Tooltip>
                  <TooltipTrigger asChild={true}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .438-.177q.177-.177.177-.438q0-.262-.177-.439q-.176-.177-.438-.177t-.438.177q-.177.177-.177.439q0 .261.177.438q.176.177.438.177M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                      />
                    </svg>
                  </TooltipTrigger>
                  <TooltipContent>
                    Timed mode will give you a set amount of time to remember
                    the position before you have to recall it.
                  </TooltipContent>
                </Tooltip>
              </label>
              <input
                id="timed"
                type="checkbox"
                className="w-6 h-6 !bg-gray-100 text-black"
                checked={timed}
                onChange={() => setTimed(!timed)}
              />
            </div>
            {timed && (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="range"
                  min={1}
                  max={60}
                  step={1}
                  value={timerLength}
                  onChange={(e) => setTimerLength(parseInt(e.target.value))}
                />
                <span className="text-sm italic">{timerLength} seconds</span>
              </div>
            )}
          </div>
          <Button
            variant="primary"
            onClick={() => {
              onStartTraining()
              trackEventOnClient('recall_start', {})
            }}
          >
            Start Training
          </Button>
          {error && <p className="bg-red-500 italic text-sm p-2 ">{error}</p>}
        </div>
      </div>
    </div>
  )
}
