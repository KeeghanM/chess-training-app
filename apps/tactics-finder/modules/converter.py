import hashlib
import re
import subprocess
from typing import Dict, Tuple, Any, Union, List

import chess
import chess.pgn

from modules.configuration import load_configuration

UCI_MOVE_PATTERN = re.compile(r"[a-h][1-8][a-h][1-8]")

configuration: Union[Dict[str, Any], List[Any]] = load_configuration()

if not isinstance(configuration, dict):
    raise TypeError("Configuration must be a dictionary.")

PGN_EXTRACT_PATH: str = configuration["paths"]["pgn_extract"]

def create_game_from_board(headers: chess.pgn.Headers, board: chess.Board) -> chess.pgn.Game:
    """Create a chess.pgn.Game from a board position and headers."""
    game = chess.pgn.Game.from_board(board)
    for key, value in headers.items():
        if key != "FEN":
            game.headers[key] = value

    return game


def extract_games(pgn: str) -> str:
    """
    Extract games from PGN string using pgn-extract tool.
    Converts to UCI format for processing.
    """
    try:
        result = subprocess.run(
            [PGN_EXTRACT_PATH, "-#1,0", "-Wuci"],
            input=pgn,
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout
    except FileNotFoundError:
        print(f"pgn-extract not found in: {PGN_EXTRACT_PATH}. Please set the path in configuration.json")
        exit(1)
    except subprocess.CalledProcessError as e:
        print(f"Error running pgn-extract: {e}")
        print(f"Stderr: {e.stderr}")
        exit(1)


def convert(pgn_content: str) -> Tuple[str, list[str]]:
    """
    Convert PGN content string into individual game PGN strings.
    Returns tuple of (name, list of game PGN strings).
    """
    name: str = ""
    game_pgn_strings: list[str] = []
    
    if pgn_content:
        # Create a hash-based name for tracking
        name = f"[{hashlib.md5(pgn_content.encode('utf-8')).hexdigest()[:6]}]"
        
        # Extract games using pgn-extract
        raw_pgn_output = extract_games(pgn_content)

        # Split the raw output into individual games
        # pgn-extract typically separates games with blank lines
        # Each game starts with '[Event'
        split_games = re.split(r'\n\n(?=\[Event)', raw_pgn_output.strip())
        game_pgn_strings = [game.strip() for game in split_games if game.strip()]

    return name, game_pgn_strings


def uci_to_san(board: chess.Board, move: str) -> str:
    """Convert UCI move notation to SAN notation."""
    return board.san(chess.Move.from_uci(move))