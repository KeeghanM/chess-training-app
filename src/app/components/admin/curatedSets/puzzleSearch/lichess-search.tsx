import * as Sentry from '@sentry/react';
import Tippy from '@tippyjs/react';
import { useState } from 'react';

import type { ResponseJson } from '@/app/api/responses';
import { Button } from '@/app/components/_elements/button';
import Spinner from '@/app/components/general/Spinner';

import type { CuratedSetPuzzle } from '../curated-sets-browser';
import themes from '../themes';

export function LiChessSearch({
  setPuzzle,
}: {
  setPuzzle: (puzzle: CuratedSetPuzzle) => void;
}) {
  // Searching
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [filter, setFilter] = useState('');
  const [rating, setRating] = useState(1500);
  const [themeTypeToggle, setThemeTypeToggle] = useState<'ALL' | 'ANY'>('ANY');
  const [puzzleId, setPuzzleId] = useState('' as string);

  // State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleTheme = (theme: string) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter((t) => t !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const getPuzzle = async () => {
    setError('');
    setLoading(true);
    try {
      let puzzle: CuratedSetPuzzle | undefined;
      if (puzzleId) {
        const resp = await fetch(`/api/puzzles/getPuzzleById/${puzzleId}`);
        const json = (await resp.json()) as ResponseJson;
        if (json.message !== 'Puzzle found') throw new Error(json.message);

        puzzle = json.data?.puzzle as CuratedSetPuzzle;
      } else {
        const themesString =
          selectedThemes.length > 0
            ? `[${selectedThemes.map((t) => `"${t}"`).join()}]`
            : undefined;
        const resp = await fetch('/api/puzzles/getPuzzles', {
          method: 'POST',
          body: JSON.stringify({
            rating,
            themes: themesString,
            themesType: themeTypeToggle,
            count: 1,
          }),
        });

        const json = (await resp.json()) as ResponseJson;
        if (json.message !== 'Puzzles found') throw new Error(json.message);
        const puzzles = json.data?.puzzles as CuratedSetPuzzle[];
        puzzle = puzzles[0];
      }

      if (!puzzle) throw new Error('No puzzle found');

      setPuzzle(puzzle);
      setPuzzleId('');
    } catch (e) {
      Sentry.captureException(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center gap-1 text-sm">
        <label htmlFor="rating">Rating</label>
        <input
          className="w-full border border-gray-300 bg-gray-100 px-2 py-1 text-black"
          id="rating"
          name="rating"
          placeholder="Rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-row items-center gap-1">
        <label className="min-w-fit flex-1" htmlFor="themeTypeToggle">
          Theme Match
        </label>
        <select
          className="w-full border border-gray-300 bg-gray-100 px-2 py-1 text-black"
          id="themeTypeToggle"
          name="themeTypeToggle"
          value={themeTypeToggle}
          onChange={(e) => setThemeTypeToggle(e.target.value as 'ALL' | 'ANY')}
        >
          <option value="ALL">All</option>
          <option value="ANY">Any</option>
        </select>
      </div>
      <div className="flex flex-row items-center gap-1">
        <p className="min-w-fit flex-1">
          Themes Selected: {selectedThemes.length}
        </p>
        <input
          className="w-full border border-gray-300 bg-gray-100 px-2 py-1 text-black"
          id="filter"
          name="filter"
          placeholder="Search themes"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-scroll">
        {themes
          .filter(
            (theme) =>
              theme.id.includes(filter) || selectedThemes.includes(theme.id),
          )
          .map((theme, index) => (
            <Tippy key={theme.id} content={theme.description}>
              <button
                className={`cursor-pointer p-1 text-black hover:font-bold ${
                  index % 2 === 0 ? ' bg-gray-200' : ' bg-gray-50'
                }${selectedThemes.includes(theme.id) ? ' bg-green-200' : ''}`}
                onClick={() => toggleTheme(theme.id)}
              >
                {theme.name}
              </button>
            </Tippy>
          ))}
      </div>
      <div className="flex flex-row items-center gap-1">
        <label htmlFor="puzzleId">PuzzleId</label>
        <input
          className="w-full border border-gray-300 px-2 py-1 dark:bg-gray-100"
          id="puzzleId"
          name="puzzleId"
          placeholder="Overrides all the above"
          type="text"
          value={puzzleId}
          onChange={(e) => setPuzzleId(e.target.value)}
        />
      </div>
      <Button disabled={loading} variant="primary" onClick={getPuzzle}>
        {loading ? (
          <>
            Searching... <Spinner />
          </>
        ) : (
          'Search'
        )}
      </Button>
      {error ? <p className="text-red-500">{error}</p> : null}
    </>
  );
}
