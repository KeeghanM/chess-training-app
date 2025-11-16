import { NextResponse } from 'next/server'

import { prisma } from '@server/db'

/**
 * Health check endpoint for Docker healthcheck and monitoring
 *
 * Checks:
 * - API is responding
 * - Database connection is working
 * - Returns 200 if healthy, 503 if unhealthy
 */
export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          api: 'up',
          database: 'up',
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Health check failed:', error)

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
          api: 'up',
          database: 'down',
        },
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 },
    )
  }
}
