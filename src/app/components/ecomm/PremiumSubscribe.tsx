import { useState } from 'react'

import * as AlertDialog from '@radix-ui/react-alert-dialog'

import Button from '~/app/components/_elements/button'
import GetPremiumButton from '~/app/components/ecomm/GetPremiumButton'

export default function PremiumSubscribe(props: {
  title: string
  children: React.ReactNode | React.ReactNode[]
  trigger: React.ReactNode
}) {
  const { title, children, trigger } = props
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]"
          onClick={close}
        />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[75vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-4 shadow-md md:p-6">
          <AlertDialog.Title className="text-lg font-bold text-purple-700">
            {title}
          </AlertDialog.Title>
          <div className="flex flex-col gap-2">
            {children}
            <GetPremiumButton />
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
