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

export default function CourseBrowser({ lines }: CourseBrowserProps) {
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
    lines[0]?.line.groupId,
  )

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="p-4 bg-card-light/20 rounded-lg w-full lg:max-w-1/3">
        <div className="flex flex-col gap-2 bg-card rounded-lg p-4 lg:max-w-500px overflow-y-auto max-h-full h-full">
          {groups
            .filter((group) =>
              group.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((group) => {
              const groupLines = lines.filter(
                (line) => line.line.groupId === group.id,
              )
              return (
                <GroupListItem
                  key={group.id}
                  name={group.name}
                  lines={groupLines}
                  onClick={() => setOpenGroupId(group.id)}
                  open={openGroupId === group.id}
                />
              )
            })}
        </div>
      </div>
      <GroupBrowser
        lines={
          openGroupId
            ? lines.filter((line) => line.line.groupId === openGroupId)
            : []
        }
      />
    </div>
  )
}
