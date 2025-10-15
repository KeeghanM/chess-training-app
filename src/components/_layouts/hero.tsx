import Link from 'next/link'
import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'
import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'

interface HeroProps {
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

export default function Hero(props: HeroProps) {
  return (
    <div className="relative flex min-h-[70vh] flex-col justify-center">
      <Backdrop />
      <Container>
        <div className="relative flex flex-col gap-6">
          <Heading as="h1" className="text-white">
            {props.title}
          </Heading>
          <div className="text-white space-y-4 md:max-w-[60%]">{props.children}</div>
          <div className="flex gap-4">
            {props.cta && (
              <Link href={props.cta.link}>
                <Button variant="primary">{props.cta.text}</Button>
              </Link>
            )}
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
