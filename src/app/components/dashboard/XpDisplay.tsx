'use client';

import Tippy from '@tippyjs/react';
import Link from 'next/link';

import 'tippy.js/dist/tippy.css';

interface XpDisplayProps {
  data: {
    currentXp: number;
    rank: {
      rank: string;
      name: string;
      xp: number;
    };
    nextRank: {
      rank: string;
      name: string;
      xp: number;
    };
    percentage: number;
  };
  displayLink?: boolean;
}
export function XpDisplay(props: XpDisplayProps) {
  const { currentXp, rank, nextRank, percentage } = data;
  const displayLink = displayLink ?? true;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-fit w-fit  flex-row items-center border-2 border-orange-500 bg-white">
        <Tippy content="Experience gained from training puzzles, and studying courses.">
          <div className="px-2">
            <p className="px-4 text-sm">
              {currentXp.toLocaleString('en-GB')}
              {nextRank ? (
                <span>/{nextRank.xp.toLocaleString('en-GB')}xp</span>
              ) : null}
            </p>
            <div className="h-3 w-full bg-purple-200">
              <div
                className="h-full rounded-r-full bg-orange-500"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        </Tippy>
        <Tippy
          content={`Up Next: ${
            nextRank ? `"${nextRank.rank}: ${nextRank.name}"` : 'Max Rank'
          }`}
        >
          <p className="bg-orange-500 p-2 text-white">
            <strong>{rank.rank}:</strong> {rank.name}
          </p>
        </Tippy>
      </div>

      {displayLink ? (
        <div className="flex justify-between gap-2">
          <Link
            className="text-sm text-white underline hover:no-underline"
            href="/members"
          >
            View Leaderboard
          </Link>
          <Link
            className="text-sm text-white underline hover:no-underline"
            href="/about/ranks-and-badges"
          >
            View All Ranks
          </Link>
        </div>
      ) : null}
    </div>
  );
}
