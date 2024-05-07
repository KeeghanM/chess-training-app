import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { CustomPuzzle } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';

import { errorResponse, successResponse } from '@/app/api/responses';
import { prisma } from '@/server/db';

export async function POST(request: Request) {
  const session = getKindeServerSession(request);

  const user = await session.getUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const permissions = await session.getPermissions();
  if (!permissions?.permissions.includes('staff-member'))
    return errorResponse('Unauthorized', 401);

  try {
    const { puzzles } = (await request.json()) as {
      puzzles: CustomPuzzle[];
    };

    await prisma.customPuzzle.createMany({
      data: puzzles,
    });

    return successResponse('Puzzles created', { created: puzzles.length }, 200);
  } catch (e) {
    return errorResponse('Internal Server Error', 500);
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  const session = getKindeServerSession(request);

  const user = await session.getUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const permissions = await session.getPermissions();
  if (!permissions?.permissions.includes('staff-member'))
    return errorResponse('Unauthorized', 401);

  try {
    const puzzles = await prisma.customPuzzle.findMany();
    const trainingPuzzles = puzzles.map((p) => {
      return { ...p, puzzleid: p.id, moves: p.moves.split(',') };
    });
    return successResponse('Puzzles found', { puzzles: trainingPuzzles }, 200);
  } catch (e) {
    Sentry.captureException(e);
    return errorResponse('Internal Server Error', 500);
  } finally {
    await prisma.$disconnect();
  }
}
