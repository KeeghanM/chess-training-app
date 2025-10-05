import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import PrettyPrintLine from '@components/general/PrettyPrintLine'
import trackEventOnClient from '@utils/trackEventOnClient'
import type { Line } from './parse/ParsePGNtoLineData'

// TODO: Add informational lines
// TODO: Add priority lines

export function GroupItem(props: {
  lines: Line[]
  selectedGroup: string
  groupKey: string
  count: number
  updateLines: (lines: Line[]) => void
}) {
  const { lines, selectedGroup, groupKey, count } = props
  const [open, setOpen] = useState<boolean>(false)
  const [setAllOpen, setSetAllOpen] = useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<string>('White')
  const [parent] = useAutoAnimate()

  const handleColorChange = (line: Line, newColor: string) => {
    const updatedLines = props.lines.map((l) =>
      l === line ? { ...l, tags: { ...l.tags, Colour: newColor } } : l,
    )
    props.updateLines(updatedLines)
  }

  const handleLineDeletion = (line: Line) => {
    const updatedLines = props.lines.filter((l) => l !== line)
    props.updateLines(updatedLines)
  }

  return (
    <div
      ref={parent}
      className="flex flex-col justify-center gap-2 bg-white p-2 md:p-4"
    >
      <div className="flex items-center gap-2">
        <p className="font-bold">{count} x</p>
        <p>{groupKey}</p>
        <button
          className="text-purple-700 hover:text-purple-500"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 12 12"
          >
            <path
              fill="currentColor"
              d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1c.3-.3.8-.3 1.1 0l2.7 2.7l2.7-2.7c.3-.3.8-.3 1.1 0c.3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z"
            />
          </svg>
        </button>
        <div className="ml-auto min-w-fit">
          <Button onClick={() => setSetAllOpen(true)} variant="secondary">
            Set all lines...
          </Button>
        </div>
      </div>

      {setAllOpen && (
        <div className="fixed inset-0 z-[99999] grid place-items-center bg-[rgba(0,0,0,0.3)]">
          <div
            className="absolute inset-0"
            onClick={() => setSetAllOpen(false)}
          />
          <div className="flex fixed bg-white p-2 z-50 max-w-md flex-col gap-2 shadow-lg">
            <Heading as={'h4'}>Set All Lines In Group: {groupKey}</Heading>
            <p>This will set all lines in this group to the same colour.</p>
            <select
              className="border border-gray-300 p-2  "
              defaultValue={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="White">White</option>
              <option value="Black">Black</option>
            </select>
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={async () => {
                  const updatedLines = props.lines.map((l) =>
                    l.tags[selectedGroup] === groupKey
                      ? { ...l, tags: { ...l.tags, Colour: selectedColor } }
                      : l,
                  )
                  props.updateLines(updatedLines)
                  setSetAllOpen(false)
                  trackEventOnClient('create_course_set_all_lines_colour', {})
                }}
              >
                Set All To {selectedColor}
              </Button>
              <Button variant="secondary" onClick={() => setSetAllOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="flex flex-col gap-2">
          {lines
            .filter((line) => line.tags[selectedGroup] === groupKey)
            .map((line) => {
              return (
                <div
                  className="flex flex-col justify-center gap-2 bg-purple-100  p-2"
                  key={line.moves.join('')}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <PrettyPrintLine line={line} />
                    <div className="ml-auto flex flex-col gap-1">
                      <select
                        className="border border-gray-300 p-2  "
                        defaultValue={line.tags.Colour}
                        onChange={async (e) => {
                          const v = e.target.value
                          handleColorChange(line, v)
                          trackEventOnClient(
                            'create_course_change_line_colour',
                            {},
                          )
                        }}
                      >
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                      </select>
                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          <Button variant="danger">Delete</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content>
                          <div className="fixed inset-0 z-10 grid place-items-center bg-[rgba(0,0,0,0.5)]">
                            <div className="max-w-screen-sm bg-white p-4 md:p-6 lg:p-12">
                              <div className="mb-4 flex flex-col gap-4">
                                <Heading as={'h3'}>
                                  Are you sure you want to delete this line?
                                </Heading>
                                <p>
                                  This action cannot be undone. You will either
                                  need to re-import the PGN, or manually
                                  re-create the line later.
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <AlertDialog.Action>
                                  <Button
                                    variant="danger"
                                    onClick={async () => {
                                      handleLineDeletion(line)
                                      trackEventOnClient(
                                        'create_course_delete_line',
                                        {},
                                      )
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </AlertDialog.Action>
                                <AlertDialog.Cancel>
                                  <Button variant="primary">
                                    Keep The Line
                                  </Button>
                                </AlertDialog.Cancel>
                              </div>
                            </div>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
