'use client'

import { useState } from 'react'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import type { ResponseJson } from '~/app/api/responses'

import Button from '~/app/components/_elements/button'
import Spinner from '~/app/components/general/Spinner'

type ResetButtonProps = {
  groups: {
    id: string
    name: string
  }[]
  courseId: string
}

export default function ResetButtons({ groups, courseId }: ResetButtonProps) {
  const [groupLoading, setGroupLoading] = useState(false)
  const [allLoading, setAllLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [open, setOpen] = useState(false)

  const markGroupForReview = async () => {
    setGroupLoading(true)
    setError(null)

    try {
      if (!selectedGroup) throw new Error('No group selected')
      const resp = await fetch(
        `/api/courses/user/${courseId}/lines/markGroupForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ groupId: selectedGroup }),
        },
      )

      const data = (await resp.json()) as ResponseJson
      if (data.message !== 'Lines updated') {
        throw new Error('Failed to mark group for review')
      }
      setOpen(false)
      window.location.reload()
    } catch (e) {
      if (e instanceof Error) setError(e.message)
      else setError('An error occurred')
    } finally {
      setGroupLoading(false)
    }
  }

  const markAllForReview = async () => {
    if (!confirm('Are you sure you want to mark all lines for review?')) return

    setAllLoading(true)
    setError(null)

    try {
      const resp = await fetch(
        `/api/courses/user/${courseId}/lines/markAllForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const data = (await resp.json()) as ResponseJson
      if (data.message !== 'Lines updated') {
        throw new Error('Failed to mark group for review')
      }
      window.location.reload()
    } catch (e) {
      if (e instanceof Error) setError(e.message)
      else setError('An error occurred')
    } finally {
      setAllLoading(false)
    }
  }

  return error ? (
    <p className="text-red-500 italic text-sm">{error}</p>
  ) : (
    <>
      <div className="flex flex-col lg:flex-row gap-2">
        <Button
          variant="primary"
          onClick={() => markAllForReview()}
          disabled={allLoading}
        >
          {allLoading ? (
            <>
              Marking <Spinner />
            </>
          ) : (
            'Mark All Lines For Review'
          )}
        </Button>
        <Button variant="accent" onClick={() => setOpen(true)}>
          Mark Specific Group For Review
        </Button>
      </div>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]"
            onClick={() => {
              if (groupLoading) return
              setOpen(false)
            }}
          />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-md md:p-6 flex flex-col gap-4">
            <div className="flex gap-2 flex-col md:flex-row">
              <select
                className="w-full md:w-fit border border-gray-300 px-4 py-1 bg-gray-100 text-black"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="">Select a group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <Button
                variant="primary"
                onClick={() => markGroupForReview()}
                disabled={groupLoading}
              >
                {groupLoading ? (
                  <>
                    Marking <Spinner />
                  </>
                ) : (
                  'Mark For Review'
                )}
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (groupLoading) return
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  )
}
