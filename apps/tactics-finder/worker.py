import os
import redis
import requests
import time
import json
from dotenv import load_dotenv
from typing import Optional, Tuple, List
import uuid
import io

import chess.pgn

from analyze import analyze_pgn

load_dotenv()

# Get Redis connection details from environment variables
REDIS_HOST = os.environ.get("REDIS_HOST", "localhost")
REDIS_PORT = int(os.environ.get("REDIS_PORT", 6379))
REDIS_QUEUE = os.environ.get("REDIS_QUEUE", "pgn_queue")
API_URL = os.environ.get("API_URL", "http://chess-training-app:3000/api/tactics/addPuzzleToSet")

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

# DEV seed
if os.environ.get("ENV") == "development":
    sample_job = {
        "pgn": """[Event "FIDE World Cup 2025"]
[Site "https://lichess.org/broadcast/fide-world-cup-2025--round-1/game-1/t8DzIZPc/pjFW7Z3B"]
[Date "2025.10.27"]
[Round "1.1"]
[White "Abugenda, Nagi"]
[Black "Erdogmus, Yagiz Kaan"]
[Result "0-1"]

1. e4 f6 2. d4 g5 3. Nf3""",
        "userId": "dev-user",
        "setId": "dev-set"
    }
    redis_client.lpush(REDIS_QUEUE, json.dumps(sample_job))
    print(f"Seeded {REDIS_QUEUE} with a sample job")


def clean_pgn(pgn: str) -> str:
    """Remove leading whitespace from each line."""
    return "\n".join(line.lstrip() for line in pgn.splitlines())


def parse_pgn(pgn_content: str) -> List[chess.pgn.Game]:
    """Parse PGN content string into a list of individual game objects."""
    game_objects = []
    total_games = 0
    try:
        pgn_io = io.StringIO(pgn_content)
        while (game := chess.pgn.read_game(pgn_io)):
            game_objects.append(game)
            total_games += 1
        print(f"Parsed {total_games} games from the PGN content.")
    except Exception as e:
        print(f"Error parsing PGN content: {e}")
    return game_objects


def game_to_pgn_string(game: chess.pgn.Game) -> str:
    """Convert a chess.pgn.Game object to a PGN string."""
    exporter = chess.pgn.StringExporter(headers=True, variations=True, comments=True)
    return game.accept(exporter)


def generate_and_send_puzzles(
    game: chess.pgn.Game, 
    user_id: str, 
    set_id: str, 
    is_last_puzzle_of_set: bool
) -> None:
    """Generate puzzles from a single game and send them to the API."""
    try:
        # Convert game to PGN string
        pgn_string = game_to_pgn_string(game)

        # Call the analysis function
        # This now works entirely in memory and returns puzzle data
        from modules.finder.analyzer import Analyzer
        
        analyzer = Analyzer(user_id=user_id)
        puzzle_data_list = analyzer(pgn_string)

        if not puzzle_data_list:
            print(f"No puzzles generated for game in set {set_id}.")
            return

        # Send each puzzle to the API
        for i, puzzle_data in enumerate(puzzle_data_list):
            # The last_puzzle flag should be true only for the very last puzzle
            last_puzzle_for_this_call = is_last_puzzle_of_set and (i == len(puzzle_data_list) - 1)

            response = requests.post(API_URL, json={
                "puzzle": {
                    "id": str(uuid.uuid4()),
                    "fen": puzzle_data["fen"],
                    "moves": puzzle_data["moves"],
                    "rating": "1500",
                    "directStart": "true"
                },
                "userId": user_id,
                "setId": set_id,
                "last_puzzle": last_puzzle_for_this_call,
            })
            response.raise_for_status()
            print(f"Sent puzzle {i+1}/{len(puzzle_data_list)} for set {set_id}. Last puzzle for set: {last_puzzle_for_this_call}")

    except requests.exceptions.RequestException as e:
        print(f"Error sending puzzle to API: {e}")
    except Exception as e:
        print(f"ERROR generating or sending puzzles for a game: {e}")


def main() -> None:
    """Main worker loop."""
    print(f"Worker listening for jobs on queue: {REDIS_QUEUE}")

    while True:
        try:
            # Wait for a job on the queue
            result: Optional[Tuple[bytes, bytes]] = redis_client.blpop([REDIS_QUEUE])  # type: ignore
            if result:
                _, job_data = result
            job = json.loads(job_data.decode("utf-8"))
            
            pgn_content = clean_pgn(job.get("pgn", ""))
            user_id = job.get("userId")
            set_id = job.get("setId")

            if not pgn_content or not user_id or not set_id:
                print("Job does not contain pgn, userId, or setId.")
                continue

            print(f"Processing job for setId: {set_id}")
            
            # 1. Parse the PGN into individual games (in memory)
            game_list = parse_pgn(pgn_content)
            print(f"Found {len(game_list)} games to process")
            
            # 2. Process each game and send puzzles to the API
            for i, game_object in enumerate(game_list):
                is_last_game_in_list = (i == len(game_list) - 1)
                generate_and_send_puzzles(game_object, user_id, set_id, is_last_game_in_list)
            
            print(f"Finished processing job for setId: {set_id}")

        except redis.exceptions.ConnectionError as e:
            print(f"Redis connection error: {e}")
            # Wait for a bit before trying to reconnect
            time.sleep(5)
        except json.JSONDecodeError as e:
            print(f"Error decoding job data: {e}")
        except Exception as e:
            print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()