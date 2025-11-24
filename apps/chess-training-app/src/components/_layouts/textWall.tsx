import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

type TextWallProps = {
  title: string
  titleType?: 'h1' | 'h2' | 'h3'
  children: React.ReactNode
}

export function TextWall({ title, titleType, children }: TextWallProps) {
  return (
    <Container size="wide">
      <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 space-y-6">
        <Heading as={titleType ?? 'h2'}>{title}</Heading>
        <div className="flex flex-col gap-6 md:gap-8 text-gray-800">
          {children}
        </div>
      </div>
    </Container>
  )
}
