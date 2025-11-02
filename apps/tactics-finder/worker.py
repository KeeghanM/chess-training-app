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
        "pgn": """[Event "FIDE World Cup 2025"]
        [Site "https://lichess.org/broadcast/fide-world-cup-2025--round-1/game-1/t8DzIZPc/pjFW7Z3B"]
        [Date "2025.10.27"]
        [Round "1.1"]
        [White "Abugenda, Nagi"]
        [Black "Erdogmus, Yagiz Kaan"]
        [Result "0-1"]
        [WhiteElo "1972"]
        [WhiteTitle "CM"]
        [WhiteTeam "Libya"]
        [WhiteFideId "9202544"]
        [BlackElo "2651"]
        [BlackTitle "GM"]
        [BlackTeam "Türkiye"]
        [BlackFideId "44599790"]
        [TimeControl ": 90 minutes for the first 40 moves, followed by 30 minutes for the rest of the gamewith an increment of 30 seconds per move starting from move 1"]
        [Variant "Standard"]
        [ECO "C01"]
        [Opening "French Defense: Exchange Variation"]
        [UTCDate "2025.10.27"]
        [UTCTime "13:40:47"]
        [BroadcastName "FIDE World Cup 2025 | Round 1"]
        [BroadcastURL "https://lichess.org/broadcast/fide-world-cup-2025--round-1/game-1/t8DzIZPc"]
        [GameURL "https://lichess.org/broadcast/fide-world-cup-2025--round-1/game-1/t8DzIZPc/pjFW7Z3B"]

        1. e4 { [%eval 0.18] [%clk 1:30:54] } 1... e6 { [%eval 0.22] [%clk 1:30:57] } 2. d4 { [%eval 0.29] [%clk 1:24:53] } 2... d5 { [%eval 0.31] [%clk 1:31:15] } 3. exd5 { [%eval 0.13] [%clk 1:25:07] } 3... exd5 { [%eval 0.14] [%clk 1:31:40] } 4. Bd3 { [%eval 0.05] [%clk 1:24:41] } 4... Nc6 { [%eval 0.17] [%clk 1:31:24] } 5. c3 { [%eval 0.13] [%clk 1:24:06] } 5... Bd6 { [%eval 0.09] [%clk 1:31:34] } 6. h3 { [%eval -0.15] [%clk 1:23:27] } 6... Nge7 { [%eval 0.14] [%clk 1:18:13] } 7. Qf3 { [%eval 0.0] [%clk 1:18:40] } 7... O-O { [%eval 0.11] [%clk 1:03:04] } 8. Ne2 { [%eval -0.08] [%clk 1:15:29] } 8... Ng6 { [%eval -0.05] [%clk 1:01:45] } 9. h4?! { [%eval -0.87] } { Inaccuracy. Qh5 was best. } { [%clk 0:59:39] } 9... Re8 { [%eval -1.1] [%clk 0:50:39] } 10. g3?? { [%eval -3.92] } { Blunder. Na3 was best. } { [%clk 0:53:52] } 10... Nce5 { [%eval -3.92] [%clk 0:44:23] } 11. dxe5 { [%eval -4.05] [%clk 0:46:23] } 11... Nxe5 { [%eval -4.08] [%clk 0:44:50] } 12. Qxd5 { [%eval -3.96] [%clk 0:37:28] } 12... Be6 { [%eval -4.1] [%clk 0:37:37] } 13. Qe4 { [%eval -4.22] [%clk 0:25:17] } 13... f5 { [%eval -4.07] [%clk 0:38:02] } 14. Qe3 { [%eval -4.17] [%clk 0:02:29] } 14... Bd5 { [%eval -3.98] [%clk 0:38:28] } 15. Kf1?! { [%eval -6.03] } { Inaccuracy. O-O was best. } { [%clk 0:01:51] } 15... Bxh1 { [%eval -5.98] [%clk 0:36:01] } 16. Bxf5 { [%eval -6.82] [%clk 0:00:34] } 16... Bc5 { [%eval -6.52] [%clk 0:36:13] } 17. Qg5?? { [%eval #-1] } { Checkmate is now unavoidable. Qd2 was best. } { [%clk 0:00:31] } 17... Qd1# { [%clk 0:36:09] } 0-1


        [Event "FIDE World Cup 2025"]
        [Site "https://lichess.org/broadcast/fide-world-cup-2025--round-1/game-1/t8DzIZPc/vLMnoCct"]
        [Date "2025.10.31"]
        [Round "1.2"]
        [White "Xiong, Jeffery"]
        [Black "Li, Yiheng"]
        [Result "1-0"]
        [WhiteElo "2649"]
        [WhiteTitle "GM"]
        [WhiteTeam "USA"]
        [WhiteFideId "2047640"]
        [BlackElo "1994"]
        [BlackTitle "CM"]
        [BlackTeam "Hong Kong, China"]
        [BlackFideId "6006760"]
        [TimeControl ": 90 minutes for the first 40 moves, followed by 30 minutes for the rest of the gamewith an increment of 30 seconds per move starting from move 1"]
        [Variant "Standard"]
        [ECO "B90"]
        [Opening "Sicilian Defense: Najdorf Variation, Adams Attack"]
        [UTCDate "2025.10.31"]
        [UTCTime "23:04:25"]
        [BroadcastName "FIDE World Cup 2025 | Round 1"]
        [BroadcastURL "https://lichess.org/broadcast/fide-world-cup-2025--round-1/game-1/t8DzIZPc"]
        [GameURL "https://lichess.org/broadcast/fide-world-cup-2025--round-1/game-1/t8DzIZPc/vLMnoCct"]

        1. e4 { [%eval 0.18] [%clk 1:30:55] } 1... c5 { [%eval 0.24] [%clk 1:30:52] } 2. Nf3 { [%eval 0.2] [%clk 1:31:10] } 2... d6 { [%eval 0.31] [%clk 1:31:14] } 3. d4 { [%eval 0.22] [%clk 1:31:22] } 3... cxd4 { [%eval 0.19] [%clk 1:31:33] } 4. Nxd4 { [%eval 0.18] [%clk 1:31:37] } 4... Nf6 { [%eval 0.31] [%clk 1:31:54] } 5. Nc3 { [%eval 0.32] [%clk 1:31:46] } 5... a6 { [%eval 0.25] [%clk 1:32:15] } 6. h3 { [%eval 0.14] [%clk 1:31:51] } 6... e5 { [%eval 0.21] [%clk 1:32:28] } 7. Nde2 { [%eval 0.19] [%clk 1:32:02] } 7... h5 { [%eval 0.26] [%clk 1:32:39] } 8. g3 { [%eval 0.39] [%clk 1:32:07] } 8... Be7 { [%eval 0.19] [%clk 1:32:30] } 9. Bg2 { [%eval 0.21] [%clk 1:32:03] } 9... b5 { [%eval 0.32] [%clk 1:32:14] } 10. Nd5 { [%eval 0.27] [%clk 1:31:54] } 10... Nxd5 { [%eval 0.31] [%clk 1:32:01] } 11. Qxd5 { [%eval 0.27] [%clk 1:32:18] } 11... Ra7 { [%eval 0.23] [%clk 1:32:19] } 12. Be3 { [%eval 0.42] [%clk 1:32:17] } 12... Rb7 { [%eval 0.23] [%clk 1:32:16] } 13. Qd2 { [%eval 0.21] [%clk 1:32:11] } 13... Nd7 { [%eval 0.04] [%clk 1:30:53] } 14. b3 { [%eval 0.23] [%clk 1:32:26] } 14... Nf6 { [%eval 0.1] [%clk 1:28:18] } 15. O-O-O { [%eval 0.25] [%clk 1:31:39] } 15... O-O { [%eval 0.36] [%clk 1:22:44] } 16. g4 { [%eval 0.21] [%clk 1:31:26] } 16... h4 { [%eval 0.31] [%clk 1:02:20] } 17. Rhg1 { [%eval 0.39] [%clk 1:31:43] } 17... Nh7 { [%eval 0.26] [%clk 0:53:15] } 18. f4 { [%eval 0.37] [%clk 1:32:02] } 18... exf4 { [%eval 0.34] [%clk 0:51:33] } 19. Nxf4 { [%eval 0.48] [%clk 1:29:09] } 19... Rd7 { [%eval 0.61] [%clk 0:46:22] } 20. Kb1 { [%eval 0.1] [%clk 1:24:44] } 20... Bg5 { [%eval 0.25] [%clk 0:40:04] } 21. Rgf1 { [%eval -0.18] [%clk 1:16:36] } 21... Re8 { [%eval -0.16] [%clk 0:36:27] } 22. Qf2 { [%eval -0.05] [%clk 1:00:56] } 22... Bb7 { [%eval -0.05] [%clk 0:33:03] } 23. Bb6 { [%eval -0.21] [%clk 1:00:52] } 23... Qe7 { [%eval 0.05] [%clk 0:26:37] } 24. Nd5 { [%eval 0.06] [%clk 0:51:37] } 24... Bxd5 { [%eval 0.06] [%clk 0:24:56] } 25. Rxd5 { [%eval 0.02] [%clk 0:52:03] } 25... Bf6 { [%eval 0.07] [%clk 0:19:43] } 26. Bd4 { [%eval 0.0] [%clk 0:48:00] } 26... Bxd4 { [%eval 0.0] [%clk 0:18:03] } 27. Qxd4 { [%eval 0.0] [%clk 0:47:57] } 27... Ng5 { [%eval 0.0] [%clk 0:11:32] } 28. Kb2 { [%eval -0.09] [%clk 0:47:32] } 28... Ne6 { [%eval 0.0] [%clk 0:09:52] } 29. Qb6 { [%eval -0.49] [%clk 0:47:47] } 29... Qd8 { [%eval 0.05] [%clk 0:06:49] } 30. Qxd8 { [%eval 0.1] [%clk 0:47:16] } 30... Rexd8 { [%eval 0.01] [%clk 0:05:35] } 31. e5 { [%eval -0.17] [%clk 0:47:37] } 31... Nc7?! { [%eval 0.4] } { Inaccuracy. dxe5 was best. } { [%clk 0:04:45] } 32. Rxd6 { [%eval 0.49] [%clk 0:40:17] } 32... Rxd6 { [%eval 0.4] [%clk 0:05:09] } 33. exd6 { [%eval 0.6] [%clk 0:40:45] } 33... Rxd6 { [%eval 0.52] [%clk 0:05:29] } 34. Kc3 { [%eval 0.11] [%clk 0:41:10] } 34... Ne6 { [%eval 0.15] [%clk 0:03:29] } 35. Rf2 { [%eval 0.08] [%clk 0:39:42] } 35... Kf8 { [%eval 0.62] [%clk 0:01:52] } 36. Kb4 { [%eval 0.63] [%clk 0:39:33] } 36... g5 { [%eval 0.98] [%clk 0:00:55] } 37. Ka5 { [%eval 0.84] [%clk 0:34:25] } 37... Nf4 { [%eval 0.9] [%clk 0:00:40] } 38. Bf1 { [%eval 1.02] [%clk 0:34:51] } 38... Ke7 { [%eval 1.04] [%clk 0:00:38] } 39. b4?! { [%eval 0.37] } { Inaccuracy. Rf3 was best. } { [%clk 0:33:21] } 39... Rc6 { [%eval 0.81] [%clk 0:00:33] } 40. a4 { [%eval 0.28] [%clk 0:32:21] } 40... bxa4 { [%eval 0.37] [%clk 0:00:35] } 41. c4 { [%eval 0.64] [%clk 0:28:48] } 41... f5?? { [%eval 2.64] } { Blunder. a3 was best. } { [%clk 0:17:14] } 42. gxf5 { [%eval 2.47] [%clk 0:58:08] } 42... Rf6 { [%eval 3.09] [%clk 0:13:11] } 43. c5?! { [%eval 2.28] } { Inaccuracy. Kxa4 was best. } { [%clk 0:52:41] } 43... Rxf5 { [%eval 2.92] [%clk 0:12:15] } 44. Rf3 { [%eval 2.7] [%clk 0:49:50] } 44... Rf6?! { [%eval 3.44] } { Inaccuracy. Re5 was best. } { [%clk 0:04:19] } 45. Bxa6 { [%eval 3.37] [%clk 0:44:12] } 45... Re6 { [%eval 3.45] [%clk 0:00:34] } 46. b5 { [%eval 3.74] [%clk 0:41:09] } 46... Re5 { [%eval 3.53] [%clk 0:00:32] } 47. c6? { [%eval 1.76] } { Mistake. b6 was best. } { [%clk 0:36:42] } 47... Kd6?! { [%eval 2.57] } { Inaccuracy. Nd5 was best. } { [%clk 0:00:34] } 48. Bb7 { [%eval 2.35] [%clk 0:35:38] } 48... Kc7?? { [%eval 4.86] } { Blunder. Nd5 was best. } { [%clk 0:00:33] } 49. Ka6 { [%eval 4.4] [%clk 0:35:51] } 49... Nd5?! { [%eval 6.03] } { Inaccuracy. Rc5 was best. } { [%clk 0:00:32] } 50. b6+ { [%eval 6.07] [%clk 0:33:30] } 50... Kd6 { [%eval 5.85] [%clk 0:00:33] } 51. Ka7 { [%eval 5.51] [%clk 0:29:53] } 51... Re7?! { [%eval 8.48] } { Inaccuracy. Ne7 was best. } { [%clk 0:00:31] } 52. Rd3 { [%eval 7.95] [%clk 0:30:07] } 52... Re8 { [%eval 12.67] [%clk 0:00:08] } 53. c7 { [%eval 11.56] [%clk 0:30:29] } 1-0


        [Event "FIDE World Cup 2025"]
        [Site "https://lichess.org/broadcast/fide-world-cup-2025--round-1/game-1/t8DzIZPc/b0eP7FAA"]
        [Date "2025.10.31"]
        [Round "1.3"]
        [White "Qin, Oscar Shu Xuan"]
        [Black "Rodshtein, Maxim"]
        [Result "0-1"]
        [WhiteElo "2078"]
        [WhiteTitle "CM"]
        [WhiteTeam "New Zealand"]
        [WhiteFideId "4304314"]
        [BlackElo "2611"]
        [BlackTitle "GM"]
        [BlackTeam "Israel"]
        [BlackFideId "2806851"]
        [TimeControl ": 90 minutes for the first 40 moves, followed by 30 minutes for the rest of the gamewith an increment of 30 seconds per move starting from move 1"]
        [Variant "Standard"]
        [ECO "B40"]
        [Opening "Sicilian Defense: French Variation, Westerinen Attack"]
        [UTCDate "2025.10.31"]
        [UTCTime "23:04:25"]
        [BroadcastName "FIDE World Cup 2025 | Round 1"]
        [BroadcastURL "https://lichess.org/broadcast/fide-world-cup-2025--round-1/game-1/t8DzIZPc"]
        [GameURL "https://lichess.org/broadcast/fide-world-cup-2025--round-1/game-1/t8DzIZPc/b0eP7FAA"]

        1. e4 { [%eval 0.18] [%clk 1:30:56] } 1... c5 { [%eval 0.24] [%clk 1:30:51] } 2. Nf3 { [%eval 0.2] [%clk 1:31:18] } 2... e6 { [%eval 0.28] [%clk 1:30:53] } 3. b3 { [%eval 0.16] [%clk 1:31:28] } 3... Nc6 { [%eval 0.19] [%clk 1:29:23] } 4. Bb2 { [%eval 0.17] [%clk 1:31:46] } 4... Nf6 { [%eval 0.24] [%clk 1:25:53] } 5. e5 { [%eval 0.27] [%clk 1:31:33] } 5... Nd5 { [%eval 0.27] [%clk 1:24:53] } 6. c4 { [%eval 0.19] [%clk 1:26:55] } 6... Nc7 { [%eval 0.17] [%clk 1:20:39] } 7. g3 { [%eval 0.27] [%clk 1:21:41] } 7... Be7 { [%eval 0.07] [%clk 1:10:58] } 8. Bg2 { [%eval 0.11] [%clk 1:16:49] } 8... O-O { [%eval 0.09] [%clk 1:09:54] } 9. O-O { [%eval 0.11] [%clk 1:12:25] } 9... d5 { [%eval 0.17] [%clk 1:02:43] } 10. exd6 { [%eval 0.02] [%clk 0:46:44] } 10... Qxd6 { [%eval -0.01] [%clk 1:03:06] } 11. Nc3 { [%eval 0.08] [%clk 0:43:54] } 11... Rd8 { [%eval 0.37] [%clk 1:01:21] } 12. Ne4 { [%eval 0.18] [%clk 0:42:17] } 12... Qd7 { [%eval 0.12] [%clk 1:01:00] } 13. Qe2 { [%eval -0.14] [%clk 0:39:50] } 13... f6 { [%eval -0.17] [%clk 0:57:18] } 14. Bh3 { [%eval -0.47] [%clk 0:32:30] } 14... Qe8 { [%eval -0.45] [%clk 0:54:10] } 15. Qe3 { [%eval -0.77] [%clk 0:30:35] } 15... e5 { [%eval -0.6] [%clk 0:45:21] } 16. Bxc8?! { [%eval -1.18] } { Inaccuracy. Bg2 was best. } { [%clk 0:26:24] } 16... Raxc8 { [%eval -1.21] [%clk 0:45:44] } 17. Nxc5?! { [%eval -2.21] } { Inaccuracy. Rad1 was best. } { [%clk 0:24:46] } 17... Bxc5 { [%eval -1.95] [%clk 0:44:35] } 18. Qxc5 { [%eval -2.05] [%clk 0:25:08] } 18... Rd3 { [%eval -2.02] [%clk 0:43:42] } 19. Ne1 { [%eval -1.97] [%clk 0:20:16] } 19... Ne6 { [%eval -2.03] [%clk 0:41:33] } 20. Qb5 { [%eval -2.42] [%clk 0:17:20] } 20... Rxd2 { [%eval -2.32] [%clk 0:40:17] } 21. Bc3 { [%eval -2.38] [%clk 0:17:28] } 21... Rd7 { [%eval -2.53] [%clk 0:40:21] } 22. Nc2 { [%eval -2.93] [%clk 0:15:28] } 22... Qg6 { [%eval -3.1] [%clk 0:37:00] } 23. Ne3 { [%eval -2.96] [%clk 0:14:15] } 23... Qe4 { [%eval -2.93] [%clk 0:34:23] } 24. Rfd1 { [%eval -2.96] [%clk 0:12:03] } 24... a6 { [%eval -2.95] [%clk 0:30:24] } 25. Qb6 { [%eval -3.0] [%clk 0:09:31] } 25... Ncd4 { [%eval -3.0] [%clk 0:25:44] } 26. Bxd4 { [%eval -2.83] [%clk 0:08:21] } 26... Nxd4 { [%eval -2.62] [%clk 0:26:07] } 27. Ng2 { [%eval -3.07] [%clk 0:04:28] } 27... Rcd8 { [%eval -3.21] [%clk 0:24:07] } 28. Rf1?! { [%eval -4.95] } { Inaccuracy. Kh1 was best. } { [%clk 0:04:50] } 28... Rd6 { [%eval -4.69] [%clk 0:19:30] } 29. Qa5?! { [%eval -6.05] } { Inaccuracy. Qa7 was best. } { [%clk 0:04:35] } 29... Nf3+ { [%eval -5.74] [%clk 0:19:14] } 30. Kh1 { [%eval -5.76] [%clk 0:05:01] } 30... Qf5 { [%eval -4.69] [%clk 0:18:42] } 31. Ne1 { [%eval -4.72] [%clk 0:02:43] } 31... h5 { [%eval -4.6] [%clk 0:18:02] } 32. Qc3 { [%eval -4.93] [%clk 0:02:08] } 32... Rd3 { [%eval -4.93] [%clk 0:18:15] } 33. Qb4 { [%eval -5.03] [%clk 0:01:42] } 33... Nxe1?! { [%eval -3.52] } { Inaccuracy. R3d4 was best. } { [%clk 0:15:39] } 34. Raxe1 { [%eval -3.36] [%clk 0:01:34] } 34... Qf3+ { [%eval -3.25] [%clk 0:16:02] } 35. Kg1 { [%eval -4.45] [%clk 0:02:02] } 35... h4 { [%eval -3.75] [%clk 0:16:23] } 36. Re3?? { [%eval -8.35] } { Blunder. Qe7 was best. } { [%clk 0:01:07] } 36... Rxe3 { [%eval -8.1] [%clk 0:16:40] } 37. fxe3 { [%eval -8.03] [%clk 0:01:34] } 37... Qxe3+ { [%eval #-10] [%clk 0:17:04] } 38. Kh1 { [%eval #-7] [%clk 0:01:51] } 38... Qe4+ { [%eval #-6] [%clk 0:17:00] } 39. Kg1 { [%eval #-6] [%clk 0:02:15] } 39... h3 { [%eval #-5] [%clk 0:17:23] } 0-1
        """,
        "userId": "dev-user",
        "setId": "dev-set"
    }
    redis_client.lpush(REDIS_QUEUE, json.dumps(sample_job))
    print(f"Seeded {REDIS_QUEUE} with a sample job")

def clean_pgn(pgn: str) -> str:
    return "\n".join(line.lstrip() for line in pgn.splitlines())

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
        exporter = chess.pgn.StringExporter(headers=True, variations=True, comments=True)
        pgn_string = game.accept(exporter)

        # Call the analysis function from analyze.py
        # analyze_pgn is expected to return a list of puzzle dictionaries
        puzzles = analyze_pgn(pgn_string, user_id=user_id)

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
            
            pgn_content = clean_pgn(job.get("pgn"))
            user_id = job.get("userId")
            set_id = job.get("setId")

            if not pgn_content or not user_id or not set_id:
                print("Job does not contain pgn, userId, or setId.")
                continue

            print(f"Processing job for setId: {set_id}")
            
            # 1. Parse the PGN into individual games
            game_list = parse_pgn(pgn_content)
            print(game_list)
            
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