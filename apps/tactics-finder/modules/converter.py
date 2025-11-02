import hashlib
import os
import re
import subprocess
from typing import Dict, Tuple, Any, Union, List

import chess
import chess.pgn

from modules.configuration import load_configuration

UCI_MOVE_PATTERN = re.compile(r"[a-h][1-8][a-h][1-8]")
FILENAME_PATTERN = re.compile(r"\d+\.pgn")
SPLIT = True

configuration: Union[Dict[str, Any], List[Any]] = load_configuration()

if not isinstance(configuration, dict):
    raise TypeError("Configuration must be a dictionary.")

INPUT_DIRECTORY: str = configuration["paths"]["processed"]
PGN_EXTRACT_PATH: str = configuration["paths"]["pgn_extract"]
TEMP_FILE: str = configuration["paths"]["temp_file"]


def create_game_from_board(headers: chess.pgn.Headers, board: chess.Board) -> chess.pgn.Game:
    game = chess.pgn.Game.from_board(board)
    for key, value in headers.items():
        if key != "FEN":
            game.headers[key] = value

    return game


def extract_games(pgn: str, output_path: str, temp_file: str = TEMP_FILE) -> None:
    absolute_path: str = os.path.abspath(temp_file)
    with open(absolute_path, "w") as file:
        file.write(pgn)

    filenames: list[str] = [
        filename
        for filename in os.listdir(output_path)
        if re.findall(FILENAME_PATTERN, filename) and filename != ".gitkeep"
    ]

    for filename in filenames:
        os.remove(os.path.join(output_path, filename))

    try:
        subprocess.run(
            [PGN_EXTRACT_PATH, "-#1,0", "-Wuci", absolute_path],
            stdout=subprocess.PIPE,
            cwd=output_path,
        )
    except FileNotFoundError:
        print(f"pgn-extract not found in: {PGN_EXTRACT_PATH}. Please set the path in configuration.json")
        exit(1)


def get_moves(path: str) -> list[str]:
    with open(path, "r") as file:
        result: list[str] = file.read().splitlines()

    moves: list[str] = [line for line in result if line and "[" not in line and re.findall(UCI_MOVE_PATTERN, line)]

    assert len(moves), "No moves in the PGN file"
    return moves[0].lower().split()[:-1]


def convert(pgn_path: str) -> Tuple[str, list[str]]:
    name: str = ""
    if pgn_path:
        with open(pgn_path, "r") as file:
            pgn: str = file.read()
            name = f"[{hashlib.md5(pgn.encode('utf-8')).hexdigest()[:6]}]"

        extract_games(pgn, INPUT_DIRECTORY)

    filenames: list[str] = sorted(
        [filename for filename in os.listdir(INPUT_DIRECTORY) if filename != ".gitkeep"],
        key=lambda x: int(x.split(".")[0]),
    )

    return name, filenames


def uci_to_san(board: chess.Board, move: str) -> str:
    return board.san(chess.Move.from_uci(move))
