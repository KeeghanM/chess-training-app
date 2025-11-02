import hashlib
import os
from typing import Optional, Tuple

import chess.pgn

from modules.converter import get_moves


class Processor:
    def __init__(self, filename: str, user_id: Optional[int] = None):
        self.filename = filename
        self.user_id = user_id

    @staticmethod
    def preprocess(game_path: str, output_directory: str) -> Optional[Tuple[list[str], chess.pgn.Headers, Optional[str], str, str, str]]:
        moves: list[str] = get_moves(game_path)
        game = chess.pgn.read_game(open(game_path))
        if game is None:
            return None
        game_hash: str = hashlib.md5(str(game).encode()).hexdigest()
        headers: chess.pgn.Headers = game.headers
        starting_position: Optional[str] = headers.get("FEN")

        output_filename: str = (
            f"{headers.get('White', '_')} vs {headers.get('Black', '_')} ({headers.get('Date', '___')}) [{game_hash}]"
        )
        directory: str = os.path.join(output_directory, output_filename)
        in_progress_file: str = os.path.join(directory, ".progress")
        if os.path.isdir(directory):
            if not os.path.exists(in_progress_file):
                print(f"Analysis for {output_filename} are already found.")
                return None
        else:
            os.mkdir(directory)

        open(in_progress_file, "a").close()
        return (
            moves,
            headers,
            starting_position,
            output_filename,
            directory,
            in_progress_file,
        )
