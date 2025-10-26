'use client'

import Button from '~/components/_elements/button'

export default function ConsentManager() {
  return (
    <Button
      variant="link"
      onClick={() => {
        document.getElementById('silktide-cookie-icon')?.click()
      }}
    >
      Cookie Consent Manager
    </Button>
  )
}
