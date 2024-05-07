'use client';

import type { Group, Line, Move, UserLine } from '@prisma/client';
import { useState } from 'react';

import type { ResponseJson } from '@/app/api/responses';
import { Button } from '@/app/components/_elements/button';
import PrettyPrintLine from '@/app/components/general/PrettyPrintLine';
import Spinner from '@/app/components/general/Spinner';
import type { Line as NiceLine } from '@/app/components/training/courses/create/parse/ParsePGNtoLineData';

export type ScheduleLine = UserLine & {
  line: Line & {
    group: Group;
    moves: Move[];
  };
};

export function LineRow({
  line,
  courseId,
  minDate,
  onUpdate,
}: {
  line: ScheduleLine;
  courseId: string;
  onUpdate: (id: number) => void;
  minDate: Date;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markForReview = async (lineId: number) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(
        `/api/courses/user/${courseId}/lines/markLineForReview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lineId, minDate }),
        },
      );

      const data = (await resp.json()) as ResponseJson;
      if (data.message !== 'Lines updated') {
        throw new Error('Failed to mark line for review');
      }
      onUpdate(lineId);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const niceLine = {
    moves: line.line.moves.map((move) => ({
      notation: move.move,
      turn: '',
    })),
  } as NiceLine;

  const status: 'unseen' | 'learning' | 'learned' | 'hard' = (() => {
    if (line.timesTrained === 0) return 'unseen';
    if (line.currentStreak > 4 && line.timesCorrect >= line.timesWrong)
      return 'learned';
    if (
      line.currentStreak <= 4 &&
      line.timesTrained > 0 &&
      line.timesCorrect >= line.timesWrong
    )
      return 'learning';
    if (line.timesWrong > line.timesCorrect) return 'hard';
    return 'unseen';
  })();

  return (
    <div
      className={`flex flex-col justify-between gap-2 border-4 bg-purple-700 bg-opacity-20 py-2 text-black dark:text-white md:flex-row ${
        status === 'unseen' ? 'border-gray-300' : ''
      }${status === 'learning' ? 'border-blue-600' : ''}${
        status === 'learned' ? 'border-green-500' : ''
      }${status === 'hard' ? 'border-red-500' : ''}`}
    >
      <div className="px-2">
        <h3 className="mb-2 w-full border-b text-sm italic text-orange-500">
          {line.line.group.groupName}
        </h3>
        <div className="text-sm">
          <PrettyPrintLine line={niceLine} />
        </div>
      </div>
      <div className="mx-2 flex flex-col items-center justify-center border-t pt-2 md:ml-0 md:min-w-fit md:border-l md:border-t-0 md:pl-4">
        <div>
          {line.revisionDate?.toLocaleTimeString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }) ?? 'Not yet seen'}
        </div>
        <Button
          disabled={loading || error !== null}
          variant="primary"
          onClick={() => markForReview(line.id)}
        >
          {loading ? (
            <>
              Marking <Spinner />
            </>
          ) : (
            'Mark for Review'
          )}
        </Button>
      </div>
    </div>
  );
}
