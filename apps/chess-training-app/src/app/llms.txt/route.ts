import { asText } from '@prismicio/client'

import Prismic from '@utils/prismicio'

// Update this cache once every hour (3600 seconds) so you don't hit Prismic API limits
export const revalidate = 3600

export async function GET() {
  // 1. Fetch your articles dynamically from Prismic
  const articles = await Prismic.getAllByType('article', {
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  })

  // 2. Format the articles into the llms.txt Markdown list format
  const articlesList = articles
    .map((article) => {
      const title = article.data.title
      const url = `/articles/${article.uid}`
      // Get a snippet of the intro for the description, remove newlines to keep it clean
      const description =
        asText(article.data.introduction)
          ?.slice(0, 200)
          .replace(/(\r\n|\n|\r)/gm, ' ') + '...' || 'Chess improvement guide.'

      return `- [${title}](${url}): ${description}`
    })
    .join('\n')

  // 3. Construct the full file content
  const content = `# ChessTraining.app

> The definitive destination for science-backed chess improvement. We provide specialized tools for spaced repetition opening training (Natural Play Learning), tactical pattern recognition (Woodpecker Method), and endgame drills.

## Core Training Tools
- [Natural Play Learning](/about/features/natural-play-learning): Our proprietary "context-aware" spaced repetition engine for learning openings. It mimics real gameplay by only interrupting you when you make a mistake.
- [The Woodpecker Method](/about/features/woodpecker-method): An automated tactical training system based on the method by GMs Axel Smith and Hans Tikkanen.
- [Tactics Trainer](/training/tactics): Generate custom puzzle sets based on your rating and themes from a database of millions of real game positions.
- [Endgame Trainer](/training/endgames): Drill theoretical and practical endgames (Pawn, Rook, Queen, Minor Piece) to convert winning advantages.
- [Visualisation Trainer](/training/visualisation): Improve calculation depth by forcing you to visualize moves without moving pieces on the board.
- [Knight Vision](/training/knight-vision): A fast-paced mini-game to improve board vision and knight geometry.

## Latest Guides & Articles
${articlesList}

## Company & Mission
- [About Us](/about): Our mission to make high-quality chess training accessible to everyone.
- [Product Roadmap](/product-roadmap): Upcoming features and platform development.
- [Contact](/contact): Support and feedback.
`

  // 4. Return the file with the correct text/plain header
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
