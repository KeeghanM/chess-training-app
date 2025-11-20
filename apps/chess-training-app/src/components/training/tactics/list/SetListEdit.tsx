'use client'

import { useEffect, useState } from 'react'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import posthog from 'posthog-js'

import Button from '@components/_elements/button'
import Spinner from '@components/general/Spinner'
import type { PrismaTacticsSet } from '@components/training/tactics/create/TacticsSetCreator'

import { useTacticsQueries } from '@hooks/use-tactics-queries'

import type { KindeUser } from '@utils/get-user-server'
import trackEventOnClient from '@utils/track-event-on-client'

export default function SetListEdit({
  set,
  user,
}: {
  set: PrismaTacticsSet
  user: KindeUser | null
}) {
  const [editOpen, setEditOpen] = useState(false)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [name, setName] = useState(set.name)

  const { deleteTactic, archiveTactic, updateTactic } = useTacticsQueries()

  const somethingsPending =
    deleteTactic.isPending || archiveTactic.isPending || updateTactic.isPending

  useEffect(() => {
    setName(set.name)
  }, [editOpen])

  const close = () => {
    setEditOpen(false)
    setArchiveOpen(false)
    setDeleteOpen(false)
  }

  const deleteSet = async () => {
    try {
      if (!user) throw new Error('Not logged in')
      await deleteTactic.mutateAsync({ setId: set.id })

      trackEventOnClient('delete_tactics_set_success', {
        setName: set.name,
        setSize: set.size.toString(),
        rating: set.rating?.toString() ?? 'null',
      })
      close()
    } catch (e) {
      posthog.captureException(e)
    }
  }

  const archiveSet = async () => {
    try {
      if (!user) throw new Error('Not logged in')
      await archiveTactic.mutateAsync({ setId: set.id })

      trackEventOnClient('archive_tactics_set_success', {
        setName: set.name,
        setSize: set.size.toString(),
        rating: set.rating?.toString() ?? 'null',
      })
      close()
    } catch (e) {
      posthog.captureException(e)
    }
  }

  const updateSet = async () => {
    try {
      if (!user) throw new Error('Not logged in')
      await updateTactic.mutateAsync({ setId: set.id, name })

      trackEventOnClient('update_tactics_set_success', {
        setName: set.name,
        setSize: set.size.toString(),
        rating: set.rating?.toString() ?? 'null',
      })
      close()
    } catch (e) {
      posthog.captureException(e)
    }
  }

  const DeleteButton = () => {
    return (
      <>
        <Button
          variant="danger"
          onClick={() => setDeleteOpen(true)}
          disabled={somethingsPending || set.curatedSetId !== null}
        >
          {deleteTactic.isPending ? (
            <>
              Deleting <Spinner />
            </>
          ) : (
            'Delete'
          )}
        </Button>
        <AlertDialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay
              className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.5)]"
              onClick={() => setDeleteOpen(false)}
            />
            <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-card rounded-lg p-4 shadow-md md:p-6 space-y-4">
              <AlertDialog.Title className="font-bold text-xl">
                Are you sure you want to delete this?
              </AlertDialog.Title>
              <p>
                This action cannot be undone. You will lose all progress on your
                Tactics Set
              </p>
              <div className="flex gap-2">
                <AlertDialog.Action>
                  <Button
                    variant="danger"
                    onClick={deleteSet}
                    disabled={somethingsPending}
                  >
                    Delete
                  </Button>
                </AlertDialog.Action>
                <AlertDialog.Cancel>
                  <Button variant="success" disabled={somethingsPending}>
                    Keep The Set
                  </Button>
                </AlertDialog.Cancel>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </>
    )
  }

  const ArchiveButton = () => {
    return (
      <>
        <Button
          onClick={() => setArchiveOpen(true)}
          disabled={somethingsPending}
        >
          {archiveTactic.isPending ? (
            <>
              Archiving <Spinner />
            </>
          ) : (
            'Archive'
          )}
        </Button>
        <AlertDialog.Root open={archiveOpen} onOpenChange={setArchiveOpen}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay
              className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.5)]"
              onClick={close}
            />
            <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-card rounded-lg p-4 shadow-md md:p-6 space-y-4">
              <AlertDialog.Title className="font-bold text-xl">
                Are you sure you want to archive this?
              </AlertDialog.Title>
              <p>
                The set will be moved to the Archive List. All progress will be
                kept, so you can restore the set at any time.
              </p>
              <div className="flex gap-2">
                <AlertDialog.Action>
                  <Button
                    variant="danger"
                    onClick={archiveSet}
                    disabled={somethingsPending}
                  >
                    Archive
                  </Button>
                </AlertDialog.Action>
                <AlertDialog.Cancel>
                  <Button variant="success" disabled={somethingsPending}>
                    Keep The Set
                  </Button>
                </AlertDialog.Cancel>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </>
    )
  }

  return (
    <>
      <Button onClick={() => setEditOpen(true)} disabled={somethingsPending}>
        Edit
      </Button>
      <AlertDialog.Root open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]"
            onClick={close}
          />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-card rounded-lg p-4 shadow-md md:p-6 space-y-4">
            <AlertDialog.Title className="font-bold text-xl">
              Editing "{set.name}"
            </AlertDialog.Title>
            <div className="space-y-4">
              {!set.curatedSetId && (
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black rounded-lg"
                  value={name}
                  onInput={(e) => {
                    setName(e.currentTarget.value)
                  }}
                />
              )}
              <div className="flex gap-4">
                {!set.curatedSetId && (
                  <Button
                    disabled={somethingsPending}
                    onClick={updateSet}
                    variant="success"
                  >
                    {updateTactic.isPending ? (
                      <>
                        Saving <Spinner />
                      </>
                    ) : (
                      'Save'
                    )}
                  </Button>
                )}
                <ArchiveButton />
                {!set.curatedSetId && <DeleteButton />}
              </div>
              {updateTactic.error && (
                <p className="text-red-500">
                  Error updating set: {updateTactic.error.message}
                </p>
              )}
              {archiveTactic.error && (
                <p className="text-red-500">
                  Error archiving set: {archiveTactic.error.message}
                </p>
              )}
              {deleteTactic.error && (
                <p className="text-red-500">
                  Error deleting set: {deleteTactic.error.message}
                </p>
              )}
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  )
}
