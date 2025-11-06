import os
import redis
import requests
import time
import json
from dotenv import load_dotenv
from typing import Optional, Tuple, List
from multiprocessing import Pool, cpu_count
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

def process_job(job):
    pgn_content = clean_pgn(job.get("pgn", ""))
    user_id = job.get("userId")
    set_id = job.get("setId")

    if not pgn_content or not user_id or not set_id:
        print("Job missing pgn/userId/setId.")
        return

    print(f"[Pool Worker] Processing job for setId {set_id}")

    game_list = parse_pgn(pgn_content)
    print(f"Found {len(game_list)} games")

    for i, game_object in enumerate(game_list):
        is_last = (i == len(game_list) - 1)
        generate_and_send_puzzles(game_object, user_id, set_id, is_last)

    print(f"[Pool Worker] Completed setId {set_id}")

def choose_pool_config(queue_len):
    if queue_len <= 1:
        return 1, 6  # 1 worker, Stockfish 6 threads
    elif queue_len <= 3:
        return 2, 4
    elif queue_len <= 6:
        return 4, 2
    else:
        return 6, 1  # heavy queue = many workers, low threads

def main():
    print(f"Worker listening on queue: {REDIS_QUEUE}")

    pool = None
    active_workers = 0

    while True:
        try:
            queue_len = redis_client.llen(REDIS_QUEUE)
            desired_workers, sf_threads = choose_pool_config(queue_len)

            # if pool config changed, restart pool
            if desired_workers != active_workers:
                if pool:
                    pool.terminate()
                    pool.join()
                print(f"Scaling pool -> {desired_workers} workers, {sf_threads} SF threads each")
                os.environ["STOCKFISH_THREADS"] = str(sf_threads)
                pool = Pool(desired_workers)
                active_workers = desired_workers

            # non-blocking pop
            job_data = redis_client.lpop(REDIS_QUEUE)
            if not job_data:
                time.sleep(0.2)
                continue

            job = json.loads(job_data.decode("utf-8"))
            pool.apply_async(process_job, (job,))

        except Exception as e:
            print(f"Supervisor error: {e}")
            time.sleep(1)

if __name__ == "__main__":
    main()