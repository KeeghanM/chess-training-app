import os
import requests

from typing import Optional

from chess import Board
from chess.pgn import Headers
from stockfish import Stockfish

from modules.configuration import load_configuration
from modules.converter import uci_to_san
from modules.finder.tactic_finder import TacticFinder
from modules.processor import Processor
from modules.structures.evaluation import Evaluation
from modules.structures.position import Position
from modules.structures.tactic import Tactic
from modules.structures.variations import Variations

configuration = load_configuration()

INPUT_DIRECTORY = configuration["paths"]["processed"]
OUTPUT_DIRECTORY = configuration["paths"]["tactics"]
STOCKFISH_PATH = configuration["paths"]["stockfish"]

STOCKFISH_DEPTH = configuration["stockfish"]["depth"]
STOCKFISH_PARAMETERS = configuration["stockfish"]["parameters"]
STOCKFISH_TOP_MOVES = configuration["stockfish"]["top_moves"]

IGNORE_FIRST_MOVE = configuration["export"]["ignore_first_move"]
SAVE_LAST_OPPONENT_MOVE = configuration["export"]["save_last_opponent_move"]


class Analyzer(Processor):
    def find_variations(
        self,
        moves: list[str],
        starting_position: str,
        headers: Headers,
        output_filename: str,
        stockfish_depth: int = STOCKFISH_DEPTH,
    ) -> tuple[list[Variations], list[Tactic]]:
        stockfish = Stockfish(path=STOCKFISH_PATH, depth=stockfish_depth, parameters=STOCKFISH_PARAMETERS)

        if starting_position:
            board = Board(starting_position)
            stockfish.set_fen_position(starting_position)
        else:
            board = Board()

        variations_list: list[Variations] = []
        tactic_list: list[Tactic] = []
        fens: set[str] = set()

        evaluation = Evaluation.from_evaluation(stockfish.get_evaluation())
        for idx, move in enumerate(moves):
            move_number = (idx + 1 - int(board.turn)) // 2 + 1
            white = board.turn

            fen = stockfish.get_fen_position()

            position = Position(move=move, color=not white, evaluation=evaluation, fen=fen)

            stockfish.make_moves_from_current_position([move])
            evaluation = Evaluation.from_evaluation(stockfish.get_evaluation())
            board_move = uci_to_san(board, move)
            board.push_san(move)

            move_string = f'{move_number}{"." if white else "..."} {board_move} {"   " if white else " "}'



            tactic_finder = TacticFinder(stockfish, not white, starting_position=position, fens=fens)
            variations, tactic = tactic_finder.get_variations(headers=headers)
            fens = fens.union(tactic_finder.visited_fens)

            if tactic and variations:
                tactic_list.append(tactic)
                variations_list.append(variations)
                print(f"Tactic:\n{tactic}")
        return variations_list, tactic_list

    def save_variations(
        self,
        variations_list: list[Variations],
        tactic_list: list[Tactic],
        directory: str,
        ignore_first_move: bool = IGNORE_FIRST_MOVE,
        save_last_opponent_move: bool = SAVE_LAST_OPPONENT_MOVE,
    ) -> None:
        API_ENDPOINT = os.environ.get("API_ENDPOINT", "https://chesstraining.app/api/puzzles")

        for index, (variations, tactic) in enumerate(list(zip(variations_list, tactic_list))):
            game = tactic.to_pgn(
                ignore_first_move=ignore_first_move,
                save_last_opponent_move=save_last_opponent_move,
            )
            pgn_content = str(game)

            # Save the PGN file locally
            prefix = f"tactic_{index:04}"
            pgn_filename = f"{prefix}.pgn"
            pgn_path = os.path.join(directory, pgn_filename)
            with open(pgn_path, "w") as f:
                f.write(pgn_content)

            # Send the PGN to the API
            try:
                payload = {
                    "user_id": self.user_id,
                    "pgn": pgn_content,
                    "source": "user_game"
                }
                response = requests.post(API_ENDPOINT, json=payload)
                response.raise_for_status()
            except requests.exceptions.RequestException as e:
                print(f"Error sending puzzle {index} to API: {e}")

    def __call__(self) -> None:
        game_path = os.path.join(INPUT_DIRECTORY, self.filename)
        data = self.preprocess(game_path, OUTPUT_DIRECTORY)

        if data is None:
            return

        (
            moves,
            headers,
            starting_position,
            output_filename,
            directory,
            in_progress_file,
        ) = data
        print(f"Finding tactics for: {output_filename}")

        variations_list: Optional[list[Variations]] = None
        tactic_list: Optional[list[Tactic]] = None

        try:
            if starting_position is None:
                starting_position = ""
            variations_list, tactic_list = self.find_variations(
                moves=moves,
                starting_position=starting_position,
                headers=headers,
                output_filename=output_filename,
            )

        except ValueError as error:
            print(f"Stockfish error: {error}")
        except KeyboardInterrupt:
            raise KeyboardInterrupt("interrupted")

        if variations_list and tactic_list:
            self.save_variations(variations_list, tactic_list, directory)

        os.remove(in_progress_file)
