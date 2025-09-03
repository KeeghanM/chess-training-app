'use client'

import { useEffect, useState } from 'react'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Sentry from '@sentry/nextjs'

import { useTacticsQueries } from '@hooks/use-tactics-queries'
import Button from '~/app/components/_elements/button'
import Spinner from '~/app/components/general/Spinner'
import type { PrismaTacticsSet } from '~/app/components/training/tactics/create/TacticsSetCreator'

import type { KindeUser } from '~/app/_util/getUserServer'
import trackEventOnClient from '~/app/_util/trackEventOnClient'

export default function SetListEdit(props: {
  set: PrismaTacticsSet
  user: KindeUser | null
  onFinished: () => void
}) {
  const { set } = props
  const user = props.user
  const [editOpen, setEditOpen] = useState(false)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState(set.name)
  
  const { deleteTactic, archiveTactic, resetTacticProgress, updateTactic } = useTacticsQueries()

  useEffect(() => {
    setName(set.name)
    setLoading(false)
    setError('')
  }, [editOpen])

    const deleteSet = async () => {
    setLoading(true)
    try {
      if (!user) throw new Error('Not logged in')
      await deleteTactic.mutateAsync({ setId: set.id })
      
      trackEventOnClient('delete_tactics_set_success', {
        setName: set.name,
        setSize: set.size.toString(),
        rating: set.rating?.toString() ?? 'null',
      })
      props.onFinished()
    } catch (e) {
      Sentry.captureException(e)
      if (e instanceof Error) setError(e.message)
      else setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

    const archiveSet = async () => {
    setLoading(true)
    try {
      if (!user) throw new Error('Not logged in')
      await archiveTactic.mutateAsync({ tacticId: set.id })
      
      trackEventOnClient('archive_tactics_set_success', {
        setName: set.name,
        setSize: set.size.toString(),
        rating: set.rating?.toString() ?? 'null',
      })
      props.onFinished()
    } catch (e) {
      Sentry.captureException(e)
      if (e instanceof Error) setError(e.message)
      else setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetProgress = async () => {
    setLoading(true)
    try {
      if (!user) throw new Error('Not logged in')
      await resetTacticProgress.mutateAsync({ setId: set.id })
      
      trackEventOnClient('reset_tactics_set_success', {
        setName: set.name,
        setSize: set.size.toString(),
        rating: set.rating?.toString() ?? 'null',
      })
      props.onFinished()
    } catch (e) {
      Sentry.captureException(e)
      if (e instanceof Error) setError(e.message)
      else setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

    const updateSet = async () => {
    setLoading(true)
    try {
      if (!user) throw new Error('Not logged in')
      await updateTactic.mutateAsync({ setId: set.id, name })
      
      trackEventOnClient('update_tactics_set_success', {
        setName: set.name,
        setSize: set.size.toString(),
        rating: set.rating?.toString() ?? 'null',
      })
      setEditOpen(false)
      props.onFinished()
    } catch (e) {
      Sentry.captureException(e)
      if (e instanceof Error) setError(e.message)
      else setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const DeleteButton = () => {
    return (
      <>
        <Button variant="danger" onClick={() => setDeleteOpen(true)}>
          Delete
        </Button>
        <AlertDialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay
              className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.5)]"
              onClick={close}
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
                  <Button variant="danger" onClick={deleteSet}>
                    {loading ? (
                      <>
                        Deleting <Spinner />
                      </>
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </AlertDialog.Action>
                <AlertDialog.Cancel>
                  <Button variant="primary" disabled={loading}>
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
        <Button variant="secondary" onClick={() => setArchiveOpen(true)}>
          Archive
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
                  <Button variant="danger" onClick={archiveSet}>
                    {loading ? (
                      <>
                        Archiving <Spinner />
                      </>
                    ) : (
                      'Archive'
                    )}
                  </Button>
                </AlertDialog.Action>
                <AlertDialog.Cancel>
                  <Button variant="primary" disabled={loading}>
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

  const ResetProgressButton = () => {
    return (
      <>
        <Button variant="accent" onClick={() => setResetOpen(true)}>
          Reset
        </Button>
        <AlertDialog.Root open={resetOpen} onOpenChange={setResetOpen}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay
              className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.5)]"
              onClick={close}
            />
            <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-4 shadow-md md:p-6">
              <AlertDialog.Title className="text-lg font-bold text-purple-700">
                Are you sure you want to reset?
              </AlertDialog.Title>
              <p>
                All your progress will be lost, all statistics gone. There is no
                way to undo this, the change is permanent.
              </p>
              <div className="flex gap-2">
                <AlertDialog.Action>
                  <Button variant="danger" onClick={resetProgress}>
                    {loading ? (
                      <>
                        Resetting <Spinner />
                      </>
                    ) : (
                      'Reset'
                    )}
                  </Button>
                </AlertDialog.Action>
                <AlertDialog.Cancel>
                  <Button variant="primary" disabled={loading}>
                    Cancel
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
      <Button variant="secondary" onClick={() => setEditOpen(true)}>
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
                    disabled={loading}
                    onClick={updateSet}
                  >
                    {loading ? (
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
              <ResetProgressButton />
              <Button variant="primary" onClick={close}>
                Close
              </Button>
              <p className="text-sm italic text-red-500">{error}</p>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  )
}
