import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

type ImageRowProps = {
  heading: string
  imageSide: 'left' | 'right'
  image: {
    src: string
    alt: string
  }
  children: React.ReactNode
}

export default function ImageRowFull({
  heading,
  imageSide,
  image,
  children,
}: ImageRowProps) {
  return (
    <Container size="extra-wide">
      <div
        className={`flex flex-col gap-8 md:flex-row md:gap-12 items-center ${
          imageSide === 'right' ? 'md:flex-row-reverse' : ''
        }`}
      >
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[400px]"
            src={image.src}
            alt={image.alt}
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 space-y-4">
            <Heading as="h2">{heading}</Heading>
            <div className="flex flex-col gap-4 text-gray-800">{children}</div>
          </div>
        </div>
      </div>
    </Container>
  )
}
