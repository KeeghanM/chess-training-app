import os
import requests
from typing import Optional, List, Tuple
import io

from chess import Board
from chess.pgn import Headers, Game
import chess.pgn
from stockfish import Stockfish

from modules.configuration import load_configuration
from modules.converter import uci_to_san
from modules.finder.tactic_finder import TacticFinder
from modules.structures.evaluation import Evaluation
from modules.structures.position import Position
from modules.structures.tactic import Tactic
from modules.structures.variations import Variations

configuration = load_configuration()

STOCKFISH_PATH = configuration["paths"]["stockfish"]
print(f"Using Stockfish binary at: {STOCKFISH_PATH}")

STOCKFISH_DEPTH = configuration["stockfish"]["depth"]
STOCKFISH_PARAMETERS = configuration["stockfish"]["parameters"]
sf_threads = int(os.getenv("STOCKFISH_THREADS", STOCKFISH_PARAMETERS.get("Threads", 2)))
STOCKFISH_PARAMETERS["Threads"] = sf_threads

STOCKFISH_TOP_MOVES = configuration["stockfish"]["top_moves"]

IGNORE_FIRST_MOVE = configuration["export"]["ignore_first_move"]
SAVE_LAST_OPPONENT_MOVE = configuration["export"]["save_last_opponent_move"]


class Analyzer:
    def __init__(self, user_id: Optional[int] = None):
        self.user_id = user_id
        
    def find_variations(
        self,
        moves: list[str],
        starting_position: str,
        headers: Headers,
        stockfish_depth: int = STOCKFISH_DEPTH,
    ) -> tuple[list[Variations], list[Tactic]]:
        """Find tactical variations from a list of moves."""
        stockfish = Stockfish(
            path=STOCKFISH_PATH,
            depth=stockfish_depth,
            parameters=STOCKFISH_PARAMETERS
        )

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

    def extract_puzzle_data(
        self,
        variations_list: list[Variations],
        tactic_list: list[Tactic],
        ignore_first_move: bool = IGNORE_FIRST_MOVE,
        save_last_opponent_move: bool = SAVE_LAST_OPPONENT_MOVE,
    ) -> List[dict]:
        """Convert tactics to puzzle data and send to API. Returns list of puzzle dicts."""
        API_ENDPOINT = os.environ.get("API_ENDPOINT", "https://chesstraining.app/api/puzzles")
        
        puzzle_data_list = []
        
        for index, (variations, tactic) in enumerate(list(zip(variations_list, tactic_list))):
            # Extract FEN (starting position of the tactic)
            fen = tactic.fen
            
            # Extract moves in SAN notation
            moves = []
            for position in tactic.positions:
                if position.move:
                    moves.append(position.move)
            
            # Create comma-separated moves string
            moves_str = ",".join(moves) if moves else None
            
            puzzle_data = {
                "fen": fen,
                "moves": moves_str,
            }
            puzzle_data_list.append(puzzle_data)
            
            print(f"Puzzle {index}: FEN={fen}, Moves={moves_str}")
                
        return puzzle_data_list

    def preprocess_pgn_string(self, pgn_content: str) -> Optional[Tuple[list[str], Headers, str]]:
        """Extract moves and headers from PGN string."""
        try:
            pgn_io = io.StringIO(pgn_content)
            game = chess.pgn.read_game(pgn_io)
            
            if game is None:
                print("No game found in PGN content.")
                return None

            moves = [move.uci() for move in game.mainline_moves()]
            headers = game.headers
            starting_position = headers.get("FEN", "")
            
            return moves, headers, starting_position
        except Exception as e:
            print(f"Error preprocessing PGN: {e}")
            return None

    def __call__(self, pgn_content: str) -> Optional[List[dict]]:
        """
        Analyze PGN content string directly (no files).
        Returns list of puzzle dicts with {fen, moves} or None if no puzzles found.
        """
        data = self.preprocess_pgn_string(pgn_content)

        if data is None:
            return None

        moves, headers, starting_position = data
        
        print(f"Finding tactics for game: {headers.get('White', '?')} vs {headers.get('Black', '?')}")

        variations_list: Optional[list[Variations]] = None
        tactic_list: Optional[list[Tactic]] = None

        try:
            if starting_position is None:
                starting_position = ""
            variations_list, tactic_list = self.find_variations(
                moves=moves,
                starting_position=starting_position,
                headers=headers,
            )

        except ValueError as error:
            print(f"Stockfish error: {error}")
            return None
        except KeyboardInterrupt:
            raise KeyboardInterrupt("interrupted")

        if variations_list and tactic_list:
            puzzle_data = self.extract_puzzle_data(variations_list, tactic_list)
            return puzzle_data
            
        return None