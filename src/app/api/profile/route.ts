import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import * as Sentry from '@sentry/nextjs';

import { AddBadgeToUser } from '@/app/_util/add-badge';
import { errorResponse, successResponse } from '@/app/api/responses';
import { prisma } from '@/server/db';

export async function PUT(request: Request) {
  const session = getKindeServerSession(request);

  const user = await session.getUser();
  if (!user) return errorResponse('Unauthorized', 401);

  const {
    username,
    fullname,
    description,
    highestOnlineRating,
    highestOTBRating,
    puzzleRating,
    difficulty,
    publicProfile,
  } = (await request.json()) as {
    username?: string;
    fullname?: string;
    description?: string;
    highestOnlineRating?: number;
    highestOTBRating?: number;
    puzzleRating?: number;
    difficulty?: number;
    publicProfile?: boolean;
  };

  if (
    !username ||
    !puzzleRating ||
    !difficulty ||
    publicProfile === undefined
  ) {
    return errorResponse('Missing required fields', 400);
  }

  const nameRegex = /[@?#%^*]/g;
  if (
    username.length < 5 ||
    username.length > 150 ||
    nameRegex.test(username)
  ) {
    return errorResponse('Invalid username', 400);
  }

  if (fullname && (fullname.length > 150 || nameRegex.test(fullname))) {
    return errorResponse('Invalid fullname', 400);
  }

  if (description && description.length > 1000) {
    return errorResponse('Invalid description', 400);
  }

  if (
    highestOnlineRating &&
    (highestOnlineRating < 0 || highestOnlineRating > 3500)
  ) {
    return errorResponse('Invalid highestOnlineRating', 400);
  }

  if (highestOTBRating && (highestOTBRating < 0 || highestOTBRating > 3500)) {
    return errorResponse('Invalid highestOTBRating', 400);
  }

  if (puzzleRating < 0 || puzzleRating > 3500) {
    return errorResponse('Invalid puzzleRating', 400);
  }

  if (difficulty < 0 || difficulty > 2) {
    return errorResponse('Invalid difficulty', 400);
  }

  try {
    const existingUsername = await prisma.userProfile.findUnique({
      where: {
        username,
      },
    });
    if (existingUsername && existingUsername.id !== user.id)
      return errorResponse('Username already exists', 400);

    const profile = await prisma.userProfile.update({
      where: {
        id: user.id,
      },
      data: {
        username,
        fullName: fullname,
        description,
        highestOnlineRating,
        highestOTBRating,
        puzzleRating,
        difficulty,
        public: publicProfile,
      },
    });

    if (highestOTBRating && highestOTBRating > 0)
      await AddBadgeToUser(user.id, 'OTB Player');
    if (highestOnlineRating && highestOnlineRating > 0)
      await AddBadgeToUser(user.id, 'Online Player');
    if (description && description.length > 0)
      await AddBadgeToUser(user.id, 'Well Known');

    return successResponse('Profile Updated', { profile }, 200);
  } catch (e) {
    Sentry.captureException(e);
    if (e instanceof Error) return errorResponse(e.message, 500);
    return errorResponse('Unknown error', 500);
  } finally {
    await prisma.$disconnect();
  }
}
