import type { MetadataRoute } from 'next'

import { createClient } from '~/prismicio'

export default async function sitemap() {
  const client = createClient()
  const articles = await client.getAllByType('article')
  const authors = await client.getAllByType('author')

  const tidiedArticles = articles.map((article) => {
    return {
      url: `https://chesstraining.app/articles/${article.uid}`,
      lastModified: article.last_publication_date,
      changeFrequency: 'monthly',
      priority: 0.9,
    }
  }) as MetadataRoute.Sitemap
  const tidiedAuthors = authors.map((author) => {
    return {
      url: `https://chesstraining.app/articles/author/${author.uid}`,
      lastModified: author.last_publication_date,
      changeFrequency: 'monthly',
      priority: 0.4,
    }
  }) as MetadataRoute.Sitemap

  const pages: MetadataRoute.Sitemap = [
    {
      url: 'https://chesstraining.app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://chesstraining.app/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://chesstraining.app/about/meet-the-team',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://chesstraining.app/about/features',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://chesstraining.app/about/features/natural-play-learning',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: 'https://chesstraining.app/about/features/woodpecker-method',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: 'https://chesstraining.app/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: 'https://chesstraining.app/contact/report-an-issue',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://chesstraining.app/courses',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: 'https://chesstraining.app/product-roadmap',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://chesstraining.app/training/tactics',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://chesstraining.app/training/endgames',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://chesstraining.app/training/knight-vision',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://chesstraining.app/training/visualisation',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://chesstraining.app/about/ranks-and-badges',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://chesstraining.app/articles',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...tidiedArticles,
    ...tidiedAuthors,
  ]

  pages.sort((a, b) => {
    // sort by priority order, highest first
    return (b.priority ?? 0.5) - (a.priority ?? 0.5)
  })

  return pages
}
