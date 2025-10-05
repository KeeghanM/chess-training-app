import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

interface ImageRowProps {
  heading: string
  imageSide: 'left' | 'right'
  image: {
    src: string
    alt: string
  }
  background: 'light' | 'dark'
  children: React.ReactNode
}

export default function ImageRowFull(props: ImageRowProps) {
  return (
    <div
      className={
        'relative flex flex-col items-center justify-center py-4 md:flex-row md:py-6 lg:py-12' +
        (props.imageSide === 'left' ? '' : ' md:flex-row-reverse') +
        (props.background === 'light' ? ' bg-white' : ' bg-purple-100')
      }
    >
      <div
        className={
          'w-full md:absolute md:inset-0 md:w-1/2' +
          (props.imageSide === 'left' ? '' : ' md:ml-auto')
        }
      >
        <img
          className="mx-auto h-full max-h-[350px] w-full max-w-[750px] object-cover object-[50%_25%] md:max-h-full"
          src={props.image.src}
          alt={props.image.alt}
        />
      </div>
      <div
        className={
          'w-full md:w-1/2' +
          (props.imageSide === 'left' ? ' md:ml-auto' : ' md:mr-auto')
        }
      >
        <Container>
          <Heading as={'h2'}>{props.heading}</Heading>
          <div className="flex flex-col gap-4">{props.children}</div>
        </Container>
      </div>
    </div>
  )
}
