'use client';

import { Chess } from 'chess.js';
import { useEffect, useState } from 'react';
import type { Arrow } from 'react-chessboard/dist/chessboard/types';

import type { Move } from '@/app/_util/BuildPgn';
import BuildPGN from '@/app/_util/BuildPgn';
import getArrows from '@/app/_util/string-to-arrows';

import ChessBoard from '../../ChessBoard';

import type { UserLineWithData } from './CourseBrowser';
import PgnBrowser from './PgnBrowser';

export function GroupBrowser(props: { lines: UserLineWithData[] }) {
  const pgn = BuildPGN(
    lines.map((line) =>
      line.line.moves.map((move) => {
        return {
          notation: move.move,
          number: move.moveNumber,
          colour: move.colour,
          comment: move.comment?.comment,
          arrows: move.arrows,
          lineId: line.id,
        };
      }),
    ),
  );

  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentMove, setCurrentMove] = useState<Move | undefined>();
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [highlightSquares, setHighlightSquares] = useState<
    Record<string, { backgroundColor: string }>
  >({});

  useEffect(() => {
    if (!currentMove) {
      setArrows([]);
      setHighlightSquares({});
      return;
    }
    const newGame = new Chess();
    const line = lines.find((line) => line.id === currentMove.lineId)!;
    for (const move of line.line.moves) {
      newGame.move(move.move);
      if (
        move.move === currentMove.notation &&
        move.colour === currentMove.colour &&
        move.moveNumber === currentMove.number
      )
        break;
    }

    const lastMove = newGame.history({ verbose: true })[
      newGame.history().length - 1
    ]!;

    setHighlightSquares({
      [lastMove.to]: { backgroundColor: 'rgba(126,34,206, 0.3)' },
      [lastMove.from]: { backgroundColor: 'rgba(126,34,206, 0.3)' },
    });
    setPosition(newGame.fen());
    setGame(newGame);

    if (currentMove.arrows) {
      setArrows(getArrows(currentMove.arrows));
    } else {
      setArrows([]);
    }
  }, [currentMove]);

  useEffect(() => {
    setCurrentMove(undefined);
    setGame(new Chess());
    setPosition(new Chess().fen());
    if (lines[0]) {
      setOrientation(lines[0].line.colour.toLowerCase() as 'white' | 'black');
    }
  }, [lines]);

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <div>
        <ChessBoard
          enableArrows
          enableHighlights
          additionalArrows={arrows}
          additionalSquares={highlightSquares}
          game={game}
          moveMade={null}
          orientation={orientation}
          position={position}
          readyForInput={false}
          soundEnabled={soundEnabled}
        />
      </div>
      <div className="max-w-[500px] flex-1">
        <PgnBrowser
          currentMove={currentMove}
          moveSelected={setCurrentMove}
          pgn={pgn}
        />
      </div>
    </div>
  );
}
