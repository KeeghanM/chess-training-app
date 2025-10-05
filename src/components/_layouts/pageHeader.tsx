import Image from 'next/image'
import Heading from '@components/_elements/heading'

interface PageHeaderProps {
  title: string
  subTitle?: string
  image: {
    src: string
    alt: string
  }
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <Image
          fill={true}
          className="object-cover object-center w-full h-full filter grayscale brightness-[.3]"
          src={props.image.src}
          alt={props.image.alt}
        />
      </div>
      <div className="relative px-4 py-2 md:px-12 md:py-4 lg:px-24 lg:py-6">
        <Heading color="text-white" as={'h1'}>
          {props.title}
        </Heading>
        {props.subTitle && (
          <Heading color="text-orange-500" as={'h2'} bold={false}>
            {props.subTitle}
          </Heading>
        )}
      </div>
    </div>
  )
}
