import argparse
from typing import Optional, Union, Dict, List

from tqdm import tqdm

from modules.configuration import load_configuration
from modules.converter import convert
from modules.finder.analyzer import Analyzer

configuration: Dict = load_configuration()
INPUT_DIRECTORY: str = configuration["paths"]["processed"]
STOCKFISH_DEPTH: int = configuration["stockfish"]["depth"]

def analyze_pgn(pgn_content: str, stockfish_depth: int = STOCKFISH_DEPTH, user_id: Optional[int] = None) -> None:
    name: str
    game_pgn_strings: list[str]
    name, game_pgn_strings = convert(pgn_content)

    with tqdm(game_pgn_strings) as bar:
        for game_pgn_string in bar:
            analyzer = Analyzer(user_id=user_id)
            try:
                analyzer(game_pgn_string)
            except KeyboardInterrupt:
                print("Interrupted.")
                break
            except FileNotFoundError:
                print("Stockfish is not properly installed.")
                break

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        prog="ChessTacticFinder",
        description="A tool for finding tactics out of PGN files.",
    )

    parser.add_argument("pgn", type=str, nargs="?", help="Path to the PGN file.")
    parser.add_argument("--depth", "-d", type=int, help="Stockfish depth", default=STOCKFISH_DEPTH)
    parser.add_argument("--user_id", "-u", type=int, help="User ID", default=None)
    args = parser.parse_args()

    pgn_content = ""
    if args.pgn:
        with open(args.pgn, "r") as file:
            pgn_content = file.read()

    analyze_pgn(pgn_content, args.depth, args.user_id)
