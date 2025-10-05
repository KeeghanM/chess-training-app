import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import ContactForm from '@components/contact/ContactForm'

export const metadata = {
  title: 'Get in touch with the team at ChessTraining.app',
}

export default function ContactPage() {
  return (
    <>
      <Container>
        <Heading as="h1">Contact Us</Heading>
        <p className="mb-4">
          We'd love to hear from you! If you have any questions, comments, or
          concerns, please don't hesitate to reach out.
        </p>
        <ContactForm />
      </Container>
    </>
  )
}
