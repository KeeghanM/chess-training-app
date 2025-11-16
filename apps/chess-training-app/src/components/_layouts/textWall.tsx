import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

interface TextWallProps {
  title: string
  titleType?: 'h1' | 'h2' | 'h3'
  children: React.ReactNode
}

export function TextWall(props: TextWallProps) {
  return (
    <Container size="wide">
      <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 space-y-6">
        <Heading as={props.titleType ?? 'h2'}>{props.title}</Heading>
        <div className="flex flex-col gap-6 md:gap-8 text-gray-800">
          {props.children}
        </div>
      </div>
    </Container>
  )
}
