import os
import redis
import requests
import tempfile
from analyze import analyze_pgn
import chess.pgn
import io
import time
import json
from dotenv import load_dotenv
from typing import Optional, Tuple
import uuid

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
        "pgn": "[Event \"Dev Test\"]\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6",
        "userId": "dev-user",
        "setId": "dev-set"
    }
    redis_client.lpush(REDIS_QUEUE, json.dumps(sample_job))
    print(f"Seeded {REDIS_QUEUE} with a sample job")


def parse_pgn(pgn_content: str) -> list[chess.pgn.Game]:
    """Splits a PGN file content into a list of individual game objects."""
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


def generate_and_send_puzzles(game: chess.pgn.Game, user_id: str, set_id: str, is_last_puzzle_of_set: bool) -> None:
    """Generates puzzles from a single game and sends them to the API."""
    try:
        with tempfile.NamedTemporaryFile(mode="w", suffix=".pgn", delete=True, dir=".") as tf:
            exporter = chess.pgn.FileExporter(tf)
            game.export(exporter)
            tf.flush()

            # Call the analysis function from analyze.py
            # analyze_pgn is expected to return a list of puzzle dictionaries
            puzzles = analyze_pgn(os.path.normpath(tf.name), user_id=user_id)

        if not puzzles:
            print(f"No puzzles generated for game in set {set_id}.")
            return

        for i, puzzle in enumerate(puzzles):
            # The last_puzzle flag should be true only for the very last puzzle of the very last game
            last_puzzle_for_this_call = is_last_puzzle_of_set and (i == len(puzzles) - 1)

            puzzle_data = {
                "id": str(uuid.uuid4()), # Generate a unique ID for the custom puzzle
                "fen": puzzle.get("fen"),
                "rating": puzzle.get("rating"),
                "moves": puzzle.get("moves"),
                "comment": puzzle.get("comment"),
                "directStart": puzzle.get("directStart", False),
            }

            response = requests.post(API_URL, json={
                "puzzle": puzzle_data,
                "userId": user_id,
                "setId": set_id,
                "last_puzzle": last_puzzle_for_this_call,
            })
            response.raise_for_status()
            print(f"Sent puzzle {i+1}/{len(puzzles)} for set {set_id}. Last puzzle for set: {last_puzzle_for_this_call}")

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
            
            pgn_content = job.get("pgn")
            user_id = job.get("userId")
            set_id = job.get("setId")

            if not pgn_content or not user_id or not set_id:
                print("Job does not contain pgn, userId, or setId.")
                continue

            print(f"Processing job for setId: {set_id}")
            
            # 1. Parse the PGN into individual games
            game_list = parse_pgn(pgn_content)
            
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