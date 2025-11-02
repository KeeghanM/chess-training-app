import hashlib
import os
from typing import Optional, Tuple

import chess.pgn

from modules.converter import get_moves


class Processor:
    def __init__(self, pgn_content: str, user_id: Optional[int] = None):
        self.pgn_content = pgn_content
        self.user_id = user_id

    @staticmethod
    def preprocess_from_string(self, pgn_content: str, output_directory: str):
        """
        Preprocess PGN string to extract moves, headers, etc.
        Returns the same tuple as `preprocess()`.
        """
        from chess import pgn
        import io
        pgn_io = io.StringIO(pgn_content)
        game = pgn.read_game(pgn_io)
        if game is None:
            print("No game found in PGN content.")
            return None

        moves = [move.uci() for move in game.mainline_moves()]
        headers = game.headers
        starting_position = headers.get("FEN", "")
        output_filename = f"{headers.get('White','?')} vs {headers.get('Black','?')} ({headers.get('Date','????.??.??')})"
        directory = output_directory
        in_progress_file = os.path.join(directory, f".{output_filename}.inprogress")
        return moves, headers, starting_position, output_filename, directory, in_progress_file
