import * as prismic from '@prismicio/client'

const Prismic = prismic.createClient('chess-training-app', {
  routes: [
    {
      type: 'article',
      path: '/articles/:uid',
    },
    {
      type: 'author',
      path: '/articles/author/:uid',
    },
  ],
  fetchOptions:
    process.env.NODE_ENV === 'production'
      ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
      : { next: { revalidate: 5 } },
})

export default Prismic
