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
  background: 'light' | 'dark'
  children: React.ReactNode
}

export default function CtaRow(props: CtaRowProps) {
  return (
    <div className={props.background == 'light' ? 'bg-white' : 'bg-purple-100'}>
      <Container>
        <div className="flex flex-col gap-4">
          <Heading as={'h2'}>{props.title}</Heading>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            {props.children}
          </div>
          <div className="flex gap-4">
            <Link href={props.cta.link}>
              <Button variant="primary">{props.cta.text}</Button>
            </Link>
            {props.secondary && (
              <Link href={props.secondary.link}>
                <Button variant="secondary">{props.secondary.text}</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
