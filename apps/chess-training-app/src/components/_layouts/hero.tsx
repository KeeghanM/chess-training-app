import Link from 'next/link'

import Backdrop from '@components/_elements/backdrop'
import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

type HeroProps = {
  title: string
  cta?: {
    text: string
    link: string
  }
  secondary?: {
    text: string
    link: string
  }
  children: React.ReactNode
}

export default function Hero({ title, cta, secondary, children }: HeroProps) {
  return (
    <div className="relative flex min-h-[70vh] flex-col justify-center">
      <Backdrop />
      <Container>
        <div className="relative flex flex-col gap-6">
          <Heading as="h1" className="text-white">
            {title}
          </Heading>
          <div className="text-white space-y-4 md:max-w-[60%]">{children}</div>
          <div className="flex gap-4">
            {cta && (
              <Link href={cta.link}>
                <Button variant="primary">{cta.text}</Button>
              </Link>
            )}
            {secondary && (
              <Link href={secondary.link}>
                <Button>{secondary.text}</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
