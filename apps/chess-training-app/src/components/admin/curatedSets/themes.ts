const themes = [
  {
    id: 'advancedPawn',
    description:
      'One of your pawns is deep into the opponent position, maybe threatening to promote.',
    name: 'Advanced pawn',
  },
  {
    id: 'advantage',
    description:
      'Seize your chance to get a decisive advantage. (200cp ≤ eval ≤ 600cp)',
    name: 'Advantage',
  },
  {
    id: 'anastasiaMate',
    description:
      'A knight and rook or queen team up to trap the opposing king between the side of the board and a friendly piece.',
    name: "Anastasia's mate",
  },
  {
    id: 'arabianMate',
    description:
      'A knight and a rook team up to trap the opposing king on a corner of the board.',
    name: 'Arabian mate',
  },
  {
    id: 'attackingF2F7',
    description:
      'An attack focusing on the f2 or f7 pawn, such as in the fried liver opening.',
    name: 'Attacking f2 or f7',
  },
  {
    id: 'attraction',
    description:
      'An exchange or sacrifice encouraging or forcing an opponent piece to a square that allows a follow-up tactic.',
    name: 'Attraction',
  },
  {
    id: 'backRankMate',
    description:
      'Checkmate the king on the home rank, when it is trapped there by its own pieces.',
    name: 'Back rank mate',
  },
  {
    id: 'bishopEndgame',
    description: 'An endgame with only bishops and pawns.',
    name: 'Bishop endgame',
  },
  {
    id: 'bodenMate',
    description:
      'Two attacking bishops on criss-crossing diagonals deliver mate to a king obstructed by friendly pieces.',
    name: "Boden's mate",
  },
  {
    id: 'castling',
    description: 'Bring the king to safety, and deploy the rook for attack.',
    name: 'Castling',
  },
  {
    id: 'capturingDefender',
    description:
      'Removing a piece that is critical to defence of another piece, allowing the now undefended piece to be captured on a following move.',
    name: 'Capture the defender',
  },
  {
    id: 'crushing',
    description:
      'Spot the opponent blunder to obtain a crushing advantage. (eval ≥ 600cp)',
    name: 'Crushing',
  },
  {
    id: 'doubleBishopMate',
    description:
      'Two attacking bishops on adjacent diagonals deliver mate to a king obstructed by friendly pieces.',
    name: 'Double bishop mate',
  },
  {
    id: 'dovetailMate',
    description:
      'A queen delivers mate to an adjacent king, whose only two escape squares are obstructed by friendly pieces.',
    name: 'Dovetail mate',
  },
  {
    id: 'equality',
    description:
      'Come back from a losing position, and secure a draw or a balanced position. (eval ≤ 200cp)',
    name: 'Equality',
  },
  {
    id: 'kingsideAttack',
    description:
      "An attack of the opponent's king, after they castled on the king side.",
    name: 'Kingside attack',
  },
  {
    id: 'clearance',
    description:
      'A move, often with tempo, that clears a square, file or diagonal for a follow-up tactical idea.',
    name: 'Clearance',
  },
  {
    id: 'defensiveMove',
    description:
      'A precise move or sequence of moves that is needed to avoid losing material or another advantage.',
    name: 'Defensive move',
  },
  {
    id: 'deflection',
    description:
      "A move that distracts an opponent piece from another duty that it performs, such as guarding a key square. Sometimes also called 'overloading'.",
    name: 'Deflection',
  },
  {
    id: 'discoveredAttack',
    description:
      'Moving a piece (such as a knight), that previously blocked an attack by a long range piece (such as a rook), out of the way of that piece.',
    name: 'Discovered attack',
  },
  {
    id: 'doubleCheck',
    description:
      "Checking with two pieces at once, as a result of a discovered attack where both the moving piece and the unveiled piece attack the opponent's king.",
    name: 'Double check',
  },
  {
    id: 'endgame',
    description: 'A tactic during the last phase of the game.',
    name: 'Endgame',
  },
  {
    id: 'enPassant',
    description:
      'A tactic involving the en passant rule, where a pawn can capture an opponent pawn that has bypassed it using its initial two-square move.',
    name: 'En passant',
  },
  {
    id: 'exposedKing',
    description:
      'A tactic involving a king with few defenders around it, often leading to checkmate.',
    name: 'Exposed king',
  },
  {
    id: 'fork',
    description:
      'A move where the moved piece attacks two opponent pieces at once.',
    name: 'Fork',
  },
  {
    id: 'hangingPiece',
    description:
      'A tactic involving an opponent piece being undefended or insufficiently defended and free to capture.',
    name: 'Hanging piece',
  },
  {
    id: 'hookMate',
    description:
      "Checkmate with a rook, knight, and pawn along with one enemy pawn to limit the enemy king's escape.",
    name: 'Hook mate',
  },
  {
    id: 'interference',
    description:
      'Moving a piece between two opponent pieces to leave one or both opponent pieces undefended, such as a knight on a defended square between two rooks.',
    name: 'Interference',
  },
  {
    id: 'intermezzo',
    description:
      "Instead of playing the expected move, first interpose another move posing an immediate threat that the opponent must answer. Also known as 'Zwischenzug' or 'In between'.",
    name: 'Intermezzo',
  },
  {
    id: 'knightEndgame',
    description: 'An endgame with only knights and pawns.',
    name: 'Knight endgame',
  },
  {
    id: 'long',
    description: 'Three moves to win.',
    name: 'Long puzzle',
  },
  {
    id: 'master',
    description: 'Puzzles from games played by titled players.',
    name: 'Master games',
  },
  {
    id: 'masterVsMaster',
    description: 'Puzzles from games between two titled players.',
    name: 'Master vs Master games',
  },
  {
    id: 'mate',
    description: 'Win the game with style.',
    name: 'Checkmate',
  },
  {
    id: 'mateIn1',
    description: 'Deliver checkmate in one move.',
    name: 'Mate in 1',
  },
  {
    id: 'mateIn2',
    description: 'Deliver checkmate in two moves.',
    name: 'Mate in 2',
  },
  {
    id: 'mateIn3',
    description: 'Deliver checkmate in three moves.',
    name: 'Mate in 3',
  },
  {
    id: 'mateIn4',
    description: 'Deliver checkmate in four moves.',
    name: 'Mate in 4',
  },
  {
    id: 'mateIn5',
    description: 'Figure out a long mating sequence.',
    name: 'Mate in 5 or more',
  },
  {
    id: 'middlegame',
    description: 'A tactic during the second phase of the game.',
    name: 'Middlegame',
  },
  {
    id: 'oneMove',
    description: 'A puzzle that is only one move long.',
    name: 'One-move puzzle',
  },
  {
    id: 'opening',
    description: 'A tactic during the first phase of the game.',
    name: 'Opening',
  },
  {
    id: 'pawnEndgame',
    description: 'An endgame with only pawns.',
    name: 'Pawn endgame',
  },
  {
    id: 'pin',
    description:
      'A tactic involving pins, where a piece is unable to move without revealing an attack on a higher value piece.',
    name: 'Pin',
  },
  {
    id: 'promotion',
    description: 'Promote one of your pawn to a queen or minor piece.',
    name: 'Promotion',
  },
  {
    id: 'queenEndgame',
    description: 'An endgame with only queens and pawns.',
    name: 'Queen endgame',
  },
  {
    id: 'queenRookEndgame',
    description: 'An endgame with only queens, rooks and pawns.',
    name: 'Queen and Rook',
  },
  {
    id: 'queensideAttack',
    description:
      "An attack of the opponent's king, after they castled on the queen side.",
    name: 'Queenside attack',
  },
  {
    id: 'quietMove',
    description:
      'A move that does neither make a check or capture, nor an immediate threat to capture, but does prepare a more hidden unavoidable threat for a later move.',
    name: 'Quiet move',
  },
  {
    id: 'rookEndgame',
    description: 'An endgame with only rooks and pawns.',
    name: 'Rook endgame',
  },
  {
    id: 'sacrifice',
    description:
      'A tactic involving giving up material in the short-term, to gain an advantage again after a forced sequence of moves.',
    name: 'Sacrifice',
  },
  {
    id: 'short',
    description: 'Two moves to win.',
    name: 'Short puzzle',
  },
  {
    id: 'skewer',
    description:
      'A motif involving a high value piece being attacked, moving out the way, and allowing a lower value piece behind it to be captured or attacked, the inverse of a pin.',
    name: 'Skewer',
  },
  {
    id: 'smotheredMate',
    description:
      'A checkmate delivered by a knight in which the mated king is unable to move because it is surrounded (or smothered) by its own pieces.',
    name: 'Smothered mate',
  },
  {
    id: 'superGM',
    description: 'Puzzles from games played by the best players in the world.',
    name: 'Super GM games',
  },
  {
    id: 'trappedPiece',
    description: 'A piece is unable to escape capture as it has limited moves.',
    name: 'Trapped piece',
  },
  {
    id: 'underPromotion',
    description: 'Promotion to a knight, bishop, or rook.',
    name: 'Underpromotion',
  },
  {
    id: 'veryLong',
    description: 'Four moves or more to win.',
    name: 'Very long puzzle',
  },
  {
    id: 'xRayAttack',
    description: 'A piece attacks or defends a square, through an enemy piece.',
    name: 'X-Ray attack',
  },
  {
    id: 'zugzwang',
    description:
      'The opponent is limited in the moves they can make, and all moves worsen their position.',
    name: 'Zugzwang',
  },
  {
    id: 'healthyMix',
    description:
      "A bit of everything. You don't know what to expect, so you remain ready for anything! Just like in real games.",
    name: 'Healthy mix',
  },
]

export default themes
