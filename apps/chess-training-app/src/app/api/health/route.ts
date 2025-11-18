import { NextResponse } from 'next/server'

import { prisma } from '@server/db'

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({
      ok: true,
      db: 'up',
      ts: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json({
      ok: true,
      db: 'down',
      ts: new Date().toISOString(),
    })
  }
}
