import { getUserServer } from "~/app/_util/getUserServer";
import { errorResponse, successResponse } from "~/app/api/responses";
import { prisma } from "~/server/db";

export async function POST(request: Request) {
  const { user } = await getUserServer();
  if (!user) return errorResponse("Not logged in", 401);

  const { roundId, timeTaken } = (await request.json()) as {
    timeTaken: number;
    roundId: string;
  };
  if (!roundId || !timeTaken) return errorResponse("Missing fields", 400);

  try {
    await prisma.tacticsSetRound.update({
      where: {
        id: roundId,
        set: {
          userId: user.id,
        },
      },
      data: {
        timeSpent: {
          increment: timeTaken,
        },
      },
    });

    return successResponse("Time taken updated", {}, 200);
  } catch (e) {
    if (e instanceof Error) return errorResponse(e.message, 500);

    return errorResponse("Unknown error", 500);
  }
}
