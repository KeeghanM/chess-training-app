// const buildToMate = async () => {
//   const resp = await fetch('/api/puzzles/getPuzzles', {
//     method: 'POST',
//     body: JSON.stringify({
//       rating: 2500,
//       themes: '["mateIn4"]',
//       themesType: 'ALL',
//       count: 50,
//     }),
//   })

//   const json = (await resp.json()) as ResponseJson
//   if (json.message != 'Puzzles found') throw new Error(json.message)
//   const puzzles = json.data!.puzzles as TrainingPuzzle[]
//   const mateInFours: TrainingPuzzle[] = []
//   const mateInThrees: TrainingPuzzle[] = []
//   const mateInTwos: TrainingPuzzle[] = []
//   const mateInOnes: TrainingPuzzle[] = []
//   for (const puzzle of puzzles) {
//     const newGame = new Chess(puzzle.fen)
//     mateInFours.push(puzzle)
//     // Make it into a mate in 3 by skipping the first two moves (one for each side)
//     const m3 = { ...puzzle }
//     newGame.move(puzzle.moves[0]!)
//     newGame.move(puzzle.moves[1]!)
//     m3.fen = newGame.fen()
//     m3.moves = puzzle.moves.slice(2)
//     m3.puzzleid = 'cta_' + uuidv4().split('-')[4]
//     mateInThrees.push(m3)
//     // Now a mate in 2
//     const m2 = { ...m3 }
//     newGame.move(puzzle.moves[2]!)
//     newGame.move(puzzle.moves[3]!)
//     m2.fen = newGame.fen()
//     m2.moves = puzzle.moves.slice(4)
//     m2.puzzleid = 'cta_' + uuidv4().split('-')[4]
//     mateInTwos.push(m2)
//     // Now a mate in 1
//     const m1 = { ...m2 }
//     newGame.move(puzzle.moves[4]!)
//     newGame.move(puzzle.moves[5]!)
//     m1.fen = newGame.fen()
//     m1.moves = puzzle.moves.slice(6)
//     m1.puzzleid = 'cta_' + uuidv4().split('-')[4]
//     mateInOnes.push(m1)
//   }

//   let sortOrder = 0
//   for (const puzzle of mateInOnes) {
//     sortOrder++
//     await addPuzzleToSet(puzzle, sortOrder)
//   }
//   for (const puzzle of mateInTwos) {
//     sortOrder++
//     await addPuzzleToSet(puzzle, sortOrder)
//   }
//   for (const puzzle of mateInThrees) {
//     sortOrder++
//     await addPuzzleToSet(puzzle, sortOrder)
//   }
//   for (const puzzle of mateInFours) {
//     sortOrder++
//     await addPuzzleToSet(puzzle, sortOrder)
//   }
// }
