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

load_dotenv()

# Get Redis connection details from environment variables
REDIS_HOST = os.environ.get("REDIS_HOST", "localhost")
REDIS_PORT = int(os.environ.get("REDIS_PORT", 6379))
REDIS_QUEUE = os.environ.get("REDIS_QUEUE", "pgn_jobs")

def download_pgn(url: str) -> Optional[str]:
    """Downloads a PGN file from a URL and returns its content."""
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error downloading PGN from {url}: {e}")
        return None

def parse_pgn(pgn_content: str) -> list[str]:
    """Splits a PGN file content into a list of individual game strings."""
    game_strings = []
    total_games = 0
    try:
        pgn_io = io.StringIO(pgn_content)
        while (game := chess.pgn.read_game(pgn_io)):
            game_strings.append(str(game))
            total_games += 1
        print(f"Parsed {total_games} games from the PGN content.")
    except Exception as e:
        print(f"Error parsing PGN content: {e}")
    return game_strings

def process_game(game_string: str, user_id: int) -> None:
    """Processes a single game by calling the analysis logic."""
    try:
        with tempfile.NamedTemporaryFile(mode="w", suffix=".pgn", delete=True, dir=".") as tf:
            tf.write(game_string)
            tf.flush()
            
            # Call the analysis function from analyze.py
            analyze_pgn(os.path.normpath(tf.name), user_id=user_id)
            
        print("Successfully processed a game.")
    except Exception as e:
        print(f"ERROR processing a game: {e}")

def main() -> None:
    """Main worker loop."""
    redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
    print(f"Worker listening for jobs on queue: {REDIS_QUEUE}")

    while True:
        try:
            # Wait for a job on the queue
            result: Optional[Tuple[bytes, bytes]] = redis_client.blpop([REDIS_QUEUE])  # type: ignore
            if result:
                _, job_data = result
            job = json.loads(job_data.decode("utf-8"))
            
            pgn_url = job.get("pgn_url")
            user_id = job.get("user_id")

            if not pgn_url or not user_id:
                print("Job does not contain a pgn_url or user_id.")
                continue

            print(f"Processing job for PGN URL: {pgn_url}")
            
            # 1. Download the PGN file
            pgn_content = download_pgn(pgn_url)
            
            if pgn_content:
                # 2. Parse the PGN into individual games
                game_list = parse_pgn(pgn_content)
                
                # 3. Process each game
                for game_string in game_list:
                    process_game(game_string, user_id)
                
                print(f"Finished processing job for PGN URL: {pgn_url}")

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
