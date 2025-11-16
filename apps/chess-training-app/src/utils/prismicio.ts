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
})

export default Prismic
