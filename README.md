# 🛡️ Chess Training App Monorepo (AGPLv3)

> **⚠️ Commercial Use Warning:** This project is licensed under the **GNU AGPLv3**.
> If you are a commercial entity intending to use the **Natural Play Learning (NPL)** logic, the **Tactics Finder**, or the **Puzzles API** code in a proprietary service, you must release your source code or obtain a commercial license.

This monorepo houses the **Chess Training App**, a comprehensive platform designed to elevate your chess game. It is supported by a dedicated Puzzles API and a powerful Tactics Finder, working in concert to provide an unparalleled training experience.

## [ChessTraining.app](https://www.chesstraining.app)

### The definitive destination for chess enthusiasts of all skill levels

Our mission is simple yet ambitious: to improve your chess game through innovative, science-backed training methods. ChessTraining.app is designed to cater to players of all levels, from those taking their first steps on the chessboard to those seeking to refine their grandmaster-level tactics as a dedicated chess trainer.

Built by a solo dev - [Hi! That's Me!](https://github.com/KeeghanM/) - as a passion project that I hope to one day turn profitable.

### 🌟 Core Technology: Natural Play Learning (NPL)

**NPL** is a proprietary algorithmic approach to Spaced Repetition developed exclusively for this platform.

- **The Logic:** It utilizes a custom state-machine to track "known" positions versus "unknown" deviations.
- **The Benefit:** Unlike standard spaced repetition that forces re-learning of full lines, NPL creates a "Context-Aware" learning path, only interrupting the user when they deviate from the optimal line or encounter a new novelty.

_(Note: The logic and code implementation of NPL in this repository are strictly protected under the AGPLv3.)_

### Current Features

- **[Natural Play Learning](https://www.chesstraining.app/about/features/natural-play-learning)**: Chessable, but better! A unique method that adapts to your learning curve, focusing on new challenges and reinforcing concepts as needed.
- **Tactics Trainer**: Sharpen your tactical vision using the [WoodPecker Method](https://www.chesstraining.app/about/features/woodpecker-method), with puzzles generated based on themes or covering the whole remit of chess tactics.
- **Endgame Trainer**: Improve your endgame skills with tailored training covering all major piece endgames.
- **Visualisation Training**: Enhance your ability to foresee multiple moves ahead and improve your strategic planning.
- **Recall Training**: Enhance your board recall by memorising pieces, try it under time pressure for a real challenge.
- **Tactics Generator**: Generate tactics sets from your own games.

See the [full product roadmap](https://www.chesstraining.app/product-roadmap) here

---

## [ChessPuzzle API](https://rapidapi.com/KeeghanM/api/chess-puzzles)

### A Simple API to access over 2 Million Chess Puzzles

The Chess Training App utilizes this API to fetch chess puzzles. This API is also publicly available and provides access to over 2 million chess puzzles, sourced from LiChess (though it is a 3rd-party solution not affiliated with LiChess).

If you wish to access the LiChess puzzle collection yourself you can [do so here](https://database.lichess.org/#puzzles)

- **Puzzles Database last updated:** 02/10/2025
- **Current Puzzle Count:** 2,137,287

### Puzzle Format

When you query the API you will get back a JSON object containing an array of Puzzle objects. If you request a single puzzle this array will contain a single puzzle object.
Here is an example response:

```json
{
  "puzzles": [
    {
      "puzzleid": "HxxIU",
      "fen": "2r2rk1/3nqp1p/p3p1p1/np1p4/3P4/P1NBP3/1PQ2PPP/2R2RK1 w - - 0 18",
      "moves": ["c3d5", "e6d5", "c2c8", "f8c8"],
      "rating": 1683,
      "ratingdeviation": 74,
      "themes": ["advantage", "hangingPiece", "middlegame", "short"]
    }
  ]
}
```

Moves are in UCI format. Use a chess library to convert them to SAN, for display.
FEN is the position before the opponent makes their move.
The position to present to the player is after applying the first move to that FEN.
The second move is the beginning of the solution.

### Using The API

To access the API you must register with [RapidAPI](https://rapidapi.com/KeeghanM/api/chess-puzzles/) doing so is 100% free, and the API is available for free consumption.

All queries are handled by query string parameters. The currently available parameters are:

#### BLANK

Leaving the query blank and simply hitting the root `/` of the API will return a single random puzzle.

#### id

Passing in an ID will return one puzzle matching that ID. Even if you pass other variables, including an ID overrides them all and will always return a single puzzle matching that id.
If the id is invalid or doesn't match a puzzle in the database, a status 400 error will be returned.

#### rating

Pass an int to return puzzles around this rating level. This uses the ratingVariation of the puzzle to determine if it's within range.
So for example, if you pass `?rating=1500` you could get a puzzle of 1430 if it's rating variation is 70.
The SQL query is `WHERE rating BETWEEN rating-deviation AND rating+deviation`.

#### count

Pass an int between 1 and 500 to return that many puzzles.
If you send a _very_ specific request, you may find you get back less than the requested number.
However, any rating and up to 3 themes should never fail to return 500 matching puzzles.

#### themes

Every puzzle has been tagged with a set of themes.
Pass in an array like `?themes=["endgame","passedPawn","crushing"]`.
To select just one theme, you pass an array with a single item like `?themes=["middlegame"]`.
For a full list of themes see [LiChess Documentation](https://github.com/ornicar/lila/blob/master/translation/source/puzzleTheme.xml).

#### themesType

If you pass more than one theme you **MUST** include a themesType.
This can either be the string `ALL` or `ONE` and sets whether the puzzle must match ALL or only ONE of the submitted themes.

#### playerMoves

Send an int to get puzzles containing that many moves for the player to make.
Majority of puzzles are either 2, 3, or 4 moves.
Any higher and you severely start limiting the number of puzzles available.

---

## Tactic-Finder

The Chess Training App utilizes the Tactic-Finder for advanced tactical analysis. This component is written in Python and is designed to run as a separate server instance.

### Prerequisites

- Docker Desktop
- Node.js (LTS recommended)
- Python 3.x

### Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/KeeghanM/chess-training-app.git
   cd chess-training-app
   ```

2. **Install root dependencies:**

   ```bash
   yarn
   ```

3. **Set up the Chess Training App:**
   Navigate to `apps/chess-training-app` and follow its specific setup instructions if any, otherwise, `yarn dev` should work after root dependencies are installed.

4. **Set up the Puzzles API:**
   Navigate to `apps/puzzles-api` and follow its specific setup instructions if any, otherwise, `yarn dev` should work after root dependencies are installed.

5. **Set up the Tactics Finder:**

   ```bash
   cd apps/tactics-finder
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

   After setting up the virtual environment, you can run the tactics finder as needed.

### Running the applications

- **Chess Training App:**

  ```bash
  cd apps/chess-training-app
  yarn dev
  ```

- **Puzzles API:**

  ```bash
  cd apps/puzzles-api
  yarn dev
  ```

- **Tactics Finder:**
  (Refer to `apps/tactics-finder/README.md` for specific running instructions, as it might be a script or a worker.)

---

## Contributing

We welcome contributions from the community. Whether it's adding new features, fixing bugs, or improving documentation, your help is appreciated. Please raise an issue first to discuss the idea/bug before opening a PR.

## ⚖️ License & Intellectual Property

**ChessTraining.app** is open-sourced under the **GNU Affero General Public License v3 (AGPLv3)**.

### What this means:

1. **Community Use:** You are free to fork, modify, and use this code for education or personal projects, provided your modifications remain open source (AGPL).
2. **Commercial Use:** You **cannot** incorporate the NPL algorithms, the Tactics Finder logic, or the API backend into a closed-source product.
3. **Data Rights:** While chess moves are public domain, the specific _curation_ of courses and the _implementation_ of the NPL state-engine are the intellectual property of the author.

_See the [LICENSE](LICENSE) file for the full legal text._

## Support

If you find ChessTraining.app useful, consider supporting the project by starring it on GitHub or contributing.

If you would like to financially support the development of ChessTraining.app, you can do so through my
<a href="https://www.buymeacoffee.com/KeeghanM" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 180px !important;" ></a>
