import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

interface PageHeaderProps {
  title: string
  subTitle?: string
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <div className="relative py-12 md:py-16">
      <Backdrop />
      <Container>
        <Heading as="h1" className="text-white">
          {props.title}
        </Heading>
        {props.subTitle && (
          <Heading as="h2" className="text-primary font-bold">
            {props.subTitle}
          </Heading>
        )}
      </Container>
    </div>
  )
}
