'use client'

import { useEffect, useState } from 'react'

import { useTacticsQueries } from '@hooks/use-tactics-queries'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Sentry from '@sentry/nextjs'

import Button from '~/app/components/_elements/button'
import Spinner from '~/app/components/general/Spinner'
import type { PrismaTacticsSet } from '~/app/components/training/tactics/create/TacticsSetCreator'

import type { KindeUser } from '~/app/_util/getUserServer'
import trackEventOnClient from '~/app/_util/trackEventOnClient'

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
      Sentry.captureException(e)
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
      Sentry.captureException(e)
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
      Sentry.captureException(e)
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
            <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-4 shadow-md md:p-6">
              <AlertDialog.Title className="text-lg font-bold text-purple-700">
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
                  <Button variant="primary" disabled={somethingsPending}>
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
          variant="secondary"
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
            <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-4 shadow-md md:p-6">
              <AlertDialog.Title className="text-lg font-bold text-purple-700">
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
                  <Button variant="primary" disabled={somethingsPending}>
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
      <Button
        variant="secondary"
        onClick={() => setEditOpen(true)}
        disabled={somethingsPending}
      >
        Edit
      </Button>
      <AlertDialog.Root open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]"
            onClick={close}
          />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-4 shadow-md md:p-6">
            <AlertDialog.Title className="text-lg font-bold text-purple-700">
              {set.curatedSetId ? '' : 'Editing'} "{set.name}"
            </AlertDialog.Title>
            <div className="flex flex-col gap-2 mt-4">
              {!set.curatedSetId && (
                <>
                  <label>Set Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 px-4 py-2 bg-gray-100 text-black"
                    value={name}
                    onInput={(e) => {
                      setName(e.currentTarget.value)
                    }}
                  />
                  <Button
                    variant="primary"
                    disabled={somethingsPending}
                    onClick={updateSet}
                  >
                    {updateTactic.isPending ? (
                      <>
                        Saving <Spinner />
                      </>
                    ) : (
                      'Save'
                    )}
                  </Button>
                </>
              )}
              <ArchiveButton />
              {!set.curatedSetId && <DeleteButton />}
              <Button
                variant="primary"
                onClick={close}
                disabled={somethingsPending}
              >
                Close
              </Button>
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
