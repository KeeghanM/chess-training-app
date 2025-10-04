import Link from 'next/link'
import { notFound } from 'next/navigation'

import * as prismic from '@prismicio/client'
import Prismic from '~/prismicio'

import Container from '~/app/components/_elements/container'
import Heading from '~/app/components/_elements/heading'
import StyledLink from '~/app/components/_elements/styledLink'

import { PrismicRichToHtml } from '~/app/_util/PrismicRichToHtml'
import type { RichTextContent } from '~/app/_util/PrismicRichToHtml'

type Params = { uid: string }
export default async function AuthorPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const author = await Prismic.getByUID('author', params.uid).catch(() =>
    notFound(),
  )
  const articles = await Prismic.getAllByType('article', {
    graphQuery: `{
        article {
           title
        }
    }`,
    filters: [prismic.filter.any('my.article.author', [author.id])],
    fetchLinks: ['author.name', 'author.uid'],
  })

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
          /{author.data.name}
        </p>
      </div>
      <Container>
        <Heading as="h1">{author.data.name}</Heading>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 italic">{author.data.title}</p>
          {author.data.bio.map((c: RichTextContent) => PrismicRichToHtml(c))}
        </div>
        <Heading as="h2">Articles</Heading>
        <ul>
          {articles
            .sort((a, b) => {
              return (
                new Date(b.first_publication_date).getTime() -
                new Date(a.first_publication_date).getTime()
              )
            })
            .map((article) => (
              <li key={article.id} className="flex gap-2">
                <StyledLink href={article.url!}>
                  {article.data.title}
                </StyledLink>
                <span className="text-gray-500 italic">
                  Published:{' '}
                  {new Date(article.first_publication_date).toLocaleDateString(
                    'en-GB',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    },
                  )}
                </span>
              </li>
            ))}
        </ul>
      </Container>
    </>
  )
}
