'use client'

import { useState } from 'react'

import type { Comment, Group, Line, Move, UserLine } from '@prisma/client'

import GroupBrowser from './GroupBrowser'
import GroupListItem from './GroupListItem'

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
  const [search] = useState('')
  const [openGroupId, setOpenGroupId] = useState<string | undefined>(
    props.lines[0]?.line.groupId,
  )

  return (
    <div className="flex flex-col gap-1 md:flex-row">
      <div className="border lg:border-4 border-purple-700 bg-purple-100  text-black  p-2">
        <div className="flex flex-col gap-2 lg:max-w-500px overflow-y-auto max-h-full">
          {groups
            .filter((group) =>
              group.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((group) => {
              const lines = props.lines.filter(
                (line) => line.line.groupId === group.id,
              )
              return (
                <GroupListItem
                  key={group.id}
                  name={group.name}
                  lines={lines}
                  onClick={() => setOpenGroupId(group.id)}
                  open={openGroupId === group.id}
                />
              )
            })}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <GroupBrowser
          lines={
            openGroupId
              ? lines.filter((line) => line.line.groupId === openGroupId)
              : []
          }
        />
      </div>
    </div>
  )
}
