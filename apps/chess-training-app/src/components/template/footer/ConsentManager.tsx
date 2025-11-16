'use client'

import Button from '~/components/_elements/button'

/**
 * Render a link-styled button that opens the site's cookie consent manager.
 *
 * The button, labeled "Cookie Consent Manager", programmatically triggers a click
 * on the element with id `silktide-cookie-icon` when activated.
 *
 * @returns The React element for the consent-manager button.
 */
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
