import Link from 'next/link'

import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

type MultiColItemProps = {
  title: string
  children: React.ReactNode
}

type MultiColProps = {
  title?: string
  cta?: {
    text: string
    link: string
  }
  children: React.ReactNode
}

export function MultiColItem({ title, children }: MultiColItemProps) {
  return (
    <div className="flex flex-col bg-card rounded-lg shadow overflow-hidden">
      <div className="bg-card-light px-4 py-3 border-b border-gray-200">
        <Heading as="h3" className="text-orange-500 !m-0 !p-0">
          {title}
        </Heading>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 text-gray-800">
        {children}
      </div>
    </div>
  )
}

export function MultiCol({ title, cta, children }: MultiColProps) {
  return (
    <Container size="extra-wide">
      <div className="flex flex-col items-center gap-8">
        {title && <Heading as="h2">{title}</Heading>}
        <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-fit mx-auto">
          {children}
        </div>
        {cta && (
          <div className="pt-4">
            <Link href={cta.link}>
              <Button variant="primary">{cta.text}</Button>
            </Link>
          </div>
        )}
      </div>
    </Container>
  )
}
