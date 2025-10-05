import Link from 'next/link'
import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'

interface MultiColItemProps {
  title: string
  children: React.ReactNode
}

interface MultiColProps {
  title?: string
  background: 'light' | 'dark'
  cta?: {
    text: string
    link: string
  }
  children: React.ReactNode
}

export function MultiColItem(props: MultiColItemProps) {
  return (
    <div className="flex flex-1 flex-col gap-0 border border-gray-300 bg-[rgba(0,0,0,0.03)]">
      <div className="px-2 py-1 border-b border-gray-300 font-bold">
        <Heading as={'h3'} color="text-orange-500 !m-0 !p-0">
          {props.title}
        </Heading>
      </div>
      <div className="flex flex-col gap-2 p-2">{props.children}</div>
    </div>
  )
}

export function MultiCol(props: MultiColProps) {
  return (
    <div
      className={`w-full ${
        props.background === 'light' ? 'bg-white' : 'bg-purple-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-6 md:px-6 md:py-12 lg:px-12">
        {props.title && <Heading as={'h2'}>{props.title}</Heading>}
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {props.children}
        </div>
        {props.cta && (
          <div className="">
            <Link href={props.cta.link}>
              <Button variant="accent">{props.cta.text}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
