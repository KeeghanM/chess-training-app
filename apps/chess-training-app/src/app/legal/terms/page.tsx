import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

import './styles.css'

/**
 * Render the static Terms of Service page for ChessTraining.app.
 *
 * The page includes a header with last-updated metadata and links to privacy/cookie
 * policies, and a two-column main content area containing 11 policy sections with
 * accompanying asides summarizing each section.
 *
 * @returns The Terms of Service page as a JSX element
 */
export default function TermsPage() {
  return (
    <section className="space-y-6">
      <header className="text-center border-b-2 border-primary py-8 bg-white mb-12">
        <Container size="extra-wide" className="space-y-4">
          <Heading as="h1" id="policy-title" className="text-primary">
            ChessTraining.app - Terms of Service
          </Heading>
          <div className="meta text-sm text-gray-600">
            <p>
              <strong>Last updated: 14 October 2025</strong>
            </p>
            <p>
              These Terms govern your use of ChessTraining.app, operated by{' '}
              <strong>Human Side of Code</strong>.
            </p>
            <p>
              Your data is protected by our umbrella{' '}
              <a
                href="https://www.humansideofcode.org/legal/privacy"
                className="text-primary"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href="https://www.humansideofcode.org/legal/cookies"
                className="text-primary"
              >
                Cookie Policy
              </a>
              .
            </p>
          </div>
        </Container>
      </header>
      <Container size="wide">
        <main
          aria-labelledby="policy-title"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 "
        >
          <section id="agreement" aria-labelledby="agreement-title">
            <h2 id="agreement-title">1. Agreement to Terms</h2>
            <p>
              By accessing or using our service, ChessTraining.app ("Service"),
              you agree to be bound by these Terms of Service ("Terms"). If you
              disagree with any part of the terms, you may not access the
              Service.
            </p>
          </section>
          <aside>
            <p>
              <strong>Agreement</strong>
            </p>
            <p>By using ChessTraining.app, you agree to these rules.</p>
          </aside>

          <section id="eligibility" aria-labelledby="eligibility-title">
            <h2 id="eligibility-title">2. Eligibility</h2>
            <p>
              You must be at least <strong>13 years old</strong> to use the
              Service. To create and sell content via our marketplace, you must
              be at least <strong>18 years old</strong> or have the legal
              authority to enter into a binding contract.
            </p>
          </section>
          <aside>
            <p>
              <strong>Eligibility</strong>
            </p>
            <p>You must be 13+ to use the site and 18+ to sell content.</p>
          </aside>

          <section id="accounts" aria-labelledby="accounts-title">
            <h2 id="accounts-title">3. Accounts</h2>
            <p>
              You are responsible for safeguarding your account password and for
              any activities or actions under your account. You agree to notify
              us immediately upon learning of any breach of security or
              unauthorized use of your account.
            </p>
          </section>
          <aside>
            <p>
              <strong>Accounts</strong>
            </p>
            <p>
              Keep your password safe. You're responsible for what happens on
              your account.
            </p>
          </aside>

          <section id="payments" aria-labelledby="payments-title">
            <h2 id="payments-title">4. Payments, Subscriptions & Refunds</h2>
            <p>
              We offer monthly subscription plans. Payments are processed via{' '}
              <strong>Stripe</strong>. Subscriptions renew automatically each
              month unless cancelled.
            </p>
            <p>
              <strong>Refund Policy:</strong> We offer a 30-day money-back
              guarantee for your <strong>first</strong>
              month's subscription payment. If you cancel within 30 days of your
              initial purchase, you are eligible for a full refund.
            </p>
            <p>
              After the first 30 days, you may cancel your subscription at any
              time. Your cancellation will take effect at the end of the current
              paid billing cycle, and you will not be charged again. No refunds
              will be provided for partial-month subscriptions.
            </p>
          </section>
          <aside>
            <p>
              <strong>Payments & Refunds</strong>
            </p>
            <p>
              We use Stripe for monthly plans. You can get a full refund on your
              *first* month's payment if you cancel within 30 days.
            </p>
            <p>
              After that, you can cancel anytime, and your subscription will
              stop at the end of the month you've paid for.
            </p>
          </aside>

          <section id="ugc" aria-labelledby="ugc-title">
            <h2 id="ugc-title">5. User-Generated Content (UGC)</h2>
            <p>
              Our Service allows you to create, upload, and post content, such
              as custom training sets ("User Content"). You retain all ownership
              rights to your User Content.
            </p>
            <p>
              By posting User Content, you grant us a worldwide, non-exclusive,
              royalty-free license to use, host, display, and distribute your
              content as necessary to provide and promote the Service.
            </p>
            <p>
              You are solely responsible for the User Content you post. You
              warrant that you have all necessary rights to post it and that it
              does not violate any laws or third-party rights. We reserve the
              right to moderate and remove any content that violates these
              Terms.
            </p>
          </section>
          <aside>
            <p>
              <strong>Your Content</strong>
            </p>
            <p>
              You own the training sets and content you create. By uploading it,
              you give us permission to host and display it on the site.
            </p>
            <p>
              You're responsible for what you upload, so make sure you own it
              and it's not illegal.
            </p>
          </aside>

          <section id="marketplace" aria-labelledby="marketplace-title">
            <h2 id="marketplace-title">6. Marketplace for Sellers</h2>
            <p>
              Users aged 18+ may sell their User Content (e.g., training
              courses) to other users. Payouts are handled via
              <strong>Stripe Connect</strong>. By selling content, you agree to
              Stripe's connected account agreement.
            </p>
            <p>
              You are responsible for setting the price of your content and for
              paying all applicable taxes on your earnings. We will charge a
              platform fee (commission) on each sale, which will be clearly
              disclosed to you.
            </p>
          </section>
          <aside>
            <p>
              <strong>Selling Your Content</strong>
            </p>
            <p>
              If you're 18+, you can sell your courses. We use Stripe for
              payouts. We take a fee from each sale, and you are responsible for
              your own taxes.
            </p>
          </aside>

          <section id="disclaimers" aria-labelledby="disclaimers-title">
            <h2 id="disclaimers-title">7. Disclaimers</h2>
            <p>
              The Service is provided "AS IS" and "AS AVAILABLE" without
              warranties of any kind. We do not warrant that the service will be
              uninterrupted, secure, or error-free.
            </p>
            <p>
              <strong>No Guarantee of Skill Improvement:</strong>{' '}
              ChessTraining.app provides educational tools and content. We make
              no warranty or representation that your use of the Service will
              lead to any specific improvement in your chess skill, rating, or
              performance.
            </p>
          </section>
          <aside>
            <p>
              <strong>Disclaimers</strong>
            </p>
            <p>The site is provided "as is."</p>
            <p>
              <strong>Crucially:</strong> We provide tools, but we do not
              guarantee you will get better at chess or increase your rating.
              Your results are up to you.
            </p>
          </aside>

          <section id="liability" aria-labelledby="liability-title">
            <h2 id="liability-title">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Human Side of Code shall
              not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of your use of the
              Service.
            </p>
          </section>
          <aside>
            <p>
              <strong>Liability</strong>
            </p>
            <p>Our legal liability is limited as much as the law allows.</p>
          </aside>

          <section id="law" aria-labelledby="law-title">
            <h2 id="law-title">9. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of{' '}
              <strong>England and Wales</strong>, without regard to its conflict
              of law provisions.
            </p>
          </section>
          <aside>
            <p>
              <strong>Governing Law</strong>
            </p>
            <p>
              Any legal disputes will be handled under the laws of England and
              Wales.
            </p>
          </aside>

          <section id="changes" aria-labelledby="changes-title">
            <h2 id="changes-title">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              provide notice of material changes (e.g., via email or a notice on
              the site). Continued use of the Service after changes constitutes
              your acceptance.
            </p>
          </section>
          <aside>
            <p>
              <strong>Changes</strong>
            </p>
            <p>If we make big changes to these rules, we'll let you know.</p>
          </aside>

          <section id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at
              <a
                href="mailto:privacy@humansideofcode.org"
                className="text-primary"
              >
                privacy@humansideofcode.org
              </a>
              .
            </p>
            <p>
              <strong>Human Side of Code</strong>
              <br />
              83 Strathmore Road, NE3 5JS, Newcastle upon Tyne, United Kingdom
              <br />
              Companies House No: <strong>16784240</strong>
            </p>
          </section>
          <aside>
            <p>
              <strong>Contact</strong>
            </p>
            <p>Email privacy@humansideofcode.org with any questions.</p>
          </aside>
        </main>
      </Container>
    </section>
  )
}
