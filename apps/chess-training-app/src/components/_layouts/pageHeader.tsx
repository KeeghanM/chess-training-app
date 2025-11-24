import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

type PageHeaderProps = {
  title: string
  subTitle?: string
}

export default function PageHeader({ title, subTitle }: PageHeaderProps) {
  return (
    <div className="relative py-12 md:py-16">
      <Backdrop />
      <Container>
        <Heading as="h1" className="text-white">
          {title}
        </Heading>
        {subTitle && (
          <Heading as="h2" className="text-primary font-bold">
            {subTitle}
          </Heading>
        )}
      </Container>
    </div>
  )
}
