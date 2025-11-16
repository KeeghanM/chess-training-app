import Link from 'next/link'

import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

interface CtaRowProps {
  title: string
  cta: {
    text: string
    link: string
  }
  secondary?: {
    text: string
    link: string
  }
  children: React.ReactNode
}

export default function CtaRow(props: CtaRowProps) {
  return (
    <div className="w-full py-12 bg-bg">
      <Container size="wide">
        <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 space-y-6">
          <Heading as="h2">{props.title}</Heading>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6 text-gray-800">
            {props.children}
          </div>
          <div className="flex gap-4 pt-2">
            <Link href={props.cta.link}>
              <Button variant="primary">{props.cta.text}</Button>
            </Link>
            {props.secondary && (
              <Link href={props.secondary.link}>
                <Button>{props.secondary.text}</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
