import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import ReportIssueForm from '@components/contact/ReportIssue'

export const metadata = {
  title: 'Having a problem? Report an issue here.',
}

export default function ReportIssuePage() {
  return (
    <Container>
      <Heading as="h1">Report an issue</Heading>
      <p className="mb-4">
        If you are having a problem with the site, please let us know by filling
        out the form below. We will get back to you as soon as we can.
      </p>
      <ReportIssueForm />
    </Container>
  )
}
