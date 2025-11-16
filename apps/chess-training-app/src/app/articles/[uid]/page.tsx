import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { type ContentRelationshipField, asText } from '@prismicio/client'

import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'
import CtaRow from '@components/_layouts/ctaRow'

import type { RichTextContent } from '@utils/PrismicRichToHtml'
import { PrismicRichToHtml } from '@utils/PrismicRichToHtml'
import Prismic from '@utils/prismicio'

type Params = { uid: string }

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params
  const page = await Prismic.getByUID('article', params.uid, {
    fetchLinks: ['author.name', 'author.uid'],
  }).catch(() => notFound())

  const author = page.data.author as ContentRelationshipField & {
    data: { name: string; uid: string }
  }

  return (
    <>
      <div className="w-full flex items-center justify-center py-2 bg-gray-200">
        <p className="text-xs text-gray-600">
          <Link className="text-purple-700 hover:underline" href="/">
            Home
          </Link>
          <Link
            className="text-purple-700 hover:underline cursor-pointer"
            href="/articles"
          >
            /Articles
          </Link>
          /{page.data.title}
        </p>
      </div>
      <Container>
        <Heading as="h1">{page.data.title}</Heading>
        <div className="flex flex-wrap gap-2 mb-4 justify-center text-xs">
          <div className="flex flex-col items-center border border-gray-300">
            <p className="font-bold py-1 px-2 border-b border-gray-300 w-full text-center">
              Author
            </p>
            <p className="p-1">
              <Link
                href={`/articles/author/${author.data.uid}`}
                className="hover:no-underline text-purple-700 underline"
              >
                {author.data.name}
              </Link>
            </p>
          </div>
          <div className="flex flex-col items-center border border-gray-300">
            <p className="font-bold py-1 px-2 border-b border-gray-300 w-full text-center">
              Published
            </p>
            <p className="p-1">
              {new Date(page.first_publication_date).toLocaleDateString(
                'en-GB',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              )}
            </p>
          </div>
        </div>
        {page.data.introduction[0] &&
          PrismicRichToHtml(page.data.introduction[0] as RichTextContent)}
        <article className="leading-7">
          {page.data.slices[0].primary.content.map((c: RichTextContent) =>
            PrismicRichToHtml(c),
          )}
        </article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "${page.data.title}",
                    "datePublished": "${new Date(
                      page.first_publication_date,
                    ).toISOString()}",
                    "dateModified": "${new Date(
                      page.last_publication_date,
                    ).toISOString()}",
                    "author": {
                        "@type": "Person",
                        "name": "${author.data.name}"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "ChessTraining.app",
                        "logo": {
                        "@type": "ImageObject",
                        "url": "https://chesstraining.app/_next/image?url=%2Fchesstrainingapplogo.png&w=64&q=75"
                        }
                    },
                    "description": "${asText(page.data.introduction)?.replaceAll('"', '\\"')}"
                    }
                `,
          }}
        ></script>
      </Container>
      <CtaRow
        title="Ready to Elevate Your Chess Game?"
        cta={{
          text: 'Start Training Now',
          link: '/auth/signin',
        }}
      >
        Take the first step towards becoming a stronger chess player. Explore
        our comprehensive chess training tools, improve your skills, and unlock
        your full chess potential. Whether you're a beginner or an experienced
        player, ChessTraining.app has the resources to help you succeed. Don't
        miss out on the opportunity to level up your game.
      </CtaRow>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<Params>
}): Promise<Metadata> {
  const params = await props.params
  const page = await Prismic.getByUID('article', params.uid).catch(() =>
    notFound(),
  )

  return {
    title: page.data.meta_title ?? page.data.title,
    description: page.data.meta_description ?? '',
  }
}

export async function generateStaticParams() {
  const pages = await Prismic.getAllByType('article')

  return pages.map((page) => {
    return { uid: page.uid }
  })
}
