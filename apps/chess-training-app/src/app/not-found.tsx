import Image from 'next/image'
import Link from 'next/link'

import Button from '@components/_elements/button'
import Heading from '@components/_elements/heading'

export default async function NotFound() {
  return (
    <div className="relative">
      <div className="relative mx-auto flex min-h-[70vh] max-w-[min(calc(100vw-2rem),90ch)] flex-col items-center p-4 md:p-6 lg:p-8">
        <Heading as={'h1'}>Oops! Page not found</Heading>
        <Link href="/">
          <Button variant="primary">Return Home</Button>
        </Link>
        <Image
          className="my-auto"
          src={'/images/404.png'}
          alt={
            'Abstract art of chess pieces exploding representing a 404 error'
          }
          width={800}
          height={800}
        />
      </div>
    </div>
  )
}
