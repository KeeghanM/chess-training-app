import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { prisma } from '@server/db'

import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import StyledLink from '@components/_elements/styledLink'
import PageHeader from '@components/_layouts/pageHeader'

export default async function CheckoutSuccessPage() {
  const session = getKindeServerSession()
  if (!session) redirect('/')
  const user = await session.getUser()
  if (!user) redirect('/')

  const latestSession = await prisma.checkoutSession.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      items: true,
    },
  })

  if (!latestSession) redirect('/')

  const items: {
    name: string
    url: string
  }[] = []

  for (const item of latestSession.items) {
    if (item.productType === 'curatedSet') {
      const curatedSet = await prisma.curatedSet.findUnique({
        where: {
          id: item.productId,
        },
      })
      items.push({
        name: curatedSet!.name,
        url: '/training/tactics/list',
      })
    } else if (item.productType === 'course') {
      const course = await prisma.course.findUnique({
        where: {
          id: item.productId,
        },
      })
      items.push({
        name: course!.courseName,
        url: '/training/courses',
      })
    } else if (item.productType === 'subscription') {
      items.push({
        name: 'Premium Subscription',
        url: '/dashboard',
      })
    }
  }

  return (
    <>
      <PageHeader title="Thank you for your purchase" />
      <Container>
        <Heading as="h2">Your purchase has been successful!</Heading>
        <ul className="mb-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-2 p-2 md:p-4 md:px-6 bg-gray-100"
            >
              <Heading as="h3">{item.name}</Heading>
              <Link href={item.url}>
                <Button variant="primary">Start Training</Button>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-xs italic">
          <p>
            Please check your email for a copy of your receipt, and{' '}
            <StyledLink href="/dashboard">head to your dashboard</StyledLink> to
            begin your training.
          </p>
          <p>
            If you have any issues, please{' '}
            <StyledLink href="/contact">contact support</StyledLink>.
          </p>
        </div>
      </Container>
    </>
  )
}
