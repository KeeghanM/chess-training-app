import Link from 'next/link'

import type { ContentRelationshipField } from '@prismicio/client'
import { asHTML, asText } from '@prismicio/client'

import Button from '@components/_elements/button'
import Container from '@components/_elements/container'
import Heading from '@components/_elements/heading'

import Prismic from '@utils/prismicio'

export const metadata = {
  title: 'Read the latest Articles on Chess Improvement',
  description:
    'Discover the latest articles on chess improvement and chess training. Learn how to improve your chess game and become a better chess player.',
}

export default async function ArticlesPage() {
  const articles = await Prismic.getAllByType('article', {
    fetchLinks: ['author.name', 'author.uid'],
  })

  return (
    <>
      <div className="w-full flex items-center justify-center py-2 bg-gray-200">
        <p className="text-xs text-gray-600">
          <Link className="text-purple-700 hover:underline" href="/">
            Home
          </Link>
          /Articles
        </p>
      </div>
      <Container>
        <Heading as="h1">The latest Articles, News, and Blog Posts</Heading>
        <p>
          Read the latest articles on chess improvement and chess training.
          Learn how to improve your chess game and become a better chess player.
        </p>
        {articles
          .sort((a, b) => {
            return (
              new Date(b.first_publication_date).getTime() -
              new Date(a.first_publication_date).getTime()
            )
          })
          .map((article) => {
            const author = article.data.author as ContentRelationshipField & {
              data: { name: string; uid: string }
            }
            return (
              <div
                className="flex flex-col gap-0 mb-4 border border-gray-300 shadow-md bg-[rgba(0,0,0,0.03)]  hover:shadow-lg transition-shadow duration-300"
                key={article.id}
              >
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: `{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "${article.data.title}",
                    "datePublished": "${new Date(
                      article.first_publication_date,
                    ).toISOString()}",
                    "dateModified": "${new Date(
                      article.last_publication_date,
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
                    "description": "${asText(article.data.introduction)?.replaceAll('"', '\\"')}"
                    }
                `,
                  }}
                ></script>
                <div className="px-2 py-1 border-b border-gray-300 font-bold text-orange-500">
                  <Link
                    className="hover:underline"
                    href={`/articles/${article.uid}`}
                  >
                    <h2>{article.data.title}</h2>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 justify-center text-xs">
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
                      {new Date(
                        article.first_publication_date,
                      ).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div
                  className="p-2"
                  dangerouslySetInnerHTML={{
                    __html: asHTML(article.data.introduction) ?? '',
                  }}
                />
                <Link className="p-2 mx-auto" href={`/articles/${article.uid}`}>
                  <Button variant="primary">Read More</Button>
                </Link>
              </div>
            )
          })}
      </Container>
    </>
  )
}
