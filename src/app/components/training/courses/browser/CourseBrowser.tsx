'use client'

import { useState } from 'react'

import type {
  Comment,
  Course,
  Group,
  Line,
  Move,
  UserLine,
} from '@prisma/client'

import Heading from '~/app/components/_elements/heading'

import GroupDisplay from '../lines/GroupDisplay'

export type UserLineWithData = UserLine & {
  line: Line & {
    group: Group
    moves: (Move & { comment: Comment | null })[]
  }
}

export type CourseBrowserProps = {
  lines: UserLineWithData[]
}

export default function CourseBrowser(props: CourseBrowserProps) {
  const { lines } = props
  const [groupIds] = useState<string[]>(
    Array.from(new Set(lines.map((line) => line.line.groupId))),
  )
  const [groups] = useState<
    {
      id: string
      name: string
    }[]
  >(
    groupIds.map((groupId) => {
      const group = lines.find((line) => line.line.groupId === groupId)?.line
        .group
      if (!group) throw new Error('Group not found')
      return { id: group.id, name: group.groupName }
    }),
  )

  const [search, setSearch] = useState('')
  return (
    <div className="flex flex-col gap-1 lg:flex-row">
      <div className="max-h-[80vh] overflow-y-auto">
        <Heading as="h3">Groups</Heading>
        <div className="flex items-center gap-2 border border-gray-300 dark:text-white dark:border-slate-600 shadow-md dark:shadow-slate-900 bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.03)] p-2">
          <p>Search</p>
          <input
            className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          {groups
            .filter((group) =>
              group.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((group) => {
              const lines = props.lines.filter(
                (line) => line.line.groupId === group.id,
              )

              return (
                <GroupDisplay key={group.id} name={group.name} lines={lines} />
              )
            })}
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}
