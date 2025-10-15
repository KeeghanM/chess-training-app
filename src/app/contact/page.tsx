import Backdrop from '@components/_elements/backdrop'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import ContactForm from '@components/contact/ContactForm'

export const metadata = {
  title: 'Get in touch with the team at ChessTraining.app',
}

export default function ContactPage() {
  return (
    <div className="relative min-h-[80vh]">
      <Backdrop />
      <Container>
        <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 space-y-6">
          <Heading as="h1">Contact Us</Heading>
          <p className="text-gray-800">
            We'd love to hear from you! If you have any questions, comments, or
            concerns, please don't hesitate to reach out.
          </p>
          <ContactForm />
        </div>
      </Container>
    </div>
  )
}
