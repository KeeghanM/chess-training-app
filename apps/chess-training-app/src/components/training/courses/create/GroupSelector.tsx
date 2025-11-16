'use client'

import { useEffect, useState } from 'react'
import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import Spinner from '@components/general/Spinner'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import * as Tabs from '@radix-ui/react-tabs'
import trackEventOnClient from '@utils/trackEventOnClient'
import { GroupItem } from './GroupItem'
import type { Line } from './parse/ParsePGNtoLineData'

export default function GroupSelector(props: {
  lines: Line[]
  back: () => void
  finished: (group: string, lines: Line[]) => void
}) {
  const [parent] = useAutoAnimate()
  const [lines, setLines] = useState<Line[]>(props.lines)
  const [groupOptions, setGroupOptions] = useState<string[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [groupedLineCounts, setGroupedLineCounts] = useState<
    Record<string, number>
  >({})
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')
  const [needsPrompt, setNeedsPrompt] = useState(false)
  const [hasPrompted, setHasPrompted] = useState(false)

  const getGroupOptionsFromLines = (lines: Line[]): string[] => {
    // Get a list of tags which exist on all lines
    // ignore tags which are not on all lines
    // then set groupOptions to that list
    const tags = lines.map((line) => line.tags)
    const tagKeys = tags.map((tag) => Object.keys(tag))
    const commonTagKeys = tagKeys.reduce((prev, curr) => {
      return prev.filter((tag) => curr.includes(tag))
    })
    const uselessTags = [
      'White',
      'Black',
      'Result',
      'messages',
      'Date',
      'Time',
      'UTCDate',
      'UTCTime',
    ]
    return commonTagKeys.filter((tag) => !uselessTags.includes(tag))
  }

  const countLines = (group: string, value: string) => {
    return lines.reduce(
      (prev, curr) => prev + (curr.tags[group] === value ? 1 : 0),
      0,
    )
  }

  useEffect(() => {
    const groups = getGroupOptionsFromLines(lines)
    setGroupOptions(groups)
    if (selectedGroup || groups.length === 0) return
    setSelectedGroup(groups[0]!)

    if (hasPrompted) return
    const whiteCount = countLines('Colour', 'White')
    const blackCount = countLines('Colour', 'Black')
    if (whiteCount > 0 && blackCount > 0) {
      setNeedsPrompt(true)
      setSelectedGroup('Colour')
    }
  }, [lines])

  useEffect(() => {
    if (!selectedGroup) return

    setGroupedLineCounts(
      lines.reduce(
        (prev, curr) => {
          const tag = curr.tags[selectedGroup]!
          if (prev[tag]) {
            prev[tag]++
          } else {
            prev[tag] = 1
          }
          return prev
        },
        {} as Record<string, number>,
      ),
    )
  }, [selectedGroup, lines])

  return (
    <Container>
      {needsPrompt && !hasPrompted && (
        <div className="fixed inset-0 z-[99999] grid place-items-center bg-[rgba(0,0,0,0.3)]">
          <div
            className="absolute inset-0"
            onClick={() => setHasPrompted(true)}
          />
          <div className="flex fixed bg-white p-2 z-50 max-w-[95vw] md:max-w-md min-w-md flex-col gap-2 shadow-lg">
            <Heading className="text-red-500" as={'h4'}>
              Grouping by Colour
            </Heading>
            <p>
              <strong>
                It looks like you have both white and black lines in this PGN.
                The default colour of a line is based on it's last move.
              </strong>
            </p>
            <p>
              To allow you to review these, we have set the grouping to
              "Colour". Here you can edit each lines colour individually, or use
              the "Set All" button to set all lines to the same colour.
            </p>
            <p>
              Once you're happy with the line colours, you can change it back to
              whatever grouping you like.
            </p>
            <p className="italic">
              If a line's last move doesn't align with it's set colour, the
              training will stop at the last move matching the set colour.
            </p>
            <Button variant="primary" onClick={() => setHasPrompted(true)}>
              Okay, got it!
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 bg-card-dark rounded-lg shadow p-4">
            <div className="flex flex-row flex-wrap items-baseline gap-2 text-sm ">
              <Heading as={'h4'}>Stats:</Heading>
              <p>
                <span>Total Lines:</span>{' '}
                <span className="font-bold">{lines.length}</span>
              </p>
              <p>
                <span>White Lines:</span>{' '}
                <span className="font-bold">
                  {lines.reduce(
                    (prev, curr) =>
                      prev + (curr.tags.Colour === 'White' ? 1 : 0),
                    0,
                  )}
                </span>
                ,
              </p>
              <p>
                <span>Black Lines:</span>{' '}
                <span className="font-bold">
                  {lines.reduce(
                    (prev, curr) =>
                      prev + (curr.tags.Colour === 'Black' ? 1 : 0),
                    0,
                  )}
                </span>
              </p>
            </div>
            <Tabs.Root
              defaultValue={groupOptions[0]}
              onValueChange={async (x) => {
                setSelectedGroup(x)
                trackEventOnClient('create_course_change_grouping', {
                  groupName: x,
                })
              }}
            >
              <Heading as={'h4'}>Grouping Options:</Heading>
              <Tabs.List className="flex gap-2 flex-wrap">
                {groupOptions.map((group) => (
                  <Tabs.Trigger
                    key={group}
                    className={
                      'border-b-2 text-sm px-2 py-1 cursor-pointer hover:border-purple-700 hover:bg-purple-200  ' +
                      (selectedGroup === group
                        ? 'border-purple-700 bg-purple-100'
                        : 'border-gray-300  ')
                    }
                    value={group}
                  >
                    {group}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Tabs.Root>
            <div ref={parent} className="flex flex-col gap-2">
              {Object.keys(groupedLineCounts).map((key) => (
                <GroupItem
                  key={key}
                  lines={lines}
                  selectedGroup={selectedGroup}
                  groupKey={key}
                  count={groupedLineCounts[key]!}
                  updateLines={(newLines) => setLines(newLines)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:justify-end md:items-center">
            <div>
              <Button onClick={props.back}>Go Back</Button>
            </div>
            <div>
              <Button
                disabled={status === 'loading'}
                variant="primary"
                onClick={() => {
                  setStatus('loading')
                  props.finished(selectedGroup, lines)
                }}
              >
                <div className="flex items-center gap-4">
                  <span>
                    {status === 'loading' ? 'Creating' : 'Confirm and Create'}
                  </span>
                  {status === 'loading' && <Spinner />}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
