import os
import redis
import requests
import time
import json
import io
import hashlib
from dotenv import load_dotenv
from multiprocessing import Pool

import chess.pgn
from analyze import analyze_pgn  # Assuming analyzer dependency remains

load_dotenv()

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
REDIS_HOST = os.environ.get("REDIS_HOST", "redis")
REDIS_PORT = int(os.environ.get("REDIS_PORT", 6379))
REDIS_QUEUE = os.environ.get("REDIS_QUEUE", "pgn_queue")
PROCESSING_QUEUE = f"{REDIS_QUEUE}_processing"
API_URL = os.environ.get(
    "API_ENDPOINT", "http://chess-training-app:3000/api/tactics/addPuzzleToSet"
)

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)

# ---------------------------------------------------------------------------
# Development Seed
# ---------------------------------------------------------------------------
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
        "setId": "dev-set",
    }
    redis_client.lpush(REDIS_QUEUE, json.dumps(sample_job))
    print(f"Seeded {REDIS_QUEUE} with a sample job")

# ---------------------------------------------------------------------------
# Utility functions
# ---------------------------------------------------------------------------
def clean_pgn(pgn: str) -> str:
    """Remove leading whitespace from each line."""
    return "\n".join(line.lstrip() for line in pgn.splitlines())


def parse_pgn(pgn_content: str) -> list[chess.pgn.Game]:
    """Parse PGN string to a list of Game objects."""
    game_objects: list[chess.pgn.Game] = []
    try:
        pgn_io = io.StringIO(pgn_content)
        while (game := chess.pgn.read_game(pgn_io)):
            game_objects.append(game)
        print(f"Parsed {len(game_objects)} games from PGN.")
    except Exception as e:
        print(f"[parse_pgn] Error parsing PGN: {e}")
    return game_objects


def game_to_pgn_string(game: chess.pgn.Game) -> str:
    """Convert a chess.pgn.Game object to a PGN string."""
    exporter = chess.pgn.StringExporter(headers=True, variations=True, comments=True)
    return game.accept(exporter)


def deterministic_puzzle_id(fen: str, moves: str | None) -> str:
    """Create a deterministic ID from FEN + moves (UUID-like format)."""
    m = hashlib.sha256()
    moves_str = moves or ""
    m.update(f"{fen}|{moves_str}".encode())
    digest = m.hexdigest()
    return (
        f"{digest[:8]}-{digest[8:12]}-{digest[12:16]}-"
        f"{digest[16:20]}-{digest[20:32]}"
    )


# ---------------------------------------------------------------------------
# Core processing
# ---------------------------------------------------------------------------
def generate_and_send_puzzles(
    game: chess.pgn.Game, user_id: str, set_id: str, is_last_puzzle_of_set: bool
) -> None:
    """Generate puzzles from one game and send to API."""
    try:
        pgn_string = game_to_pgn_string(game)

        # Lazy import so worker startup is fast
        from modules.finder.analyzer import Analyzer

        analyzer = Analyzer(user_id=user_id)
        puzzle_data_list = analyzer(pgn_string)

        if not puzzle_data_list:
            print(f"No puzzles generated for game in set {set_id}.")
            return

        for i, puzzle_data in enumerate(puzzle_data_list):
            last_puzzle_for_this_call = (
                is_last_puzzle_of_set and (i == len(puzzle_data_list) - 1)
            )

            puzzle_id = deterministic_puzzle_id(
                puzzle_data.get("fen", ""), puzzle_data.get("moves")
            )

            payload = {
                "puzzle": {
                    "id": puzzle_id,
                    "fen": puzzle_data.get("fen", ""),
                    "moves": puzzle_data.get("moves", ""),
                    "rating": "1500",
                    "directStart": "false",
                },
                "userId": user_id,
                "setId": set_id,
                "last_puzzle": last_puzzle_for_this_call,
            }

            try:
                response = requests.post(API_URL, json=payload, timeout=10)
                response.raise_for_status()
                print(
                    f"✔ Sent puzzle {i+1}/{len(puzzle_data_list)} "
                    f"for set {set_id} (last={last_puzzle_for_this_call})"
                )
            except requests.Timeout:
                print(f"⏱ Timeout sending puzzle {puzzle_id} to API  -  continuing")
            except requests.RequestException as e:
                print(f"⚠ Error sending puzzle {puzzle_id} to API: {e}")

    except Exception as e:
        print(f"❌ ERROR generating puzzles for game in set {set_id}: {e}")


def process_job(job: dict) -> None:
    """Worker job handler."""
    pgn_content = clean_pgn(job.get("pgn", ""))
    user_id = job.get("userId")
    set_id = job.get("setId")

    if not pgn_content or not user_id or not set_id:
        print("⚠ Job missing required fields (pgn/userId/setId)")
        return

    print(f"[Worker] Processing job for set {set_id}")
    game_list = parse_pgn(pgn_content)
    for i, game in enumerate(game_list):
        is_last = i == len(game_list) - 1
        generate_and_send_puzzles(game, user_id, set_id, is_last)
    print(f"[Worker] Completed set {set_id}")


# ---------------------------------------------------------------------------
# Redis queue coordination
# ---------------------------------------------------------------------------
def choose_pool_config(queue_len: int) -> tuple[int, int]:
    """Decide pool size and Stockfish threads based on queue load."""
    if queue_len <= 1:
        return 1, 6
    elif queue_len <= 3:
        return 2, 4
    elif queue_len <= 6:
        return 4, 2
    else:
        return 6, 1


def requeue_stuck_jobs() -> None:
    """Move unfinished jobs from processing queue back to main queue on startup."""
    stuck_jobs = redis_client.lrange(PROCESSING_QUEUE, 0, -1)
    for job_data in stuck_jobs:
        redis_client.rpush(REDIS_QUEUE, job_data)
        redis_client.lrem(PROCESSING_QUEUE, 1, job_data)
    if stuck_jobs:
        print(f"♻ Requeued {len(stuck_jobs)} stuck job(s) from previous run")
    else:
        print("✅ No stuck jobs found")


# ---------------------------------------------------------------------------
# Main loop
# ---------------------------------------------------------------------------
def main() -> None:
    print(f"Worker listening on Redis queue: {REDIS_QUEUE}")

    pool = None
    active_workers = 0
    requeue_stuck_jobs()

    while True:
        try:
            queue_len = redis_client.llen(REDIS_QUEUE)
            desired_workers, sf_threads = choose_pool_config(queue_len)

            if desired_workers != active_workers:
                if pool:
                    pool.terminate()
                    pool.join()
                print(
                    f"Scaling pool → {desired_workers} workers, "
                    f"{sf_threads} Stockfish threads each"
                )
                os.environ["STOCKFISH_THREADS"] = str(sf_threads)
                pool = Pool(desired_workers)
                active_workers = desired_workers

            # Move job atomically from main queue to processing queue
            job_data = redis_client.brpoplpush(REDIS_QUEUE, PROCESSING_QUEUE, timeout=1)

            if not job_data:
                time.sleep(0.2)
                continue

            job = json.loads(job_data.decode("utf-8"))

            def done_callback(_):
                redis_client.lrem(PROCESSING_QUEUE, 1, job_data)

            pool.apply_async(process_job, (job,), callback=done_callback)

        except Exception as e:
            print(f"[Supervisor Error] {e}")
            time.sleep(1)


# ---------------------------------------------------------------------------
# Entrypoint
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    main()