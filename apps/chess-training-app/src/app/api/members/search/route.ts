import { NextResponse } from 'next/server'
import { prisma } from '~/server/db'

const resultsPerPage = 25

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    // Find the user
    const user = await prisma.userProfile.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Count how many users have more experience (to determine rank)
    const rank = await prisma.userProfile.count({
      where: {
        experience: {
          gt: user.experience,
        },
      },
    })

    // Calculate page number (rank + 1 because rank is 0-indexed)
    const actualRank = rank + 1
    const pageNumber = Math.ceil(actualRank / resultsPerPage)

    return NextResponse.json({
      username: user.username,
      rank: actualRank,
      page: pageNumber,
      experience: user.experience,
    })
  } catch (error) {
    console.error('Error searching for user:', error)
    return NextResponse.json(
      { error: 'An error occurred while searching' },
      { status: 500 },
    )
  }
}
