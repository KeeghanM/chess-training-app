const ECO: Record<string, string> = {
  e4nf6: 'Alekhine Defense',
  e4nf6e5nd5d4: 'Alekhine Defense, 2. e5 Nd5 3. d4',
  e4nf6e5nd5d4d6: 'Alekhine Defense, 2. e5 Nd5 3. d4 d6',
  e4nf6e5nd5d4d6c4: 'Alekhine Defense, 3. d4 d6 4. c4',
  e4nf6e5nd5d4d6bc4: 'Alekhine Defense: Balogh Variation',
  e4nf6e5ng8: 'Alekhine Defense: Brooklyn Variation',
  e4nf6e5ng8d4f5: 'Alekhine Defense: Brooklyn Variation, Everglades Variation',
  e4nf6e5nd5na3: 'Alekhine Defense: Buckley Attack',
  e4nf6e5nd5d4d6c4nb6exd6: 'Alekhine Defense: Exchange Variation',
  'e4nf6e5nd5d4d6c4nb6exd6cxd6nc3g6h3bg7nf3o-obe2nc6o-obf5bf4':
    'Alekhine Defense: Exchange Variation, Karpov Variation',
  e4nf6e5nd5d4d6c4nb6f4: 'Alekhine Defense: Four Pawns Attack',
  e4nf6e5nd5d4d6c4nb6f4dxe5fxe5nc6:
    'Alekhine Defense: Four Pawns Attack, 6... Nc6',
  e4nf6e5nd5d4d6c4nb6f4g5:
    'Alekhine Defense: Four Pawns Attack, Cambridge Gambit',
  e4nf6e5nd5d4d6c4nb6f4g6:
    'Alekhine Defense: Four Pawns Attack, Fianchetto Variation',
  e4nf6e5nd5d4d6c4nb6f4dxe5fxe5nc6nf3bg4e6fxe6c5:
    'Alekhine Defense: Four Pawns Attack, Ilyin-Zhenevsky Variation',
  'e4nf6e5nd5d4d6c4nb6f4dxe5fxe5bf5nc3e6nf3be7be2o-oo-of6':
    'Alekhine Defense: Four Pawns Attack, Korchnoi Variation',
  e4nf6e5nd5d4d6c4nb6f4dxe5fxe5nc6be3:
    'Alekhine Defense: Four Pawns Attack, Main Line',
  'e4nf6e5nd5d4d6c4nb6f4dxe5fxe5nc6be3bf5nc3e6nf3qd7be2o-o-oo-obe7':
    'Alekhine Defense: Four Pawns Attack, Tartakower Variation',
  e4nf6e5nd5d4d6c4nb6f4bf5:
    'Alekhine Defense: Four Pawns Attack, Trifunovic Variation',
  e4nf6e5nd5d4d6c4nb6c5: 'Alekhine Defense: Hunt Variation',
  e4nf6e5nd5c4nb6c5nd5bc4e6nc3:
    'Alekhine Defense: Hunt Variation, Lasker Simul Gambit',
  e4nf6e5nd5c4nb6c5nd5nc3nxc3dxc3d6bg5:
    'Alekhine Defense: Hunt Variation, Matsukevich Gambit',
  e4nf6e5nd5c4nb6c5nd5bc4e6nc3d6nxd5exd5bxd5:
    'Alekhine Defense: Hunt Variation, Mikenas Gambit',
  e4nf6e5nd5bc4nb6bb3c5d3: 'Alekhine Defense: Kmoch Variation',
  e4nf6bc4: 'Alekhine Defense: Krejcik Variation',
  'e4nf6bc4nxe4bxf7+': 'Alekhine Defense: Krejcik Variation, Krejcik Gambit',
  e4nf6d3: 'Alekhine Defense: Maroczy Variation',
  e4nf6e5nd5d4d6nf3: 'Alekhine Defense: Modern Variation',
  e4nf6e5nd5d4d6nf3g6: 'Alekhine Defense: Modern Variation, Alburt Variation',
  e4nf6e5nd5d4d6c4nb6nf3bg4be2:
    'Alekhine Defense: Modern Variation, Alekhine Gambit',
  e4nf6e5nd5d4d6nf3bg4c4:
    'Alekhine Defense: Modern Variation, Alekhine Variation',
  e4nf6e5nd5d4d6nf3g6bc4nb6bb3bg7a4:
    'Alekhine Defense: Modern Variation, Keres Variation',
  e4nf6e5nd5d4d6nf3dxe5: 'Alekhine Defense: Modern Variation, Larsen Variation',
  e4nf6e5nd5d4d6nf3nc6:
    'Alekhine Defense: Modern Variation, Larsen-Haakert Variation',
  e4nf6e5nd5d4d6nf3bg4: 'Alekhine Defense: Modern Variation, Main Line',
  e4nf6e5nd5d4d6nf3bg4h3: 'Alekhine Defense: Modern Variation, Panov Variation',
  e4nf6e5nd5d4d6nf3nb6: 'Alekhine Defense: Modern Variation, Schmid Variation',
  e4nf6e5nd5d4d6nf3bg4be2c6: 'Alekhine Defense: Modern, Flohr Variation',
  e4nf6e5nd5d4d6nf3bg4c4nb6d5: 'Alekhine Defense: Modern, Vitolins Attack',
  e4nf6e5ne4: 'Alekhine Defense: Mokele Mbembe',
  e4nf6e5ne4d4f6: 'Alekhine Defense: Mokele Mbembe, Modern Line',
  e4nf6e5ne4d4e6: 'Alekhine Defense: Mokele Mbembe, Vavra Defense',
  e4nf6e5nd5: 'Alekhine Defense: Normal Variation',
  e4nf6e5nd5d4b5: "Alekhine Defense: O'Sullivan Gambit",
  e4nf6e5nd5nc3: 'Alekhine Defense: Saemisch Attack',
  e4nf6nc3d5: 'Alekhine Defense: Scandinavian Variation',
  e4nf6nc3d5exd5c6: 'Alekhine Defense: Scandinavian Variation, Geschev Gambit',
  e4nf6nc3d5d3dxe4bg5: 'Alekhine Defense: Scandinavian Variation, Myers Gambit',
  e4nf6nc3d5e5nfd7e6: 'Alekhine Defense: Spielmann Gambit',
  e4nf6e5nd5c4nb6b3: 'Alekhine Defense: Steiner Variation',
  e4nf6e5nd5c4nf4: 'Alekhine Defense: The Squirrel',
  e4nf6e5nd5c4: 'Alekhine Defense: Two Pawn Attack',
  e4nf6e5nd5c4nb6c5: 'Alekhine Defense: Two Pawn Attack, Lasker Variation',
  e4nf6e5nd5c4nb6c5nd5bc4e6nc3d6:
    'Alekhine Defense: Two Pawns Attack, Mikenas Variation',
  e4nf6e5nd5b3: 'Alekhine Defense: Welling Variation',
  nh3d5g3e5f4bxh3bxh3exf4: 'Amar Gambit',
  nh3: 'Amar Opening',
  'nh3d5g3e5f4bxh3bxh3exf4o-ofxg3hxg3': 'Amar Opening: Gent Gambit',
  nh3d5g3e5f4: 'Amar Opening: Paris Gambit',
  d4d5qd3: 'Amazon Attack',
  d4nf6nc3d5qd3: 'Amazon Attack: Siberian Attack',
  e3e5c4d6nc3nc6b3nf6: 'Amsterdam Attack',
  a3: 'Anderssen Opening',
  a3a5b4: 'Anderssen Opening: Polish Gambit',
  d4na6: 'Australian Defense',
  e4f6: 'Barnes Defense',
  'f3e5g4qh4#': "Barnes Opening: Fool's Mate",
  f3f5e4fxe4nc3: 'Barnes Opening: Gedult Gambit',
  f3d5e4g6d4dxe4c3: 'Barnes Opening: Gedult Gambit, 3. d4 dxe4 4. c3',
  f3e5kf2: 'Barnes Opening: Hammerschlag',
  f3e5e4nf6bc4: 'Barnes Opening: Walkerling',
  d4nf6c4c5d5b5: 'Benko Gambit',
  d4nf6c4c5d5b5cxb5a6bxa6g6nc3bxa6e4bxf1kxf1d6g3:
    'Benko Gambit, 8. Kxf1 d6 9. g3',
  d4nf6c4c5d5b5cxb5a6: 'Benko Gambit Accepted',
  d4nf6c4c5d5b5cxb5a6bxa6g6nc3bxa6f4:
    'Benko Gambit Accepted, Central Storming Variation',
  d4nf6c4c5d5b5cxb5a6f3: 'Benko Gambit Accepted, Dlugy Variation',
  d4nf6c4c5d5b5cxb5a6bxa6g6nc3bxa6g3d6bg2bg7nf3:
    'Benko Gambit Accepted, Fianchetto Variation',
  d4nf6c4c5d5b5cxb5a6bxa6: 'Benko Gambit Accepted, Fully Accepted Variation',
  'd4nf6c4c5d5b5cxb5a6bxa6g6nc3bxa6nf3d6e4bxf1kxf1bg7g3o-okg2':
    'Benko Gambit Accepted, King Walk Variation',
  d4nf6c4c5d5b5cxb5a6e3: 'Benko Gambit Accepted, Modern Variation',
  d4nf6c4c5d5b5cxb5a6b6: 'Benko Gambit Accepted, Pawn Return Variation',
  d4nf6c4c5d5b5cxb5a6bxa6g6nc3bxa6e4bxf1kxf1d6nge2:
    'Benko Gambit Accepted, Yugoslav, with Bxf1 and Nge2',
  d4nf6c4c5d5b5cxb5a6bxa6bxa6nc3d6e4:
    'Benko Gambit Accepted, Yugoslav, without 7... Bxf1',
  d4nf6c4c5d5b5bg5: 'Benko Gambit Declined, Bishop Attack',
  d4nf6c4c5d5b5e4: 'Benko Gambit Declined, Hjoerring Countergambit',
  d4nf6c4c5d5b5nf3: 'Benko Gambit Declined, Main Line',
  d4nf6c4c5d5b5f3: 'Benko Gambit Declined, Pseudo-Saemisch',
  d4nf6c4c5d5b5nd2: 'Benko Gambit Declined, Quiet Line',
  d4nf6c4c5d5b5a4: 'Benko Gambit Declined, Sosonko Variation',
  d4nf6c4c5d5b5cxb5a6bxa6bxa6nc3d6nf3g6g3: 'Benko Gambit: Fianchetto Variation',
  d4nf6c4c5d5b5g4: 'Benko Gambit: Mutkin Countergambit',
  d4nf6c4c5d5b5cxb5a6bxa6bxa6nc3d6nf3g6nd2: 'Benko Gambit: Nd2 Variation',
  d4nf6c4c5d5b5cxb5a6nc3axb5e4b4nb5d6bc4: 'Benko Gambit: Nescafe Frappe Attack',
  d4nf6c4c5d5b5cxb5a6nc3: 'Benko Gambit: Zaitsev System',
  d4nf6c4c5d5b5cxb5a6nc3axb5e4b4nb5:
    'Benko Gambit: Zaitsev Variation, Nescafe Frappe Attack',
  d4nf6c4c5: 'Benoni Defense',
  d4nf6c4e6nf3c5d5exd5cxd5d6nc3g6: 'Benoni Defense, 5. cxd5 d6 6. Nc3 g6',
  d4c5dxc5: 'Benoni Defense: Benoni Gambit Accepted',
  d4c5dxc5na6: 'Benoni Defense: Benoni Gambit, Schlenker Defense',
  d4c5d5nf6: 'Benoni Defense: Benoni-Indian Defense',
  d4nf6nf3c5d5: 'Benoni Defense: Benoni-Indian Defense, Kingside Move Order',
  d4c5d5f5e4: 'Benoni Defense: Benoni-Staunton Gambit',
  d4nf6c4e6nf3c5d5exd5cxd5d6nc3g6e4: 'Benoni Defense: Classical Variation',
  'd4nf6c4e6nf3c5d5exd5cxd5d6nc3g6e4bg7be2o-oo-oa6a4bg4':
    'Benoni Defense: Classical Variation, Argentine Counterattack',
  d4nf6c4e6nf3c5d5exd5cxd5d6nc3g6e4bg7bg5:
    'Benoni Defense: Classical Variation, Averbakh-Grivas Attack',
  'd4nf6c4c5d5e6nc3exd5cxd5d6e4g6nf3bg7be2o-oo-ore8':
    'Benoni Defense: Classical Variation, Czerniak Defense',
  'd4nf6c4e6nf3c5d5exd5cxd5d6nc3g6e4bg7be2o-oo-ore8nd2na6':
    'Benoni Defense: Classical Variation, Czerniak Defense, 9. O-O Re8 10. Nd2 Na6',
  'd4nf6c4c5d5e6nc3exd5cxd5d6e4g6nf3bg7be2o-oo-ore8nd2na6f3':
    'Benoni Defense: Classical Variation, Czerniak Defense, 10. Nd2 Na6 11. f3',
  'd4nf6c4c5d5e6nc3exd5cxd5d6e4g6nf3bg7be2o-oo-ore8nd2':
    'Benoni Defense: Classical Variation, Czerniak Defense, Tal Line',
  'd4nf6c4c5d5e6nc3exd5cxd5d6e4g6nf3bg7be2o-oo-oa6a4':
    'Benoni Defense: Classical Variation, Full Line',
  'd4nf6c4c5d5e6nc3exd5cxd5d6e4g6nf3bg7be2o-oo-o':
    'Benoni Defense: Classical Variation, Main Line',
  d4nf6c4e6nf3c5d5exd5cxd5d6nc3g6e4bg7h3:
    'Benoni Defense: Classical Variation, New York Variation',
  d4nf6c4e6nf3c5d5exd5cxd5d6nc3g6e4bg7be2:
    'Benoni Defense: Classical Variation, Traditional Variation',
  'd4nf6c4c5d5e6nc3exd5cxd5d6e4g6nf3bg7be2o-o':
    'Benoni Defense: Classical, without 9. O-O',
  d4c5dxc5b6: 'Benoni Defense: Cormorant Gambit',
  d4nf6c4c5d5e5: 'Benoni Defense: Czech Benoni Defense',
  d4nf6c4e6nf3c5d5exd5cxd5d6nc3g6g3: 'Benoni Defense: Fianchetto Variation',
  'd4nf6c4e6g3c5d5exd5cxd5d6nc3g6bg2bg7nf3o-o':
    'Benoni Defense: Fianchetto Variation, 7. Bg2 Bg7 8. Nf3 O-O',
  'd4nf6c4e6g3c5d5exd5cxd5d6nc3g6bg2bg7nf3o-oo-onbd7':
    'Benoni Defense: Fianchetto Variation, Hastings Defense',
  'd4nf6c4e6g3c5d5exd5cxd5d6nc3g6bg2bg7nf3o-oo-oa6a4nbd7nd2re8':
    'Benoni Defense: Fianchetto Variation, Hastings Defense, Main Line',
  'd4nf6c4c5d5e6nc3exd5cxd5d6e4g6f4bg7nf3o-o':
    'Benoni Defense: Four Pawns Attack',
  'd4nf6c4g6nc3bg7e4d6f4o-onf3c5d5e6be2exd5cxd5re8':
    'Benoni Defense: Four Pawns Attack, Main Line',
  d4e6c4c5d5exd5cxd5d6nc3g6e4bg7nf3ne7:
    'Benoni Defense: Franco-Sicilian Hybrid',
  d4nf6nf3c5d5c4: 'Benoni Defense: Hawk Variation',
  d4nf6c4c5d5d6: 'Benoni Defense: Hromadka System',
  d4nf6c4c5d5e5nc3d6e4g6: "Benoni Defense: King's Indian System",
  d4nf6c4c5d5e6nc3exd5cxd5d6e4: "Benoni Defense: King's Pawn Line",
  d4nf6c4e6nf3c5d5exd5cxd5d6nc3g6nd2: "Benoni Defense: Knight's Tour Variation",
  d4nf6c4c5d5e6nc3exd5cxd5d6e4g6f4bg7e5: 'Benoni Defense: Mikenas Variation',
  d4nf6c4c5d5e6: 'Benoni Defense: Modern Variation',
  d4nf6c4c5d5e6nc3exd5cxd5bd6:
    'Benoni Defense: Modern Variation, Snake Variation',
  d4c5d5d6: 'Benoni Defense: Old Benoni',
  d4c5d5d6nc3g6: 'Benoni Defense: Old Benoni, Schmid Variation',
  d4nf6c4c5d5e6nc3exd5cxd5d6e4g6f4: 'Benoni Defense: Pawn Storm Variation',
  d4c5d5na6: 'Benoni Defense: Snail Variation',
  'd4nf6c4c5d5e6nc3exd5cxd5d6e4g6f4bg7bb5+':
    'Benoni Defense: Taimanov Variation',
  d4nf6c4e6nf3c5d5exd5cxd5d6nc3g6bg5: 'Benoni Defense: Uhlmann Variation',
  d4nf6c4c5dxc5e6: 'Benoni Defense: Weenink Variation',
  d4c5d5nf6nc3qa5: 'Benoni Defense: Woozle',
  d4c5b4: 'Benoni Defense: Zilbermints-Benoni Gambit',
  d4c5nf3cxd4b4: 'Benoni Defense: Zilbermints-Benoni Gambit, 2. Nf3 cxd4 3. b4',
  d4c5nf3cxd4b4e5:
    'Benoni Defense: Zilbermints-Benoni Gambit, Tamarkin Countergambit',
  f4: 'Bird Opening',
  f4nf6: 'Bird Opening, 1... Nf6',
  f4nf6nf3g6b4: 'Bird Opening: Batavo-Polish Attack',
  f4d5: 'Bird Opening: Dutch Variation',
  e4c5f4d5nf3dxe4: 'Bird Opening: Dutch Variation, Batavo Gambit',
  f4d5g4: 'Bird Opening: Dutch Variation, Dudweiler Gambit',
  f4e5: "Bird Opening: From's Gambit",
  f4e5nc3: "Bird Opening: From's Gambit, Bahr Gambit",
  f4e5fxe5d6exd6nf6: "Bird Opening: From's Gambit, Langheld Gambit",
  f4e5fxe5d6exd6bxd6nf3g5: "Bird Opening: From's Gambit, Lasker Variation",
  f4e5fxe5d6exd6bxd6nf3nh6d4: "Bird Opening: From's Gambit, Lipke Variation",
  f4g5: 'Bird Opening: Hobbs Gambit',
  f4h6nf3g5: 'Bird Opening: Hobbs-Zilbermints Gambit',
  f4nh6: 'Bird Opening: Horsefly Defense',
  f4e5fxe5f6: 'Bird Opening: Lasker Gambit',
  f4d5nf3nf6e3c5: 'Bird Opening: Lasker Variation',
  f4nf6c4: 'Bird Opening: Mujannah',
  f4b5: 'Bird Opening: Myers Defense',
  f4e5fxe5ne7: 'Bird Opening: Platz Gambit',
  f4e5fxe5nc6: 'Bird Opening: Schlechter Gambit',
  f4e5d4exd4nf3c5c3: 'Bird Opening: Siegener Gambit',
  f4d5c4: 'Bird Opening: Sturm Gambit',
  f4f5e4fxe4nc3nf6g4: 'Bird Opening: Swiss Gambit',
  f4d5b3nf6bb2d4nf3c5e3: 'Bird Opening: Thomas Gambit',
  f4f5e4: 'Bird Opening: Wagner-Zwitersch Gambit',
  f4d5e4: 'Bird Opening: Williams Gambit',
  f4d5e4dxe4nc3nf6qe2: 'Bird Opening: Williams Gambit, 3. Nc3 Nf6 4. Qe2',
  f4d5e4dxe4nc3nf6nge2: 'Bird Opening: Williams-Zilbermints Gambit',
  e4e5bc4: "Bishop's Opening",
  e4e5bc4b5bxb5c6: "Bishop's Opening: Anderssen Gambit",
  e4e5bc4nf6: "Bishop's Opening: Berlin Defense",
  e4e5bc4nf6f4: "Bishop's Opening: Berlin Defense, Greco Gambit",
  e4e5nf3nf6bc4nxe4nc3: "Bishop's Opening: Boden-Kieseritzky Gambit",
  e4e5bc4bc5: "Bishop's Opening: Boi Variation",
  e4e5bc4f5: "Bishop's Opening: Calabrese Countergambit",
  e4e5bc4f5d3: "Bishop's Opening: Calabrese Countergambit, Jaenisch Variation",
  'e4e5bc4bc5b4bxb4f4exf4nf3be7d4bh4+g3fxg3o-ogxh2+kh1':
    "Bishop's Opening: Four Pawns Gambit",
  e4e5bc4nf6nc3b5: "Bishop's Opening: Horwitz Gambit",
  e4e5bc4d5: "Bishop's Opening: Khan Gambit",
  'e4e5bc4nf6d3be7nf3o-o': "Bishop's Opening: Kitchener Folly",
  e4e5bc4nf6f3bc5ne2nc6b4: "Bishop's Opening: Krejcik Gambit",
  e4e5bc4bc5c3d5: "Bishop's Opening: Lewis Countergambit",
  e4e5bc4bc5c3d5bxd5nf6:
    "Bishop's Opening: Lewis Countergambit, 3. c3 d5 4. Bxd5 Nf6",
  e4e5bc4bc5c3d5bxd5nf6d4:
    "Bishop's Opening: Lewis Countergambit, Walker Variation",
  e4e5bc4bc5d4: "Bishop's Opening: Lewis Gambit",
  'e4e5bc4c6d4d5exd5cxd5bb5+bd7bxd7+nxd7dxe5nxe5ne2':
    "Bishop's Opening: Lisitsyn Variation",
  e4e5bc4bc5qe2nc6c3nf6f4: "Bishop's Opening: Lopez Gambit",
  e4e5bc4bc5qe2: "Bishop's Opening: Lopez Variation",
  e4e5bc4bc5qe2nf6f4: "Bishop's Opening: Lopez Variation, Lopez Gambit",
  e4e5bc4bc5b4: "Bishop's Opening: McDonnell Gambit",
  e4e5bc4bc5b4bxb4c3:
    "Bishop's Opening: McDonnell Gambit, La Bourdonnais-Denker Gambit",
  e4e5bc4bc5b4bxb4f4:
    "Bishop's Opening: McDonnell Gambit, McDonnell Double Gambit",
  e4e5bc4nf6ne2nxe4nec3: "Bishop's Opening: Pachman Gambit",
  e4e5bc4c6: "Bishop's Opening: Philidor Counterattack",
  e4e5bc4bc5c3: "Bishop's Opening: Philidor Variation",
  e4e5bc4nf6d4: "Bishop's Opening: Ponziani Gambit",
  'e4e5bc4bc5c3nf6d4exd4e5d5exf6dxc4qh5o-o':
    "Bishop's Opening: Pratt Variation",
  e4e5bc4bc5f4: "Bishop's Opening: Stein Gambit",
  e4e5bc4b5bxb5f5: "Bishop's Opening: Thorold Gambit",
  e4e5bc4nf6d4exd4nf3: "Bishop's Opening: Urusov Gambit",
  e4e5bc4nf6d4exd4nf3nxe4qxd4:
    "Bishop's Opening: Urusov Gambit, Keidansky Gambit",
  'e4e5bc4nf6d4exd4nf3d5exd5bb4+c3qe7+':
    "Bishop's Opening: Urusov Gambit, Panov Variation",
  e4e5bc4nf6d3nc6nc3: "Bishop's Opening: Vienna Hybrid",
  e4e5nc3nc6bc4nf6d3bb4ne2:
    "Bishop's Opening: Vienna Hybrid, Hromadka Variation",
  e4e5nc3nf6bc4bc5d3: "Bishop's Opening: Vienna Hybrid, Spielmann Attack",
  e4e5bc4nf6d4exd4c3: "Bishop's Opening: Warsaw Gambit",
  e4e5bc4bc5c3qg5: "Bishop's Opening: del Rio Variation",
  'e4e5nf3nc6bc4nd4nxe5qg5nxf7qxg2rf1qxe4+be2nf3#':
    'Blackburne Shilling Gambit',
  d4d5e4: 'Blackmar-Diemer Gambit',
  d4nf6nc3d5e4: 'Blackmar-Diemer Gambit, 2. Nc3 d5 3. e4',
  d4nf6nc3d5e4dxe4f3c5:
    'Blackmar-Diemer Gambit Declined, Brombacher Countergambit',
  d4d5e4dxe4nc3nf6f3e5: 'Blackmar-Diemer Gambit Declined, Elbert Countergambit',
  d4d5e4dxe4nc3bd7: 'Blackmar-Diemer Gambit Declined, Grosshans Defense',
  d4d5e4dxe4nc3nf6f3nc6: 'Blackmar-Diemer Gambit Declined, Lamb Defense',
  d4nf6nc3d5e4dxe4f3e3:
    'Blackmar-Diemer Gambit Declined, Langeheinecke Defense',
  d4nf6f3d5e4dxe4nc3c6: "Blackmar-Diemer Gambit Declined, O'Kelly Defense",
  d4nf6nc3d5f3e6e4dxe4:
    'Blackmar-Diemer Gambit Declined, Weinsbach Declination',
  d4d5e4dxe4nc3nf6f3exf3nxf3g6bc4bg7h4:
    'Blackmar-Diemer Gambit: Bogoljubov Defense, Mad Dog Attack',
  d4nf6nc3d5e4dxe4f3exf3nxf3g6: 'Blackmar-Diemer Gambit: Bogoljubov Variation',
  'd4d5e4dxe4nc3nf6f3exf3nxf3g6bc4bg7o-oo-okh1':
    'Blackmar-Diemer Gambit: Bogoljubov Variation, Kloss Attack',
  d4d5e4dxe4nc3nf6f3exf3nxf3g6bc4bg7ne5:
    'Blackmar-Diemer Gambit: Bogoljubov Variation, Nimzowitsch Attack',
  'd4nf6nc3d5e4dxe4f3exf3nxf3g6bc4bg7o-oo-oqe1':
    'Blackmar-Diemer Gambit: Bogoljubov Variation, Studier Attack',
  d4d5e4dxe4be3: 'Blackmar-Diemer Gambit: Diemer-Rosenberg Attack',
  d4nf6nc3d5e4dxe4f3exf3nxf3e6: 'Blackmar-Diemer Gambit: Euwe Defense',
  'd4d5e4dxe4nc3nf6f3exf3nxf3e6bg5be7bd3nc6o-onxd4kh1':
    'Blackmar-Diemer Gambit: Euwe Defense, Zilbermints Gambit',
  d4d5e4dxe4bc4: 'Blackmar-Diemer Gambit: Fritz Attack',
  d4d5e4dxe4f3: 'Blackmar-Diemer Gambit: Gedult Gambit',
  d4d5e4dxe4nc3nf6f3exf3nxf3c5: 'Blackmar-Diemer Gambit: Kaulich Defense',
  d4d5e4dxe4nc3e5be3:
    'Blackmar-Diemer Gambit: Lemberger Countergambit, Diemer Attack',
  d4d5e4dxe4nc3e5dxe5:
    'Blackmar-Diemer Gambit: Lemberger Countergambit, Endgame Variation',
  d4d5e4dxe4nc3e5nge2:
    'Blackmar-Diemer Gambit: Lemberger Countergambit, Rassmussen Attack',
  d4d5e4dxe4nc3e5nxe4:
    'Blackmar-Diemer Gambit: Lemberger Countergambit, Simple Variation',
  e4d5d4dxe4nc3e5qh5:
    'Blackmar-Diemer Gambit: Lemberger Countergambit, Sneider Attack',
  d4f5nc3d5e4dxe4: 'Blackmar-Diemer Gambit: Netherlands Variation',
  d4d5e4dxe4nc3nf6f3exf3nxf3nc6: 'Blackmar-Diemer Gambit: Pietrowsky Defense',
  d4d5e4dxe4nc3nf6be3: 'Blackmar-Diemer Gambit: Rasa-Studier Gambit',
  d4d5e4dxe4nc3nf6f3exf3nxf3b6: 'Blackmar-Diemer Gambit: Ritter Defense',
  d4d5e4dxe4nc3nf6f3exf3nxf3h5: 'Blackmar-Diemer Gambit: Rook Pawn Defense',
  d4d5e4dxe4nc3nf6f3exf3qxf3: 'Blackmar-Diemer Gambit: Ryder Gambit',
  d4d5e4dxe4nc3nf6f3exf3nxf3nbd7: 'Blackmar-Diemer Gambit: Schlutter Defense',
  e4d5d4dxe4nc3nf6f3exf3nxf3bf5: 'Blackmar-Diemer Gambit: Tartakower Variation',
  e4d5d4dxe4nc3nf6f3exf3nxf3bg4: 'Blackmar-Diemer Gambit: Teichmann Variation',
  d4nf6nc3d5e4dxe4f3bf5: 'Blackmar-Diemer Gambit: Vienna Variation',
  d4d5e4dxe4nc3bf5: 'Blackmar-Diemer Gambit: Zeller Defense',
  d4d5e4dxe4nc3bf5f3nf6bc4:
    'Blackmar-Diemer Gambit: Zeller Defense, Soller Attack',
  d4d5e4dxe4nc3nf6f3exf3nxf3c6: 'Blackmar-Diemer Gambit: Ziegler Defense',
  d4d5e4dxe4nc3nf6bg5: 'Blackmar-Diemer Gambit: von Popiel Gambit',
  'd4d5e4dxe4nc3nf6bg5bf5bxf6exf6g4bg6qe2bb4qb5+':
    'Blackmar-Diemer Gambit: von Popiel Gambit, Zilbermints Variation',
  d4d5nc3nf6e4e5: 'Blackmar-Diemer, Lemberger Countergambit',
  d4nf6c4e6nf3c5: 'Blumenfeld Countergambit',
  d4nf6c4e6nf3c5d5b5: 'Blumenfeld Countergambit, 3. Nf3 c5 4. d5 b5',
  d4nf6c4e6nf3c5d5b5dxe6fxe6cxb5d5: 'Blumenfeld Countergambit Accepted',
  d4nf6c4e6nf3c5d5b5bg5: 'Blumenfeld Countergambit: Dus-Khotimirsky Variation',
  d4nf6nf3e6c4c5d5b5bg5exd5cxd5h6:
    'Blumenfeld Countergambit: Spielmann Variation',
  e4e5nf3nf6bc4nxe4nc3d5: 'Boden-Kieseritzky Gambit, Lichtenhein Defense',
  'd4nf6c4e6nf3bb4+': 'Bogo-Indian Defense',
  'd4nf6c4e6nf3bb4+bd2bxd2+': 'Bogo-Indian Defense: Exchange Variation',
  'd4nf6c4e6nf3bb4+nbd2': 'Bogo-Indian Defense: Gruenfeld Variation',
  'd4nf6c4e6nf3bb4+bd2nc6': 'Bogo-Indian Defense: Haiti Variation',
  'd4nf6c4e6nf3b6g3bb7bg2bb4+bd2bxd2+qxd2o-onc3ne4qc2nxc3ng5':
    'Bogo-Indian Defense: Monticelli Trap',
  'd4nf6c4e6nf3bb4+nfd2': 'Bogo-Indian Defense: New England Variation',
  'd4nf6c4e6nf3bb4+bd2qe7': 'Bogo-Indian Defense: Nimzowitsch Variation',
  'd4nf6c4e6nf3bb4+bd2be7': 'Bogo-Indian Defense: Retreat Variation',
  'd4nf6c4e6nf3bb4+bd2c5': 'Bogo-Indian Defense: Vitolins Variation',
  'd4nf6c4e6nf3bb4+bd2a5': 'Bogo-Indian Defense: Wade-Smyslov Variation',
  e4e5ke2: 'Bongcloud Attack',
  e4g5: 'Borg Defense',
  d4g5: 'Borg Defense: Borg Gambit',
  e4g5d4bg7: 'Borg Defense: Borg Gambit, 2. d4 Bg7',
  e4g5d4e6c3c5dxc5b6: 'Borg Defense: Langhorst Gambit',
  e4g5d4h6h4g4: 'Borg Defense: Troon Gambit',
  e4g5d4e5: 'Borg Opening: Zilbermints Gambit',
  d4nf6g4: 'Bronstein Gambit',
  d4nf6c4e5dxe5ng4: 'Budapest Defense',
  d4nf6c4e5dxe5ng4nf3: 'Budapest Defense: Adler Variation',
  d4nf6c4e5dxe5ng4e4: 'Budapest Defense: Alekhine Variation',
  d4nf6c4e5dxe5ng4e4nxe5f4nec6:
    'Budapest Defense: Alekhine Variation, Abonyi Variation',
  d4nf6c4e5dxe5ng4e4d6:
    'Budapest Defense: Alekhine Variation, Tartakower Defense',
  d4nf6c4e5dxe5ne4a3b6:
    'Budapest Defense: Fajarowicz Defense, Bonsdorf Variation',
  d4nf6c4e5dxe5ne4: 'Budapest Defense: Fajarowicz Variation',
  d4nf6c4e5dxe5ne4qc2: 'Budapest Defense: Fajarowicz-Steiner Variation',
  d4nf6c4e5dxe5ng4bf4: 'Budapest Defense: Rubinstein Variation',
  d4nf6f4: 'Canard Opening',
  e4c6: 'Caro-Kann Defense',
  e4c6d4: 'Caro-Kann Defense, 2. d4',
  e4c6nc3: 'Caro-Kann Defense, 2. Nc3',
  e4c6d4d5: 'Caro-Kann Defense, 2. d4 d5',
  e4c6nc3d5: 'Caro-Kann Defense, 2. Nc3 d5',
  e4c6d4d5nc3: 'Caro-Kann Defense, 2. d4 d5 3. Nc3',
  e4c6c4: 'Caro-Kann Defense: Accelerated Panov Attack',
  e4c6c4d5: 'Caro-Kann Defense: Accelerated Panov Attack, 2. c4 d5',
  e4c6c4d5exd5cxd5cxd5nf6:
    'Caro-Kann Defense: Accelerated Panov Attack, Modern Variation',
  e4c6c4e5: 'Caro-Kann Defense: Accelerated Panov Attack, Open Variation',
  e4c6c4d5exd5qxd5:
    'Caro-Kann Defense: Accelerated Panov Attack, Pseudo-Scandinavian',
  e4c6c4d5cxd5cxd5qb3:
    'Caro-Kann Defense: Accelerated Panov Attack, Van Weersel Attack',
  e4c6d4d5e5: 'Caro-Kann Defense: Advance Variation',
  e4c6d4d5e5bf5g4: 'Caro-Kann Defense: Advance Variation, Bayonet Attack',
  e4c6d4d5e5c5: 'Caro-Kann Defense: Advance Variation, Botvinnik-Carls Defense',
  e4c6d4d5e5bf5ne2: 'Caro-Kann Defense: Advance Variation, Bronstein Variation',
  e4c6d4d5e5bf5b4: 'Caro-Kann Defense: Advance Variation, Prins Attack',
  e4c6d4d5e5bf5nf3: 'Caro-Kann Defense: Advance Variation, Short Variation',
  e4c6d4d5e5bf5h4: 'Caro-Kann Defense: Advance Variation, Tal Variation',
  e4c6d4d5e5bf5nc3: 'Caro-Kann Defense: Advance Variation, Van der Wiel Attack',
  e4c6d4d5e5bf5nc3e6g4bg6nge2c5h4:
    'Caro-Kann Defense: Advance Variation, Van der Wiel Attack, 6. Nge2 c5 7. h4',
  e4c6d4d5e5bf5nc3qb6:
    'Caro-Kann Defense: Advance Variation, Van der Wiel Attack, Dreyev Defense',
  e4c6d4d5e5bf5c3e6be2: 'Caro-Kann Defense: Advance, Short Variation',
  e4c6d4d5nc3dxe4nxe4nf6bd3: 'Caro-Kann Defense: Alekhine Gambit',
  e4c6d3: 'Caro-Kann Defense: Breyer Variation',
  'e4c6d3d5nd2g6ngf3bg7g3e5bg2ne7o-oo-ob4':
    'Caro-Kann Defense: Breyer Variation, Stein Attack',
  'e4c6d4d5nc3dxe4nxe4nf6nxf6+gxf6':
    'Caro-Kann Defense: Bronstein-Larsen Variation',
  e4c6d4d5nd2dxe4nxe4bf5: 'Caro-Kann Defense: Classical Variation',
  e4c6d4d5nd2dxe4nxe4bf5ng3bg6nh3:
    'Caro-Kann Defense: Classical Variation, Flohr Variation',
  'e4c6d4d5nd2dxe4nxe4bf5ng3bg6h4h6nf3nd7h5bh7bd3bxd3qxd3e6bd2ngf6o-o-obe7':
    'Caro-Kann Defense: Classical Variation, Lobron System',
  e4c6d4d5nd2dxe4nxe4bf5ng3bg6h4:
    'Caro-Kann Defense: Classical Variation, Main Line',
  e4c6d4d5nd2dxe4nxe4bf5ng3bg6f4:
    'Caro-Kann Defense: Classical Variation, Maroczy Attack',
  'e4c6d4d5nd2dxe4nxe4bf5ng3bg6h4h6nf3nd7h5bh7bd3bxd3qxd3ngf6bd2e6o-o-obd6':
    'Caro-Kann Defense: Classical Variation, Seirawan Variation',
  e4c6d4d5nd2dxe4nxe4bf5ng3bg6h4h6nf3nd7:
    'Caro-Kann Defense: Classical, 7... Nd7',
  e4c6d4d5nd2dxe4nxe4bf5ng3bg6h4h6nf3nd7h5:
    'Caro-Kann Defense: Classical, Spassky Variation',
  e4c6d4na6: 'Caro-Kann Defense: De Bruycker Defense',
  e4c6d4na6nc3nc7:
    'Caro-Kann Defense: De Bruycker Defense, 2. d4 Na6 3. Nc3 Nc7',
  e4c6d4d5nd2qb6: 'Caro-Kann Defense: Edinburgh Variation',
  e4c6b3: 'Caro-Kann Defense: Euwe Attack',
  e4c5b3d5bb2: 'Caro-Kann Defense: Euwe Attack, Prins Gambit',
  e4c6d4d5exd5: 'Caro-Kann Defense: Exchange Variation',
  e4c6d4d5exd5cxd5g4: 'Caro-Kann Defense: Exchange Variation, Bulla Attack',
  e4c6d4d5exd5cxd5bd3nc6c3nf6bf4:
    'Caro-Kann Defense: Exchange Variation, Rubinstein Variation',
  e4c6d4d5nd2dxe4nxe4h6: 'Caro-Kann Defense: Finnish Variation',
  'e4c6d4d5nc3dxe4nxe4nf6nxf6+exf6bc4': 'Caro-Kann Defense: Forgacs Variation',
  e4c6nc3d5qf3: 'Caro-Kann Defense: Goldman Variation',
  e4c6d4d5nc3b5: 'Caro-Kann Defense: Gurgenidze Counterattack',
  e4c6d4d5nc3g6: 'Caro-Kann Defense: Gurgenidze System',
  e4c6nc3d5nf3dxe4ng5: 'Caro-Kann Defense: Hector Gambit',
  e4c6bc4: 'Caro-Kann Defense: Hillbilly Attack',
  e4c6bc4d5bb3dxe4qh5: 'Caro-Kann Defense: Hillbilly Attack, Schaeffer Gambit',
  e4c6d4d5nd2dxe4nxe4nd7: 'Caro-Kann Defense: Karpov Variation',
  e4c6d4d5nd2dxe4nxe4nd7ng5ngf6bd3e6n1f3bd6qe2h6ne4nxe4qxe4:
    'Caro-Kann Defense: Karpov Variation, Modern Main Line',
  e4c6d4d5nd2dxe4nxe4nd7ng5:
    'Caro-Kann Defense: Karpov Variation, Modern Variation',
  e4c6d4d5nd2dxe4nxe4nd7ng5ndf6:
    'Caro-Kann Defense: Karpov Variation, Modern Variation, Ivanchuk Defense',
  e4c6d4d5nc3dxe4nxe4nd7nf3ngf6ng3:
    'Caro-Kann Defense: Karpov Variation, Modern Variation, Kasparov Attack',
  e4c6d4d5nd2dxe4nxe4nd7bc4ngf6ng5e6qe2nb6:
    'Caro-Kann Defense: Karpov Variation, Smyslov Variation',
  e4c6d4d5nd2dxe4nxe4nd7bc4ngf6ng5e6qe2nb6bb3:
    'Caro-Kann Defense: Karpov Variation, Smyslov Variation, Main Line',
  'e4c6d4d5nd2dxe4nxe4nd7bc4ngf6nxf6+nxf6':
    'Caro-Kann Defense: Karpov Variation, Tiviakov-Fischer Attack',
  b4c6e4: 'Caro-Kann Defense: Labahn Attack',
  e4c6b4d5b5: 'Caro-Kann Defense: Labahn Attack, Double Gambit',
  e4c6b4e5bb2: 'Caro-Kann Defense: Labahn Attack, Polish Variation',
  e4c6d4d5nd2dxe4nxe4: 'Caro-Kann Defense: Main Line',
  e4c6d4d5f3: 'Caro-Kann Defense: Maroczy Variation',
  e4c6d4d5f3dxe4fxe4e5nf3exd4bc4:
    'Caro-Kann Defense: Maroczy Variation, Maroczy Gambit',
  e4c6d4nf6: 'Caro-Kann Defense: Masi Variation',
  e4c6d4f5: 'Caro-Kann Defense: Massachusetts Defense',
  e4c6d4d5bd3nf6e5nfd7e6: 'Caro-Kann Defense: Mieses Attack, Landau Gambit',
  e4c6d4d5be3: 'Caro-Kann Defense: Mieses Gambit',
  e4c6d4d5nd2: 'Caro-Kann Defense: Modern Variation',
  e4c6d4d5exd5cxd5c4: 'Caro-Kann Defense: Panov Attack',
  e4c6d4d5exd5cxd5c4nf6nc3: 'Caro-Kann Defense: Panov Attack, 4. c4 Nf6 5. Nc3',
  e4c6d4d5exd5cxd5c4nf6nc3e6:
    'Caro-Kann Defense: Panov Attack, 4. c4 Nf6 5. Nc3 e6',
  e4c6d4d5exd5cxd5c4nf6nc3g6:
    'Caro-Kann Defense: Panov Attack, Fianchetto Defense',
  e4c6d4d5exd5cxd5c4nf6nc3g6cxd5bg7:
    'Caro-Kann Defense: Panov Attack, Fianchetto Defense, Fianchetto Gambit',
  e4c6d4d5exd5cxd5c4nf6c5: 'Caro-Kann Defense: Panov Attack, Gunderam Attack',
  e4c6d4d5exd5cxd5c4nf6nc3nc6:
    'Caro-Kann Defense: Panov Attack, Modern Defense',
  e4c6d4d5exd5cxd5c4nf6nc3nc6bg5e6:
    'Caro-Kann Defense: Panov Attack, Modern Defense, Carlsbad Line',
  e4c6d4d5exd5cxd5c4nf6nc3nc6bg5qa5:
    'Caro-Kann Defense: Panov Attack, Modern Defense, Czerniak Line',
  e4c6d4d5exd5cxd5c4nf6nc3nc6nf3bg4:
    'Caro-Kann Defense: Panov Attack, Modern Defense, Mieses Line',
  e4c6d4d5exd5cxd5c4nf6nc3nc6bg5qb6:
    'Caro-Kann Defense: Panov Attack, Modern Defense, Reifir-Spielmann Line',
  e4c6d4d5exd5cxd5c4nf6nc3nc6bg5dxc4d5na5:
    'Caro-Kann Defense: Panov-Botvinnik, Herzog Defense',
  e4c6d4d5nc3dxe4f3: 'Caro-Kann Defense: Rasa-Studier Gambit',
  e4c6nc3d5d3dxe4bg5: 'Caro-Kann Defense: Scorpion-Horus Gambit',
  e4c6g4: 'Caro-Kann Defense: Spike Variation',
  e4c6g4d5nc3dxe4d3: 'Caro-Kann Defense: Spike Variation, Scorpion-Grob Gambit',
  'e4c6d4d5nc3dxe4nxe4nf6nxf6+exf6': 'Caro-Kann Defense: Tartakower Variation',
  e4c6c4d5e5: 'Caro-Kann Defense: Toikkanen Gambit',
  e4c6nc3d5nf3: 'Caro-Kann Defense: Two Knights Attack',
  e4c6nc3d5nf3bg4: 'Caro-Kann Defense: Two Knights Attack, Mindeno Variation',
  e4c6nc3d5nf3bg4h3bxf3:
    'Caro-Kann Defense: Two Knights Attack, Mindeno Variation, Exchange Line',
  e4c6nc3d5nf3bg4h3bh5:
    'Caro-Kann Defense: Two Knights Attack, Mindeno Variation, Retreat Line',
  e4c6d4d5nf3dxe4ng5: 'Caro-Kann Defense: Ulysses Gambit',
  e4c6d4d5nc3dxe4bc4: 'Caro-Kann Defense: von Hennig Gambit',
  e4h6: 'Carr Defense',
  e4h6d4e5: 'Carr Defense: Zilbermints Gambit',
  d4nf6c4e6g3: 'Catalan Opening',
  d4nf6c4e6g3d5: 'Catalan Opening, 2. c4 e6 3. g3 d5',
  d4nf6c4e6g3d5bg2: 'Catalan Opening: Closed Variation',
  d4nf6c4e6g3d5bg2be7nf3:
    'Catalan Opening: Closed Variation, 4. Bg2 Be7 5. Nf3',
  'd4nf6c4e6g3d5bg2be7nf3o-oo-onbd7':
    'Catalan Opening: Closed Variation, 5. Nf3 O-O 6. O-O Nbd7',
  'nf3nf6c4e6g3d5bg2be7o-oo-od4nbd7qc2':
    'Catalan Opening: Closed Variation, 6. d4 Nbd7 7. Qc2',
  'c4e6g3d5bg2nf6nf3be7d4o-onc3c6o-onbd7qd3':
    'Catalan Opening: Closed Variation, Botvinnik Variation',
  'd4d5c4c6nf3nf6qc2e6nbd2be7g3nbd7bg2o-oo-ob5':
    'Catalan Opening: Closed Variation, Rabinovich Variation',
  'd4nf6c4e6nf3d5g3be7bg2o-oo-onbd7qc2c6nbd2b6':
    'Catalan Opening: Closed Variation, Traditional Variation',
  'd4nf6c4e6g3d5bg2be7nf3o-oo-onbd7qc2c6b3':
    'Catalan Opening: Closed, 7. Qc2 c6 8. b3',
  'd4nf6c4e6nf3d5g3be7bg2o-oo-onbd7qc2c6nbd2':
    'Catalan Opening: Closed, Main Line',
  'd4nf6c4e6g3d5bg2be7nf3o-oo-onbd7qc2c6nbd2b6b3a5bb2ba6':
    'Catalan Opening: Closed, Sokolsky Variation',
  'd4nf6c4e6g3be7bg2d5nf3o-oo-onbd7qc2c6b3b6rd1bb7nc3b5':
    'Catalan Opening: Closed, Spassky Gambit',
  'd4e6c4nf6nf3d5g3be7bg2o-oo-onbd7qc2c6rd1b6a4':
    'Catalan Opening: Closed, Zagoryansky Variation',
  d4nf6c4e6g3e5: 'Catalan Opening: Hungarian Gambit',
  d4nf6c4e6g3d5bg2dxc4nf3: 'Catalan Opening: Open Defense',
  'd4nf6c4e6g3d5bg2dxc4qa4+':
    'Catalan Opening: Open Defense, 4. Bg2 dxc4 5. Qa4+',
  'd4nf6c4e6g3d5bg2dxc4qa4+nbd7qxc4':
    'Catalan Opening: Open Defense, 5. Qa4+ Nbd7 6. Qxc4',
  'd4nf6c4e6g3d5bg2dxc4qa4+nbd7qxc4a6qc2':
    'Catalan Opening: Open Defense, Alekhine Variation',
  d4nf6c4e6g3d5bg2dxc4nf3be7: 'Catalan Opening: Open Defense, Classical Line',
  'd4nf6c4e6g3d5bg2dxc4nf3nc6qa4bb4+':
    'Catalan Opening: Open Defense, Modern Sharp Variation',
  d4nf6c4e6g3d5bg2c5nf3nc6: 'Catalan Opening: Open Defense, Tarrasch Defense',
  e4e5d4: 'Center Game',
  e4e5d4exd4qxd4: 'Center Game, 2. d4 exd4 3. Qxd4',
  e4e5d4exd4: 'Center Game Accepted',
  e4e5d4exd4qxd4nc6qe3nf6: 'Center Game: Berger Variation',
  'e4e5d4exd4qxd4nc6qe3bb4+c3be7': 'Center Game: Charousek Variation',
  e4e5d4exd4f4: 'Center Game: Halasz-McDonnell Gambit',
  e4e5d4exd4f4bc5nf3nc6c3:
    'Center Game: Halasz-McDonnell Gambit, Crocodile Variation',
  e4e5d4exd4qxd4nc6qc4: 'Center Game: Hall Variation',
  e4e5d4exd4nf3: 'Center Game: Kieseritzky Variation',
  e4e5d4exd4nf3c5: 'Center Game: Kieseritzky Variation, 2. d4 exd4 3. Nf3 c5',
  e4e5d4exd4nf3c5bc4: 'Center Game: Kieseritzky Variation, 3. Nf3 c5 4. Bc4',
  e4e5d4exd4nf3c5bc4b5:
    'Center Game: Kieseritzky Variation, 3. Nf3 c5 4. Bc4 b5',
  'e4e5d4exd4qxd4nc6qe3nf6nc3bb4bd2o-oo-o-ore8bc4d6nh3':
    'Center Game: Kupr Variation',
  e4e5d4exd4nf3bc5c3: 'Center Game: Lanc-Arnold Gambit',
  e4e5d4exd4nf3bc5c3dxc3bc4:
    'Center Game: Lanc-Arnold Gambit, Schippler Gambit',
  e4e5d4exd4qxd4nc6: 'Center Game: Normal Variation',
  e4e5d4exd4qxd4nc6qe3: 'Center Game: Paulsen Attack Variation',
  e4e5d4exd4bd3: 'Center Game: Ross Gambit',
  e4e5d4exd4qxd4nc6qe3f5: "Center Game: l'Hermet Variation",
  e4e5d4exd4bc4: 'Center Game: von der Lasa Gambit',
  h3: 'Clemenz Opening',
  h3h5g4: 'Clemenz Opening: Spike Lee Gambit',
  d4d5nf3nf6e3e6: 'Colle System',
  d4d5nf3nf6e3e6bd3: 'Colle System, 3. e3 e6 4. Bd3',
  'd4g6nf3bg7e3c5bd3qa5+': 'Colle System: Pterodactyl Variation',
  'nf3c5e3g6d4bg7dxc5qa5+': 'Colle System: Rhamphorhynchus Variation',
  'd4g6nf3bg7e3c5bd3cxd4nxd4qa5+': 'Colle System: Siroccopteryx Variation',
  d4nf6nf3e6e3c5bd3d5c3: 'Colle System: Traditional Colle',
  a4e5h4: 'Crab Opening',
  h3d5a3e5: 'Creepy Crawly Formation: Classical Defense',
  e4d6d4nf6nc3c6: 'Czech Defense',
  e4e5d4exd4c3: 'Danish Gambit',
  e4e5d4exd4c3dxc3bc4cxb2bxb2: 'Danish Gambit Accepted',
  e4e5d4exd4c3dxc3bc4cxb2bxb2qe7: 'Danish Gambit Accepted, Chigorin Defense',
  e4e5d4exd4c3dxc3bc4cxb2bxb2nf6: 'Danish Gambit Accepted, Classical Defense',
  'e4e5d4exd4c3dxc3bc4cxb2bxb2bb4+':
    'Danish Gambit Accepted, Copenhagen Defense',
  e4e5d4exd4c3dxc3bc4cxb2bxb2d5: 'Danish Gambit Accepted, Schlechter Defense',
  e4e5d4exd4c3ne7: 'Danish Gambit Accepted, Svenonius Defense',
  e4e5d4exd4c3d5: 'Danish Gambit Declined, Sorensen Defense',
  d4nf6nf3ne4: 'Doery Defense',
  e4e5nf3nc6c4nf6nxe5: 'Dresden Opening: The Goblin',
  e4f5: 'Duras Gambit',
  d4f5: 'Dutch Defense',
  d4f5c4: 'Dutch Defense, 2. c4',
  d4f5qd3: 'Dutch Defense: Alapin Variation',
  'd4e6c4f5g3nf6bg2be7nf3o-oo-one4': 'Dutch Defense: Alekhine Variation',
  d4f5g3nf6bg2e6nh3: 'Dutch Defense: Blackburne Variation',
  d4f5e4fxe4nc3nf6f3: "Dutch Defense: Blackmar's Second Gambit",
  d4f5c4g6nc3nh6: 'Dutch Defense: Bladel Variation',
  d4e6c4f5: 'Dutch Defense: Classical Variation',
  d4e6c4f5g3nf6bg2: 'Dutch Defense: Classical Variation, 3. g3 Nf6 4. Bg2',
  d4e6c4f5g3nf6bg2be7:
    'Dutch Defense: Classical Variation, 3. g3 Nf6 4. Bg2 Be7',
  'd4e6c4f5g3nf6bg2be7nf3o-o':
    'Dutch Defense: Classical Variation, 4. Bg2 Be7 5. Nf3 O-O',
  'd4e6c4f5g3nf6bg2be7nf3o-oo-od6':
    'Dutch Defense: Classical Variation, 5. Nf3 O-O 6. O-O d6',
  d4e6c4f5g3nf6bg2be7nh3:
    'Dutch Defense: Classical Variation, Blackburne Attack',
  'd4e6c4f5g3nf6bg2be7nf3o-oo-od6nc3a5':
    'Dutch Defense: Classical Variation, Buenos Aires Variation',
  'd4e6c4f5g3nf6bg2be7nf3o-oo-od6nc3ne4':
    'Dutch Defense: Classical Variation, Huisl Variation',
  'd4f5nf3nf6g3e6bg2be7o-oo-oc4d6nc3qe8':
    'Dutch Defense: Classical Variation, Ilyin-Zhenevsky Variation',
  'd4f5nf3nf6g3e6bg2be7o-oo-oc4d6nc3qe8qc2':
    'Dutch Defense: Classical Variation, Ilyin-Zhenevsky Variation, Alatortsev-Lisitsyn Line',
  'd4e6c4f5g3nf6bg2be7nf3o-oo-od6nc3qe8b3':
    'Dutch Defense: Classical Variation, Ilyin-Zhenevsky Variation, Modern Main Line',
  'd4e6c4f5g3nf6bg2d5nf3be7o-oo-onc3c6':
    'Dutch Defense: Classical Variation, Stonewall Variation',
  'd4e6c4f5g3nf6bg2be7nf3d5o-oo-ob3c6ba3':
    'Dutch Defense: Classical Variation, Stonewall Variation, 7. b3 c6 8. Ba3',
  'd4e6c4f5g3nf6bg2be7nf3d5o-oo-ob3':
    'Dutch Defense: Classical Variation, Stonewall Variation, Botvinnik Variation',
  d4f5g3: 'Dutch Defense: Fianchetto Attack',
  d4f5c4nf6g3: 'Dutch Defense: Fianchetto Variation',
  d4f5g4e5: 'Dutch Defense: Hevendehl Gambit',
  d4f5bg5: 'Dutch Defense: Hopton Attack',
  c4f5g3nf6bg2d6nc3c6d4qc7: 'Dutch Defense: Hort-Antoshin System',
  'd4f5nf3nf6g3e6bg2be7o-oo-oc4d6nc3qe8re1':
    'Dutch Defense: Ilyin-Zhenevsky, Winter Variation',
  d4f5h3nf6g4: 'Dutch Defense: Janzen-Korchnoi Gambit',
  d4f5nc3d5e4: 'Dutch Defense: Kingfisher Gambit',
  d4f5h3: 'Dutch Defense: Korchnoi Attack',
  c4f5nc3nf6nf3nc6d4d6: 'Dutch Defense: Krause Variation',
  d4f5g4: 'Dutch Defense: Krejcik Gambit',
  d4f5g4fxg4e4d5nc3: 'Dutch Defense: Krejcik Gambit, Tate Gambit',
  d4f5c4nf6g3g6: 'Dutch Defense: Leningrad Variation',
  d4f5c4nf6g3g6bg2bg7nf3:
    'Dutch Defense: Leningrad Variation, 4. Bg2 Bg7 5. Nf3',
  d4f5g3g6bg2bg7nh3: 'Dutch Defense: Leningrad Variation, Karlsbad Variation',
  'd4f5g3nf6bg2g6nf3bg7o-oo-oc4d6nc3nc6':
    'Dutch Defense: Leningrad Variation, Matulovic Variation',
  'd4f5g3nf6bg2g6nf3bg7o-oo-oc4d6nc3c6':
    'Dutch Defense: Leningrad Variation, Warsaw Variation',
  'd4f5g3c6bg2g6nf3bg7o-onh6': 'Dutch Defense: Leningrad, Basman System',
  d4f5qd3e6g4: 'Dutch Defense: Manhattan Gambit, Anti-Classical Line',
  d4f5qd3g6g4: 'Dutch Defense: Manhattan Gambit, Anti-Leningrad',
  d4f5qd3d6g4: 'Dutch Defense: Manhattan Gambit, Anti-Modern',
  d4f5qd3d5g4: 'Dutch Defense: Manhattan Gambit, Anti-Stonewall',
  'd4e6c4f5g3nf6bg2bb4+': 'Dutch Defense: Nimzo-Dutch Variation',
  'd4e6c4f5g3nf6bg2bb4+bd2be7':
    'Dutch Defense: Nimzo-Dutch Variation, Alekhine Variation',
  d4f5c4nf6: 'Dutch Defense: Normal Variation',
  d4f5nf3e5: 'Dutch Defense: Omega-Isis Gambit',
  d4f5c4nf6nc3: "Dutch Defense: Queen's Knight Variation",
  d4f5nc3: 'Dutch Defense: Raphael Variation',
  d4e6c4f5nc3: 'Dutch Defense: Rubinstein Variation',
  d4f5g3nf6bg2g6: 'Dutch Defense: Semi-Leningrad Variation',
  d4e6bf4f5g4: 'Dutch Defense: Senechaud Gambit',
  d4f5nc3nf6g4: 'Dutch Defense: Spielmann Gambit',
  d4f5e4: 'Dutch Defense: Staunton Gambit',
  d4f5e4fxe4nc3nf6bg5: 'Dutch Defense: Staunton Gambit, 3. Nc3 Nf6 4. Bg5',
  d4f5e4fxe4: 'Dutch Defense: Staunton Gambit Accepted',
  d4f5e4fxe4nc3nf6bg5g6h4: 'Dutch Defense: Staunton Gambit, Alekhine Variation',
  d4f5e4fxe4nd2: 'Dutch Defense: Staunton Gambit, American Attack',
  d4f5e4fxe4nc3nf6bg5c6: 'Dutch Defense: Staunton Gambit, Chigorin Variation',
  d4f5e4fxe4nc3nf6bg5g6f3: 'Dutch Defense: Staunton Gambit, Lasker Variation',
  d4f5e4fxe4nc3nf6bg5b6:
    'Dutch Defense: Staunton Gambit, Nimzowitsch Variation',
  d4f5e4fxe4nc3nf6g4: 'Dutch Defense: Staunton Gambit, Tartakower Variation',
  'd4e6c4f5g3nf6bg2be7nf3d5o-oo-o': 'Dutch Defense: Stonewall Variation',
  'd4e6nf3f5g3nf6bg2d5o-obd6c4c6':
    'Dutch Defense: Stonewall Variation, Modern Variation',
  'd4e6nf3f5g3nf6bg2be7o-oo-oc4d5nc3': 'Dutch Defense: Stonewall, with Nc3',
  'd4f5c4nf6g3e6bg2be7nf3o-oo-od5nc3c6qc2qe8bg5':
    'Dutch Defense: Stonewall: Chekhover Variation',
  d4nf6nf3g6: 'East Indian Defense',
  e4e5nf3d5: 'Elephant Gambit',
  e4e5nf3d5exd5bd6: 'Elephant Gambit: Maroczy Gambit',
  e4e5nf3d5exd5e4: 'Elephant Gambit: Paulsen Countergambit',
  e4e5nf3d5nxe5dxe4bc4qg5: 'Elephant Gambit: Wasp Variation',
  d4b6: 'English Defense',
  d4e6c4b6: 'English Defense, 2. c4 b6',
  d4b6c4c5d5e6e4b5cxb5f5: 'English Defense: Blumenfeld-Hiva Gambit',
  d4b6c4bb7nc3e5: 'English Defense: Eastbourne Gambit',
  c4e6d4b6nc3bb7e4f5exf5nf6: 'English Defense: Hartlaub Gambit Accepted',
  c4e6d4b6nc3bb7e4f5d5: 'English Defense: Hartlaub Gambit Declined',
  d4e6c4b6e4bb7bd3nc6: 'English Defense: Perrin Variation',
  d4e6c4b6e4bb7f3f5exf5nh6: 'English Defense: Poli Gambit',
  c4: 'English Opening',
  c4nf6g4: 'English Opening: 2. g4',
  e4nf6c4: 'English Opening: Achilles-Omega Gambit',
  c4g6e4e5: 'English Opening: Adorjan Defense',
  c4e6: 'English Opening: Agincourt Defense',
  c4e6nf3: 'English Opening: Agincourt Defense, 2. Nf3',
  c4e6nf3d5: 'English Opening: Agincourt Defense, 2. Nf3 d5',
  nf3nf6c4e6g3d5bg2bd6:
    'English Opening: Agincourt Defense, Bogoljubov Defense',
  nf3d5c4e6g3c5: 'English Opening: Agincourt Defense, Catalan Defense',
  'nf3d5c4e6g3b6bg2bb7o-o':
    'English Opening: Agincourt Defense, Catalan Defense, 4. Bg2 Bb7 5. O-O',
  nf3nf6c4e6g3d5bg2dxc4:
    'English Opening: Agincourt Defense, Catalan Defense Accepted',
  nf3nf6c4e6g3d5bg2c6:
    'English Opening: Agincourt Defense, Catalan Defense, Semi-Slav Defense',
  'c4c5nf3nf6nc3e6g3d5cxd5nxd5bg2nc6o-obe7':
    'English Opening: Agincourt Defense, Keres Defense',
  nf3d5c4e6g3c6: 'English Opening: Agincourt Defense, Kurajica Defense',
  'nf3nf6c4e6g3d5bg2be7o-o':
    'English Opening: Agincourt Defense, Neo-Catalan Declined',
  'nf3nf6c4e6g3d5b3c5bg2nc6o-obe7':
    'English Opening: Agincourt Defense, Tarrasch Defense',
  nf3nf6c4e6b3d5bb2c5e3: 'English Opening: Agincourt Defense, Wimpy System',
  c4f5: 'English Opening: Anglo-Dutch Defense',
  c4f5e4: 'English Opening: Anglo-Dutch Defense, Hickmann Gambit',
  c4f5nf3d6e4: 'English Opening: Anglo-Dutch Variation, Chabanon Gambit',
  c4f5nc3nf6e4: 'English Opening: Anglo-Dutch Variation, Ferenc Gambit',
  c4nf6nc3d5: 'English Opening: Anglo-Gruenfeld Defense',
  nf3nf6c4g6nc3d5cxd5nxd5g3bg7bg2e5:
    'English Opening: Anglo-Gruenfeld Defense: Korchnoi Variation',
  c4nf6: 'English Opening: Anglo-Indian Defense',
  c4nf6nc3d5cxd5nxd5nf3:
    'English Opening: Anglo-Indian Defense, Anglo-Gruenfeld Variation',
  c4nf6nc3d5cxd5nxd5g3g6bg2nb6:
    'English Opening: Anglo-Indian Defense, Anglo-Gruenfeld Variation, 4. g3 g6 5. Bg2 Nb6',
  c4nf6nc3d5cxd5nxd5g3g6bg2nxc3:
    'English Opening: Anglo-Indian Defense, Anglo-Gruenfeld Variation, 4. g3 g6 5. Bg2 Nxc3',
  nf3nf6c4g6nc3bg7e4:
    'English Opening: Anglo-Indian Defense, Anti-Anti-Gruenfeld',
  c4nf6nc3e6e4c5e5ng8:
    'English Opening: Anglo-Indian Defense, Flohr-Mikenas-Carls Variation, Nei Gambit',
  g3d5nf3g6c4nf6: 'English Opening: Anglo-Indian Defense, Gruenfeld Formation',
  c4nf6nc3e6: 'English Opening: Anglo-Indian Defense, Hedgehog System',
  nf3nf6c4g6: "English Opening: Anglo-Indian Defense, King's Indian Formation",
  nf3nf6c4b6g3bb7bg2g6:
    "English Opening: Anglo-Indian Defense, King's Indian Formation, Double Fianchetto",
  nf3nf6c4: "English Opening: Anglo-Indian Defense, King's Knight Variation",
  nf3nf6c4e6nc3bb4: 'English Opening: Anglo-Indian Defense, Nimzo-English',
  nf3nf6c4d6: 'English Opening: Anglo-Indian Defense, Old Indian Formation',
  nf3nf6c4b6: "English Opening: Anglo-Indian Defense, Queen's Indian Formation",
  c4nf6nc3e6nf3b6:
    "English Opening: Anglo-Indian Defense, Queen's Indian Formation, 2. Nc3 e6 3. Nf3 b6",
  nf3nf6c4e6g3b6bg2bb7:
    "English Opening: Anglo-Indian Defense, Queen's Indian Formation, 3. g3 b6 4. Bg2 Bb7",
  c4nf6nc3e6nf3b6e4bb7bd3:
    "English Opening: Anglo-Indian Defense, Queen's Indian Variation",
  c4nf6nc3: "English Opening: Anglo-Indian Defense, Queen's Knight Variation",
  nf3nf6c4e6g3a6: 'English Opening: Anglo-Indian Defense, Romanishin Variation',
  nf3nf6c4d5: 'English Opening: Anglo-Indian Defense, Scandinavian Defense',
  nf3nf6c4d5cxd5nxd5:
    'English Opening: Anglo-Indian Defense, Scandinavian Defense, Exchange Variation',
  nf3nf6c4g6g3c6: 'English Opening: Anglo-Indian Defense, Slav Formation',
  c4nf6nc3e6nf3bb4g4:
    'English Opening: Anglo-Indian Defense, Zvjaginsev-Krasenkow Attack',
  c4nc6: 'English Opening: Anglo-Lithuanian Variation',
  c4d5: 'English Opening: Anglo-Scandinavian Defense',
  c4d5cxd5e6: 'English Opening: Anglo-Scandinavian Defense, Loehn Gambit',
  c4d5cxd5qxd5nc3qa5:
    'English Opening: Anglo-Scandinavian Defense, Malvinas Variation',
  c4d5cxd5nf6: 'English Opening: Anglo-Scandinavian Defense, Schulz Gambit',
  c4e5nc3nf6g3: 'English Opening: Carls-Bremen System',
  c4c6: 'English Opening: Caro-Kann Defensive System',
  c4e5nc3nc6g3g6rb1nh6bg2bg7:
    'English Opening: Closed, 5. Rb1 Taimanov Variation',
  c4e5nc3nc6g3g6bg2bg7e3d6nge2nh6:
    'English Opening: Closed, Taimanov Variation',
  c4e5g3h5: 'English Opening: Drill Variation',
  c4e5nc3nf6nf3nc6e4:
    'English Opening: Four Knights System, Nimzowitsch Variation',
  c4g6: 'English Opening: Great Snake Variation',
  c4b5: 'English Opening: Jaenisch Gambit',
  c4e5: "English Opening: King's English Variation",
  c4e5nc3d6nf3: "English Opening: King's English Variation, 2. Nc3 d6 3. Nf3",
  c4e5nc3nf6nf3e4ng5b5:
    "English Opening: King's English Variation, Bellon Gambit",
  c4e5nc3nc6g3g6bg2bg7d3d6e4:
    "English Opening: King's English Variation, Botvinnik System",
  'c4g6nc3bg7g3nf6bg2o-oe4d6nge2e5o-oc6d3a6':
    "English Opening: King's English Variation, Botvinnik System, Prickly Pawn Pass System",
  c4e5nc3nc6g3g6bg2bg7e3d6nge2be6:
    "English Opening: King's English Variation, Bremen-Hort Variation",
  c4e5nc3nc6g3g6bg2bg7d3:
    "English Opening: King's English Variation, Closed System",
  c4e5nc3nc6g3g6bg2bg7d3d6:
    "English Opening: King's English Variation, Closed System, Full Symmetry",
  c4e5nc3nf6nf3nc6:
    "English Opening: King's English Variation, Four Knights Variation",
  'c4e5nc3nf6nf3nc6d4exd4nxd4bb4bg5h6bh4bxc3+bxc3ne5':
    "English Opening: King's English Variation, Four Knights Variation, 7. Bh4 Bxc3+ 8. bxc3 Ne5",
  c4e5nc3nf6nf3nc6d4e4:
    "English Opening: King's English Variation, Four Knights Variation, Bradley Beach Variation",
  c4e5nc3nf6nf3nc6g3:
    "English Opening: King's English Variation, Four Knights Variation, Fianchetto Line",
  c4e5nc3nf6nf3nc6d3:
    "English Opening: King's English Variation, Four Knights Variation, Flexible Line",
  c4e5nc3nf6nf3nc6a3:
    "English Opening: King's English Variation, Four Knights Variation, Korchnoi Line",
  c4e5nc3nf6nf3nc6e3:
    "English Opening: King's English Variation, Four Knights Variation, Quiet Line",
  c4e5nc3nf6nf3nc6e3bb4qc2bxc3:
    "English Opening: King's English Variation, Four Knights Variation, Quiet Line, 4. e3 Bb4 5. Qc2 Bxc3",
  'c4e5nc3nf6nf3nc6e3bb4qc2o-ond5re8qf5':
    "English Opening: King's English Variation, Four Knights Variation, Quiet Line, 6. Nd5 Re8 7. Qf5",
  c4e5nc3nc6g3g6bg2bg7rb1:
    "English Opening: King's English Variation, Hungarian Attack",
  c4e5nc3d6g3c6: "English Opening: King's English Variation, Keres Defense",
  c4e5nc3bb4:
    "English Opening: King's English Variation, Kramnik-Shirov Counterattack",
  c4e5nf3: "English Opening: King's English Variation, Nimzowitsch Variation",
  c4e5nf3e4:
    "English Opening: King's English Variation, Nimzowitsch-Flohr Variation",
  c4e5nc3nc6:
    "English Opening: King's English Variation, Reversed Closed Sicilian",
  c4e5nc3: "English Opening: King's English Variation, Reversed Sicilian",
  c4e5nc3d6nf3bg4: "English Opening: King's English Variation, Smyslov Defense",
  c4e5nc3nc6g3g6bg2bg7:
    "English Opening: King's English Variation, Taimanov Variation",
  c4e5nc3nc6nf3:
    "English Opening: King's English Variation, Three Knights System",
  c4e5nc3nc6g3d6bg2be6:
    "English Opening: King's English Variation, Troger Defense",
  c4e5nc3nf6:
    "English Opening: King's English Variation, Two Knights Variation",
  c4e5nc3nf6g3g6:
    "English Opening: King's English Variation, Two Knights Variation, Fianchetto Line",
  c4e5nc3nf6g3c6:
    "English Opening: King's English Variation, Two Knights Variation, Keres Variation",
  c4e5nc3nf6g3d5:
    "English Opening: King's English Variation, Two Knights Variation, Reversed Dragon",
  c4e5nc3nf6g3bb4:
    "English Opening: King's English Variation, Two Knights Variation, Smyslov System",
  c4e5nc3nf6nf3e4ng5ng4: "English Opening: King's English, Erbenheimer Gambit",
  c4e5nc3nf6f4: "English Opening: King's English, Mazedonisch",
  c4nf6nc3e6e4: 'English Opening: Mikenas-Carls Variation',
  c4nf6nc3e6e4nc6:
    'English Opening: Mikenas-Carls Variation, 2. Nc3 e6 3. e4 Nc6',
  c4nf6nc3e6e4d5e5: 'English Opening: Mikenas-Carls Variation, 3. e4 d5 4. e5',
  c4nf6nc3e6e4c5: 'English Opening: Mikenas-Carls, Sicilian',
  c4g5d4bg7: 'English Opening: Myers Variation',
  nf3nf6c4e6g3d5: 'English Opening: Neo-Catalan',
  nf3nf6c4e6g3d5bg2be7: 'English Opening: Neo-Catalan Declined',
  c4f5nc3nf6e4fxe4g4: 'English Opening: Porcupine Variation',
  nf3nf6c4e6g3a6bg2b5: 'English Opening: Romanishin Gambit',
  c4c5: 'English Opening: Symmetrical Variation',
  d4nf6c4c5nf3: 'English Opening: Symmetrical Variation, Anti-Benoni Variation',
  nf3nf6c4c5nc3nc6d4cxd4nxd4e6g3qb6:
    'English Opening: Symmetrical Variation, Anti-Benoni Variation, Geller Variation',
  d4nf6c4c5nf3cxd4nxd4e6:
    'English Opening: Symmetrical Variation, Anti-Benoni Variation, Spielmann Defense',
  nf3nf6c4c5nc3nc6d4cxd4nxd4e6:
    'English Opening: Symmetrical Variation, Anti-Benoni Variation, Spielmann Defense, 4. d4 cxd4 5. Nxd4 e6',
  e4c5c4nc6nc3g6g3bg7bg2:
    'English Opening: Symmetrical Variation, Botvinnik System',
  c4c5nc3g6g3bg7bg2nc6e3e5:
    'English Opening: Symmetrical Variation, Botvinnik System Reversed',
  nf3c5c4nc6nc3e5g3g6bg2bg7:
    'English Opening: Symmetrical Variation, Botvinnik System Reversed, 4. g3 g6 5. Bg2 Bg7',
  'c4c5nc3nc6g3g6bg2bg7nf3nf6o-oo-ob3':
    'English Opening: Symmetrical Variation, Double Fianchetto',
  'nf3nf6g3g6bg2bg7o-oo-oc4c5nc3nc6d3':
    'English Opening: Symmetrical Variation, Duchamp Variation',
  c4nf6nc3c5g3: 'English Opening: Symmetrical Variation, Fianchetto Variation',
  c4c5nc3nc6g3:
    'English Opening: Symmetrical Variation, Fianchetto Variation, 2. Nc3 Nc6 3. g3',
  nf3nf6c4c5nc3nc6:
    'English Opening: Symmetrical Variation, Four Knights Variation',
  nf3nf6c4c5nc3nc6g3g6bg2bg7:
    'English Opening: Symmetrical Variation, Full Symmetry Line',
  'nf3nf6c4c5nc3e6g3b6bg2bb7o-obe7':
    'English Opening: Symmetrical Variation, Hedgehog Defense',
  'nf3nf6c4c5nc3nc6g3g6bg2bg7o-oo-od4':
    'English Opening: Symmetrical Variation, Mecking Variation',
  c4c5nf3nf6b4: 'English Opening: Symmetrical Variation, Napolitano Gambit',
  c4c5nc3: 'English Opening: Symmetrical Variation, Normal Variation',
  c4nf6nc3c5g3d5cxd5nxd5bg2nc7:
    'English Opening: Symmetrical Variation, Rubinstein Variation',
  c4c5g3g6bg2bg7nc3nc6:
    'English Opening: Symmetrical Variation, Symmetrical Variation',
  nf3nf6c4c5nc3d5cxd5nxd5:
    'English Opening: Symmetrical Variation, Three Knights Variation',
  c4c5nc3nc6g3g6bg2bg7nf3:
    'English Opening: Symmetrical Variation, Two Knights Line',
  c4c5nc3nc6: 'English Opening: Symmetrical Variation, Two Knights Variation',
  'nf3c5c4nf6nc3e6g3b6bg2bb7o-obe7d4cxd4qxd4d6rd1a6b3nbd7':
    'English Opening: Symmetrical, Hedgehog, Flexible Formation',
  e4e5c4: 'English Opening: The Whale',
  c4f5g4: 'English Opening: Wade Gambit',
  c4c5b4: 'English Opening: Wing Gambit',
  c4g5d4e5: 'English Opening: Zilbermints Gambit',
  c4e5e3nf6f4exf4nf3: "English Openings: King's English, Kahiko-Hula Gambit",
  c4nf6b4: 'English Orangutan',
  d4d6c4e5dxe5be6: 'English Rat: Pounds Gambit',
  d4e5: 'Englund Gambit',
  d4e5d5: 'Englund Gambit Complex Declined',
  d4e5d5bc5e4qh4: 'Englund Gambit Complex Declined, Diemer Counterattack',
  d4e5dxe5nc6nf3qe7: 'Englund Gambit Complex: Englund Gambit',
  d4e5dxe5nc6nf3bc5: 'Englund Gambit Complex: Felbecker Gambit',
  d4e5dxe5d6: 'Englund Gambit Complex: Hartlaub-Charlick Gambit',
  d4e5dxe5qh4: 'Englund Gambit Complex: Mosquito Gambit',
  d4e5dxe5f6: 'Englund Gambit Complex: Soller Gambit',
  d4e5dxe5nc6nf3f6: 'Englund Gambit Complex: Soller Gambit Deferred',
  d4e5dxe5nc6nf3qe7qd5: 'Englund Gambit Complex: Stockholm Variation',
  d4e5dxe5nc6nf3h6: 'Englund Gambit Complex: Zilbermints Gambit',
  d4e5dxe5nc6nf3nge7:
    'Englund Gambit Complex: Zilbermints Gambit, 2. dxe5 Nc6 3. Nf3 Nge7',
  d4e5nf3: 'Englund Gambit Declined, Reversed Alekhine',
  d4e5nf3e4ng1: 'Englund Gambit Declined, Reversed Brooklyn',
  e3e5d4: 'Englund Gambit Declined, Reversed French',
  d4e5nf3e4: 'Englund Gambit Declined, Reversed Krebs',
  d4e5nf3e4ne5: 'Englund Gambit Declined, Reversed Mokele Mbembe',
  'c3e5a3d5b3nf6bb2nc6a4bd6g3o-oe3': 'Formation: Cabbage Attack',
  'a3e5b3d5c3nf6d3nc6e3bd6f3o-og3': 'Formation: Hippopotamus Attack',
  'a3e5g3d5bg2nf6d3nc6nd2bd6e3o-oh3': 'Formation: Shy Attack',
  e4e5nf3nc6nc3nf6: 'Four Knights Game',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3qe7ne2d5':
    'Four Knights Game: Alatortsev Variation',
  'e4e5nf3nc6nc3nf6bb5bc5o-oo-onxe5nxe5d4bd6f4nc6e5bb4':
    'Four Knights Game: Bardeleben Variation',
  e4e5nf3nc6nc3nf6bb5bb4: 'Four Knights Game: Double Spanish',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3':
    'Four Knights Game: Double Spanish, with 5. O-O',
  'e4e5nf3nf6nc3nc6bb5bb4o-oo-ond5nxd5exd5e4':
    'Four Knights Game: Gunsberg Counterattack',
  e4e5nf3nc6nc3nf6a3: 'Four Knights Game: Gunsberg Variation',
  e4e5nf3nc6nc3nf6nxe5: 'Four Knights Game: Halloween Gambit',
  e4e5nf3nc6nc3nf6nxe5nxe5d4ng6e5ng8bc4bb4qf3f5:
    'Four Knights Game: Halloween Gambit, Oldtimer Variation',
  e4e5nf3nc6nc3nf6nxe5nxe5d4nc6d5ne5f4ng6e5ng8d6cxd6exd6qf6nb5rb8:
    'Four Knights Game: Halloween Gambit, Plasma Variation',
  e4e5nf3nc6bc4nf6nc3: 'Four Knights Game: Italian Variation',
  e4e5nf3nc6bc4bc5nc3nf6:
    'Four Knights Game: Italian Variation, 3. Bc4 Bc5 4. Nc3 Nf6',
  'e4e5nf3nc6bc4nf6nc3nxe4bxf7+':
    'Four Knights Game: Italian Variation, Noa Gambit',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3bxc3bxc3d6re1':
    'Four Knights Game: Janowski Variation',
  'e4e5nf3nc6nc3nf6bb5nd4nxe5bc5o-oo-o':
    'Four Knights Game: Marshall Variation',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-obxc6':
    'Four Knights Game: Nimzowitsch (Paulsen)',
  e4e5nf3nc6nc3nf6bb5a6bxc6: 'Four Knights Game: Ranken Variation',
  e4e5nf3nc6nc3nf6bb5nd4be2:
    'Four Knights Game: Rubinstein Countergambit, 5. Be2',
  'e4e5nf3nf6nc3nc6bb5nd4o-o':
    'Four Knights Game: Rubinstein Countergambit, Henneberger Variation',
  'e4e5nf3nc6nc3nf6bb5nd4be2nxf3+bxf3bc5o-oo-od3d6na4bb6':
    'Four Knights Game: Rubinstein Countergambit, Maroczy Variation',
  e4e5nf3nc6nc3nf6d4: 'Four Knights Game: Scotch Variation',
  e4e5nf3nc6nc3nf6d4exd4: 'Four Knights Game: Scotch Variation Accepted',
  e4e5nf3nc6nc3nf6d4exd4nd5:
    'Four Knights Game: Scotch Variation, Belgrade Gambit',
  e4e5nf3nc6nc3nf6d4bb4nxe5:
    'Four Knights Game: Scotch Variation, Krause Gambit',
  e4e5nf3nc6nc3nf6d4bb4nxe5qe7:
    'Four Knights Game: Scotch Variation, Krause Gambit, Leonhardt Defense',
  e4e5nf3nc6nc3nf6d4bb4d5nd4:
    'Four Knights Game: Scotch Variation, Oxford Gambit',
  e4e5nf3nc6nc3nf6d4exd4nxd4nxe4:
    'Four Knights Game: Scotch Variation, Schmid Defense',
  e4e5nf3nc6nc3nf6bb5: 'Four Knights Game: Spanish Variation',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3bxc3':
    'Four Knights Game: Spanish Variation, 5. O-O O-O 6. d3 Bxc3',
  e4e5nf3nc6nc3nf6bb5bc5:
    'Four Knights Game: Spanish Variation, Classical Variation',
  'e4e5nf3nc6nc3nf6bb5nd4ba4bc5nxe5o-o':
    'Four Knights Game: Spanish Variation, Classical Variation, Marshall Gambit',
  e4e5nf3nc6nc3nf6bb5nd4:
    'Four Knights Game: Spanish Variation, Rubinstein Variation',
  e4e5nf3nf6nc3nc6bb5nd4nxe5qe7f4:
    'Four Knights Game: Spanish Variation, Rubinstein Variation, 5. Nxe5 Qe7 6. f4',
  e4e5nf3nc6nc3nf6bb5nd4nxd4:
    'Four Knights Game: Spanish Variation, Rubinstein Variation Accepted',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3d6':
    'Four Knights Game: Spanish Variation, Symmetrical Variation',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3d6ne2':
    'Four Knights Game: Spanish Variation, Symmetrical Variation, 6. d3 d6 7. Ne2',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3d6bg5ne7':
    'Four Knights Game: Spanish Variation, Symmetrical Variation, 6. d3 d6 7. Bg5 Ne7',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3d6bg5bxc3bxc3qe7re1nd8d4bg4':
    'Four Knights Game: Spanish Variation, Symmetrical Variation, 9. Re1 Nd8 10. d4 Bg4',
  'e4e5nf3nc6nc3nf6bb5a6bxc6dxc6nxe5nxe4nxe4qd4o-oqxe5re1be6d4qd5':
    'Four Knights Game: Spielmann Variation',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3bxc3bxc3d5':
    'Four Knights Game: Svenonius Variation',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3d6bg5ne7nh4c6bc4d5bb3qd6':
    'Four Knights Game: Symmetrical, Blake Variation',
  'e4e5nf3nc6nc3nf6bb5bb4o-oo-od3d6bg5bxc3bxc3qe7':
    'Four Knights Game: Symmetrical, Metger Unpin',
  'e4e5nf3nf6nc3nc6bb5bb4o-oo-od3d6bg5be6':
    'Four Knights Game: Symmetrical, Tarrasch Variation',
  e4e5nf3nc6nc3nf6d4exd4nd5nxe4qe2f5:
    'Four Knights: Scotch Variation, Belgrade Gambit, Modern Defense',
  e4e6d4c5d5: 'Franco-Benoni Defense',
  e4e6: 'French Defense',
  e4e6d4d5: 'French Defense, 2. d4 d5',
  e4e6d4d5e5: 'French Defense: Advance Variation',
  e4e6d4d5e5c5: 'French Defense: Advance Variation, 2. d4 d5 3. e5 c5',
  e4e6d4d5e5c5c3: 'French Defense: Advance Variation, 3. e5 c5 4. c3',
  e4e6d4d5e5c5c3nc6: 'French Defense: Advance Variation, 3. e5 c5 4. c3 Nc6',
  e4e6d4d5e5c5c3nc6nf3bd7: 'French Defense: Advance Variation, Euwe Variation',
  e4e6d4d5e5bd7: 'French Defense: Advance Variation, Extended Bishop Swap',
  e4e6d4d5e5c5b4: 'French Defense: Advance Variation, Frenkel Gambit',
  e4e6d4d5e5c5c3nc6nf3qb6a3nh6:
    'French Defense: Advance Variation, Lputian Variation',
  e4e6d4d5e5c5c3nc6nf3qb6a3: 'French Defense: Advance Variation, Main Line',
  e4e6d4d5e5c5c3nc6nf3qb6bd3:
    'French Defense: Advance Variation, Milner-Barry Gambit',
  e4e6d4d5e5c5qg4: 'French Defense: Advance Variation, Nimzowitsch Attack',
  e4e6d4d5e5c5qg4cxd4nf3:
    'French Defense: Advance Variation, Nimzowitsch Gambit',
  e4e6d4d5e5c5nf3: 'French Defense: Advance Variation, Nimzowitsch System',
  e4e6d4d5e5c5c3nc6nf3: 'French Defense: Advance Variation, Paulsen Attack',
  e4e6d4d5e5c5nf3cxd4bd3: 'French Defense: Advance Variation, Ruisdonk Gambit',
  e4e6d4d5e5c5c3qb6nf3bd7: 'French Defense: Advance Variation, Wade Variation',
  e4e6d4d5e5c5dxc5: 'French Defense: Advance, Steinitz Variation',
  e4e6d4d5be3: 'French Defense: Alapin Gambit',
  e4e6d4d5nc3nf6bg5be7e5nfd7h4: 'French Defense: Alekhine-Chatard Attack',
  e4e6d4d5nc3nf6bg5be7e5nfd7h4bxg5hxg5qxg5:
    'French Defense: Alekhine-Chatard Attack, Albin-Chatard Gambit',
  e4e6d4d5nc3nf6bg5be7e5nfd7h4c5:
    'French Defense: Alekhine-Chatard Attack, Breyer Variation',
  e4e6d4d5nc3nf6bg5be7e5nfd7h4a6:
    'French Defense: Alekhine-Chatard Attack, Maroczy Variation',
  'e4e6d4d5nc3nf6bg5be7e5nfd7h4o-o':
    'French Defense: Alekhine-Chatard Attack, Spielmann Variation',
  e4e6d4d5nc3nf6bg5be7e5nfd7h4f6:
    'French Defense: Alekhine-Chatard Attack, Teichmann Variation',
  e4e6d4b5: 'French Defense: Baeuerle Gambit',
  e4e6b4: 'French Defense: Banzai-Leong Gambit',
  e4e6b4bxb4e5: 'French Defense: Banzai-Leong Gambit, Pinova Gambit',
  e4e6bb5: 'French Defense: Bird Invitation',
  e4e6d4d5nc3nf6bg5: 'French Defense: Burn Variation',
  e4e6d4d5nf3dxe4ne5: 'French Defense: Carlson Gambit',
  e4e6qe2: 'French Defense: Chigorin Variation',
  e4e6d4d5nc3nf6: 'French Defense: Classical Variation',
  e4e6d4d5nc3nf6bg5be7e5nfd7bxe7qxe7:
    'French Defense: Classical Variation, 5. e5 Nfd7 6. Bxe7 Qxe7',
  e4e6d4d5nc3nf6bg5be7e5nfd7bxe7qxe7nb5:
    'French Defense: Classical Variation, Alapin Variation',
  'e4e6d4d5nc3nf6bg5dxe4nxe4be7bxf6bxf6nf3o-o':
    'French Defense: Classical Variation, Burn Variation, Main Line',
  e4e6d4d5nc3nf6bg5dxe4nxe4be7bxf6gxf6:
    'French Defense: Classical Variation, Burn Variation, Morozevich Line',
  e4e6d4d5nc3nf6exd5:
    'French Defense: Classical Variation, Delayed Exchange Variation',
  e4e6d4d5nc3nf6bg5be7e5ng8be3b6:
    'French Defense: Classical Variation, Frankfurt Variation',
  e4e6d4d5nc3nf6bg5be7: 'French Defense: Classical Variation, Normal Variation',
  e4e6d4d5nc3nf6bg5be7e5nfd7bxe7qxe7qg4:
    'French Defense: Classical Variation, Pollock Variation',
  e4e6d4d5nc3nf6bg5be7bxf6:
    'French Defense: Classical Variation, Richter Attack',
  e4e6d4d5nc3nf6bg5be7bxf6bxf6e5be7qg4:
    'French Defense: Classical Variation, Richter Attack, 6. e5 Be7 7. Qg4',
  e4e6d4d5nc3nf6bg5be7e5nfd7bxe7qxe7qd2:
    'French Defense: Classical Variation, Rubinstein Variation',
  e4e6d4d5nc3nf6e5: 'French Defense: Classical Variation, Steinitz Variation',
  e4e6d4d5nc3nf6bg5be7e5nfd7bxe7qxe7f4:
    'French Defense: Classical Variation, Steinitz Variation, 6. Bxe7 Qxe7 7. f4',
  e4e6d4d5nc3nc6exd5:
    'French Defense: Classical Variation, Svenonius Variation',
  e4e6d4d5nc3nf6bd3: 'French Defense: Classical Variation, Swiss Variation',
  e4e6d4d5nc3nf6bg5be7e5nfd7bxe7qxe7bd3:
    'French Defense: Classical Variation, Tarrasch Variation',
  e4e6d4d5nc3nf6bg5be7e5ne4:
    'French Defense: Classical Variation, Tartakower Variation',
  e4e6d4d5nc3nf6bg5be7e5ng8:
    'French Defense: Classical Variation, Vistaneckis (Nimzowitsch) Variation',
  'e4e6d4d5nc3nf6bg5be7e5nfd7bxe7qxe7f4o-onf3c5qd2nc6o-o-oc4':
    'French Defense: Classical, Stahlberg Variation',
  d4d5c4e6e4dxe4: 'French Defense: Diemer-Duhm Gambit',
  e4e6d4d5exd5: 'French Defense: Exchange Variation',
  e4e6d4d5exd5exd5c4:
    'French Defense: Exchange Variation, Monte Carlo Variation',
  e4e6d4d5nc3nf6exd5exd5bg5:
    'French Defense: Exchange Variation, Svenonius Variation',
  e4e6d4d5exd5exd5nc3nf6bg5nc6:
    'French Defense: Exchange, Bogoljubov Variation',
  e4e6d3f5: 'French Defense: Franco-Hiva Gambit',
  d4f5e4e6: 'French Defense: Franco-Hiva Gambit, 2. e4 e6',
  e4e6nf3f5: 'French Defense: Franco-Hiva Gambit, 2. Nf3 f5',
  e4e6d4f5exf5nf6: 'French Defense: Franco-Hiva Gambit Accepted',
  e4e6d4d5nd2nc6c3dxe4nxe4e5:
    'French Defense: Guimard Variation, Thunderbunny Variation',
  e4e6d4d5nc3nf6be3: 'French Defense: Henneberger Variation',
  e4e6d4d5qe2e5f4exf4: 'French Defense: Hoffmann Gambit',
  e4e6b3: 'French Defense: Horwitz Attack',
  e4e6b3d5bb2: 'French Defense: Horwitz Attack, Papa-Ticulat Gambit',
  e4e6d3: "French Defense: King's Indian Attack",
  e4e6nf3: 'French Defense: Knight Variation',
  e4e6f4: 'French Defense: La Bourdonnais Variation',
  e4e6f4d5nf3dxe4: 'French Defense: La Bourdonnais Variation, Reuter Gambit',
  e4e6d4d5nc3nf6bg5bb4: 'French Defense: MacCutcheon Variation',
  e4e6d4d5nc3nf6bg5bb4e5h6bh4:
    'French Defense: MacCutcheon Variation, Bernstein Variation',
  e4e6d4d5nc3nf6bg5bb4e5h6exf6:
    'French Defense: MacCutcheon Variation, Chigorin Variation',
  e4e6d4d5nc3nf6bg5bb4e5h6bc1:
    'French Defense: MacCutcheon Variation, Dr. Olland (Dutch) Variation',
  e4e6nc3d5d4nf6bg5bb4e5h6bd2bxc3bxc3ne4qg4kf8bc1:
    'French Defense: MacCutcheon Variation, Duras Variation',
  e4e6d4d5nc3nf6bg5bb4exd5:
    'French Defense: MacCutcheon Variation, Exchange Variation',
  d4d5nc3nf6bg5e6e4bb4e5h6exf6hxg5fxg7rg8h4gxh4qg4:
    'French Defense: MacCutcheon Variation, Grigoriev Variation',
  e4e6d4d5nc3nf6bg5bb4e5h6be3:
    'French Defense: MacCutcheon Variation, Janowski Variation',
  e4e6d4d5nc3nf6bg5bb4e5h6bd2bxc3:
    'French Defense: MacCutcheon Variation, Lasker Variation',
  e4e6d4d5nc3nf6bg5bb4e5h6bd2bxc3bxc3ne4qg4g6:
    'French Defense: MacCutcheon Variation, Lasker Variation, 7. bxc3 Ne4 8. Qg4 g6',
  e4e6d4d5nc3nf6bg5bb4e5h6bd2nfd7:
    'French Defense: MacCutcheon Variation, Tartakower Variation',
  e4e6d4d5nc3bb4ne2nf6bg5: 'French Defense: MacCutcheon Variation, Wolf Gambit',
  e4e6d4d5nc3nf6bg5bb4e5: 'French Defense: MacCutcheon, Advance Variation',
  e4e6d4d5nc3nf6bg5bb4exd5qxd5bxf6gxf6qd2qa5:
    'French Defense: MacCutcheon, Bogoljubov Variation',
  e4e6d4nf6: 'French Defense: Mediterranean Defense',
  e4e6d4d5nh3: 'French Defense: Morphy Gambit',
  e4e6d4: 'French Defense: Normal Variation',
  e4e6c4d5cxd5exd5qb3: 'French Defense: Orthoschnapp Gambit',
  e4e6d4d5nc3: 'French Defense: Paulsen Variation',
  e4e6nc3d5f4: 'French Defense: Pelikan Variation',
  e4e6d4d5nf3: 'French Defense: Perseus Gambit',
  e4e6nc3: "French Defense: Queen's Knight",
  e4e6g3: 'French Defense: Reti-Spielmann Attack',
  e4e6d3d5nd2nf6ngf3nc6be2: 'French Defense: Reversed Philidor Formation',
  e4e6d4d5nc3dxe4: 'French Defense: Rubinstein Variation',
  e4e6d4d5nc3dxe4nxe4nd7:
    'French Defense: Rubinstein Variation, Blackburne Defense',
  'e4e6d4d5nc3dxe4nxe4nd7nf3ngf6nxf6+nxf6ne5':
    'French Defense: Rubinstein Variation, Capablanca Line',
  e4e6d4d5nc3dxe4nxe4e5: 'French Defense: Rubinstein Variation, Ellis Gambit',
  e4e6d4d5nc3dxe4nxe4bd7nf3bc6:
    'French Defense: Rubinstein Variation, Fort Knox Variation',
  'e4e6d4d5nd2dxe4nxe4nd7nf3ngf6nxf6+nxf6c3':
    'French Defense: Rubinstein Variation, Kasparov Attack',
  e4e6d4d5nc3dxe4nxe4qd5:
    'French Defense: Rubinstein Variation, Maric Variation',
  e4e6d4d5bd3: 'French Defense: Schlechter Variation',
  e4e6c4: 'French Defense: Steiner Variation',
  e4e6e5: 'French Defense: Steinitz Attack',
  e4e6d4d5nc3nf6e5nfd7f4c5nf3: 'French Defense: Steinitz Variation',
  e4e6d4d5nc3nf6e5nfd7f4c5dxc5nc6:
    'French Defense: Steinitz Variation, 5. f4 c5 6. dxc5 Nc6',
  e4e6d4d5nc3nf6e5nfd7f4c5nf3nc6be3:
    'French Defense: Steinitz Variation, Boleslavsky Variation',
  e4e6d4d5nc3nf6e5nfd7f4c5dxc5bxc5qg4:
    'French Defense: Steinitz Variation, Bradford Attack Variation',
  e4e6d4d5nc3nf6e5nfd7qg4:
    'French Defense: Steinitz Variation, Gledhill Attack',
  'e4e6d4d5nc3nf6e5nfd7f4c5dxc5nc6a3bxc5qg4o-onf3f6':
    'French Defense: Steinitz, Brodsky-Jones Variation',
  e4e6d4d5nd2: 'French Defense: Tarrasch Variation',
  e4e6d4d5nd2nf6e5nfd7bd3c5c3b6:
    'French Defense: Tarrasch Variation, Botvinnik Variation',
  e4e6d4d5nd2c5exd5qxd5:
    'French Defense: Tarrasch Variation, Chistyakov Defense',
  'e4e6d4d5nd2c5exd5qxd5ngf3cxd4bc4qd6o-onf6nb3nc6nbxd4nxd4nxd4a6':
    'French Defense: Tarrasch Variation, Chistyakov Defense, Modern Line',
  e4e6d4d5nd2nf6: 'French Defense: Tarrasch Variation, Closed Variation',
  e4e6d4d5nd2nf6e5nfd7bd3c5c3nc6:
    'French Defense: Tarrasch Variation, Closed Variation, 5. Bd3 c5 6. c3 Nc6',
  e4e6d4d5nd2nf6e5nfd7bd3c5c3nc6ne2cxd4cxd4:
    'French Defense: Tarrasch Variation, Closed Variation, Main Line',
  e4e6d4d5nd2nc6: 'French Defense: Tarrasch Variation, Guimard Defense',
  e4e6d4d5nd2nc6ngf3nf6:
    'French Defense: Tarrasch Variation, Guimard Defense, Main Line',
  e4e6d4d5nd2f5: 'French Defense: Tarrasch Variation, Haberditz Variation',
  e4e6d4d5nd2nf6e5nfd7bd3c5c3nc6ne2cxd4cxd4nb6:
    'French Defense: Tarrasch Variation, Leningrad Variation',
  e4e6d4d5nd2a6: 'French Defense: Tarrasch Variation, Modern System',
  e4e6d4d5nd2be7: 'French Defense: Tarrasch Variation, Morozevich Variation',
  e4e6d4d5nd2c5: 'French Defense: Tarrasch Variation, Open System',
  e4e6d4d5nd2c5exd5exd5ngf3c4:
    'French Defense: Tarrasch Variation, Open System, Advance Line',
  e4e6d4d5nd2c5ngf3:
    'French Defense: Tarrasch Variation, Open System, Euwe-Keres Line',
  e4e6d4d5nd2c5exd5exd5ngf3nc6:
    'French Defense: Tarrasch Variation, Open System, Main Line',
  e4e6d4d5nd2c5exd5nf6:
    'French Defense: Tarrasch Variation, Open System, Shaposhnikov Gambit',
  e4e6d4d5nd2c5c3:
    'French Defense: Tarrasch Variation, Open System, Suechting Line',
  e4e6d4d5nd2nf6e5nfd7f4:
    'French Defense: Tarrasch Variation, Pawn Center Variation',
  e4e6d4d5nd2c5exd5qxd5ngf3cxd4bc4qd8:
    'French Defense: Tarrasch, Eliskases Variation',
  e4e6d4d5nd2c5exd5exd5: 'French Defense: Tarrasch, Open, 4. exd5 exd5',
  e4e6nf3d5nc3: 'French Defense: Two Knights Variation',
  e4e6d4d5nc3bb4: 'French Defense: Winawer Variation',
  e4e6d4d5nc3bb4e5: 'French Defense: Winawer Variation, Advance Variation',
  e4e6d4d5nc3bb4e5c5:
    'French Defense: Winawer Variation, Advance Variation, 3. Nc3 Bb4 4. e5 c5',
  e4e6d4d5nc3bb4e5c5a3:
    'French Defense: Winawer Variation, Advance Variation, 4. e5 c5 5. a3',
  'e4e6d4d5nc3bb4e5c5a3bxc3+bxc3':
    'French Defense: Winawer Variation, Advance Variation, 5. a3 Bxc3+ 6. bxc3',
  'e4e6d4d5nc3bb4e5c5a3bxc3+bxc3ne7':
    'French Defense: Winawer Variation, Advance Variation, 5. a3 Bxc3+ 6. bxc3 Ne7',
  'e4e6d4d5nc3bb4e5c5a3bxc3+bxc3ne7a4':
    'French Defense: Winawer Variation, Advance Variation, 6. bxc3 Ne7 7. a4',
  e4e6d4d5nc3bb4e5c5a3cxd4axb4dxc3nf3:
    'French Defense: Winawer Variation, Advance Variation, 6. axb4 dxc3 7. Nf3',
  e4e6d4d5nc3bb4e5c5qg4:
    'French Defense: Winawer Variation, Advance Variation, Moscow Variation',
  'e4e6d4d5nc3bb4ne2dxe4a3bxc3+':
    'French Defense: Winawer Variation, Alekhine Gambit Accepted',
  'e4e6d4d5nc3bb4ne2dxe4a3bxc3+nxc3nc6':
    'French Defense: Winawer Variation, Alekhine Gambit, Kan Variation',
  e4e6d4d5nc3bb4ne2:
    'French Defense: Winawer Variation, Alekhine-Maroczy Gambit',
  e4e6d4d5nc3bb4e5c5bd2:
    'French Defense: Winawer Variation, Bogoljubov Variation',
  e4e6d4d5nc3bb4e5c5bd2ne7f4:
    'French Defense: Winawer Variation, Bogoljubov Variation, Icelandic Defense',
  'e4e6d4d5nc3bb4e5c5a3bxc3+bxc3qc7':
    'French Defense: Winawer Variation, Classical Variation',
  e4e6d4d5nc3bb4exd5:
    'French Defense: Winawer Variation, Delayed Exchange Variation',
  e4e6d4d5nc3bb4exd5exd5bd3ne7qh5:
    'French Defense: Winawer Variation, Exchange Variation, Canal Attack',
  e4e6d4d5nc3bb4bd2: 'French Defense: Winawer Variation, Fingerslip Variation',
  e4e6d4d5nc3bb4bd2dxe4qg4qxd4:
    'French Defense: Winawer Variation, Fingerslip Variation, Kunin Double Gambit',
  e4e6d4d5nc3bb4bd2dxe4qg4nf6qxg7rg8qh6:
    'French Defense: Winawer Variation, Fingerslip Variation, Main Line',
  e4e6d4d5nc3bb4bd2ne7nb1:
    "French Defense: Winawer Variation, Fingerslip Variation, Schwarz's Line",
  e4e6d4d5nc3bb4bd3c5exd5qxd5bd2:
    'French Defense: Winawer Variation, Kondratiyev Variation',
  e4e6d4d5nc3bb4e5c5a3cxd4axb4dxc3:
    'French Defense: Winawer Variation, Maroczy-Wallis Variation',
  e4e6d4d5nc3bb4e5qd7: 'French Defense: Winawer Variation, Petrosian Variation',
  'e4e6d4d5nc3bb4e5c5a3bxc3+bxc3ne7qg4':
    'French Defense: Winawer Variation, Poisoned Pawn Variation',
  'e4e6d4d5nc3bb4e5c5a3bxc3+bxc3ne7qg4qc7qxg7rg8qxh7cxd4ne2':
    'French Defense: Winawer Variation, Poisoned Pawn Variation, Main Line',
  'e4e6d4d5nc3bb4e5c5a3bxc3+bxc3ne7qg4qc7qxg7rg8qxh7cxd4kd1':
    'French Defense: Winawer Variation, Poisoned Pawn Variation, Paoli Variation',
  'e4e6d4d5nc3bb4e5c5a3bxc3+bxc3ne7nf3':
    'French Defense: Winawer Variation, Positional Variation',
  e4e6d4d5nc3bb4e5c5a3ba5:
    'French Defense: Winawer Variation, Retreat Variation',
  e4e6d4d5nc3bb4e5c5a3ba5b4cxd4:
    'French Defense: Winawer Variation, Retreat Variation, Armenian Line',
  e4e6d4d5nc3bb4a3:
    'French Defense: Winawer Variation, Winckelmann-Riemer Gambit',
  'e4e6d4d5nc3bb4ne2dxe4a3be7nxe4nf6n2g3o-obe2nc6':
    'French Defense: Winawer, Alekhine Gambit, Alatortsev Variation',
  e4e6nf3d5e5c5b4: 'French Defense: Wing Gambit',
  e4f6d4kf7: 'Fried Fox Defense',
  f3: "Gedult's Opening",
  e4e5nf3nc6bc4bc5: 'Giuoco Piano',
  h3e5a3: 'Global Opening',
  e4h5: 'Goldsmith Defense',
  e4h5d4nf6: 'Goldsmith Defense: Picklepuss Defense',
  g4: 'Grob Opening',
  g4f5: 'Grob Opening: Alessi Gambit',
  g4g5: 'Grob Opening: Double Grob',
  g4g5f4: 'Grob Opening: Double Grob, Coca-Cola Gambit',
  g4d5bg2: 'Grob Opening: Grob Gambit',
  g4d5bg2c6: 'Grob Opening: Grob Gambit Declined',
  g4d5bg2h5gxh5: 'Grob Opening: Grob Gambit, Basman Gambit',
  g4d5bg2bxg4c4: 'Grob Opening: Grob Gambit, Fritz Gambit',
  g4d5bg2bxg4c4d4bxb7nd7bxa8qxa8:
    'Grob Opening: Grob Gambit, Fritz Gambit, Romford Countergambit',
  g4d5bg2e5d4exd4c3: 'Grob Opening: Grob Gambit, Keres Gambit',
  g4d5bg2c6c4dxc4b3: 'Grob Opening: Grob Gambit, Richter-Grob Gambit',
  g4d5h3e5bg2c6: 'Grob Opening: Keene Defense',
  g4d5h3e5bg2c6d4e4c4bd6nc3ne7: 'Grob Opening: Keene Defense, Main Line',
  g4e5h3nc6: 'Grob Opening: London Defense',
  g4d5bg2bxg4c4d4: 'Grob Opening: Romford Countergambit',
  g4d5bg2c6g5: 'Grob Opening: Spike Attack',
  g4e5bg2d5c4: 'Grob Opening: Spike, Hurst Attack',
  g4d5e4dxe4nc3: 'Grob Opening: Zilbermints Gambit',
  g4d5e4dxe4nc3h5: 'Grob Opening: Zilbermints Gambit, Schiller Defense',
  g4d5e4dxe4nc3e5d3:
    'Grob Opening: Zilbermints Gambit, Zilbermints-Hartlaub Gambit',
  d4nf6c4g6nc3d5: 'Gruenfeld Defense',
  'd4nf6c4g6nc3d5nf3bg7e3o-oqb3e6': 'Gruenfeld Defense: Botvinnik Variation',
  d4nf6c4g6nc3d5bf4: 'Gruenfeld Defense: Brinckmann Attack',
  'd4nf6c4g6nc3d5bf4bg7e3o-o':
    'Gruenfeld Defense: Brinckmann Attack, Gruenfeld Gambit',
  'd4nf6c4g6nc3d5bf4bg7e3o-ocxd5nxd5nxd5qxd5bxc7':
    'Gruenfeld Defense: Brinckmann Attack, Gruenfeld Gambit Accepted',
  'd4nf6c4g6nc3d5bf4bg7e3o-orc1c5dxc5be6':
    'Gruenfeld Defense: Brinckmann Attack, Gruenfeld Gambit, Botvinnik Variation',
  'd4nf6c4g6nc3d5bf4bg7e3o-orc1':
    'Gruenfeld Defense: Brinckmann Attack, Gruenfeld Gambit, Capablanca Variation',
  'd4nf6c4g6nc3d5bf4bg7rc1o-oe3c5dxc5qa5':
    'Gruenfeld Defense: Brinckmann Attack, Reshevsky Gambit',
  d4nf6c4g6g3bg7bg2d5: 'Gruenfeld Defense: Counterthrust Variation',
  d4nf6c4g6nc3d5cxd5nxd5: 'Gruenfeld Defense: Exchange Variation',
  d4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7bc4:
    'Gruenfeld Defense: Exchange Variation, Classical Variation',
  'd4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7bc4o-one2qd7':
    'Gruenfeld Defense: Exchange Variation, Larsen Variation',
  d4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7nf3:
    'Gruenfeld Defense: Exchange Variation, Modern Exchange Variation',
  d4nf6nf3g6c4bg7nc3d5cxd5nxd5e4nxc3bxc3c5h3:
    "Gruenfeld Defense: Exchange Variation, Modern Exchange Variation, Kramnik's Line",
  'd4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7nf3c5rb1o-obe2nc6d5bxc3+':
    'Gruenfeld Defense: Exchange Variation, Modern Exchange Variation, Pawn Grab Line',
  d4nf6c4g6nc3d5cxd5nxd5na4:
    'Gruenfeld Defense: Exchange Variation, Nadanian Attack',
  'd4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7bc4c5ne2nc6be3o-oo-obg4f3na5bxf7+':
    'Gruenfeld Defense: Exchange Variation, Seville Variation',
  'd4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7bc4o-one2nc6':
    "Gruenfeld Defense: Exchange Variation, Simagin's Improved Variation",
  'd4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7bc4c5ne2o-oo-onc6be3bg4f3na5bd3cxd4cxd4be6d5':
    'Gruenfeld Defense: Exchange Variation, Sokolsky Variation',
  'd4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7bc4c5ne2o-o':
    'Gruenfeld Defense: Exchange Variation, Spassky Variation',
  'd4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7bc4c5ne2nc6be3o-oo-ocxd4cxd4':
    'Gruenfeld Defense: Exchange Variation, Spassky Variation, 10. O-O cxd4 11. cxd4',
  'd4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7bc4c5ne2nc6be3o-oo-obg4f3na5bd3cxd4cxd4be6':
    'Gruenfeld Defense: Exchange Variation, Spassky Variation, 12. Bd3 cxd4 13. cxd4 Be6',
  'd4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7bc4o-one2qd7o-ob6':
    'Gruenfeld Defense: Exchange, Larsen Variation',
  'd4nf6c4g6nc3d5cxd5nxd5e4nxc3bxc3bg7bc4o-one2b6':
    "Gruenfeld Defense: Exchange, Simagin's Lesser Variation",
  'd4d5c4c6nc3nf6e3g6nf3bg7bd3o-oo-obf5': 'Gruenfeld Defense: Flohr Defense',
  'd4nf6c4g6nc3d5nf3bg7qa4+': 'Gruenfeld Defense: Flohr Variation',
  d4nf6c4g6nc3d5g4: 'Gruenfeld Defense: Gibbon Gambit',
  d4nf6c4g6nc3d5bg5ne4nxe4dxe4qd2c5: 'Gruenfeld Defense: Lundin Variation',
  d4nf6c4g6nc3d5f3: 'Gruenfeld Defense: Lutikov Variation',
  d4nf6c4g6nc3d5f3c5cxd5nxd5na4:
    'Gruenfeld Defense: Lutikov Variation, Murrey Attack',
  'd4nf6c4g6nc3d5nf3bg7e3o-ob4': 'Gruenfeld Defense: Makogonov Variation',
  'd4nf6c4g6nc3d5nf3bg7e3o-obd2': 'Gruenfeld Defense: Opocensky Variation',
  'd4nf6c4g6nc3d5e3bg7qb3dxc4bxc4o-onf3nbd7ng5':
    'Gruenfeld Defense: Pachman Variation',
  d4nf6c4g6nc3d5nf3bg7qb3: 'Gruenfeld Defense: Russian Variation',
  d4nf6c4g6nc3d5qb3:
    'Gruenfeld Defense: Russian Variation, Accelerated Variation',
  'd4nf6c4g6nc3d5nf3bg7qb3dxc4qxc4o-oe4nc6':
    'Gruenfeld Defense: Russian Variation, Byrne (Simagin) Variation',
  'd4nf6c4g6nc3d5nf3bg7qb3dxc4qxc4o-oe4a6':
    'Gruenfeld Defense: Russian Variation, Hungarian Variation',
  'd4nf6c4g6nc3d5nf3bg7qb3dxc4qxc4o-oe4b6':
    'Gruenfeld Defense: Russian Variation, Levenfish Variation',
  'd4nf6c4g6nc3d5nf3bg7qb3dxc4qxc4o-oe4na6':
    'Gruenfeld Defense: Russian Variation, Prins Variation',
  'd4nf6c4g6nc3d5nf3bg7qb3dxc4qxc4o-oe4bg4':
    'Gruenfeld Defense: Russian Variation, Smyslov Variation',
  'd4nf6c4g6nc3d5nf3bg7qb3dxc4qxc4o-oe4bg4be3nfd7qb3':
    'Gruenfeld Defense: Russian Variation, Smyslov Variation, 8. Be3 Nfd7 9. Qb3',
  'd4nf6c4g6nc3d5nf3bg7qb3dxc4qxc4o-oe4c6':
    'Gruenfeld Defense: Russian Variation, Szabo (Boleslavsky)',
  'd4nf6c4g6nc3d5nf3bg7qb3dxc4qxc4o-oe4bg4be3nfd7qb3c5':
    'Gruenfeld Defense: Russian Variation, Yugoslav Variation',
  'd4nf6c4g6nc3d5nf3bg7qb3dxc4qxc4o-oe4':
    'Gruenfeld Defense: Russian Variation, with e4',
  'd4nf6c4g6nc3d5nf3bg7qb3dxc4qxc4o-oe4bg4be3nfd7be2nb6qd3nc6o-o-o':
    'Gruenfeld Defense: Russian, Keres Variation',
  'd4d5c4c6nc3nf6e3g6nf3bg7bd3o-oo-obg4': 'Gruenfeld Defense: Smyslov Defense',
  d4nf6c4g6nc3d5bg5: 'Gruenfeld Defense: Stockholm Variation',
  d4nf6c4g6nc3d5nf3: 'Gruenfeld Defense: Three Knights Variation',
  d4nf6c4g6nc3d5nf3bg7:
    'Gruenfeld Defense: Three Knights Variation, 3. Nc3 d5 4. Nf3 Bg7',
  d4nf6c4g6nc3d5nf3bg7e3:
    'Gruenfeld Defense: Three Knights Variation, Burille Variation',
  'd4nf6c4c5e3g6nc3bg7nf3o-obe2cxd4exd4d5o-onc6':
    'Gruenfeld Defense: Three Knights Variation, Burille Variation, Reversed Tarrasch',
  d4nf6c4g6nc3d5nf3bg7bf4:
    'Gruenfeld Defense: Three Knights Variation, Hungarian Attack',
  'd4nf6c4g6nc3d5nf3bg7bf4o-oe3':
    'Gruenfeld Defense: Three Knights Variation, Hungarian Variation',
  'd4nf6c4g6nc3d5nf3bg7e3o-obd3':
    'Gruenfeld Defense: Three Knights Variation, Paris Variation',
  d4nf6c4g6nc3d5nf3bg7bg5:
    'Gruenfeld Defense: Three Knights Variation, Petrosian System',
  'd4nf6c4g6nc3d5nf3bg7e3o-oqb3':
    'Gruenfeld Defense: Three Knights Variation, Vienna Variation',
  d4nf6c4g6nc3d5h4: 'Gruenfeld Defense: Zaitsev Gambit',
  e4b6d4ba6: 'Guatemala Defense',
  e4e5nf3qe7: 'Gunderam Defense',
  e4nh6: 'Hippopotamus Defense',
  e4nh6d4g6c4f6: 'Hippopotamus Defense, 2. d4 g6 3. c4 f6',
  d4e6: 'Horwitz Defense',
  d4e6c4f5e4: 'Horwitz Defense: Dutch Defense, Bellon Gambit',
  c4e6d4e5: 'Horwitz Defense: Zilbermints Gambit',
  g3: 'Hungarian Opening',
  g3nc6nc3d5d4e5dxe5d4ne4f5: 'Hungarian Opening: Asten Gambit',
  g3d5bg2e5b4: 'Hungarian Opening: Buecker Gambit',
  g3e5a3d5nf3e4nh4be7d3: 'Hungarian Opening: Burk Gambit',
  g3d5bg2e6: 'Hungarian Opening: Catalan Formation',
  g3f5: 'Hungarian Opening: Dutch Defense',
  g3nf6: 'Hungarian Opening: Indian Defense',
  g3g5: 'Hungarian Opening: Myers Defense',
  'g3f5e4fxe4qh5+g6': 'Hungarian Opening: Pachman Gambit',
  'g3e5nh3d5f4bxh3bxh3exf4o-o': 'Hungarian Opening: Paris Gambit',
  g3e5nf3: 'Hungarian Opening: Reversed Alekhine',
  g3e5nf3e4ng1nf6b4:
    'Hungarian Opening: Reversed Brooklyn Defense, Brooklyn Benko Gambit',
  g3d5bg2c5: 'Hungarian Opening: Reversed Modern Defense',
  g3e5nf3e4nh4: 'Hungarian Opening: Reversed Norwegian Defense',
  g3c5: 'Hungarian Opening: Sicilian Invitation',
  g3d5bg2c6: 'Hungarian Opening: Slav Formation',
  g3g6: 'Hungarian Opening: Symmetrical Variation',
  g3h5nf3h4: 'Hungarian Opening: Van Kuijk Gambit',
  g3d5nf3g5: 'Hungarian Opening: Wiedenhagen-Beta Gambit',
  g3d5bg2e5c4dxc4b3: 'Hungarian Opening: Winterberg Gambit',
  d4nf6: 'Indian Game',
  d4nf6c4e6qb3: 'Indian Game: 3. Qb3',
  d4nf6c4g6d5b5: 'Indian Game: Anti-Gruenfeld, Adorjan Gambit',
  d4nf6c4g6d5: 'Indian Game: Anti-Gruenfeld, Advance Variation',
  d4nf6c4g6f3: 'Indian Game: Anti-Gruenfeld, Alekhine Variation',
  d4nf6c4g6f3e5: 'Indian Game: Anti-Gruenfeld, Alekhine Variation, Leko Gambit',
  d4nf6c4e6nf3: 'Indian Game: Anti-Nimzo-Indian',
  d4nf6c4e5: 'Indian Game: Budapest Defense',
  e3d6d4g6nf3bg7bd3nf6: "Indian Game: Colle System, King's Indian Variation",
  d4nf6nf3c6: 'Indian Game: Czech-Indian',
  d4nf6c4e6g4: 'Indian Game: Devin Gambit',
  d4nf6c4e6nf3ne4: 'Indian Game: Doery Indian',
  d4nf6c4e6nf3a6: 'Indian Game: Dzindzi-Indian Defense',
  d4nf6c4e6: 'Indian Game: East Indian Defense',
  d4nf6f3d5g4: 'Indian Game: Gedult Attack, Gedult Attack',
  d4nf6g4nxg4: 'Indian Game: Gibbins-Wiedenhagen Gambit Accepted',
  d4nf6g4nxg4f3nf6e4: 'Indian Game: Gibbins-Wiedenhagen Gambit, Maltese Falcon',
  d4nf6g4e5: 'Indian Game: Gibbins-Wiedenhagen Gambit, Oshima Defense',
  d4nf6g4nxg4e4d6be2nf6nc3:
    'Indian Game: Gibbins-Wiedenhagen Gambit, Stummer Gambit',
  d4nf6c4g6g3bg7bg2:
    "Indian Game: King's Indian Variation, Fianchetto Variation",
  d4nf6nf3a6: 'Indian Game: Knights Variation, Alburt-Miles Variation',
  d4nf6nd2e5: 'Indian Game: Lazard Gambit',
  d4nf6nf3e6bf4: 'Indian Game: London System',
  d4nf6nc3e5: 'Indian Game: Maddigan Gambit',
  d4nf6c4g5: 'Indian Game: Medusa Gambit',
  d4nf6c4: 'Indian Game: Normal Variation',
  d4nf6e4: 'Indian Game: Omega Gambit',
  d4nf6e4nxe4bd3nf6bg5: 'Indian Game: Omega Gambit, Arafat Gambit',
  d4nf6f3d5e4: 'Indian Game: Paleface Attack, Blackmar-Diemer Gambit Deferred',
  d4nf6d5: 'Indian Game: Pawn Push Variation',
  d4nf6nf3b5: 'Indian Game: Polish Variation',
  d4nf6nf3g6g3: 'Indian Game: Przepiorka Variation',
  d4nf6nf3c5d5b5: 'Indian Game: Pseudo-Benko',
  d4nf6c4b5: 'Indian Game: Pyrenees Gambit',
  d4nf6nc3c5: 'Indian Game: Reversed Chigorin Defense',
  d4nf6nf3b6c3e5: 'Indian Game: Schnepper Gambit',
  d4nf6c4e6bg5: 'Indian Game: Seirawan Attack',
  d4nf6nf3c5: 'Indian Game: Spielmann-Indian',
  d4nf6g3: 'Indian Game: Tartakower Attack',
  d4nf6nf3d6: 'Indian Game: Wade-Tartakower Defense',
  d4nf6c4g6: 'Indian Game: West Indian Defense',
  e4e5nf3nc6nxe5: 'Irish Gambit',
  e4e5nf3nc6bc4: 'Italian Game',
  e4e5nf3nc6bc4h6: 'Italian Game: Anti-Fried Liver Defense',
  e4e5nf3nc6bc4bc5c3nf6b4: "Italian Game: Bird's Attack",
  e4e5nf3nc6bc4bc5c3: 'Italian Game: Classical Variation',
  e4e5nf3nc6bc4bc5c3nf6:
    'Italian Game: Classical Variation, 3. Bc4 Bc5 4. c3 Nf6',
  'e4e5nf3nc6bc4bc5o-onf6c3': 'Italian Game: Classical Variation, Albin Gambit',
  e4e5nf3nc6bc4bc5c3f5: 'Italian Game: Classical Variation, Alexandre Gambit',
  e4e5nf3nc6bc4bc5c3nf6d4: 'Italian Game: Classical Variation, Center Attack',
  e4e5nf3nc6bc4bc5c3qe7d4bb6:
    'Italian Game: Classical Variation, Center Holding Variation',
  e4e5nf3nc6bc4bc5c3qe7: 'Italian Game: Classical Variation, Closed Variation',
  e4e5nf3nc6bc4bc5c3nf6d3:
    'Italian Game: Classical Variation, Giuoco Pianissimo',
  'e4e5nf3nc6bc4bc5c3nf6d3d6o-oo-ore1a6bb3ba7h3':
    'Italian Game: Classical Variation, Giuoco Pianissimo, Main Line',
  e4e5nf3nc6d4exd4bc4bc5c3nf6e5d5:
    'Italian Game: Classical Variation, Greco Gambit',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4e5d5bb5ne4cxd4bb4+':
    'Italian Game: Classical Variation, Greco Gambit, Anderssen Variation',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+nc3nxe4o-onxc3':
    'Italian Game: Classical Variation, Greco Gambit, Greco Variation',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+nc3nxe4o-obxc3':
    'Italian Game: Classical Variation, Greco Gambit, Main Line',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+nc3nxe4o-obxc3d5bf6re1ne7rxe4d6g4':
    'Italian Game: Classical Variation, Greco Gambit, Moeller-Bayonet Attack',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+nc3nxe4o-obxc3d5':
    'Italian Game: Classical Variation, Greco Gambit, Moeller-Therkatz Attack',
  e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4:
    'Italian Game: Classical Variation, Greco Gambit, Traditional Line',
  e4e5nf3nc6bc4bc5c3d6d4exd4cxd4bb6:
    'Italian Game: Classical Variation, La Bourdonnais Variation',
  'e4e5nf3nc6bc4bc5c3qe7d4bb6o-od6a4a6h3nf6re1':
    'Italian Game: Classical Variation, Tarrasch Variation',
  'e4e5nf3nc6bc4bc5o-onf6d4': 'Italian Game: Deutz Gambit',
  e4e5nf3nc6bc4bc5b4: 'Italian Game: Evans Gambit',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5o-od6':
    'Italian Game: Evans Gambit, 5. c3 Ba5 6. O-O d6',
  'e4e5nf3nc6bc4bc5b4bxb4c3bc5d4exd4o-od6cxd4bb6nc3bg4':
    'Italian Game: Evans Gambit, 8. cxd4 Bb6 9. Nc3 Bg4',
  e4e5nf3nc6bc4bc5b4bxb4: 'Italian Game: Evans Gambit Accepted',
  e4e5nf3nc6bc4bc5b4bb6: 'Italian Game: Evans Gambit Declined',
  e4e5nf3nc6bc4bc5b4bb6a4: 'Italian Game: Evans Gambit Declined, 5. a4',
  e4e5nf3nc6bc4bc5b4bb6bb2:
    'Italian Game: Evans Gambit Declined, Cordel Variation',
  'e4e5nf3nc6bc4bc5b4bb6b5na5nxe5qg5qf3qxe5qxf7+kd8bb2':
    'Italian Game: Evans Gambit Declined, Hicken Variation',
  e4e5nf3nc6bc4bc5b4bb6b5na5nxe5qg5:
    'Italian Game: Evans Gambit Declined, Hirschbach Variation',
  e4e5nf3nc6bc4bc5b4bb6b5na5nxe5nh6:
    'Italian Game: Evans Gambit Declined, Lange Variation',
  'e4e5nf3nc6bc4bc5b4bb6b5na5nxe5nh6d4d6bxh6dxe5bxg7rg8bxf7+kxf7bxe5qg5nd2':
    'Italian Game: Evans Gambit Declined, Pavlov Variation',
  e4e5nf3nc6bc4bc5b4bb6a4a6nc3:
    'Italian Game: Evans Gambit Declined, Showalter Variation',
  'e4e5nf3nc6bc4bc5b4bb6b5na5nxe5qg5bxf7+ke7qh5':
    'Italian Game: Evans Gambit Declined, Vasquez Variation',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5o-od6d4bg4':
    'Italian Game: Evans Gambit, Alapin-Steinitz Variation',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5o-onf6d4exd4':
    'Italian Game: Evans Gambit, Anderssen Defense',
  e4e5nf3nc6bc4bc5b4bxb4c3be7:
    'Italian Game: Evans Gambit, Anderssen Variation',
  e4e5nf3nc6bc4bc5b4bxb4c3be7d4na5:
    'Italian Game: Evans Gambit, Anderssen Variation, Cordel Line',
  e4e5nf3nc6bc4bc5b4bxb4c3ba5d4d6:
    'Italian Game: Evans Gambit, Bronstein Defense',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5d4exd4o-odxc3':
    'Italian Game: Evans Gambit, Compromised Defense',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5d4exd4o-odxc3qb3qf6e5qg6nxc3nge7ba3':
    'Italian Game: Evans Gambit, Compromised Defense, Main Line',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5d4exd4o-odxc3qb3qf6e5qg6nxc3nge7rd1':
    'Italian Game: Evans Gambit, Compromised Defense, Potter Variation',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5d4exd4o-od3':
    'Italian Game: Evans Gambit, Dufresne Defense',
  e4e5nf3nc6bc4bc5b4b5: 'Italian Game: Evans Gambit, Fontaine Countergambit',
  'e4e5nf3nc6bc4bc5b4bxb4c3bc5d4exd4o-od6cxd4bb6nc3bg4qa4':
    'Italian Game: Evans Gambit, Fraser Attack',
  'e4e5nf3nc6bc4bc5b4bxb4c3bc5d4exd4o-od6cxd4bb6nc3bg4qa4bd7qb3na5bxf7+kf8qc2':
    'Italian Game: Evans Gambit, Fraser-Mortimer Attack',
  'e4e5nf3nc6bc4bc5b4bxb4c3bc5d4exd4o-od6cxd4bb6nc3na5bg5':
    'Italian Game: Evans Gambit, Goering Attack',
  'e4e5nf3nc6bc4bc5b4bxb4c3bc5d4exd4cxd4bb4+bd2':
    'Italian Game: Evans Gambit, Harding Variation',
  e4e5nf3nc6bc4bc5b4d5: 'Italian Game: Evans Gambit, Hein Countergambit',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5d4exd4o-ob5':
    'Italian Game: Evans Gambit, Johner Defense',
  e4e5nf3nc6bc4bc5b4bxb4c3ba5d4nf6:
    'Italian Game: Evans Gambit, Laroche Variation',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5o-od6d4bb6':
    'Italian Game: Evans Gambit, Lasker Defense',
  e4e5nf3nc6bc4bc5b4bxb4c3ba5d4b5:
    'Italian Game: Evans Gambit, Leonhardt Countergambit',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5d4d6qb3qd7dxe5dxe5o-obb6ba3na5nxe5':
    'Italian Game: Evans Gambit, Levenfish Variation',
  e4e5nf3nc6bc4bc5b4bxb4c3ba5: 'Italian Game: Evans Gambit, Main Line',
  e4e5nf3nc6bc4bc5b4bxb4c3bf8: 'Italian Game: Evans Gambit, Mayet Defense',
  e4e5nf3nc6bc4bc5b4bxb4c3bc5: 'Italian Game: Evans Gambit, McDonnell Defense',
  'e4e5nf3nc6bc4bc5b4bxb4c3bc5d4exd4o-od6cxd4bb6':
    'Italian Game: Evans Gambit, McDonnell Defense, Main Line',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5d4exd4o-onge7':
    'Italian Game: Evans Gambit, Mieses Defense',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5d4exd4o-od6cxd4bb6nc3':
    'Italian Game: Evans Gambit, Morphy Attack',
  'e4e5nf3nc6bc4bc5b4bxb4c3bc5d4exd4o-od6cxd4bb6nc3bg4qa4bd7qb3na5bxf7+kf8qc2kxf7':
    'Italian Game: Evans Gambit, Mortimer-Evans Gambit',
  'e4e5nf3nc6bc4bc5b4bxb4c3bc5d4exd4o-od6cxd4bb6d5na5bb2ne7':
    'Italian Game: Evans Gambit, Paulsen Variation',
  e4e5nf3nc6bc4bc5b4bxb4c3ba5d4exd4:
    'Italian Game: Evans Gambit, Pierce Defense',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5o-onf6d4o-onxe5':
    'Italian Game: Evans Gambit, Richardson Attack',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5o-od6d4bd7':
    'Italian Game: Evans Gambit, Sanders-Alapin Variation',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5o-o':
    'Italian Game: Evans Gambit, Slow Variation',
  e4e5nf3nc6bc4bc5b4bxb4c3ba5d4d6bg5:
    'Italian Game: Evans Gambit, Sokolsky Variation',
  'e4e5nf3nc6bc4bc5b4bxb4c3bc5d4exd4o-od6cxd4bb6nc3na5bg5f6be3':
    'Italian Game: Evans Gambit, Steinitz Variation',
  e4e5nf3nc6bc4bc5b4bxb4c3bd6:
    'Italian Game: Evans Gambit, Stone-Ware Variation',
  e4e5nf3nc6bc4bc5b4bxb4c3ba5d4d6qb3:
    'Italian Game: Evans Gambit, Tartakower Attack',
  'e4e5nf3nc6bc4bc5b4bxb4c3bc5d4exd4o-od6cxd4bb6d5na5bb2':
    'Italian Game: Evans Gambit, Ulvestad Variation',
  'e4e5nf3nc6bc4bc5b4bxb4c3ba5d4exd4o-od6qb3':
    'Italian Game: Evans Gambit, Waller Attack',
  e4e5nf3nc6bc4bc5d3: 'Italian Game: Giuoco Pianissimo',
  e4e5nf3nc6bc4bc5d3nf6nc3d6bg5:
    'Italian Game: Giuoco Pianissimo, Canal Variation',
  e4e5nf3nc6bc4bc5d3f5ng5f4:
    'Italian Game: Giuoco Pianissimo, Dubois Variation',
  e4e5nf3nc6bc4bc5d3nf6nc3:
    'Italian Game: Giuoco Pianissimo, Italian Four Knights Variation',
  e4e5nf3nc6bc4bc5d3f5: 'Italian Game: Giuoco Pianissimo, Lucchini Gambit',
  e4e5nf3nc6bc4nf6d3bc5: 'Italian Game: Giuoco Pianissimo, Normal',
  'e4e5nf3nc6bc4nf6o-obc5d4bxd4nxd4nxd4bg5d6': 'Italian Game: Giuoco Piano',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+nc3nxe4o-onxc3bxc3bxc3ba3':
    'Italian Game: Giuoco Piano, Aitken Variation',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+nc3nxe4o-onxc3bxc3bxc3qb3d5':
    'Italian Game: Giuoco Piano, Bernstein Variation',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+kf1':
    'Italian Game: Giuoco Piano, Cracow Variation',
  e4e5nf3nc6bc4bc5c3qe7d4bb6d5nb8d6:
    'Italian Game: Giuoco Piano, Eisinger Variation',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4e5ne4bd5nxf2kxf2dxc3+kg3':
    'Italian Game: Giuoco Piano, Ghulam-Kassim Variation',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+nc3':
    "Italian Game: Giuoco Piano, Greco's Attack",
  'e4e5nf3nc6bc4nf6o-obc5d4bxd4nxd4nxd4bg5d6f4qe7fxe5dxe5nc3':
    'Italian Game: Giuoco Piano, Holzhausen Attack',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+bd2nxe4bxb4nxb4bxf7+kxf7qb3+d5ne5+kf6f3':
    'Italian Game: Giuoco Piano, Krause Variation',
  e4e5nf3nc6bc4bc5c3qe7d4bb6bg5: 'Italian Game: Giuoco Piano, Mestel Variation',
  'e4e5nf3nc6bc4nf6o-obc5d4bxd4nxd4nxd4bg5h6bh4g5f4':
    'Italian Game: Giuoco Piano, Rosentreter Variation',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+nc3nxe4o-obxc3bxc3d5ba3':
    'Italian Game: Giuoco Piano, Steinitz Variation',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4cxd4bb4+nc3nxe4o-obxc3d5bf6re1ne7rxe4d6bg5bxg5nxg5o-onxh7':
    'Italian Game: Giuoco Piano, Therkatz-Herzog Variation',
  e4e5nf3nc6bc4be7: 'Italian Game: Hungarian Defense',
  e4e5nf3nc6bc4be7d4exd4c3nf6e5ne4:
    'Italian Game: Hungarian Defense, Tartakower Variation',
  'e4e5nf3nc6bc4bc5bxf7+': 'Italian Game: Jerome Gambit',
  e4e5nf3nc6bc4bc5d4: 'Italian Game: Rosentreter Gambit',
  e4e5nf3nc6bc4f5: 'Italian Game: Rousseau Gambit',
  e4e5nf3nc6bc4nd4: 'Italian Game: Schilling-Kostic Gambit',
  'e4e5nf3nc6bc4nf6d4exd4o-o': 'Italian Game: Scotch Gambit',
  e4e5nf3nc6bc4nf6d4d6: 'Italian Game: Scotch Gambit Declined',
  e4e5nf3nc6bc4nf6d4bd6:
    'Italian Game: Scotch Gambit Declined, 3. Bc4 Nf6 4. d4 Bd6',
  'e4e5nf3nc6bc4nf6d4exd4o-onxe4re1d5bxd5qxd5nc3':
    'Italian Game: Scotch Gambit, Anderssen Attack',
  'e4e5nf3nc6bc4nf6d4exd4o-onxe4re1d5bxd5qxd5nc3qa5nxe4be6bd2qd5bg5':
    'Italian Game: Scotch Gambit, Anderssen Attack, Main Line',
  'e4e5nf3nc6d4exd4bc4nf6o-onxe4re1d5nc3':
    'Italian Game: Scotch Gambit, Canal Variation',
  'e4e5nf3nc6bc4nf6d4exd4o-onxe4':
    'Italian Game: Scotch Gambit, Double Gambit Accepted',
  'e4e5nf3nc6d4exd4bc4nf6o-od6':
    'Italian Game: Scotch Gambit, Janowski Defense',
  'e4e5nf3nc6d4exd4bc4nf6o-obc5':
    'Italian Game: Scotch Gambit, Max Lange Attack',
  'e4e5nf3nc6bc4bc5o-onf6d4exd4e5d5exf6dxc4re1+be6fxg7':
    'Italian Game: Scotch Gambit, Max Lange Attack Accepted',
  'e4e5nf3nc6d4exd4bc4nf6o-obc5e5d5exf6dxc4re1+be6ng5qd5nc3qf5nce4':
    'Italian Game: Scotch Gambit, Max Lange Attack, Long Variation',
  'e4e5nf3nc6d4exd4bc4nf6o-obc5e5ng4':
    'Italian Game: Scotch Gambit, Max Lange Attack, Spielmann Defense',
  'e4e5nf3nc6bc4nf6d4exd4o-onxe4nc3':
    'Italian Game: Scotch Gambit, Nakhmanson Gambit',
  'e4e5nf3nc6bc4bc5c3nf6d4exd4o-o':
    'Italian Game: Scotch Gambit, Walbrodt-Baird Gambit',
  'e4e5nf3nc6d4exd4bc4nf6o-obe7':
    'Italian Game: Scotch Gambit, de Riviere Defense',
  e4e5nf3nc6bc4nf6: 'Italian Game: Two Knights Defense',
  e4e5nf3nc6bc4nf6d4nxe4:
    'Italian Game: Two Knights Defense, 3. Bc4 Nf6 4. d4 Nxe4',
  'e4e5nf3nc6bc4nf6ng5d5exd5na5bb5+c6dxc6bxc6be2':
    'Italian Game: Two Knights Defense, 7. dxc6 bxc6 8. Be2',
  'e4e5nf3nc6bc4nf6ng5d5exd5na5bb5+c6dxc6bxc6qf3cxb5':
    'Italian Game: Two Knights Defense, Blackburne Variation',
  'e4e5nf3nc6bc4nf6ng5d5exd5na5bb5+c6dxc6bxc6qf3rb8':
    'Italian Game: Two Knights Defense, Colman Variation',
  'e4e5nf3nc6bc4nf6ng5d5exd5nxd5nxf7kxf7qf3+ke6nc3nb4qe4c6a3na6d4nc7':
    'Italian Game: Two Knights Defense, Fegatello Attack, Leonhardt Variation',
  e4e5nf3nc6bc4nf6ng5d5exd5nxd5nxf7:
    'Italian Game: Two Knights Defense, Fried Liver Attack',
  e4e5nf3nc6bc4nf6ng5d5exd5nd4:
    'Italian Game: Two Knights Defense, Fritz Variation',
  e4e5nf3nc6bc4nf6ng5d5exd5nd4c3b5bf1nxd5ne4:
    'Italian Game: Two Knights Defense, Fritz, Gruber Variation',
  'e4e5nf3nc6bc4nf6d4exd4e5d5bb5ne4nxd4bc5nxc6bxf2+kf1qh4':
    'Italian Game: Two Knights Defense, Keidansky Variation',
  e4e5nf3nc6bc4nf6ng5d5exd5nb4:
    'Italian Game: Two Knights Defense, Kloss Gambit',
  e4e5nf3nc6bc4nf6ng5: 'Italian Game: Two Knights Defense, Knight Attack',
  e4e5nf3nc6bc4nf6ng5d5:
    'Italian Game: Two Knights Defense, Knight Attack, Normal Variation',
  'e4e5nf3nc6bc4nf6ng5d5exd5na5bb5+c6dxc6bxc6be2h6nf3e4ne5bd6d4qc7bd2':
    'Italian Game: Two Knights Defense, Knorre Variation',
  e4e5nf3nc6bc4nf6ng5d5exd5nxd5d4:
    'Italian Game: Two Knights Defense, Lolli Attack',
  e4e5nf3nc6bc4nf6ng5d5exd5na5d3h6nf3e4qe2nxc4dxc4be7:
    'Italian Game: Two Knights Defense, Maroczy Variation',
  'e4e5nf3nc6d4exd4bc4nf6o-obc5e5':
    'Italian Game: Two Knights Defense, Max Lange Attack',
  'e4e5nf3nc6bc4nf6d4exd4o-obc5e5d5exf6dxc4re1+be6ng5qd5nc3qf5g4qg6nce4bb6f4o-o-o':
    'Italian Game: Two Knights Defense, Max Lange Attack, Berger Variation',
  'e4e5nf3nc6bc4nf6d4exd4o-obc5e5ng4c3':
    'Italian Game: Two Knights Defense, Max Lange Attack, Krause Variation',
  'e4e5nf3nc6d4exd4bc4bc5o-onf6e5d5exf6dxc4re1+be6ng5g6':
    'Italian Game: Two Knights Defense, Max Lange Attack, Loman Defense',
  'e4e5nf3nc6bc4nf6d4exd4o-obc5e5d5exf6dxc4re1+be6ng5qd5nc3qf5nce4bf8':
    'Italian Game: Two Knights Defense, Max Lange Attack, Rubinstein Variation',
  e4e5nf3nc6bc4nf6d3:
    "Italian Game: Two Knights Defense, Modern Bishop's Opening",
  e4e5nf3nc6bc4nf6d4: 'Italian Game: Two Knights Defense, Open Variation',
  'e4e5nf3nc6bc4nf6ng5d5exd5na5bb5+c6dxc6bxc6qf3qc7bd3':
    'Italian Game: Two Knights Defense, Paoli Variation',
  e4e5nf3nc6bc4nf6d4exd4ng5:
    'Italian Game: Two Knights Defense, Perreux Variation',
  'e4e5nf3nc6bc4nf6ng5d5exd5nxd5d4bb4+':
    'Italian Game: Two Knights Defense, Pincus Variation',
  e4e5nf3nc6bc4nf6ng5d5exd5na5:
    'Italian Game: Two Knights Defense, Polerio Defense',
  'e4e5nf3nc6bc4nf6ng5d5exd5na5bb5+':
    'Italian Game: Two Knights Defense, Polerio Defense, Bishop Check Line',
  'e4e5nf3nc6bc4nf6ng5d5exd5na5bb5+c6dxc6bxc6qf3':
    'Italian Game: Two Knights Defense, Polerio Defense, Bogoljubov Variation',
  'e4e5nf3nc6bc4nf6ng5d5exd5na5bb5+c6dxc6bxc6be2h6nf3e4ne5qc7':
    'Italian Game: Two Knights Defense, Polerio Defense, Goering Variation',
  e4e5nf3nc6bc4nf6ng5d5exd5na5d3:
    'Italian Game: Two Knights Defense, Polerio Defense, Kieseritzky Variation',
  'e4e5nf3nc6bc4nf6ng5d5exd5na5bb5+c6dxc6bxc6be2h6':
    'Italian Game: Two Knights Defense, Polerio Defense, Suhle Defense',
  e4e5nf3nc6bc4nf6ng5d5exd5na5d3h6nf3e4qe2nxc4dxc4bc5nfd2:
    'Italian Game: Two Knights Defense, Polerio Defense, Yankovich Variation',
  e4e5nf3nc6bc4nf6ng5nxe4:
    'Italian Game: Two Knights Defense, Ponziani-Steinitz Gambit',
  'e4e5nf3nc6bc4nf6ng5d5exd5na5bb5+c6dxc6bxc6be2h6nh3':
    'Italian Game: Two Knights Defense, Steinitz Variation',
  e4e5nf3nc6bc4nf6ng5bc5:
    'Italian Game: Two Knights Defense, Traxler Counterattack',
  'e4e5nf3nc6bc4nf6ng5bc5bxf7+':
    'Italian Game: Two Knights Defense, Traxler Counterattack, Bishop Sacrifice Line',
  'e4e5nf3nc6bc4nf6ng5bc5nxf7bxf2+kxf2nxe4+ke3':
    'Italian Game: Two Knights Defense, Traxler Counterattack, King March Line',
  e4e5nf3nc6bc4nf6ng5bc5nxf7:
    'Italian Game: Two Knights Defense, Traxler Counterattack, Knight Sacrifice Line',
  'e4e5nf3nc6bc4nf6ng5bc5bxf7+ke7d4':
    'Italian Game: Two Knights Defense, Traxler Variation, Trencianske-Teplice Gambit',
  e4e5nf3nc6bc4nf6ng5d5exd5b5:
    'Italian Game: Two Knights Defense, Ulvestad Variation',
  e4e5nf3nc6bc4nf6ng5d5exd5b5bf1h6nxf7:
    'Italian Game: Two Knights Defense, Ulvestad Variation, Kurkin Gambit',
  'e4e5nf3nc6d4exd4bc4nf6o-onxe4re1d5bxd5qxd5nc3qa5nxe4be6bg5h6bh4g5nf6+ke7b4':
    'Italian Game: Two Knights Defense, Yurdansky Attack',
  h4: 'Kadas Opening',
  h4d5rh3: "Kadas Opening: Beginner's Trap",
  h4c5b4: 'Kadas Opening: Kadas Gambit',
  h4e5d4exd4c3: 'Kadas Opening: Kadas Gambit, 2. d4 exd4 3. c3',
  h4d5d4c5nf3cxd4c3: 'Kadas Opening: Kadas Gambit, 3. Nf3 cxd4 4. c3',
  h4d5d4c5e4: 'Kadas Opening: Myers Variation',
  h4g5: 'Kadas Opening: Schneider Gambit',
  h4f5e4fxe4d3: 'Kadas Opening: Steinbok Gambit',
  'd4e6c4bb4+': 'Kangaroo Defense',
  'd4e6c4bb4+nc3': 'Kangaroo Defense: Keres Defense, Transpositional Variation',
  e4e5f4: "King's Gambit",
  e4e5f4exf4: "King's Gambit Accepted",
  e4e5f4exf4nf3d5exd5nf6: "King's Gambit Accepted, Abbazia Defense",
  'e4e5f4exf4nf3d5exd5nf6bb5+c6dxc6bxc6bc4nd5':
    "King's Gambit Accepted, Abbazia Defense, Main Line",
  e4e5f4exf4nf3g5h4g4ng5: "King's Gambit Accepted, Allgaier Gambit",
  e4e5f4exf4nf3g5h4g4ng5h6nxf7kxf7d4:
    "King's Gambit Accepted, Allgaier Gambit, Thorold Attack",
  'e4e5f4exf4nf3g5h4g4ng5h6nxf7kxf7bc4+':
    "King's Gambit Accepted, Allgaier Gambit, Urusov Attack",
  e4e5f4exf4nf3g5bc4g4h4: "King's Gambit Accepted, Australian Gambit",
  e4e5f4exf4qe2: "King's Gambit Accepted, Basman Gambit",
  e4e5f4exf4nf3h6: "King's Gambit Accepted, Becker Defense",
  e4e5f4exf4bc4: "King's Gambit Accepted, Bishop's Gambit",
  'e4e5f4exf4bc4qh4+kf1qf6':
    "King's Gambit Accepted, Bishop's Gambit (see: Jaenisch Variation)",
  e4e5f4exf4bc4g5: "King's Gambit Accepted, Bishop's Gambit, Anderssen Defense",
  e4e5f4exf4bc4d5bxd5nf6:
    "King's Gambit Accepted, Bishop's Gambit, Bledow Countergambit",
  'e4e5f4exf4bc4qh4+kf1nc6':
    "King's Gambit Accepted, Bishop's Gambit, Boden Variation",
  e4e5f4exf4bc4nf6nc3c6:
    "King's Gambit Accepted, Bishop's Gambit, Bogoljubov Defense",
  e4e5f4exf4bc4nf6nc3:
    "King's Gambit Accepted, Bishop's Gambit, Bogoljubov Variation",
  'e4e5f4exf4bc4qh4+kf1b5':
    "King's Gambit Accepted, Bishop's Gambit, Bryan Countergambit",
  e4e5f4exf4bc4nf6: "King's Gambit Accepted, Bishop's Gambit, Cozio Defense",
  'e4e5f4exf4bc4qh4+kf1d6':
    "King's Gambit Accepted, Bishop's Gambit, Cozio Variation",
  'e4e5f4exf4bc4qh4+kf1nf6':
    "King's Gambit Accepted, Bishop's Gambit, First Jaenisch Variation",
  e4e5f4exf4bc4f5: "King's Gambit Accepted, Bishop's Gambit, Gianutio Gambit",
  'e4e5f4exf4bc4qh4+kf1bc5':
    "King's Gambit Accepted, Bishop's Gambit, Greco Variation",
  e4e5f4exf4bc4b5:
    "King's Gambit Accepted, Bishop's Gambit, Kieseritzky Gambit",
  e4e5f4exf4bc4c6: "King's Gambit Accepted, Bishop's Gambit, Lopez Defense",
  'e4e5f4exf4bc4qh4+kf1g5':
    "King's Gambit Accepted, Bishop's Gambit, Lopez Variation",
  e4e5f4exf4bc4nc6: "King's Gambit Accepted, Bishop's Gambit, Maurian Defense",
  'e4e5f4exf4bc4qh4+kf1g5nc3bg7d4ne7g3':
    "King's Gambit Accepted, Bishop's Gambit, McDonnell Attack",
  e4e5f4exf4nf3nc6bc4g5: "King's Gambit Accepted, Blachly Gambit",
  e4e5f4exf4nf3ne7: "King's Gambit Accepted, Bonsch-Osmolovsky Variation",
  e4e5f4exf4qf3: "King's Gambit Accepted, Breyer Gambit",
  e4e5f4exf4qh5: "King's Gambit Accepted, Carrera Gambit",
  e4e5f4exf4nf3be7: "King's Gambit Accepted, Cunningham Defense",
  'e4e5f4exf4nf3be7bc4bh4+g3fxg3o-ogxh2+kh1':
    "King's Gambit Accepted, Cunningham Defense, Bertin Gambit",
  e4e5f4exf4nf3be7bc4nf6:
    "King's Gambit Accepted, Cunningham Defense, McCormick Defense",
  e4e5f4exf4qg4: "King's Gambit Accepted, Dodo Variation",
  'e4e5f4exf4nf3g5bc4g4o-ogxf3qxf3qf6e5qxe5bxf7+':
    "King's Gambit Accepted, Double Muzio Gambit",
  'e4e5f4exf4nf3g5bc4g4o-ogxf3qxf3qf6nc3qd4+kh1qxc4nd5':
    "King's Gambit Accepted, Double Muzio Gambit, Baldwin Gambit",
  'e4e5f4exf4nf3g5bc4g4o-ogxf3qxf3qf6nc3':
    "King's Gambit Accepted, Double Muzio Gambit, Bello Gambit",
  'e4e5f4exf4nf3g5bc4g4o-ogxf3qxf3qf6e5qxe5d3bh6nc3ne7bd2nbc6rae1':
    "King's Gambit Accepted, Double Muzio Gambit, Paulsen Defense",
  'e4e5f4exf4nf3g5bc4g4o-ogxf3qxf3qf6bxf7+kxf7d4qxd4+be3qf6nc3fxe3':
    "King's Gambit Accepted, Double Muzio Gambit, Young Gambit",
  e4e5f4exf4nh3: "King's Gambit Accepted, Eisenberg Variation",
  e4e5f4exf4nf3d6: "King's Gambit Accepted, Fischer Defense",
  e4e5f4exf4nf3d6b4: "King's Gambit Accepted, Fischer Defense, Schulder Gambit",
  e4e5f4exf4nf3d6d4nf6bd3:
    "King's Gambit Accepted, Fischer Defense, Spanish Variation",
  e4e5f4exf4g3: "King's Gambit Accepted, Gaga Gambit",
  e4e5f4exf4nf3g5bc4g4d4gxf3qxf3:
    "King's Gambit Accepted, Ghulam-Kassim Gambit",
  e4e5f4exf4nf3f5: "King's Gambit Accepted, Gianutio Countergambit",
  e4e5f4exf4nf3d6bc4h6d4g5h4bg7: "King's Gambit Accepted, Greco Gambit",
  'e4e5f4exf4nf3g5bc4bg7o-o': "King's Gambit Accepted, Hanstein Gambit",
  e4e5f4exf4nf3g5h4g4ne5nf6bc4d5exd5bd6:
    "King's Gambit Accepted, Kieseritzky Gambit, Anderssen Defense",
  e4e5f4exf4nf3g5h4g4ne5nf6bc4d5exd5bd6d4nh5bxf4nxf4:
    "King's Gambit Accepted, Kieseritzky Gambit, Anderssen-Cordel Gambit",
  e4e5f4exf4nf3g5h4g4ne5nf6:
    "King's Gambit Accepted, Kieseritzky Gambit, Berlin Defense",
  e4e5f4exf4nf3g5h4g4ne5nf6bc4:
    "King's Gambit Accepted, Kieseritzky Gambit, Berlin Defense, 5. Ne5 Nf6 6. Bc4",
  e4e5f4exf4nf3g5h4g4ne5d5:
    "King's Gambit Accepted, Kieseritzky Gambit, Brentano Defense",
  e4e5f4exf4nf3g5h4g4ng5h6nxf7:
    "King's Gambit Accepted, Kieseritzky Gambit, Cotter Gambit",
  e4e5f4exf4nf3g5h4g4ne5d6:
    "King's Gambit Accepted, Kieseritzky Gambit, Kolisch Defense",
  e4e5f4exf4nf3g5h4g4ne5h5:
    "King's Gambit Accepted, Kieseritzky Gambit, Long Whip",
  e4e5f4exf4nf3g5h4g4ne5nc6:
    "King's Gambit Accepted, Kieseritzky Gambit, Neumann Defense",
  e4e5f4exf4nf3g5h4g4ne5bg7:
    "King's Gambit Accepted, Kieseritzky Gambit, Paulsen Defense",
  e4e5f4exf4nf3g5h4g4ne5nf6bc4d5exd5bg7:
    "King's Gambit Accepted, Kieseritzky Gambit, Paulsen Defense Deferred",
  'e4e5f4exf4nf3g5h4g4ne5nf6bc4d5exd5bd6o-obxe5':
    "King's Gambit Accepted, Kieseritzky Gambit, Rice Gambit",
  e4e5f4exf4nf3g5h4g4ne5qe7:
    "King's Gambit Accepted, Kieseritzky Gambit, Rosenthal Defense",
  e4e5f4exf4nf3g5h4g4ne5nf6d4:
    "King's Gambit Accepted, Kieseritzky Gambit, Rubinstein Variation",
  e4e5f4exf4nf3: "King's Gambit Accepted, King's Knight Gambit",
  e4e5f4exf4nf3g5bc4:
    "King's Gambit Accepted, King's Knight Gambit, 3. Nf3 g5 4. Bc4",
  e4e5f4exf4nf3g5bc4g4d4gxf3bxf4: "King's Gambit Accepted, Kotov Gambit",
  'e4e5f4exf4nf3g5bc4g4bxf7+': "King's Gambit Accepted, Lolli Gambit",
  e4e5f4exf4nf3nc6: "King's Gambit Accepted, MacLeod Defense",
  e4e5f4exf4nf3g5bc4bg7d4d6c3: "King's Gambit Accepted, Mayet Gambit",
  e4e5f4exf4nf3g5bc4g4nc3: "King's Gambit Accepted, McDonnell Gambit",
  'e4e5f4exf4nf3g5bc4d6o-obg4h3h5hxg4hxg4':
    "King's Gambit Accepted, Middleton Countergambit",
  e4e5f4exf4nf3d5: "King's Gambit Accepted, Modern Defense",
  'e4e5f4exf4nf3g5bc4g4o-ogxf3qxf3qe7':
    "King's Gambit Accepted, Muzio Gambit Accepted, From's Defense",
  'e4e5f4exf4nf3g5bc4g4o-od5':
    "King's Gambit Accepted, Muzio Gambit, Brentano Defense",
  'e4e5f4exf4nf3g5bc4g4o-ogxf3qxf3qf6':
    "King's Gambit Accepted, Muzio Gambit, Sarratt Defense",
  'e4e5f4exf4nf3g5bc4g4o-o':
    "King's Gambit Accepted, Muzio Gambit, Wild Muzio Gambit",
  e4e5f4exf4b3: "King's Gambit Accepted, Orsini Gambit",
  e4e5f4exf4ne2: "King's Gambit Accepted, Paris Gambit",
  e4e5f4exf4nf3g5bc4bg7h4: "King's Gambit Accepted, Philidor Gambit",
  e4e5f4exf4nf3h6bc4d6d4g5h4bg7qd3:
    "King's Gambit Accepted, Philidor Gambit, Schultz Variation",
  e4e5f4exf4d4: "King's Gambit Accepted, Polerio Gambit",
  e4e5f4exf4nf3g5nc3: "King's Gambit Accepted, Quade Gambit",
  e4e5f4exf4nf3g5d4: "King's Gambit Accepted, Rosentreter Gambit",
  'e4e5f4exf4nf3g5d4g4ne5qh4+g3':
    "King's Gambit Accepted, Rosentreter Gambit, Bird Gambit",
  e4e5f4exf4nf3g5d4g4nc3:
    "King's Gambit Accepted, Rosentreter Gambit, Soerensen Gambit",
  e4e5f4exf4nf3g5d4g4bxf4: "King's Gambit Accepted, Rosentreter-Testa Gambit",
  e4e5f4exf4nf3g5bc4g4ne5: "King's Gambit Accepted, Salvio Gambit",
  'e4e5f4exf4nf3g5bc4g4ne5qh4+kf1f3':
    "King's Gambit Accepted, Salvio Gambit, Cochrane Gambit",
  'e4e5f4exf4nf3g5bc4g4ne5qh4+kf1nf6':
    "King's Gambit Accepted, Salvio Gambit, Santa Maria Defense",
  'e4e5f4exf4nf3g5bc4g4ne5qh4+kf1nh6':
    "King's Gambit Accepted, Salvio Gambit, Silberschmidt Defense",
  'e4e5f4exf4nf3g5bc4g4ne5qh4+kf1nc6':
    "King's Gambit Accepted, Salvio Gambit, Viennese Variation",
  e4e5f4exf4nf3nf6: "King's Gambit Accepted, Schallopp Defense",
  e4e5f4exf4nf3nf6e5nh5g4:
    "King's Gambit Accepted, Schallopp Defense, Tashkent Attack",
  e4e5f4exf4bb5: "King's Gambit Accepted, Schurig Gambit",
  e4e5f4exf4h4: "King's Gambit Accepted, Stamma Gambit",
  e4e5f4exf4be2: "King's Gambit Accepted, Tartakower Gambit",
  e4e5f4exf4be2f5exf5d6:
    "King's Gambit Accepted, Tartakower Gambit, Weiss Defense",
  e4e5f4exf4nf3g5bc4bg7: "King's Gambit Accepted, Traditional Variation",
  e4e5f4exf4kf2: "King's Gambit Accepted, Tumbleweed",
  e4e5f4exf4nf3g5h4g4ng5h6nxf7kxf7nc3:
    "King's Gambit Accepted: Allgaier, Blackburne Gambit",
  'e4e5f4exf4nf3g5h4g4ng5h6nxf7kxf7d4d5bxf4dxe4bc4+kg7be5+':
    "King's Gambit Accepted: Allgaier, Cook Variation",
  e4e5f4exf4nf3g5h4g4ng5h6nxf7kxf7qxg4nf6qxf4bd6:
    "King's Gambit Accepted: Allgaier, Horny Defense",
  e4e5f4exf4nf3g5h4g4ng5nf6:
    "King's Gambit Accepted: Allgaier, Schlechter Defense",
  'e4e5f4exf4nf3g5h4g4ng5h6nxf7kxf7bc4+d5bxd5+kg7d4':
    "King's Gambit Accepted: Allgaier, Urusov Attack",
  e4e5f4exf4bc4d5bxd5c6:
    "King's Gambit Accepted: Bishop's Gambit, Anderssen Variation",
  e4e5f4exf4bc4d5: "King's Gambit Accepted: Bishop's Gambit, Bledow Variation",
  'e4e5f4exf4bc4d5bxd5qh4+kf1bd6':
    "King's Gambit Accepted: Bishop's Gambit, Boren-Svenonius Variation",
  'e4e5f4exf4bc4qh4+kf1d5bxd5g5g3':
    "King's Gambit Accepted: Bishop's Gambit, Chigorin's Attack",
  'e4e5f4exf4bc4qh4+kf1ne7nc3g5d4bg7':
    "King's Gambit Accepted: Bishop's Gambit, Classical Defense",
  'e4e5f4exf4bc4qh4+kf1g5qf3':
    "King's Gambit Accepted: Bishop's Gambit, Classical Defense: Cozio Attack",
  'e4e5f4exf4bc4qh4+kf1g5nc3bg7g3fxg3qf3':
    "King's Gambit Accepted: Bishop's Gambit, Fraser Variation",
  'e4e5f4exf4bc4qh4+kf1g5nc3bg7d4d6e5':
    "King's Gambit Accepted: Bishop's Gambit, Grimm Attack",
  'e4e5f4exf4bc4qh4+kf1g5nc3bg7g3':
    "King's Gambit Accepted: Bishop's Gambit, McDonnell Attack",
  e4e5f4exf4bc4nf6nc3bb4e5:
    "King's Gambit Accepted: Bishop's Gambit, Paulsen Attack",
  e4e5f4exf4bc4ne7: "King's Gambit Accepted: Bishop's Gambit, Steinitz Defense",
  'e4e5f4exf4nf3be7bc4bh4+g3':
    "King's Gambit Accepted: Cunningham, Bertin Gambit",
  e4e5f4exf4nf3g5bc4g4d4: "King's Gambit Accepted: Ghulam-Kassim Gambit",
  e4e5f4exf4nf3g5bc4bg7h4h6d4d6nc3c6hxg5hxg5rxh8bxh8ne5:
    "King's Gambit Accepted: Greco Gambit",
  e4e5f4exf4nf3g5h4g4ne5nf6nxg4d5:
    "King's Gambit Accepted: Kieseritzky, Berlin Defense: de Riviere Variation",
  e4e5f4exf4nf3g5h4g4ne5d5d4nf6bxf4:
    "King's Gambit Accepted: Kieseritzky, Brentano Defense",
  e4e5f4exf4nf3g5h4g4ne5d5d4nf6bxf4nxe4nd2:
    "King's Gambit Accepted: Kieseritzky, Brentano Defense: Caro Variation",
  e4e5f4exf4nf3g5h4g4ne5d5d4nf6exd5qxd5nc3bb4kf2:
    "King's Gambit Accepted: Kieseritzky, Brentano Defense: Kaplanek Variation",
  e4e5f4exf4nf3g5h4g4ne5h5bc4rh7d4bh6nc3:
    "King's Gambit Accepted: Kieseritzky, Long Whip Defense: Jaenisch Variation",
  e4e5f4exf4nf3g5h4g4ne5be7:
    "King's Gambit Accepted: Kieseritzky, Polerio Defense",
  'e4e5f4exf4nf3g5h4g4ne5nf6bc4d5exd5bd6o-o':
    "King's Gambit Accepted: Kieseritzky, Rice Gambit",
  e4e5f4exf4nf3g5h4g4ne5qe7d4f5bc4:
    "King's Gambit Accepted: Kieseritzky, Salvio Defense: Cozio Variation",
  e4e5f4exf4nf3g5: "King's Gambit Accepted: King Knight's Gambit",
  e4e5f4exf4nf3g5h4:
    "King's Gambit Accepted: King Knight's Gambit, 3. Nf3 g5 4. h4",
  'e4e5f4exf4nf3g5bc4g4bxf7+kxf7o-ogxf3qxf3qf6d4qxd4+be3qf6nc3':
    "King's Gambit Accepted: Lolli Gambit, Young Variation",
  'e4e5f4exf4bc4f5qe2qh4+kd1fxe4nc3kd8':
    "King's Gambit Accepted: Lopez-Gianutio Countergambit, Hein Variation",
  e4e5f4exf4nf3d5exd5: "King's Gambit Accepted: Modern Defense",
  'e4e5f4exf4nf3g5bc4g4o-ogxf3qxf3nc6':
    "King's Gambit Accepted: Muzio Gambit, Holloway Defense",
  'e4e5f4exf4nf3g5bc4g4o-oqe7':
    "King's Gambit Accepted: Muzio Gambit, Kling and Horwitz Counterattack",
  'e4e5f4exf4nf3g5bc4g4ne5qh4+kf1nh6d4d6':
    "King's Gambit Accepted: Salvio Gambit, Anderssen Counterattack",
  e4e5f4exf4bd3: "King's Gambit Accepted: Schurig Gambit",
  'e4e5f4exf4nf3g5bc4g4ne5qh4+kf1nh6d4f3':
    "King's Gambit Accepted: Silberschmidt Gambit",
  e4e5f4exf4nf3g5d4g4ne5: "King's Gambit Accepted: Soerensen Gambit",
  e4e5f4bc5: "King's Gambit Declined, Classical Variation",
  e4e5f4bc5nf3d6c3:
    "King's Gambit Declined, Classical Variation, 3. Nf3 d6 4. c3",
  'e4e5f4bc5nf3d6c3bg4fxe5dxe5qa4+':
    "King's Gambit Declined, Classical Variation, Euwe Attack",
  e4e5f4bc5nf3d6b4:
    "King's Gambit Declined, Classical Variation, Rotlewi Countergambit",
  e4e5f4bc5nf3d6c3f5:
    "King's Gambit Declined, Classical Variation, Rubinstein Countergambit",
  e4e5f4nc6nf3g5fxg5h6: "King's Gambit Declined, Hobbs-Zilbermints Gambit",
  'e4e5f4qh4+g3qe7': "King's Gambit Declined, Keene Defense",
  e4c5f4e5: "King's Gambit Declined, Mafia Defense",
  e4e5f4nc6nf3f5: "King's Gambit Declined, Miles Defense",
  e4e5f4qf6: "King's Gambit Declined, Norwalde Variation",
  e4e5f4qf6nc3qxf4d4:
    "King's Gambit Declined, Norwalde Variation, Schubert Variation",
  e4e5f4nf6: "King's Gambit Declined, Petrov's Defense",
  e4e5f4nc6: "King's Gambit Declined, Queen's Knight Defense",
  e4e5f4bc5nf3g5: "King's Gambit Declined, Senechaud Countergambit",
  e4e5f4f6fxe5nc6: "King's Gambit Declined, Soller-Zilbermints Gambit",
  e4e5f4nc6nf3g5: "King's Gambit Declined, Zilbermints Double Gambit",
  e4e5f4bc5nf3d6nc3nd7: "King's Gambit Declined: Classical, Hanham Variation",
  e4e5f4bc5nf3d6c3f5fxe5dxe5d4exd4bc4:
    "King's Gambit Declined: Classical, Reti Variation",
  e4e5f4bc5nf3d6fxe5:
    "King's Gambit Declined: Classical, Soldatenkov Variation",
  e4e5bc4nc6nc3nf6d3bc5f4d6nf3bg4h3bxf3qxf3exf4:
    "King's Gambit Declined: Classical, Svenonius Variation",
  e4e5f4d5: "King's Gambit Declined: Falkbeer Countergambit",
  'e4e5f4d5exd5e4d3nf6dxe4nxe4nf3bc5qe2bf2+kd1qxd5+nfd2':
    "King's Gambit Declined: Falkbeer, Alapin Variation",
  e4e5f4d5exd5e4d3nf6dxe4nxe4qe2:
    "King's Gambit Declined: Falkbeer, Charousek Gambit",
  e4e5f4d5exd5e4d3nf6dxe4nxe4qe2qxd5nd2f5g4:
    "King's Gambit Declined: Falkbeer, Charousek Variation",
  e4e5f4d5nc3: "King's Gambit Declined: Falkbeer, Milner-Barry Variation",
  e4e5f4d5exd5e4nc3nf6qe2:
    "King's Gambit Declined: Falkbeer, Rubinstein Variation",
  'e4e5f4d5exd5e4d3nf6dxe4nxe4nf3bc5qe2bf5g4o-o':
    "King's Gambit Declined: Falkbeer, Tarrasch Variation",
  'e4e5f4qh4+': "King's Gambit Declined: Keene's Defense",
  'e4e5f4qh4+g3': "King's Gambit Declined: Keene's Defense, 2. f4 Qh4+ 3. g3",
  e4e5f4qf6nc3qxf4nf3bb4bc4:
    "King's Gambit Declined: Norwalde Variation, Buecker Gambit",
  e4e5f4d5exd5: "King's Gambit, Falkbeer Countergambit Accepted",
  'e4e5f4d5exd5e4bb5+':
    "King's Gambit, Falkbeer Countergambit, Anderssen Attack",
  e4e5f4d5nf3: "King's Gambit, Falkbeer Countergambit, Blackburne Attack",
  e4e5f4d5exd5e4d3: "King's Gambit, Falkbeer Countergambit, Charousek Gambit",
  e4e5f4d5exd5e4d3nf6dxe4:
    "King's Gambit, Falkbeer Countergambit, Charousek Gambit Accepted",
  e4e5f4d5exd5e4d3nf6nd2:
    "King's Gambit, Falkbeer Countergambit, Charousek Gambit, Keres Variation",
  e4e5f4d5exd5e4d3nf6dxe4nxe4nf3bc5qe2bf5:
    "King's Gambit, Falkbeer Countergambit, Charousek Gambit, Main Line",
  e4e5nc3nf6f4d5exd5e4d3bb4bd2e3:
    "King's Gambit, Falkbeer Countergambit, Charousek Gambit, Morphy Defense",
  e4e5f4d5exd5e4d3nf6qe2:
    "King's Gambit, Falkbeer Countergambit, Charousek Gambit, Old Line",
  e4e5f4d5d4: "King's Gambit, Falkbeer Countergambit, Hinrichsen Gambit",
  e4e5f4d5exd5bc5: "King's Gambit, Falkbeer Countergambit, Miles Gambit",
  e4e5f4d5exd5exf4: "King's Gambit, Falkbeer Countergambit, Modern Transfer",
  e4e5f4d5exd5c6:
    "King's Gambit, Falkbeer Countergambit, Nimzowitsch-Marshall Countergambit",
  e4e5f4d5exd5c6dxc6bc5:
    "King's Gambit, Falkbeer Countergambit, Pickler Gambit",
  e4e5f4d5exd5e4: "King's Gambit, Falkbeer Countergambit, Staunton Line",
  e4e5f4f5: "King's Gambit: Panteldakis Countergambit",
  'e4e5f4f5exf5qh4+':
    "King's Gambit: Panteldakis Countergambit, Greco Variation",
  'e4e5f4f5exf5exf4qh5+g6fxg6qe7+kd1':
    "King's Gambit: Panteldakis Countergambit, Pawn Sacrifice Line",
  e4e5f4f5exf5bc5:
    "King's Gambit: Panteldakis Countergambit, Schiller's Defense",
  'e4e5f4f5exf5exf4qh5+ke7':
    "King's Gambit: Panteldakis Countergambit, Shirazi Line",
  e4e5f4f5exf5exf4nf3d5d4bd6bd3:
    "King's Gambit: Panteldakis Countergambit, Symmetrical Variation",
  e4e5f4g5: "King's Gambit: Zilbermints Double Countergambit",
  nf3d5g3: "King's Indian Attack",
  nf3nf6g3d5: "King's Indian Attack, 2. g3 d5",
  nf3d5g3g6: "King's Indian Attack: Double Fianchetto",
  nf3d5g3c5bg2nc6: "King's Indian Attack: French Variation",
  nf3d5g3bg4: "King's Indian Attack: Keres Variation",
  nf3d5g3bg4bg2nd7:
    "King's Indian Attack: Keres Variation, 2. g3 Bg4 3. Bg2 Nd7",
  nf3d5g3e5: "King's Indian Attack: Omega-Delta Gambit",
  'nf3d5g3g6bg2bg7o-oe5d3ne7': "King's Indian Attack: Pachman System",
  nf3d5g3c5: "King's Indian Attack: Sicilian Variation",
  nf3d5g3c5bg2: "King's Indian Attack: Sicilian Variation, 2. g3 c5 3. Bg2",
  'e4e6d3d5nd2nf6ngf3c5g3nc6bg2be7o-oo-ore1':
    "King's Indian Attack: Sicilian Variation, 7. O-O O-O 8. Re1",
  nf3nf6g3g6b4: "King's Indian Attack: Smyslov Variation",
  nf3nf6g3b5: "King's Indian Attack: Spassky Variation",
  nf3nf6g3g6: "King's Indian Attack: Symmetrical Defense",
  'nf3nf6g3g6bg2bg7o-oo-od3d5': "King's Indian Attack: Wahls Defense",
  'nf3nf6g3d5bg2c6o-obg4': "King's Indian Attack: Yugoslav Variation",
  d4nf6c4g6nc3bg7: "King's Indian Defense",
  d4nf6c4g6nc3: "King's Indian Defense: 3. Nc3",
  d4nf6c4g6nc3bg7e4d6bg5:
    "King's Indian Defense: Accelerated Averbakh Variation",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5': "King's Indian Defense: Averbakh Variation",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5c5':
    "King's Indian Defense: Averbakh Variation, Benoni Defense",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5c5d5':
    "King's Indian Defense: Averbakh Variation, Benoni Defense, Advance Variation",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5c5dxc5':
    "King's Indian Defense: Averbakh Variation, Benoni Defense, Exchange Variation",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5h6':
    "King's Indian Defense: Averbakh Variation, Flexible Defense",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5nbd7':
    "King's Indian Defense: Averbakh Variation, Geller Defense",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5na6':
    "King's Indian Defense: Averbakh Variation, Modern Defense",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5na6qd2c6':
    "King's Indian Defense: Averbakh Variation, Modern Defense, Burgess Line",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5nc6':
    "King's Indian Defense: Averbakh Variation, Nc6 Defense",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5a6':
    "King's Indian Defense: Averbakh Variation, Spanish Defense",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5dxe5':
    "King's Indian Defense: Exchange Variation",
  'd4nf6nf3g6g3bg7bg2o-oo-od6c4c6nc3qb6':
    "King's Indian Defense: Fianchetto Variation, Benjamin Defense",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-onbd7nc3e5':
    "King's Indian Defense: Fianchetto Variation, Classical Fianchetto",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-onbd7nc3e5e4c6h3':
    "King's Indian Defense: Fianchetto Variation, Classical Main Line",
  'd4nf6c4g6g3bg7bg2o-onc3d6nf3nbd7':
    "King's Indian Defense: Fianchetto Variation, Debrecen Defense",
  d4nf6c4g6nc3bg7nf3d6g3:
    "King's Indian Defense: Fianchetto Variation, Delayed Fianchetto",
  'd4nf6nf3g6g3bg7bg2o-oo-od6c4nbd7nc3e5b3':
    "King's Indian Defense: Fianchetto Variation, Double Fianchetto Attack",
  'c4nf6nc3g6g3bg7bg2o-od4d6nf3nbd7o-oa6':
    "King's Indian Defense: Fianchetto Variation, Hungarian Variation",
  d4nf6c4g6g3:
    "King's Indian Defense: Fianchetto Variation, Immediate Fianchetto",
  'd4nf6c4g6g3bg7bg2o-onc3d6nf3nc6':
    "King's Indian Defense: Fianchetto Variation, Karlsbad Variation",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-oc6nc3qa5':
    "King's Indian Defense: Fianchetto Variation, Kavalek Defense",
  'd4nf6nf3g6c4bg7g3o-obg2d6o-oc6nc3bf5':
    "King's Indian Defense: Fianchetto Variation, Larsen Defense",
  'd4nf6c4g6g3bg7bg2o-onc3d6nf3nc6o-obf5':
    "King's Indian Defense: Fianchetto Variation, Lesser Simagin (Spassky)",
  'd4nf6nf3g6c4bg7g3o-obg2d6o-onbd7nc3e5e4exd4nxd4re8h3nc5re1a5':
    "King's Indian Defense: Fianchetto Variation, Long Variation",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-onc6nc3a6':
    "King's Indian Defense: Fianchetto Variation, Panno Variation",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-onc6nc3a6d5na5nd2c5qc2e5':
    "King's Indian Defense: Fianchetto Variation, Panno Variation, Blockade Line",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-onc6nc3a6d5na5nd2c5qc2rb8b3b5bb2bxc4bxc4bh6':
    "King's Indian Defense: Fianchetto Variation, Panno Variation, Donner Line",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-onc6nc3a6h3rb8be3b5nd2':
    "King's Indian Defense: Fianchetto Variation, Panno Variation, Korchnoi Line",
  'd4nf6nf3g6c4bg7g3c5bg2qa5+':
    "King's Indian Defense: Fianchetto Variation, Pterodactyl Variation",
  'nf3nf6c4g6g3bg7bg2o-oo-od6d4nc6nc3bg4':
    "King's Indian Defense: Fianchetto Variation, Simagin Variation",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-onc6nc3e5':
    "King's Indian Defense: Fianchetto Variation, Uhlmann-Szabo System",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-oc5':
    "King's Indian Defense: Fianchetto Variation, Yugoslav System, without Nc3",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-oc5nc3':
    "King's Indian Defense: Fianchetto Variation, Yugoslav Variation",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-oc5nc3nc6d5':
    "King's Indian Defense: Fianchetto Variation, Yugoslav Variation, Advance Line",
  'nf3nf6c4g6g3bg7bg2o-oo-oc5d4d6nc3nc6dxc5dxc5':
    "King's Indian Defense: Fianchetto Variation, Yugoslav Variation, Exchange Line",
  'd4nf6c4g6g3bg7bg2o-onc3d6nf3c5':
    "King's Indian Defense: Fianchetto Variation, Yugoslav Variation, Rare Line",
  d4nf6c4g6nc3bg7e4d6f4: "King's Indian Defense: Four Pawns Attack",
  'd4nf6c4g6nc3bg7e4d6be2o-of4':
    "King's Indian Defense: Four Pawns Attack, 5. Be2 O-O 6. f4",
  'd4nf6c4g6nc3bg7e4d6f4o-onf3c5d5':
    "King's Indian Defense: Four Pawns Attack, Dynamic Attack",
  'd4nf6c4g6nc3bg7e4d6f4o-onf3c5be2cxd4nxd4nc6be3':
    "King's Indian Defense: Four Pawns Attack, Exchange Variation",
  'd4nf6c4g6nc3bg7e4d6f4o-onf3c5d5e6be2exd5e5':
    "King's Indian Defense: Four Pawns Attack, Florentine Gambit",
  'd4nf6c4g6nc3bg7e4d6f4o-onf3c5be2':
    "King's Indian Defense: Four Pawns Attack, Fluid Attack",
  d4nf6c4g6nc3bg7e4d6f4na6:
    "King's Indian Defense: Four Pawns Attack, Modern Defense",
  'd4nf6c4g6nc3bg7e4d6f4o-onf3c5d5e6be2':
    "King's Indian Defense: Four Pawns Attack, Normal Attack",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2na6': "King's Indian Defense: Kazakh Variation",
  d4nf6c4g6nc3bg7e4d6nge2: "King's Indian Defense: Kramer Variation",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe3': "King's Indian Defense: Larsen Variation",
  d4nf6c4g6nc3bg7e4d6h3: "King's Indian Defense: Makogonov Variation",
  d4nf6c4g6nc3bg7e4: "King's Indian Defense: Normal Variation",
  d4nf6c4g6nc3bg7e4d6g3:
    "King's Indian Defense: Normal Variation, Deferred Fianchetto",
  d4nf6nf3g6c4:
    "King's Indian Defense: Normal Variation, King's Knight Variation",
  d4nf6c4g6nc3bg7e4d6nf3:
    "King's Indian Defense: Normal Variation, Rare Defenses",
  d4nf6c4g6nc3bg7e4d6be2:
    "King's Indian Defense: Normal Variation, Standard Development",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2': "King's Indian Defense: Orthodox Variation",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5':
    "King's Indian Defense: Orthodox Variation, 5. Nf3 O-O 6. Be2 e5",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-o':
    "King's Indian Defense: Orthodox Variation, 6. Be2 e5 7. O-O",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onc6':
    "King's Indian Defense: Orthodox Variation, Aronin-Taimanov Defense",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onc6d5ne7b4':
    "King's Indian Defense: Orthodox Variation, Bayonet Attack",
  'nf3nf6c4g6nc3bg7e4o-od4d6be2e5o-onc6d5ne7b4nh5re1':
    "King's Indian Defense: Orthodox Variation, Bayonet Attack, Sokolov's Line",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onc6d5ne7b4nh5qc2':
    "King's Indian Defense: Orthodox Variation, Bayonet Attack, Yepishin's Line",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onc6d5ne7ne1':
    "King's Indian Defense: Orthodox Variation, Classical System",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onc6d5ne7ne1nd7f3f5g4':
    "King's Indian Defense: Orthodox Variation, Classical System, Benko Attack",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onc6d5ne7ne1nd7be3f5f3f4bf2g5rc1ng6c5':
    "King's Indian Defense: Orthodox Variation, Classical System, Kozul Gambit",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onc6d5ne7ne1nd7be3':
    "King's Indian Defense: Orthodox Variation, Classical System, Neo-Classical Line",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onc6d5ne7ne1nd7f3f5':
    "King's Indian Defense: Orthodox Variation, Classical System, Traditional Line",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-oc6':
    "King's Indian Defense: Orthodox Variation, Donner Defense",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-ona6':
    "King's Indian Defense: Orthodox Variation, Glek Defense",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5be3':
    "King's Indian Defense: Orthodox Variation, Gligoric-Taimanov System",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onc6d5ne7bd2':
    "King's Indian Defense: Orthodox Variation, Korchnoi Attack",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onc6d5ne7nd2':
    "King's Indian Defense: Orthodox Variation, Modern System",
  'd4nf6c4d6nc3nbd7e4e5nf3g6be2bg7o-oo-o':
    "King's Indian Defense: Orthodox Variation, Positional Defense",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2nbd7o-oe5d5':
    "King's Indian Defense: Orthodox Variation, Positional Defense, Closed Line",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onbd7re1c6bf1a5':
    "King's Indian Defense: Orthodox Variation, Positional Defense, Main Line",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-oa5':
    "King's Indian Defense: Orthodox Variation, Ukrainian Defense",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5d5':
    "King's Indian Defense: Petrosian Variation",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5d5nbd7bg5h6bh4g5bg3nh5h4':
    "King's Indian Defense: Petrosian Variation, Keres Defense",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5d5nbd7':
    "King's Indian Defense: Petrosian Variation, Normal Defense",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5d5a5':
    "King's Indian Defense: Petrosian Variation, Stein Defense",
  'd4nf6c4g6nc3bg7e4d6g3o-obg2e5nge2': "King's Indian Defense: Pomar System",
  d4nf6c4g6nc3bg7e4d6f3: "King's Indian Defense: Saemisch Variation",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3e5nge2c6':
    "King's Indian Defense: Saemisch Variation, 6. Be3 e5 7. Nge2 c6",
  'd4nf6c4g6nc3bg7e4d6f3o-onge2':
    "King's Indian Defense: Saemisch Variation, Bobotsov-Korchnoi-Petrosian Variation",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3e5d5nh5qd2qh4+g3nxg3qf2nxf1qxh4nxe3ke2':
    "King's Indian Defense: Saemisch Variation, Bronstein Defense",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3c6bd3a6':
    "King's Indian Defense: Saemisch Variation, Byrne Defense",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3e5d5':
    "King's Indian Defense: Saemisch Variation, Closed Variation",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3e5d5c6':
    "King's Indian Defense: Saemisch Variation, Closed Variation, 7... c6",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3e5nge2c6d5cxd5':
    "King's Indian Defense: Saemisch Variation, Closed Variation, Main Line",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3b6':
    "King's Indian Defense: Saemisch Variation, Double Fianchetto",
  'd4nf6c4g6nc3bg7e4d6f3o-o':
    "King's Indian Defense: Saemisch Variation, Normal Defense",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3e5':
    "King's Indian Defense: Saemisch Variation, Orthodox Variation",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3nc6nge2a6':
    "King's Indian Defense: Saemisch Variation, Panno Formation",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3nc6':
    "King's Indian Defense: Saemisch Variation, Yates Defense",
  d4nf6c4g6nf3bg7b4: "King's Indian Defense: Santasiere Variation",
  'd4nf6c4g6nc3bg7e4d6be2o-obe3': "King's Indian Defense: Semi-Averbakh System",
  'd4nf6c4g6nc3bg7nf3o-oe3d6be2':
    "King's Indian Defense: Semi-Classical Variation",
  'c4nf6nf3g6d4bg7nc3o-oe3d6be2c6':
    "King's Indian Defense: Semi-Classical Variation, Benoni Variation",
  'c4g6nc3bg7e3nf6d4o-onf3d6be2nbd7o-oe5dxe5dxe5':
    "King's Indian Defense: Semi-Classical Variation, Exchange Variation",
  'd4nf6nf3g6c4bg7nc3o-oe3d6be2nc6':
    "King's Indian Defense: Semi-Classical Variation, Hollywood Variation",
  'd4nf6c4g6nc3bg7nf3o-oe3d6be2nbd7o-oe5b4':
    "King's Indian Defense: Semi-Classical Variation, Queenside Storm Line",
  d4nf6c4g6nc3bg7e4d6: "King's Indian Defense: Six Pawns Attack",
  d4nf6c4g6nc3bg7nf3d6bg5: "King's Indian Defense: Smyslov Variation",
  'd4nf6c4g6nc3bg7e4d6f3o-obg5': "King's Indian Defense: Steiner Attack",
  'nf3nf6c4g6nc3bg7e4d6d4o-obg5': "King's Indian Defense: Zinnowitz Variation",
  'd4nf6c4g6nc3bg7e4d6be2o-obg5c5d5e6': "King's Indian, Averbakh, Main Line",
  'd4nf6c4g6nf3bg7g3o-obg2d6o-onbd7nc3e5e4':
    "King's Indian, Fianchetto, Classical Variation, 8. e4",
  'd4nf6c4g6nc3bg7e4d6nf3o-obe2e5o-onbd7re1':
    "King's Indian, Orthodox, 7... Nbd7 8. Re1",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3e5d5nh5qd2qh4+g3nxg3qf2nxf1qxh4nxe3ke2nxc4':
    "King's Indian, Saemisch, Orthodox, Bronstein Variation",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3nc6nge2a6qd2rb8':
    "King's Indian, Saemisch, Panno Main Line",
  'd4nf6c4g6nc3bg7e4d6f3o-obe3nc6nge2rb8':
    "King's Indian, Saemisch, Ruban Variation",
  'd4nf6c4g6nc3bg7e4d6f4o-obe2c5d5e6dxe6fxe6g4nc6h4':
    "King's Indian, Six Pawns Attack",
  e4e5nf3: "King's Knight Opening",
  e4e5nf3nc6g3: "King's Knight Opening: Konstantinopolsky",
  e4e5nf3nc6: "King's Knight Opening: Normal Variation",
  e4: "King's Pawn",
  e4e5: "King's Pawn Game",
  e4e5ne2: "King's Pawn Game: Alapin Opening",
  e4e5c4d5: "King's Pawn Game: Bavarian Gambit",
  e4e5d4d5: "King's Pawn Game: Beyer Gambit",
  e4e5nf3bc5: "King's Pawn Game: Busch-Gass Gambit",
  e4e5nf3bc5nxe5nc6: "King's Pawn Game: Busch-Gass Gambit, Chiodini Gambit",
  e4e5d3f5: "King's Pawn Game: Clam Variation, King's Gambit Reversed",
  e4nf6d3e5f4bc5: "King's Pawn Game: Clam Variation, Radisch Gambit",
  e4e5nf3f6: "King's Pawn Game: Damiano Defense",
  'e4e5nf3f6nxe5fxe5qh5+g6qxe5+qe7qxh8':
    "King's Pawn Game: Damiano Defense, Damiano Gambit",
  e4e5nf3f6nxe5qe7nf3d5:
    "King's Pawn Game: Damiano Defense, Damiano Gambit, Chigorin Gambit",
  e4e5nf3nc6c4: "King's Pawn Game: Dresden Opening",
  e4e5nf3qe7bc4f5: "King's Pawn Game: Gunderam Defense, Gunderam Gambit",
  e4e5nf3c6: "King's Pawn Game: Gunderam Gambit",
  e4e5f3: "King's Pawn Game: King's Head Opening",
  e4e5f3nf6nc3: "King's Pawn Game: King's Head Opening, 2. f3 Nf6 3. Nc3",
  'e4e5nf3qf6bc4qg6o-o': "King's Pawn Game: La Bourdonnais Gambit",
  e4e5d3: "King's Pawn Game: Leonardis Variation",
  e4e5c3: "King's Pawn Game: Macleod Attack",
  e4e5c3f5: "King's Pawn Game: Macleod Attack, Lasa Gambit",
  e4e5c3d5qh5bd6: "King's Pawn Game: Macleod Attack, Norwalde Gambit",
  d4d6e4e5: "King's Pawn Game: Maroczy Defense",
  e4e5nf3qf6: "King's Pawn Game: McConnell Defense",
  e4e5a3: "King's Pawn Game: Mengarini's Opening",
  e4e5qf3: "King's Pawn Game: Napoleon Attack",
  e4nc6d4: "King's Pawn Game: Nimzowitsch Defense",
  e4nc6b4nxb4c3nc6d4: "King's Pawn Game: Nimzowitsch Defense: Wheeler Gambit",
  e4e5nf3nc6b4: "King's Pawn Game: Pachman Wing Gambit",
  e4e5d4d6dxe5bd7: "King's Pawn Game: Philidor Gambit",
  e4e5nf3nc6nxe5nxe5d4: "King's Pawn Game: Schulze-Mueller Gambit",
  e4e5nf3nc6be2: "King's Pawn Game: Tayler Opening",
  e4e5nf3nc6be2nf6d4exd4e5: "King's Pawn Game: Tayler Opening, Basman Gambit",
  e4e5nf3nc6be2nf6d3d5nbd2: "King's Pawn Game: Tayler Opening, Inverted Hanham",
  e4e5bd3: "King's Pawn Game: Tortoise Opening",
  e4e5qh5: "King's Pawn Game: Wayward Queen Attack",
  e4e5qh5nf6: "King's Pawn Game: Wayward Queen Attack, Kiddie Countergambit",
  e4e5qh5nc6bc4nh6d3g6qf3f6ne2d5:
    "King's Pawn Game: Wayward Queen Attack, Mellon Gambit",
  e4e5d3d5exd5c6dxc6nxc6: "King's Pawn Game: Weber Gambit",
  e4e5b3: "King's Pawn Opening: 2. b3",
  e4e5qg4nf6qf5: "King's Pawn Opening: Speers",
  e4e5qe2nc6c3nf6nf3bc5d4exd4cxd4nxd4:
    "King's Pawn Opening: Van Hooydoon Gambit",
  g3h5: 'Lasker Simul Special',
  e4e5nf3f5: 'Latvian Gambit',
  e4e5nf3f5exf5: 'Latvian Gambit Accepted',
  e4e5nf3f5nxe5qf6d4d6nc4: 'Latvian Gambit Accepted, Bilguer Variation',
  e4e5nf3f5nxe5qf6d4d6nc4fxe4be2: 'Latvian Gambit Accepted, Bronstein Attack',
  'e4e5nf3f5nxe5qf6d4d6nc4fxe4qh5+g6qe2':
    'Latvian Gambit Accepted, Bronstein Gambit',
  e4e5nf3f5nxe5qf6nc4fxe4d3: 'Latvian Gambit Accepted, Foltys Variation',
  e4e5nf3f5nxe5qf6nc4: 'Latvian Gambit Accepted, Foltys-Leonhardt Variation',
  e4e5nf3f5nxe5qf6nc4fxe4nc3: 'Latvian Gambit Accepted, Leonhardt Variation',
  e4e5nf3f5nxe5qf6d4: 'Latvian Gambit Accepted, Main Line',
  e4e5nf3f5nxe5qf6d4d6nc4fxe4ne3: 'Latvian Gambit Accepted, Nimzowitsch Attack',
  e4e5nf3f5bc4fxe4nxe5qg5nf7qxg2rf1d5nxh8nf6:
    'Latvian Gambit: Behting Variation',
  e4e5nf3nc6d3f5exf5: 'Latvian Gambit: Clam Gambit',
  e4e5nf3f5bc4fxe4nxe5nf6: 'Latvian Gambit: Corkscrew Countergambit',
  e4e5nf3f5nxe5nf6bc4fxe4nf7qe7nxh8d5: 'Latvian Gambit: Corkscrew Gambit',
  e4e5nf3f5c4: 'Latvian Gambit: Diepstraten Countergambit',
  e4e5nf3f5nxe5nc6: 'Latvian Gambit: Fraser Defense',
  e4e5nf3f5nxe5qe7: 'Latvian Gambit: Greco Variation',
  e4e5nf3f5g4: 'Latvian Gambit: Lobster Gambit',
  e4e5nf3f5d4: 'Latvian Gambit: Mason Countergambit',
  e4e5nf3f5bc4: 'Latvian Gambit: Mayet Attack',
  e4e5nf3f5bc4nf6: 'Latvian Gambit: Mayet Attack, Morgado Defense',
  e4e5nf3f5bc4fxe4nxe5qg5d4qxg2:
    'Latvian Gambit: Mayet Attack, Poisoned Pawn Variation',
  e4e5nf3f5bc4fxe4nxe5d5:
    'Latvian Gambit: Mayet Attack, Polerio-Svedenborg Variation',
  e4e5nf3f5bc4b5: 'Latvian Gambit: Mayet Attack, Strautins Gambit',
  e4e5nf3f5nc3: 'Latvian Gambit: Mlotkowski Variation',
  e4e5nf3f5b4: 'Latvian Gambit: Senechaud Gambit',
  e4na6: 'Lemming Defense',
  e4d6d4nf6nc3nbd7f4: 'Lion Defense: Anti-Philidor',
  e4d6d4nf6nc3nbd7f4e5: "Lion Defense: Anti-Philidor, Lion's Cave",
  e4d6d4nf6nc3nbd7f4e5nf3exd4qxd4c6bc4d5:
    "Lion Defense: Anti-Philidor, Lion's Cave, Lion Claw Gambit",
  e4d6d4nf6nc3nbd7g4: 'Lion Defense: Bayonet Attack',
  e4d6d4nf6f3: "Lion Defense: Lion's Jaw",
  d4nf6nf3g6bf4: 'London System',
  d4nf6nf3d5bf4c5e3qb6nc3: 'London System: Poisoned Pawn Variation',
  d4nf6nf3b6g3bb7bg2c5: 'Marienbad System',
  d4nf6c4nc6: 'Mexican Defense',
  d4nf6c4nc6d5ne5f4: 'Mexican Defense: Horsefly Gambit',
  d3: 'Mieses Opening',
  d3g6g4: 'Mieses Opening: Myers Spike Attack',
  d3e5: 'Mieses Opening: Reversed Rat',
  d4nc6: 'Mikenas Defense',
  d4nc6c4e5d5nd4: 'Mikenas Defense: Cannstatter Variation',
  d4nc6c4e5d5nce7: 'Mikenas Defense: Lithuanian Variation',
  d4nc6c4e5dxe5nxe5nc3nxc4: 'Mikenas Defense: Pozarek Gambit',
  e4g6: 'Modern Defense',
  d4g6: 'Modern Defense, 1... g6',
  d4g6c4bg7nc3d6: 'Modern Defense, 2. c4 Bg7 3. Nc3 d6',
  e4g6d4bg7nc3c6bc4d6qe2: 'Modern Defense: Anti-Modern',
  d4g6c4bg7nc3d6e4: 'Modern Defense: Averbakh System',
  c4g6e4bg7d4d6be3nf6f3: 'Modern Defense: Averbakh Variation, Pseudo-Saemisch',
  'd4g6c4bg7nc3c5d5bxc3+bxc3f5': 'Modern Defense: Beefeater Variation',
  e4g6d4bg7bc4: 'Modern Defense: Bishop Attack',
  e4g6d4bg7bc4b5: 'Modern Defense: Bishop Attack, Buecker Gambit',
  e4g6bc4bg7qf3e6d4bxd4: "Modern Defense: Bishop Attack, Monkey's Bum",
  e4g6d4bg7c4d5exd5c6dxc6bxd4: 'Modern Defense: Dunworthy Variation',
  e4g6d4f5: 'Modern Defense: Fianchetto Gambit',
  e4g6d4bg7nf3d6c3: "Modern Defense: Geller's System",
  e4g6d4bg7nc3c6f4d5e5h5: 'Modern Defense: Gurgenidze Defense',
  d4g6c4bg7nc3d6e4nc6: 'Modern Defense: Kotov Variation',
  e4g6d4bg7nc3d5: 'Modern Defense: Lizard Defense, Mittenberger Gambit',
  d4g6h4nf6h5: 'Modern Defense: Lizard Defense, Pirc-Diemer Gambit',
  'e4g6d4nh6nc3f5bxh6bxh6exf5o-o': 'Modern Defense: Masur Gambit',
  e4g6d4bg7nc3c5: 'Modern Defense: Modern Pterodactyl',
  e4g6d4bg7nf3b6: 'Modern Defense: Mongredien Defense',
  e4g6d4bg7nc3b6: 'Modern Defense: Mongredien Defense, 2. d4 Bg7 3. Nc3 b6',
  c4g6e4bg7d4e5: 'Modern Defense: Neo-Modern Defense',
  e4g6d4nf6: 'Modern Defense: Norwegian Defense',
  e4g6d4nf6e5nh5be2d6: 'Modern Defense: Norwegian Defense, Norwegian Gambit',
  e4g6d4bg7nc3d6f4: 'Modern Defense: Pseudo-Austrian Attack',
  e4c5nf3g6d4bg7nc3qa5: 'Modern Defense: Pterodactyl Variation',
  d4g6c4bg7nc3d6e4f5: 'Modern Defense: Randspringer Variation',
  nf3c5c4g6d4bg7e4qb6:
    'Modern Defense: Semi-Averbakh Variation, Polish Variation',
  'nf3c5c4g6d4bg7e4qa5+':
    'Modern Defense: Semi-Averbakh Variation, Pterodactyl Variation',
  'nf3g6d4bg7e4d6c4c5dxc5qa5+':
    'Modern Defense: Semi-Averbakh Variation, Pterodactyl Variation Accepted',
  'e4g6d4bg7c4c5nf3d6be2qa5+':
    'Modern Defense: Semi-Averbakh Variation, Pterodactyl Variation Declined',
  e4g6d4bg7nc3d6: 'Modern Defense: Standard Defense',
  e4g6d4bg7nc3: 'Modern Defense: Standard Line',
  e4g6d4bg7f4: 'Modern Defense: Three Pawns Attack',
  e4g6d4bg7nc3d6nf3: 'Modern Defense: Two Knights Variation',
  e4g6d4bg7nc3c6nf3d6:
    'Modern Defense: Two Knights Variation, Suttles Variation',
  e4g6d4bg7nc3d6nf3c6bg5qb6qd2qxb2:
    'Modern Defense: Two Knights Variation, Suttles Variation, Tal Gambit',
  e4g6d4bg7bd2: 'Modern Defense: Westermann Gambit',
  e4g6d4bg7bd3: 'Modern Defense: Wind Gambit',
  d4nc6d5nb8: 'Montevideo Defense',
  d4nf6c4g6g3d5: 'Neo-Gruenfeld Defense',
  d4nf6c4g6g3bg7bg2d5nf3: 'Neo-Gruenfeld Defense, with 5. Nf3',
  'd4nf6nf3g6g3bg7bg2o-oo-od5c4': 'Neo-Gruenfeld Defense: Classical Variation',
  'd4nf6nf3g6g3bg7bg2o-oo-od5c4dxc4':
    'Neo-Gruenfeld Defense: Classical Variation, Modern Defense',
  'd4nf6c4g6nf3bg7g3o-obg2c6o-od5':
    'Neo-Gruenfeld Defense: Classical Variation, Original Defense',
  'd4nf6nf3g6g3bg7bg2o-oo-od5c4nc6':
    'Neo-Gruenfeld Defense: Classical Variation, Polgar Variation',
  'd4nf6c4g6nf3bg7g3o-obg2d5cxd5nxd5o-o':
    'Neo-Gruenfeld Defense: Delayed Exchange Variation',
  'd4nf6c4g6nf3bg7g3o-obg2d5cxd5nxd5o-onb6':
    'Neo-Gruenfeld Defense: Delayed Exchange Variation, 6. cxd5 Nxd5 7. O-O Nb6',
  'd4nf6c4g6nc3bg7nf3o-og3d5cxd5nxd5bg2c5o-o':
    'Neo-Gruenfeld Defense: Delayed Exchange Variation, 7. Bg2 c5 8. O-O',
  'd4nf6nf3g6c4bg7g3o-obg2d5cxd5nxd5o-oc5dxc5':
    'Neo-Gruenfeld Defense: Delayed Exchange Variation, 7. O-O c5 8. dxc5',
  d4nf6c4g6g3bg7bg2d5cxd5nxd5: 'Neo-Gruenfeld Defense: Exchange Variation',
  d4nf6c4g6g3bg7bg2d5cxd5nxd5e4nb6ne2:
    'Neo-Gruenfeld Defense: Exchange Variation, with 6. e4',
  d4nf6c4g6f3d5: 'Neo-Gruenfeld Defense: Goglidze Attack',
  d4nf6nf3g6c4d5: 'Neo-Gruenfeld Defense: Non- or Delayed Fianchetto',
  'd4nf6c4g6nf3bg7g3o-obg2c6o-od5cxd5cxd5':
    'Neo-Gruenfeld Defense: Ultra-delayed Exchange Variation',
  d4nf6c4e6nc3: 'Nimzo-Indian Defense',
  d4nf6c4e6nc3bb4: 'Nimzo-Indian Defense, 2. c4 e6 3. Nc3 Bb4',
  'd4nf6c4e6nc3bb4e3o-onf3':
    'Nimzo-Indian Defense: 4. e3 O-O 5. Nf3, without ... d5',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3c5o-onc6a3dxc4bxc4cxd4':
    'Nimzo-Indian Defense: 4. e3, Main Line, with 8... dxc4 and 9... cxd4',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3nc6o-odxc4':
    'Nimzo-Indian Defense: 4. e3, Ragozin Variation',
  d4nf6c4e6nc3bb4qc2: 'Nimzo-Indian Defense: Classical Variation',
  d4nf6c4e6nc3bb4qc2d5cxd5qxd5nf3qf5qd1e5:
    'Nimzo-Indian Defense: Classical Variation, Belyavsky Gambit',
  d4nf6c4e6nc3bb4qc2c5:
    'Nimzo-Indian Defense: Classical Variation, Berlin Variation',
  'd4nf6c4e6nc3bb4qc2c5dxc5o-oa3bxc5nf3b6bf4':
    'Nimzo-Indian Defense: Classical Variation, Berlin Variation, Macieja System',
  'd4nf6c4e6nc3bb4qc2c5dxc5o-o':
    'Nimzo-Indian Defense: Classical Variation, Berlin Variation, Pirc Variation',
  'd4nf6c4e6nc3bb4qc2c5dxc5bxc3+':
    'Nimzo-Indian Defense: Classical Variation, Berlin Variation, Steiner Variation',
  'd4nf6c4e6nc3bb4qc2o-oa3bxc3+qxc3b6':
    'Nimzo-Indian Defense: Classical Variation, Keres Defense',
  d4nf6c4e6nc3bb4qc2nc6nf3d6:
    'Nimzo-Indian Defense: Classical Variation, Milner-Barry Variation',
  d4nf6c4e6nc3bb4qc2d5:
    'Nimzo-Indian Defense: Classical Variation, Noa Variation',
  d4nf6c4e6nc3bb4qc2d5a3:
    'Nimzo-Indian Defense: Classical Variation, Noa Variation, 4. Qc2 d5 5. a3',
  'd4nf6c4e6nc3bb4qc2d5a3bxc3+qxc3ne4qc2':
    'Nimzo-Indian Defense: Classical Variation, Noa Variation, 6. Qxc3 Ne4 7. Qc2',
  'd4nf6c4e6nc3bb4qc2d5a3bxc3+qxc3nc6':
    'Nimzo-Indian Defense: Classical Variation, Noa Variation, Botvinnik Variation',
  'd4nf6c4e6nc3bb4qc2d5a3bxc3+qxc3ne4qc2nc6e3e5':
    'Nimzo-Indian Defense: Classical Variation, Noa Variation, San Remo Variation',
  'd4nf6c4e6nc3bb4qc2o-oa3bxc3+qxc3b5':
    'Nimzo-Indian Defense: Classical Variation, Vitolins-Adorjan Gambit',
  d4nf6c4e6nc3bb4qc2nc6:
    'Nimzo-Indian Defense: Classical Variation, Zurich Variation',
  d4nf6c4e6nc3bb4qc2d5cxd5exd5:
    'Nimzo-Indian Defense: Classical, Noa Variation, 5. cxd5 exd5',
  'd4nf6c4e6nc3bb4qc2d5a3bxc3+qxc3ne4':
    'Nimzo-Indian Defense: Classical, Noa Variation, Main Line',
  d4nf6c4e6nc3bb4e3b6ne2: 'Nimzo-Indian Defense: Fischer Variation',
  d4nf6c4e6nc3bb4e3c5: 'Nimzo-Indian Defense: Huebner Variation',
  'd4nf6c4e6nc3bb4e3c5bd3nc6nf3bxc3+bxc3d6':
    'Nimzo-Indian Defense: Huebner Variation, Main Line',
  d4nf6c4e6nc3bb4e3c5ne2:
    'Nimzo-Indian Defense: Huebner Variation, Rubinstein Variation',
  'd4nf6c4e6nc3bb4e3c5ne2cxd4exd4o-oa3':
    'Nimzo-Indian Defense: Huebner Variation, Rubinstein Variation, Main Line',
  'd4nf6c4e6nc3bb4e3c5ne2cxd4exd4o-oc5':
    'Nimzo-Indian Defense: Huebner Variation, Rubinstein Variation, Sherbakov Attack',
  d4nf6c4e6nc3bb4f3: 'Nimzo-Indian Defense: Kmoch Variation',
  d4nf6c4e6nc3bb4bg5: 'Nimzo-Indian Defense: Leningrad Variation',
  d4nf6c4e6nc3bb4bg5h6bh4c5d5b5:
    'Nimzo-Indian Defense: Leningrad Variation, Averbakh Gambit',
  d4nf6c4e6nc3bb4bg5h6bh4c5d5d6:
    'Nimzo-Indian Defense: Leningrad Variation, Benoni Defense',
  d4nf6c4e6nc3bb4qd3: 'Nimzo-Indian Defense: Mikenas Attack',
  d4nf6c4e6nc3bb4e3: 'Nimzo-Indian Defense: Normal Line',
  'd4nf6c4e6nc3bb4e3o-o': 'Nimzo-Indian Defense: Normal Variation',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3c5o-onc6a3bxc3bxc3dxc4bxc4':
    'Nimzo-Indian Defense: Normal Variation, Bernstein Defense',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3c5o-onc6a3bxc3bxc3':
    'Nimzo-Indian Defense: Normal Variation, Bernstein Defense, Exchange Line',
  'd4nf6c4e6nc3bb4e3o-obd3':
    'Nimzo-Indian Defense: Normal Variation, Bishop Attack',
  'd4nf6c4e6nc3bb4e3o-obd3d5':
    'Nimzo-Indian Defense: Normal Variation, Bishop Attack, Classical Defense',
  'd4nf6c4e6nc3bb4e3o-obd3d5a3bxc3+bxc3':
    'Nimzo-Indian Defense: Normal Variation, Botvinnik System',
  d4nf6c4e6nc3bb4e3b6ne2ba6:
    'Nimzo-Indian Defense: Normal Variation, Bronstein (Byrne) Variation',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3c5':
    'Nimzo-Indian Defense: Normal Variation, Gligoric System',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3c5o-onbd7':
    'Nimzo-Indian Defense: Normal Variation, Gligoric System, 6. Nf3 c5 7. O-O Nbd7',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3c5o-onc6':
    'Nimzo-Indian Defense: Normal Variation, Gligoric System, Bernstein Defense',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3c5o-odxc4bxc4nbd7':
    'Nimzo-Indian Defense: Normal Variation, Gligoric System, Bronstein Variation',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3c5o-odxc4bxc4':
    'Nimzo-Indian Defense: Normal Variation, Gligoric System, Exchange at c4',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3c5o-ob6':
    'Nimzo-Indian Defense: Normal Variation, Gligoric System, Keres Variation',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3c5o-odxc4bxc4qe7':
    'Nimzo-Indian Defense: Normal Variation, Gligoric System, Smyslov Variation',
  'd4nf6c4e6nc3bb4e3c5nf3o-o':
    'Nimzo-Indian Defense: Normal Variation, Huebner Deferred',
  'd4nf6c4e6nc3bb4e3o-onf3d5':
    'Nimzo-Indian Defense: Normal Variation, Ragozin Variation',
  'd4nf6c4e6nc3bb4e3o-onf3d5a3':
    'Nimzo-Indian Defense: Normal Variation, Saemisch Deferred',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3b6':
    'Nimzo-Indian Defense: Normal Variation, Schlechter Defense',
  d4nf6c4e6nc3bb4e3nc6:
    'Nimzo-Indian Defense: Normal Variation, Taimanov Variation',
  e4c6d4d5exd5cxd5c4nf6nc3e6nf3bb4:
    'Nimzo-Indian Defense: Panov Attack, Main Line',
  'd4nf6c4e6nc3bb4e3o-obd3d5nf3nc6o-o': 'Nimzo-Indian Defense: Ragozin Defense',
  'd4nf6c4e6nc3bb4e3o-one2': 'Nimzo-Indian Defense: Reshevsky Variation',
  d4nf6c4e6nc3bb4g3: 'Nimzo-Indian Defense: Romanishin Variation',
  'd4nf6c4e6nc3bb4nf3c5g3o-obg2':
    'Nimzo-Indian Defense: Romanishin Variation, 5. g3 O-O 6. Bg2',
  'd4nf6c4e6nc3bb4nf3c5g3cxd4nxd4o-obg2d5cxd5nxd5':
    'Nimzo-Indian Defense: Romanishin Variation, English Hybrid',
  'd4nf6c4e6nc3bb4a3bxc3+bxc3o-o': 'Nimzo-Indian Defense: Saemisch Variation',
  'd4nf6c4e6nc3bb4a3bxc3+bxc3c5e3':
    'Nimzo-Indian Defense: Saemisch Variation, 5. bxc3 c5 6. e3',
  'd4nf6c4e6nc3bb4e3o-oa3bxc3+bxc3':
    'Nimzo-Indian Defense: Saemisch Variation, 5. a3 Bxc3+ 6. bxc3',
  'd4nf6c4e6nc3bb4f3d5a3bxc3+bxc3c5cxd5':
    'Nimzo-Indian Defense: Saemisch Variation, 6. bxc3 c5 7. cxd5',
  'd4nf6c4e6nc3bb4e3c5bd3nc6a3bxc3+bxc3o-o':
    'Nimzo-Indian Defense: Saemisch Variation, 6. a3 Bxc3+ 7. bxc3 O-O',
  'd4nf6c4e6nc3bb4a3bxc3+bxc3':
    'Nimzo-Indian Defense: Saemisch Variation, Accelerated',
  'd4nf6c4e6nc3bb4e3c5bd3nc6a3bxc3+bxc3o-one2b6e4ne8':
    'Nimzo-Indian Defense: Saemisch Variation, Capablanca Variation',
  'd4nf6c4e6nc3bb4f3d5a3bxc3+bxc3c5cxd5nxd5dxc5':
    'Nimzo-Indian Defense: Saemisch Variation, Keres Variation',
  'd4nf6c4e6nc3bb4a3bxc3+bxc3c5e3b6':
    "Nimzo-Indian Defense: Saemisch Variation, O'Kelly Variation",
  'd4nf6c4e6nc3bb4f3d5a3bxc3+bxc3c5e3o-ocxd5nxd5':
    'Nimzo-Indian Defense: Saemisch, Botvinnik Variation',
  'd4nf6c4e6nc3bb4f3d5a3bxc3+bxc3c5cxd5nxd5dxc5f5':
    'Nimzo-Indian Defense: Saemisch, Romanovsky Variation',
  'd4nf6c4e6nc3bb4e3o-one2d5a3bd6': 'Nimzo-Indian Defense: Simagin Variation',
  d4nf6c4e6nc3bb4qb3: 'Nimzo-Indian Defense: Spielmann Variation',
  d4nf6c4e6nc3bb4qb3c5dxc5nc6nf3ne4bd2nxd2:
    'Nimzo-Indian Defense: Spielmann Variation, Karlsbad Variation',
  d4nf6c4e6nc3bb4qb3c5dxc5nc6:
    'Nimzo-Indian Defense: Spielmann Variation, Romanovsky Gambit',
  d4nf6c4e6nc3bb4qb3c5dxc5nc6nf3ne4bd2nxc5:
    'Nimzo-Indian Defense: Spielmann Variation, Stahlberg Variation',
  d4nf6c4e6nc3bb4qb3c5dxc5nc6nf3ne4bd2nxc5qc2f5g3:
    'Nimzo-Indian Defense: Spielmann, Stahlberg Variation',
  d4nf6c4e6nc3bb4e3b6: 'Nimzo-Indian Defense: St. Petersburg Variation',
  d4nf6c4e6nc3bb4nf3: 'Nimzo-Indian Defense: Three Knights Variation',
  d4nf6c4e6nf3b6nc3bb4:
    'Nimzo-Indian Defense: Three Knights Variation, Duchamp Variation',
  d4nf6c4e6nf3b6nc3bb4bg5bb7nd2:
    'Nimzo-Indian Defense: Three Knights Variation, Duchamp Variation, Modern Line',
  d4nf6c4e6nc3bb4nf3c5d5:
    'Nimzo-Indian Defense: Three Knights Variation, Korchnoi Variation',
  'd4nf6c4e6nf3bb4+nc3c5d5b5':
    'Nimzo-Indian Defense: Three Knights Variation, Shocron Gambit',
  d4nf6c4e6nc3bb4nf3c5d5ne4:
    'Nimzo-Indian Defense: Three Knights, Euwe Variation',
  b3: 'Nimzo-Larsen Attack',
  b3d5: 'Nimzo-Larsen Attack: Classical Variation',
  nf3d5b3: 'Nimzo-Larsen Attack: Classical Variation, 2. b3',
  b3f5: 'Nimzo-Larsen Attack: Dutch Variation',
  b3c5: 'Nimzo-Larsen Attack: English Variation',
  b3d5ba3: 'Nimzo-Larsen Attack: Graz Attack',
  b3nf6: 'Nimzo-Larsen Attack: Indian Variation',
  b3e5: 'Nimzo-Larsen Attack: Modern Variation',
  b3e5bb2: 'Nimzo-Larsen Attack: Modern Variation, 2. Bb2',
  b3e5bb2nc6: 'Nimzo-Larsen Attack: Modern Variation, 2. Bb2 Nc6',
  b3e5bb2nc6e3: 'Nimzo-Larsen Attack: Modern Variation, 2. Bb2 Nc6 3. e3',
  nf3d5b3c5e4: 'Nimzo-Larsen Attack: Norfolk Gambit',
  nf3d5b3nf6bb2c5e4: 'Nimzo-Larsen Attack: Norfolk Gambit, 3. Bb2 c5 4. e4',
  b3e5bb2nc6f4: 'Nimzo-Larsen Attack: Pachman Gambit',
  b3f5bb2e6e4: 'Nimzo-Larsen Attack: Ringelbach Gambit',
  b3nf6bb2g6g4: 'Nimzo-Larsen Attack: Spike Variation',
  b3b6: 'Nimzo-Larsen Attack: Symmetrical Variation',
  e4nc6: 'Nimzowitsch Defense',
  e4nc6nf3: 'Nimzowitsch Defense, Declined Variation',
  e4nc6nc3nf6d4e5: 'Nimzowitsch Defense: Breyer Variation',
  e4nc6nf3nf6e5ng4: 'Nimzowitsch Defense: El Columpio Defense',
  e4nc6nf3nf6e5ng4d4d6h3nh6e6:
    'Nimzowitsch Defense: El Columpio Defense, El Columpio Gambit',
  e4nc6nf3nf6e5ng4d4d6h3nh6exd6:
    'Nimzowitsch Defense: El Columpio Defense, Exchange Variation',
  e4nc6nf3nf6e5ng4d4d6h3nh6bb5:
    'Nimzowitsch Defense: El Columpio Defense, Pin Variation',
  e4nc6d4e6nf3f5exf5nf6: 'Nimzowitsch Defense: Franco-Hiva Gambit',
  e4nc6d4e6nc3f5exf5nf6:
    'Nimzowitsch Defense: Franco-Hiva Gambit, 3. Nc3 f5 4. exf5 Nf6',
  e4nc6nf3e6: 'Nimzowitsch Defense: Franco-Nimzowitsch Variation',
  e4nc6nc3e6: 'Nimzowitsch Defense: French Connection',
  e4nc6d4d5be3: 'Nimzowitsch Defense: Hornung Gambit',
  e4nc6d4e5: 'Nimzowitsch Defense: Kennedy Variation',
  e4nc6d4e5dxe5bc5:
    'Nimzowitsch Defense: Kennedy Variation, Bielefelder Gambit',
  e4nc6d4e5dxe5f6: 'Nimzowitsch Defense: Kennedy Variation, Hammer Gambit',
  e4nc6d4e5dxe5qh4: 'Nimzowitsch Defense: Kennedy Variation, Herford Gambit',
  e4nc6d4e5dxe5nxe5nc3: 'Nimzowitsch Defense: Kennedy Variation, Keres Attack',
  e4nc6d4e5d5:
    'Nimzowitsch Defense: Kennedy Variation, Linksspringer Variation',
  e4nc6d4e5dxe5nxe5f4ng6: 'Nimzowitsch Defense: Kennedy Variation, Main Line',
  e4nc6d4e5dxe5nxe5nf3:
    'Nimzowitsch Defense: Kennedy Variation, Paulsen Attack',
  e4nc6d4e5dxe5nxe5f4nc6:
    'Nimzowitsch Defense: Kennedy Variation, Riemann Defense',
  e4nc6d4e5dxe5d6: 'Nimzowitsch Defense: Kennedy Variation, de Smet Gambit',
  e4nc6nf3f5: 'Nimzowitsch Defense: Lean Variation',
  e4nc6nf3f5exf5:
    'Nimzowitsch Defense: Lean Variation, Colorado Counter Accepted',
  e4nc6d4d6: 'Nimzowitsch Defense: Mikenas Variation',
  e4nc6d4f6: 'Nimzowitsch Defense: Neo-Mongoloid Defense',
  e4nc6nc3g6: 'Nimzowitsch Defense: Pirc Connection',
  e4nc6bb5: 'Nimzowitsch Defense: Pseudo-Spanish Variation',
  e4nc6d4d5: 'Nimzowitsch Defense: Scandinavian Variation',
  e4nc6d4d5exd5nb4:
    'Nimzowitsch Defense: Scandinavian Variation, Aachen Gambit',
  e4nc6d4d5e5: 'Nimzowitsch Defense: Scandinavian Variation, Advance Variation',
  e4nc6d4d5nc3:
    'Nimzowitsch Defense: Scandinavian Variation, Bogoljubov Variation',
  e4nc6d4d5nc3a6:
    'Nimzowitsch Defense: Scandinavian Variation, Bogoljubov Variation, Brandics Gambit',
  e4nc6d4d5nc3g6:
    'Nimzowitsch Defense: Scandinavian Variation, Bogoljubov Variation, Erben Gambit',
  e4nc6d4d5nc3e5:
    'Nimzowitsch Defense: Scandinavian Variation, Bogoljubov Variation, Heinola-Deppe Gambit',
  e4nc6d4d5nc3dxe4d5ne5:
    'Nimzowitsch Defense: Scandinavian Variation, Bogoljubov Variation, Nimzowitsch Gambit',
  e4nc6d4d5nc3dxe4d5nb8f3:
    'Nimzowitsch Defense: Scandinavian Variation, Bogoljubov Variation, Richter Gambit',
  e4nc6d4d5nc3nf6:
    'Nimzowitsch Defense: Scandinavian Variation, Bogoljubov Variation, Vehre Variation',
  e4nc6d4d5exd5qxd5:
    'Nimzowitsch Defense: Scandinavian Variation, Exchange Variation',
  e4nc6d4d5exd5qxd5nc3:
    'Nimzowitsch Defense: Scandinavian Variation, Exchange Variation, Marshall Gambit',
  e4nc6b4: 'Nimzowitsch Defense: Wheeler Gambit',
  e4nc6nf3d6: 'Nimzowitsch Defense: Williams Variation',
  e4nc6d4a6: 'Nimzowitsch Defense: Woodchuck Variation',
  b3b5: 'Nimzowitsch-Larsen Attack: Polish Variation',
  e4g6d4nf6e5nh5g4ng7: 'Norwegian Defense',
  d4c5: 'Old Benoni Defense',
  d4c5d5: 'Old Benoni Defense, 2. d5',
  d4c5d5e5: 'Old Benoni Defense, 2. d5 e5',
  d4c5d5f5: 'Old Benoni Defense: Mujannah Formation',
  d4d6c4: 'Old Indian Defense',
  d4nf6c4d6: 'Old Indian Defense, 2. c4 d6',
  d4nf6c4d6nc3e5e3nbd7bd3: 'Old Indian Defense: Dus-Khotimirsky Variation',
  d4nf6c4d6nc3bf5: 'Old Indian Defense: Janowski Variation',
  d4nf6c4d6nc3bf5g3:
    'Old Indian Defense: Janowski Variation, Fianchetto Variation',
  d4nf6c4d6nc3bf5nf3:
    'Old Indian Defense: Janowski Variation, Fianchetto Variation, 3. Nc3 Bf5 4. Nf3',
  d4nf6c4d6nc3bf5e4: 'Old Indian Defense: Janowski Variation, Grinberg Gambit',
  d4nf6c4d6nc3bf5f3: 'Old Indian Defense: Janowski Variation, Main Line',
  d4nf6c4d6nc3nbd7e4e5nf3: 'Old Indian Defense: Normal Variation',
  d4nf6nf3d6c4bg4: 'Old Indian Defense: Tartakower-Indian',
  d4nf6c4d6nc3e5nf3: 'Old Indian Defense: Two Knights Variation',
  d4nf6c4d6nc3e5: 'Old Indian Defense: Ukrainian Variation',
  d4nf6c4d6g4: 'Old Indian: Aged Gibbon Gambit',
  d4nf6nf3c6c4d6nc3: 'Old Indian: Czech Variation',
  d4nf6c4d6nc3c6: 'Old Indian: Czech Variation, with Nc3',
  d4nf6nf3c6c4d6: 'Old Indian: Czech Variation, with Nf3',
  e4b6: 'Owen Defense',
  e4b6d4c5dxc5nc6: 'Owen Defense: Hekili-Loa Gambit',
  'e4b6d4bb7bd3f5exf5bxg2qh5+g6': 'Owen Defense: Matovinsky Gambit',
  e4b6d4bb7bg5: 'Owen Defense: Naselwaus Gambit',
  e4b6d4bb7nf3: 'Owen Defense: Smith Gambit',
  e4f6d4b6c4bb7: 'Owen Defense: Unicorn Variation',
  e4b6d4bb7f3e5: 'Owen Defense: Wind Gambit',
  d4nf6f3: 'Paleface Attack',
  e4e5nf3nf6: "Petrov's Defense",
  e4e5nf3nf6nxe5: "Petrov's Defense, 2. Nf3 Nf6 3. Nxe5",
  e4e5nf3nf6nxe5d6: "Petrov's Defense, 2. Nf3 Nf6 3. Nxe5 d6",
  e4e5nf3nf6nxe5d6nf3: "Petrov's Defense, 3. Nxe5 d6 4. Nf3",
  e4e5nf3nf6nxe5d6nf3nxe4: "Petrov's Defense, 3. Nxe5 d6 4. Nf3 Nxe4",
  e4e5nf3nf6d4exd4: 'Petrov: Modern Attack',
  e4e5nf3d6: 'Philidor Defense',
  e4e5nf3d6d4: 'Philidor Defense, 2. Nf3 d6 3. d4',
  e4e5nf3d6bc4: 'Philidor Defense, 2. Nf3 d6 3. Bc4',
  e4e5nf3d6bc4be7: 'Philidor Defense, 2. Nf3 d6 3. Bc4 Be7',
  e4e5nf3d6d4bg4dxe5nd7: 'Philidor Defense: Alapin-Blackburne Gambit',
  'e4e5nf3d6d4exd4nxd4nf6nc3be7be2o-oo-oc5nf3nc6bg5be6re1':
    'Philidor Defense: Berger Variation',
  e4e5nf3d6d4exd4c3: 'Philidor Defense: Bird Gambit',
  e4e5nf3d6d4exd4qxd4bd7: 'Philidor Defense: Boden Variation',
  e4e5nf3d6d4exd4: 'Philidor Defense: Exchange Variation',
  e4e5nf3d6d4exd4nxd4:
    'Philidor Defense: Exchange Variation, 3. d4 exd4 4. Nxd4',
  e4e5nf3d6d4exd4nxd4nf6:
    'Philidor Defense: Exchange Variation, 3. d4 exd4 4. Nxd4 Nf6',
  e4e5nf3d6d4nd7: 'Philidor Defense: Hanham Variation',
  e4e5nf3d6d4nd7bc4c6c3: 'Philidor Defense: Hanham Variation, Delmar Variation',
  'e4e5nf3d6d4nd7bc4c6o-o':
    'Philidor Defense: Hanham Variation, Krause Variation',
  e4e5nf3d6d4nd7bc4c6nc3:
    'Philidor Defense: Hanham Variation, Schlechter Variation',
  e4e5nf3d6d4nd7bc4nb6: 'Philidor Defense: Hanham Variation, Sharp Variation',
  'e4e5nf3d6d4nd7bc4c6o-obe7dxe5':
    'Philidor Defense: Hanham Variation, Steiner Variation',
  'e4e5nf3d6d4nd7bc4c6ng5nh6f4be7o-oo-oc3d5':
    'Philidor Defense: Hanham, Berger Variation',
  e4e5nf3d6d4nd7bc4c6ng5: 'Philidor Defense: Hanham, Kmoch Variation',
  e4e5nf3d6d4exd4nxd4g6: 'Philidor Defense: Larsen Variation',
  e4e5nf3d6d4nf6nc3nbd7: 'Philidor Defense: Lion Variation',
  'e4e5nf3d6d4nf6nc3nbd7bc4be7bxf7+':
    'Philidor Defense: Lion Variation, Bishop Sacrifice',
  'e4d6d4nf6nc3nbd7nf3e5bc4be7dxe5dxe5bxf7+':
    'Philidor Defense: Lion Variation, Delayed Bishop Sacrifice',
  'e4e5nf3d6d4nf6nc3nbd7bc4be7ng5o-obxf7+rxf7ne6':
    'Philidor Defense: Lion Variation, Forcing Line',
  'e4d6d4nf6nc3c6be2nbd7nf3e5o-obe7':
    "Philidor Defense: Lion Variation, Lion's Claw",
  'e4e5nf3d6d4nf6nc3nbd7bc4h6o-obe7':
    "Philidor Defense: Lion Variation, Lion's Claw, 5. Bc4 h6 6. O-O Be7",
  e4e5nf3d6d4nd7nc3ngf6g4: 'Philidor Defense: Lion Variation, Shirov Gambit',
  'e4d6d4nf6nc3e5nf3nbd7bc4be7o-oo-oqe2c6a4exd4':
    'Philidor Defense: Lion Variation, Sozin Variation',
  e4e5nf3d6bc4f5: 'Philidor Defense: Lopez Countergambit',
  e4e5nf3d6d4f5bc4exd4ng5nh6nxh7:
    'Philidor Defense: Lopez Countergambit, Jaenisch Variation',
  e4e5nf3d6d4exd4bc4: 'Philidor Defense: Morphy Gambit',
  e4e5nf3d6d4nf6: 'Philidor Defense: Nimzowitsch Variation',
  e4e5nf3d6d4nf6dxe5:
    'Philidor Defense: Nimzowitsch Variation, 3. d4 Nf6 4. dxe5',
  e4e5nf3d6d4nf6bc4: 'Philidor Defense: Nimzowitsch Variation, Klein Variation',
  e4e5nf3d6d4nf6dxe5nxe4qd5:
    'Philidor Defense: Nimzowitsch Variation, Rellstab Variation',
  e4e5nf3d6d4nf6dxe5nxe4nbd2:
    'Philidor Defense: Nimzowitsch Variation, Sokolsky Variation',
  'e4e5nf3d6d4nf6nc3nbd7bc4be7ng5o-obxf7+':
    'Philidor Defense: Nimzowitsch, Larobok Variation',
  e4e5nf3d6d4nf6ng5: 'Philidor Defense: Nimzowitsch, Locock Variation',
  e4e5nf3d6d4exd4nxd4d5exd5: 'Philidor Defense: Paulsen Attack',
  e4e5nf3d6d4f5: 'Philidor Defense: Philidor Countergambit',
  e4e5nf3d6d4f5dxe5fxe4ng5d5e6bc5nc3:
    'Philidor Defense: Philidor Countergambit, Berger Variation',
  e4e5nf3d6d4f5nc3:
    'Philidor Defense: Philidor Countergambit, Zukertort Variation',
  e4e5nf3d6d4f5dxe5fxe4ng5d5e6:
    'Philidor Defense: Philidor Countergambit, del Rio Attack',
  e4e5nf3d6d4bd7: 'Philidor Defense: Philidor Gambit',
  e4e5nf3d6bc4be7c3: 'Philidor Defense: Steinitz Variation',
  e4d6: 'Pirc Defense',
  e4d6d4: 'Pirc Defense, 2. d4',
  e4d6d4nf6: 'Pirc Defense, 2. d4 Nf6',
  e4d6d4nf6nc3: 'Pirc Defense, 2. d4 Nf6 3. Nc3',
  e4d6d4nf6nc3g6: 'Pirc Defense, 2. d4 Nf6 3. Nc3 g6',
  e4d6d4nf6nc3g6be3c6qd2: 'Pirc Defense: 150 Attack',
  e4d6d4nf6nc3g6be3c6qd2bg4: 'Pirc Defense: 150 Attack, Inner Doll Defense',
  e4d6d4nf6nc3g6be3c6h3: 'Pirc Defense: 150 Attack, Sveshnikov-Jansa Attack',
  e4d6d4nf6nc3g6f4: 'Pirc Defense: Austrian Attack',
  'e4d6d4nf6nc3g6f4bg7nf3o-o':
    'Pirc Defense: Austrian Attack, 4. f4 Bg7 5. Nf3 O-O',
  e4d6d4nf6nc3g6f4bg7nf3c5: 'Pirc Defense: Austrian Attack, Dragon Formation',
  'e4d6d4nf6nc3g6f4bg7nf3o-obe3':
    'Pirc Defense: Austrian Attack, Kurajica Variation',
  e4d6d4nf6nc3g6f4bg7bc4: 'Pirc Defense: Austrian Attack, Ljubojevic Variation',
  'e4d6d4nf6nc3g6f4bg7nf3o-oe5':
    'Pirc Defense: Austrian Attack, Unzicker Attack',
  'e4d6d4nf6nc3g6f4bg7nf3o-oe5nfd7h4':
    'Pirc Defense: Austrian Attack, Unzicker Attack, Bronstein Variation',
  'e4d6d4nf6nc3g6f4bg7nf3o-obd3':
    'Pirc Defense: Austrian Attack, Weiss Variation',
  e4d6d4nf6nc3g6be2bg7h4: 'Pirc Defense: Bayonet Attack',
  e4d6d4nf6nc3g6bg5: 'Pirc Defense: Byrne Variation',
  e4d6d4nf6nc3g6be2bg7g4: 'Pirc Defense: Chinese Variation',
  e4d6d4nf6nc3g6be2: 'Pirc Defense: Classical Variation',
  e4d6d4nf6nc3g6nf3: 'Pirc Defense: Classical Variation, 3. Nc3 g6 4. Nf3',
  e4d6d4nf6nc3g6nf3bg7:
    'Pirc Defense: Classical Variation, 3. Nc3 g6 4. Nf3 Bg7',
  e4d6d4nf6nc3g6nf3bg7be2: 'Pirc Defense: Classical Variation, Quiet System',
  'e4d6d4nf6nc3g6nf3bg7be2o-oo-onc6':
    'Pirc Defense: Classical Variation, Quiet System, Chigorin Line',
  'e4d6d4nf6nc3g6nf3bg7be2o-oo-oc6':
    'Pirc Defense: Classical Variation, Quiet System, Czech Defense',
  'e4d6d4nf6nc3g6nf3bg7be2o-oo-obg4':
    'Pirc Defense: Classical Variation, Quiet System, Parma Defense',
  e4d6d4nf6nc3g6nf3bg7h3:
    'Pirc Defense: Classical Variation, Schlechter Variation',
  e4d6d4nf6nc3g6bc4: 'Pirc Defense: Kholmov System',
  e4d6d4nf6nf3: 'Pirc Defense: Roscher Gambit',
  e4d6d4nf6nc3g6g3: 'Pirc Defense: Sveshnikov System',
  d4b5: 'Polish Defense',
  d4b5e4bb7bxb5: 'Polish Defense: Spassky Gambit Accepted',
  b4: 'Polish Opening',
  b4d5bb2bf5: 'Polish Opening: Baltic Defense',
  b4c5: 'Polish Opening: Birmingham Gambit',
  b4e5bb2f6b5: 'Polish Opening: Bugayev Advance Variation',
  b4e5a3: 'Polish Opening: Bugayev Attack',
  b4e5bb2d6: 'Polish Opening: Czech Defense',
  b4f5: 'Polish Opening: Dutch Defense',
  b4d5bb2qd6: 'Polish Opening: German Defense',
  b4nc6: 'Polish Opening: Grigorian Variation',
  b4nh6: 'Polish Opening: Karniewski Variation',
  b4nf6bb2g6: "Polish Opening: King's Indian Variation",
  b4nf6bb2g6e4: "Polish Opening: King's Indian Variation, Schiffler Attack",
  'nf3nf6c4g6b4bg7bb2o-oe3d6d4':
    "Polish Opening: King's Indian Variation, Sokolsky Attack",
  b4d5bb2c6a4: 'Polish Opening: Myers Variation',
  b4d5bb2qd6a3e5e4dxe4f3: 'Polish Opening: Orangutan-Diemer Gambit',
  b4nf6bb2e6a3c6d3a5bxa5d5e4: 'Polish Opening: Orangutan-Hartlaub Gambit',
  b4c6: 'Polish Opening: Outflank Variation',
  b4e6bb2nf6b5b6: "Polish Opening: Queen's Indian Variation",
  b4e6bb2nf6b5a6: 'Polish Opening: Queenside Defense',
  b4e6bb2nf6b5a6a4axb5axb5rxa1bxa1: 'Polish Opening: Rooks Swap Line',
  b4e6bb2nf6b5d5e3: 'Polish Opening: Schiffler-Sokolsky Variation',
  b4c6bb2a5b5cxb5e4: 'Polish Opening: Schuehler Gambit',
  b4b5: 'Polish Opening: Symmetrical Variation',
  b4e5bb2f6e4: 'Polish Opening: Tartakower Gambit',
  b4e5bb2f6e4bxb4bc4nc6f4qe7f5g6:
    'Polish Opening: Tartakower Gambit, Brinckmann Variation',
  b4e5bb2c5: 'Polish Opening: Wolferts Gambit',
  nf3nf6b4: 'Polish Opening: Zukertort System',
  e4e5nf3nc6c3: 'Ponziani Opening',
  e4e5nf3nc6c3d5qa4bd7: 'Ponziani Opening: Caro Gambit',
  e4e5nf3nc6c3nf6: 'Ponziani Opening: Jaenisch Counterattack',
  e4e5nf3nc6c3d5qa4nf6: 'Ponziani Opening: Leonhardt Variation',
  e4e5nf3nc6c3nf6bc4: 'Ponziani Opening: Neumann Gambit',
  e4e5nf3nc6c3f5: 'Ponziani Opening: Ponziani Countergambit',
  e4e5nf3nc6c3f5d4d6d5fxe4ng5nb8nxe4nf6bd3be7:
    'Ponziani Opening: Ponziani Countergambit, Cordel Variation',
  e4e5nf3nc6c3f5d4d6d5:
    'Ponziani Opening: Ponziani Countergambit, Schmidt Attack',
  e4e5nf3nc6c3nge7: 'Ponziani Opening: Reti Variation',
  e4e5nf3nc6c3be7: 'Ponziani Opening: Romanishin Variation',
  e4e5nf3nc6c3d5bb5: 'Ponziani Opening: Spanish Variation',
  e4e5nf3nc6c3d5bb5dxe4nxe5qd5qa4:
    'Ponziani Opening: Spanish Variation, Harrwitz Attack, Nikitin Gambit',
  e4e5nf3nc6c3d5qa4f6: 'Ponziani Opening: Steinitz Variation',
  e4e5nf3nc6c3nf6d4nxe4d5bc5: 'Ponziani Opening: Vukovic Gambit',
  e4e5bb5: 'Portuguese Opening',
  e4e5bb5bc5b4: 'Portuguese Opening: Miguel Gambit',
  e4e5bb5nf6d4: 'Portuguese Opening: Portuguese Gambit',
  'nf3c5c4g6d4bg7e4qa5+nc3d6': 'Pterodactyl Defense',
  'e4g6d4bg7f4c5nf3qa5+':
    'Pterodactyl Defense: Austrian, Austriadactylus Western',
  e4g6nc3bg7f4c5nf3qa5: 'Pterodactyl Defense: Austrian, Grand Prix Pterodactyl',
  e4g6d4bg7f4c5c3qa5: 'Pterodactyl Defense: Austrian, Pteranodon',
  e4g6d4bg7c4c5nc3d6be3qa5: 'Pterodactyl Defense: Central, Anhanguera',
  'd4g6c4bg7nc3c5d5d6e4bxc3+bxc3qa5':
    'Pterodactyl Defense: Central, Benoni Beefeater Pterodactyl',
  'd4g6c4bg7e4c5d5qa5+': 'Pterodactyl Defense: Central, Benoni Pterodactyl',
  e4g6d4bg7c4c5d5d6nc3qa5:
    'Pterodactyl Defense: Central, Benoni Quetzalcoatlus',
  d4g6c4bg7e4d6nc3c5nge2qa5: 'Pterodactyl Defense: Central, Bogolubovia',
  e4g6d4bg7c4c5nc3d6dxc5qa5:
    'Pterodactyl Defense: Central, Quetzalcoatlus Gambit',
  e4g6d4bg7nc3c5be3: 'Pterodactyl Defense: Eastern, Anhanguera',
  d4g6e4bg7nc3c5d5: 'Pterodactyl Defense: Eastern, Benoni',
  'e4g6d4bg7nc3c5d5bxc3+bxc3qa5':
    'Pterodactyl Defense: Eastern, Benoni Pteranodon',
  d4g6nc3bg7e4c5d5qa5: 'Pterodactyl Defense: Eastern, Benoni Pterodactyl',
  'e4g6d4bg7nc3c5dxc5bxc3+bxc3qa5': 'Pterodactyl Defense: Eastern, Pteranodon',
  e4g6d4bg7nc3c5dxc5qa5: 'Pterodactyl Defense: Eastern, Pterodactyl',
  e4g6d4bg7nc3c5dxc5: 'Pterodactyl Defense: Eastern, Rhamphorhynchus',
  'e4g6d4bg7g3c5nf3qa5+': 'Pterodactyl Defense: Fianchetto, King Pterodactyl',
  d4g6c4bg7nc3c5d5qa5:
    'Pterodactyl Defense: Fianchetto, Queen Benoni Pterodactyl',
  'd4g6c4bg7nc3c5d5bxc3+bxc3qa5':
    'Pterodactyl Defense: Fianchetto, Queen Pteranodon',
  'd4g6nf3bg7g3c5bg2qa5+': 'Pterodactyl Defense: Fianchetto, Queen Pterodactyl',
  'e4g6d4bg7g3c5dxc5qa5+': 'Pterodactyl Defense: Fianchetto, Rhamphorhynchus',
  d4g6c4bg7nc3c5e3: 'Pterodactyl Defense: Queen Pterodactyl, Quiet Line',
  e4c5nf3g6d4bg7nc3qa5be3: 'Pterodactyl Defense: Sicilian, Anhanguera',
  e4c5nf3g6d4bg7nc3qa5d5: 'Pterodactyl Defense: Sicilian, Benoni Gambit',
  'e4c5nf3g6d4bg7dxc5qa5+nc3bxc3+bxc3':
    'Pterodactyl Defense: Sicilian, Pteranodon',
  e4g6d4bg7nc3c5nf3qa5be2d6: 'Pterodactyl Defense: Sicilian, Quetzalcoatlus',
  'e4c5nf3g6d4bg7dxc5qa5+nc3': 'Pterodactyl Defense: Sicilian, Rhamporhynchus',
  e4g6d4bg7nc3c5nf3qa5bc4: 'Pterodactyl Defense: Sicilian, Siroccopteryx',
  e4c5nf3g6d4bg7nc3qa5bd2: 'Pterodactyl Defense: Sicilian, Unpin',
  'e4g6d4bg7nf3c5be3qa5+': 'Pterodactyl Defense: Western, Anhanguera',
  e4c5nf3g6c3bg7d4qa5: 'Pterodactyl Defense: Western, Pterodactyl',
  'e4c5nf3g6d4bg7dxc5qa5+': 'Pterodactyl Defense: Western, Rhamphorhynchus',
  'e4g6nf3bg7d4c5bc4cxd4nxd4qa5+':
    'Pterodactyl Defense: Western, Siroccopteryx',
  d4d5c4: "Queen's Gambit",
  d4d5c4dxc4: "Queen's Gambit Accepted",
  d4d5c4dxc4nf3nf6: "Queen's Gambit Accepted, 2. c4 dxc4 3. Nf3 Nf6",
  'd4d5c4dxc4qa4+': "Queen's Gambit Accepted: Accelerated Mannheim Variation",
  d4d5c4dxc4nf3a6: "Queen's Gambit Accepted: Alekhine Defense",
  d4d5c4dxc4nf3a6e4:
    "Queen's Gambit Accepted: Alekhine Defense, Borisenko-Furman Variation",
  d4d5c4dxc4nf3a6e3b5:
    "Queen's Gambit Accepted: Alekhine Defense, Haberditz Variation",
  d4d5c4dxc4nf3a6e3bg4bxc4e6d5:
    "Queen's Gambit Accepted: Alekhine Defense: Alatortsev Variation",
  d4d5c4dxc4nf3nf6nc3a6e4: "Queen's Gambit Accepted: Bogoljubov Defense",
  d4d5c4dxc4e4nf6:
    "Queen's Gambit Accepted: Central Variation, Alekhine System",
  d4d5c4dxc4e4b5: "Queen's Gambit Accepted: Central Variation, Greco Variation",
  d4d5c4dxc4e4e5:
    "Queen's Gambit Accepted: Central Variation, McDonnell Defense",
  d4d5c4dxc4e4e5bxc4:
    "Queen's Gambit Accepted: Central Variation, McDonnell Defense, Somov Gambit",
  d4d5c4dxc4e4nc6: "Queen's Gambit Accepted: Central Variation, Modern Defense",
  d4d5c4dxc4e4c5:
    "Queen's Gambit Accepted: Central Variation, Rubinstein Defense",
  d4d5c4dxc4e4c5d5b5:
    "Queen's Gambit Accepted: Central Variation, Rubinstein Defense, Yefimov Gambit",
  d4d5c4dxc4nf3nf6e3e6bxc4c5: "Queen's Gambit Accepted: Classical Defense",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-oa6qe2':
    "Queen's Gambit Accepted: Classical Defense, Alekhine System",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-oa6qe2b5':
    "Queen's Gambit Accepted: Classical Defense, Alekhine System (Except Main Line)",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-oa6qe2b5bb3bb7':
    "Queen's Gambit Accepted: Classical Defense, Alekhine System, Main Line",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-oa6qe2b5bb3bb7rd1nbd7nc3bd6':
    "Queen's Gambit Accepted: Classical Defense, Alekhine System, Smyslov Variation",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-oa6':
    "Queen's Gambit Accepted: Classical Defense, Main Line",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-o':
    "Queen's Gambit Accepted: Classical Defense, Normal Line",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-oa6a4':
    "Queen's Gambit Accepted: Classical Defense, Rubinstein Variation",
  'd4d5c4dxc4e3nf6bxc4e6nf3c5o-oa6e4':
    "Queen's Gambit Accepted: Classical Defense, Russian Gambit",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-onc6':
    "Queen's Gambit Accepted: Classical Defense, Steinitz Variation, Development Variation",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-ocxd4':
    "Queen's Gambit Accepted: Classical Defense, Steinitz Variation, Exchange Variation",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-oa6qe2b5bb3nc6rd1c4bc2nb4nc3nxc2qxc2bb7d5qc7':
    "Queen's Gambit Accepted: Classical, Flohr Variation",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5qe2a6dxc5bxc5o-onc6e4b5e5':
    "Queen's Gambit Accepted: Classical, Furman Variation",
  'd4d5c4dxc4nf3nf6e3e6bxc4c5o-oa6dxc5bxc5':
    "Queen's Gambit Accepted: Furman Variation",
  d4d5c4dxc4nf3nd7: "Queen's Gambit Accepted: Godes Variation",
  d4d5c4dxc4nf3c5: "Queen's Gambit Accepted: Gunsberg Defense",
  d4d5c4dxc4nf3nf6nc3c5d5e6e4exd5e5:
    "Queen's Gambit Accepted: Gunsberg Defense, Prianishenmo Gambit",
  d4d5c4dxc4nf3nf6e3bg4: "Queen's Gambit Accepted: Janowski-Larsen Variation",
  d4d5c4dxc4e4c5d5nf6nc3b5: "Queen's Gambit Accepted: Linares Variation",
  'd4d5c4dxc4nf3nf6qa4+': "Queen's Gambit Accepted: Mannheim Variation",
  d4d5c4dxc4nf3: "Queen's Gambit Accepted: Normal Variation",
  d4d5c4dxc4nf3nf6e3:
    "Queen's Gambit Accepted: Normal Variation, 3. Nf3 Nf6 4. e3",
  d4d5c4dxc4nf3nf6e3e6:
    "Queen's Gambit Accepted: Normal Variation, Traditional System",
  d4d5c4dxc4e3: "Queen's Gambit Accepted: Old Variation",
  d4d5c4dxc4e3e5bxc4exd4qb3qe7a3:
    "Queen's Gambit Accepted: Old Variation, Billinger Gambit",
  d4d5c4dxc4e3e5bxc4exd4qb3qe7nf3:
    "Queen's Gambit Accepted: Old Variation, Christensen Gambit",
  d4d5c4dxc4e3e5bxc4exd4qb3qe7kf1:
    "Queen's Gambit Accepted: Old Variation, Korchnoi Gambit",
  d4d5c4dxc4e3e5bxc4exd4qb3qe7nd2:
    "Queen's Gambit Accepted: Old Variation, Novikov Gambit",
  d4d5nf3e6c4dxc4: "Queen's Gambit Accepted: Rosenthal Variation",
  d4d5c4dxc4e4: "Queen's Gambit Accepted: Saduleto Variation",
  d4d5c4dxc4e4f5: "Queen's Gambit Accepted: Schwartz Defense",
  d4d5c4dxc4nf3nf6nc3: "Queen's Gambit Accepted: Showalter Variation",
  d4d5c4dxc4nf3b5: "Queen's Gambit Accepted: Slav Gambit",
  d4d5c4dxc4nf3nf6e3g6: "Queen's Gambit Accepted: Smyslov Variation",
  d4d5c4dxc4nf3nf6e3be6: "Queen's Gambit Accepted: Winawer Defense",
  d4d5c4e6: "Queen's Gambit Declined",
  d4d5c4c6nf3nf6nc3e6bg5nbd7e3: "Queen's Gambit Declined, 5. Bg5 Nbd7 6. e3",
  d4d5c4e6nc3nf6bg5be7: "Queen's Gambit Declined: 4. Bg5 Be7",
  'd4d5c4e6nc3nf6bg5be7e3o-o': "Queen's Gambit Declined: 4. Bg5 Be7, 5. e3 O-O",
  d4e6c4b6nc3d5: "Queen's Gambit Declined: Alapin Variation",
  d4d5c4e5dxe5d4nf3nc6nbd2qe7:
    "Queen's Gambit Declined: Albin Countergambit, Balogh Variation",
  d4d5c4e5dxe5d4nf3nc6nbd2f6:
    "Queen's Gambit Declined: Albin Countergambit, Janowski Variation",
  'd4d5c4e5dxe5d4nf3nc6nbd2bg4h3bxf3nxf3bb4+bd2qe7':
    "Queen's Gambit Declined: Albin Countergambit, Krenosz Variation",
  c4e6nc3d5d4nf6bg5nbd7nf3c6e4: "Queen's Gambit Declined: Alekhine Variation",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3h6bxf6':
    "Queen's Gambit Declined: Anti-Tartakower Variation",
  'd4nf6c4e6nf3d5nc3be7bg5h6bxf6bxf6e3o-orc1c6bd3nd7o-odxc4bxc4':
    "Queen's Gambit Declined: Anti-Tartakower Variation, Petrosian Variation",
  d4nf6c4e6nf3d5nc3nbd7: "Queen's Gambit Declined: Barmen Variation",
  d4d5c4e6nc3nf6bg5c5: "Queen's Gambit Declined: Been-Koomen Variation",
  d4d5c4c6nf3nf6nc3e6bg5nbd7e3qa5cxd5:
    "Queen's Gambit Declined: Cambridge Springs Defense: 7. cxd5",
  'd4d5c4e6nc3nf6bg5nbd7e3c6nf3qa5nd2bb4qc2o-obh4':
    "Queen's Gambit Declined: Cambridge Springs Defense: Argentine Variation",
  d4d5c4c6nf3nf6nc3e6bg5nbd7e3qa5nd2bb4qc2:
    "Queen's Gambit Declined: Cambridge Springs Defense: Bogoljubov Variation",
  d4d5c4e6nc3nf6bg5nbd7e3c6nf3qa5bxf6:
    "Queen's Gambit Declined: Cambridge Springs Defense: Capablanca Variation",
  d4d5c4c6nf3nf6nc3e6bg5nbd7e3qa5nd2dxc4:
    "Queen's Gambit Declined: Cambridge Springs Defense: Rubinstein Variation",
  d4d5c4c6nf3nf6nc3e6bg5nbd7e3qa5cxd5nxd5:
    "Queen's Gambit Declined: Cambridge Springs Defense: Yugoslav Variation",
  d4d5c4c6nf3nf6nc3e6bg5nbd7e3qa5:
    "Queen's Gambit Declined: Cambridge Springs Variation",
  d4nf6c4e6nf3d5bg5h6: "Queen's Gambit Declined: Capablanca",
  d4nf6nf3e6c4d5bg5c6nbd2nbd7e3:
    "Queen's Gambit Declined: Capablanca Variation",
  d4d5c4e6nc3nf6bg5nbd7e3c6a3:
    "Queen's Gambit Declined: Capablanca, Anti-Cambridge Springs Variation",
  d4d5c4e6nc3be7: "Queen's Gambit Declined: Charousek (Petrosian) Variation",
  d4d5c4e6nc3be7e4dxe4f3:
    "Queen's Gambit Declined: Charousek (Petrosian) Variation, Miladinovic Gambit",
  d4nf6c4e6nc3d5cxd5: "Queen's Gambit Declined: Exchange Variation",
  d4nf6c4e6nc3d5cxd5exd5bg5:
    "Queen's Gambit Declined: Exchange Variation, Positional Variation",
  d4nf6c4e6nc3d5cxd5exd5bg5c6:
    "Queen's Gambit Declined: Exchange Variation, Positional Variation, 4. cxd5 exd5 5. Bg5 c6",
  d4nf6c4e6nc3d5cxd5exd5bg5c6qc2:
    "Queen's Gambit Declined: Exchange Variation, Reshevsky Variation",
  d4nf6c4e6nf3d5nc3nbd7cxd5exd5bf4:
    "Queen's Gambit Declined: Exchange Variation, Saemisch Variation",
  'd4nf6c4e6nc3d5cxd5exd5bg5be7e3o-obd3nbd7qc2re8nge2nf8o-o-o':
    "Queen's Gambit Declined: Exchange, Chameleon Variation",
  d4d5c4e6nc3nf6bf4: "Queen's Gambit Declined: Harrwitz Attack",
  d4nf6c4e6nf3d5nc3be7bf4:
    "Queen's Gambit Declined: Harrwitz Attack, 4. Nc3 Be7 5. Bf4",
  'd4nf6c4e6nf3d5nc3be7bf4o-oe3c5dxc5bxc5qc2nc6rd1qa5a3':
    "Queen's Gambit Declined: Harrwitz Attack, 9. Rd1 Qa5 10. a3",
  'd4nf6c4e6nf3d5nc3be7bf4o-oe3c5dxc5bxc5qc2nc6a3qa5o-o-o':
    "Queen's Gambit Declined: Harrwitz Attack, 9. a3 Qa5 10. O-O-O",
  'd4d5c4e6nc3be7nf3nf6bf4o-oe3b6':
    "Queen's Gambit Declined: Harrwitz Attack, Fianchetto Defense",
  'd4nf6c4e6nf3d5nc3be7bf4o-oe3c5dxc5bxc5':
    "Queen's Gambit Declined: Harrwitz Attack, Main Line",
  'd4d5c4e6nc3nf6nf3be7bf4o-oe3c6':
    "Queen's Gambit Declined: Harrwitz Attack, Orthodox Defense",
  'd4nf6c4e6nf3d5nc3be7bf4o-oe3nbd7':
    "Queen's Gambit Declined: Harrwitz Attack, Two Knights Defense",
  'd4nf6c4e6nc3d5nf3be7bf4o-oe3nbd7c5':
    "Queen's Gambit Declined: Harrwitz Attack, Two Knights Defense, Blockade Line",
  d4d5c4c6nf3nf6nc3e6bg5h6bxf6qxf6qb3:
    "Queen's Gambit Declined: Hastings Variation",
  d4d5c4e6nc3a6: "Queen's Gambit Declined: Janowski Variation",
  d4nf6c4e6nf3d5nc3nbd7bg5h6bh4dxc4:
    "Queen's Gambit Declined: Knight Defense, Alekhine Gambit",
  d4nf6c4e6nc3d5bg5be7e3ne4: "Queen's Gambit Declined: Lasker Defense",
  'd4d5c4e6nc3be7nf3nf6bg5h6bh4o-oe3ne4':
    "Queen's Gambit Declined: Lasker Defense, 6. Bh4 O-O 7. e3 Ne4",
  'd4nf6c4e6nc3d5bg5be7e3h6bh4o-onf3ne4bxe7qxe7cxd5nxc3bxc3exd5qb3qd6':
    "Queen's Gambit Declined: Lasker Defense, Bernstein Variation",
  'd4d5c4e6nc3nf6bg5be7e3o-onf3h6bh4ne4bxe7qxe7cxd5nxc3bxc3exd5qb3rd8c4be6':
    "Queen's Gambit Declined: Lasker Defense, Bernstein Variation, Mar del Plata Gambit",
  'd4d5c4e6nc3be7nf3nf6bg5h6bh4o-oe3ne4bxe7qxe7cxd5nxc3bxc3':
    "Queen's Gambit Declined: Lasker Defense, Main Line",
  'd4nf6c4e6nf3d5nc3be7bg5h6bh4o-oe3ne4bxe7qxe7qc2':
    "Queen's Gambit Declined: Lasker Defense, Teichmann Variation",
  'd4d5c4e6nc3nf6bg5be7e3o-onf3h6bh4ne4bxe7qxe7qc2nf6bd3dxc4bxc4c5o-onc6rfd1bd7':
    "Queen's Gambit Declined: Lasker Defense: Russian Variation",
  d4d5c4e6nc3nf6bg5nbd7e3bb4: "Queen's Gambit Declined: Manhattan Variation",
  'd4nf6c4e6nf3d5nc3be7bg5o-oqc2': "Queen's Gambit Declined: Miles Variation",
  d4d5c4e6nc3nf6bg5: "Queen's Gambit Declined: Modern Variation",
  d4d5c4e6nc3nf6bg5be7bxf6:
    "Queen's Gambit Declined: Modern Variation, Heral Variation",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3':
    "Queen's Gambit Declined: Modern Variation, Normal Line",
  d4d5c4e6nc3nf6bg5nbd7: "Queen's Gambit Declined: Modern, Knight Defense",
  d4d5c4e6nc3nf6bg5nbd7e3:
    "Queen's Gambit Declined: Modern, Knight Defense, 4. Bg5 Nbd7 5. e3",
  d4d5c4e6nc3nf6bg5nbd7e3c6:
    "Queen's Gambit Declined: Modern, Knight Defense, 4. Bg5 Nbd7 5. e3 c6",
  'd4nf6c4e6nc3d5bg5be7e3o-orc1':
    "Queen's Gambit Declined: Neo-Orthodox Variation",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3h6':
    "Queen's Gambit Declined: Neo-Orthodox Variation, 5. Bg5 O-O 6. e3 h6",
  'd4nf6c4e6nf3d5nc3be7bg5h6bh4o-oe3':
    "Queen's Gambit Declined: Neo-Orthodox Variation, Main Line",
  d4d5c4e6nc3nf6: "Queen's Gambit Declined: Normal Defense",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7':
    "Queen's Gambit Declined: Orthodox Defense",
  'd4d5c4e6nc3nf6bg5be7e3o-onf3nbd7rc1c6bd3dxc4bxc4nd5bxe7qxe7ne4':
    "Queen's Gambit Declined: Orthodox Defense, Alekhine Variation",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7bd3':
    "Queen's Gambit Declined: Orthodox Defense, Botvinnik Variation",
  'd4d5c4e6nc3nf6bg5be7e3o-onf3nbd7rc1c6bd3dxc4bxc4nd5':
    "Queen's Gambit Declined: Orthodox Defense, Capablanca System",
  'nf3d5d4nf6c4e6nc3be7bg5o-oe3nbd7rc1b6cxd5exd5bb5':
    "Queen's Gambit Declined: Orthodox Defense, Capablanca Variation",
  'd4d5c4e6nc3nf6bg5be7e3o-onf3nbd7rc1c6bd3dxc4bxc4nd5bxe7qxe7o-onxc3rxc3e5':
    "Queen's Gambit Declined: Orthodox Defense, Classical Variation",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7rc1c6bd3dxc4bxc4nd5bxe7qxe7o-onxc3rxc3e5qc2':
    "Queen's Gambit Declined: Orthodox Defense, Classical Variation, 12. Rxc3 e5 13. Qc2",
  'd4d5c4e6nf3nf6nc3be7bg5o-oe3nbd7rc1c6bd3dxc4bxc4nd5bxe7qxe7o-onxc3rxc3e5qb1':
    "Queen's Gambit Declined: Orthodox Defense, Classical Variation, 12. Rxc3 e5 13. Qb1",
  'd4d5c4e6nc3nf6bg5be7e3o-onf3nbd7rc1c6bd3dxc4bxc4nd5bxe7qxe7o-onxc3rxc3e5dxe5nxe5nxe5qxe5':
    "Queen's Gambit Declined: Orthodox Defense, Classical Variation, 13. dxe5 Nxe5 14. Nxe5 Qxe5",
  'd4d5c4e6nc3nf6bg5c6nf3be7e3nbd7rc1o-obd3dxc4bxc4b5':
    "Queen's Gambit Declined: Orthodox Defense, Fianchetto Variation",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7rc1a6':
    "Queen's Gambit Declined: Orthodox Defense, Henneberger Variation",
  'd4d5nf3nf6c4e6nc3be7bg5o-oe3nbd7rc1c6bd3dxc4bxc4nd5h4':
    "Queen's Gambit Declined: Orthodox Defense, Janowski Variation",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7rc1':
    "Queen's Gambit Declined: Orthodox Defense, Main Line",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7rc1c6':
    "Queen's Gambit Declined: Orthodox Defense, Main Line, 6. e3 Nbd7 7. Rc1 c6",
  'd4d5c4e6nc3nf6bg5be7e3o-onf3nbd7rc1c6bd3dxc4bxc4nd5bxe7qxe7o-o':
    "Queen's Gambit Declined: Orthodox Defense, Main Line, 10. Bxe7 Qxe7 11. O-O",
  'd4nf6c4e6nc3d5bg5be7e3o-onf3nbd7rc1b6cxd5exd5bd3':
    "Queen's Gambit Declined: Orthodox Defense, Pillsbury Variation",
  'd4d5nf3nf6c4e6nc3be7bg5o-oe3nbd7qb3':
    "Queen's Gambit Declined: Orthodox Defense, Rauzer Variation",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7rc1c6qc2a6':
    "Queen's Gambit Declined: Orthodox Defense, Rubinstein Attack",
  'nf3d5d4nf6c4e6nc3be7bg5o-oe3nbd7rc1c6qc2ne4':
    "Queen's Gambit Declined: Orthodox Defense, Rubinstein Attack, 7. Rc1 c6 8. Qc2 Ne4",
  'd4nf6c4e6nc3d5nf3be7bg5o-oe3nbd7rc1c6a3a6qc2':
    "Queen's Gambit Declined: Orthodox Defense, Rubinstein Attack, 8. a3 a6 9. Qc2",
  'd4d5nf3nf6c4e6nc3be7bg5o-oe3nbd7rc1c6qc2a6cxd5':
    "Queen's Gambit Declined: Orthodox Defense, Rubinstein Attack, 8. Qc2 a6 9. cxd5",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7qc2':
    "Queen's Gambit Declined: Orthodox Defense, Rubinstein Variation",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7qc2c5cxd5':
    "Queen's Gambit Declined: Orthodox Defense, Rubinstein Variation, Flohr Line",
  'd4d5c4e6nc3nf6bg5be7e3o-onf3nbd7rc1c6bd3':
    "Queen's Gambit Declined: Orthodox Defense: Bd3 Line",
  'd4d5c4e6nc3nf6bg5be7e3o-onf3nbd7rc1c6bd3dxc4bxc4nd5bxe7qxe7':
    "Queen's Gambit Declined: Orthodox Defense: Bd3 Line, 9. Bxc4 Nd5 10. Bxe7 Qxe7",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7rc1c6qc2':
    "Queen's Gambit Declined: Orthodox Defense: Rubinstein Attack, with Rc1",
  'd4nf6c4e6nf3d5nc3be7bg5o-oe3nbd7rc1a6cxd5':
    "Queen's Gambit Declined: Orthodox Defense: Swiss, Karlsbad Variation",
  'd4nf6c4e6nf3b6nc3d5cxd5exd5bg5be7e3o-obd3bb7ne5':
    "Queen's Gambit Declined: Pillsbury Attack",
  d4d5c4e6nc3nf6bg5c5cxd5: "Queen's Gambit Declined: Pseudo-Tarrasch Variation",
  d4d5c4e6nc3nf6bg5c5cxd5qb6:
    "Queen's Gambit Declined: Pseudo-Tarrasch Variation, Canal Variation",
  d4d5c4e6nc3nf6bg5c5nf3cxd4qxd4:
    "Queen's Gambit Declined: Pseudo-Tarrasch Variation, Primitive Pillsbury Variation",
  d4d5c4e6nc3: "Queen's Gambit Declined: Queen's Knight Variation",
  d4nf6c4e6nf3d5nc3bb4: "Queen's Gambit Declined: Ragozin Defense",
  'd4nf6c4e6nf3d5nc3bb4qa4+':
    "Queen's Gambit Declined: Ragozin Defense, Alekhine Variation",
  d4nf6c4e6nf3d5nc3bb4bg5dxc4:
    "Queen's Gambit Declined: Ragozin Defense, Vienna Variation",
  d4d5c4e6nc3nf6bg5nbd7nf3c6rc1qa5bd2:
    "Queen's Gambit Declined: Rochlin Variation",
  d4d5c4e6nc3c6nf3dxc4a4bb4e3b5bd2a5:
    "Queen's Gambit Declined: Semi-Slav, Abrahams Variation",
  d4d5c4e6nf3c6nc3dxc4a4bb4e3b5bd2qb6:
    "Queen's Gambit Declined: Semi-Slav, Junge Variation",
  d4d5c4e6nc3c6nf3dxc4e3b5a4bb4bd2qe7:
    "Queen's Gambit Declined: Semi-Slav, Koomen Variation",
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4b5bd3a6e4c5:
    "Queen's Gambit Declined: Semi-Slav, Meran",
  d4nf6c4e6nf3d5nc3c5: "Queen's Gambit Declined: Semi-Tarrasch Defense",
  d4nf6c4e6nf3d5nc3c5cxd5nxd5e4:
    "Queen's Gambit Declined: Semi-Tarrasch Defense, Exchange Variation",
  d4nf6c4e6nf3d5nc3c5cxd5nxd5e3nc6bd3:
    "Queen's Gambit Declined: Semi-Tarrasch Defense, Main Line",
  d4d5c4e6nc3nf6nf3c5bg5:
    "Queen's Gambit Declined: Semi-Tarrasch Defense, Pillsbury Variation",
  d4nf6c4e6nf3d5nc3c5cxd5nxd5e3:
    "Queen's Gambit Declined: Semi-Tarrasch Defense, Pillsbury Variation, 5. cxd5 Nxd5 6. e3",
  'c4nf6nc3e6nf3d5e3c5d4nc6bd3bd6o-oo-o':
    "Queen's Gambit Declined: Semi-Tarrasch Defense, Symmetrical Variation",
  d4nf6c4e6nf3d5nc3c5cxd5: "Queen's Gambit Declined: Semi-Tarrasch, 5. cxd5",
  'd4d5c4e6nc3nf6nf3c5cxd5nxd5e4nxc3bxc3cxd4cxd4bb4+bd2bxd2+qxd2o-obb5':
    "Queen's Gambit Declined: Semi-Tarrasch, Kmoch Variation",
  d4d5c4e6nc3nf6bg5c5nf3cxd4nxd4e5ndb5a6qa4:
    "Queen's Gambit Declined: Semi-Tarrasch, Krause Variation",
  'd4d5c4e6nc3nf6nf3c5e3nc6bd3bd6o-oo-oqe2qe7dxc5bxc5e4':
    "Queen's Gambit Declined: Semi-Tarrasch, Levenfish Variation",
  'd4d5c4e6nc3nf6cxd5nxd5e4nxc3bxc3c5nf3cxd4cxd4bb4+bd2qa5':
    "Queen's Gambit Declined: Semi-Tarrasch, San Sebastian Variation",
  d4d5c4c6nf3nf6e3e6nbd2nbd7bd3c5:
    "Queen's Gambit Declined: Semmering Variation",
  d4d5nf3nf6e3bf5c4c6cxd5cxd5nc3e6ne5nfd7:
    "Queen's Gambit Declined: Slav, Amsterdam Variation",
  'd4d5c4c6nf3nf6nc3dxc4a4bf5e3e6bxc4bb4o-o':
    "Queen's Gambit Declined: Slav, Dutch Variation",
  'd4d5c4c6nf3nf6nc3dxc4a4bf5e3e6bxc4bb4o-oo-oqe2ne4g4':
    "Queen's Gambit Declined: Slav, Dutch, Saemisch Variation",
  d4d5c4c6nf3nf6e3bf5cxd5cxd5qb3qc8bd2e6na3:
    "Queen's Gambit Declined: Slav, Landau Variation",
  d4d5c4c6nf3nf6nc3dxc4a4na6e4bg4:
    "Queen's Gambit Declined: Slav, Smyslov Variation",
  d4d5c4e6nf3nf6e3c6nbd2g6: "Queen's Gambit Declined: Spielmann Variation",
  d4d5c4c6nf3nf6e3e6nbd2ne4bd3f5:
    "Queen's Gambit Declined: Stonewall Variation",
  d4d5c4e6nf3c5: "Queen's Gambit Declined: Tarrasch Defense, Pseudo-Tarrasch",
  d4d5c4e6nf3c5cxd5exd5bg5:
    "Queen's Gambit Declined: Tarrasch Defense, Pseudo-Tarrasch Bishop Attack",
  d4d5c4e6nc3c5cxd5exd5:
    "Queen's Gambit Declined: Tarrasch Defense: 4. cxd5 exd5",
  'd4d5c4e6nf3c5cxd5exd5g3nc6bg2nf6o-obe7nc3o-obg5be6rc1b6':
    "Queen's Gambit Declined: Tarrasch, Stoltz Variation",
  'd4nf6c4e6nf3d5nc3be7bg5h6bh4o-oe3b6':
    "Queen's Gambit Declined: Tartakower Defense",
  'd4d5c4e6nc3be7nf3nf6bg5h6bh4o-oe3b6cxd5nxd5':
    "Queen's Gambit Declined: Tartakower Defense, Makogonov Exchange Variation",
  'd4d5c4e6nc3be7nf3nf6bg5h6bh4o-oe3b6cxd5nxd5bxe7qxe7nxd5exd5rc1be6':
    "Queen's Gambit Declined: Tartakower Variation",
  'd4d5c4e6nc3be7nf3nf6bg5h6bh4o-oe3b6cxd5exd5':
    "Queen's Gambit Declined: Tartakower Variation, Exchange Variation",
  d4nf6c4e6nf3d5nc3: "Queen's Gambit Declined: Three Knights Variation",
  d4nf6c4e6nf3d5bg5: "Queen's Gambit Declined: Traditional Variation",
  'd4d5c4e6nc3be7nf3nf6bg5h6bh4o-orc1dxc4':
    "Queen's Gambit Declined: Uhlmann Variation",
  d4nf6c4e6nf3d5nc3dxc4: "Queen's Gambit Declined: Vienna Variation",
  'd4nf6c4e6nf3d5bg5bb4+':
    "Queen's Gambit Declined: Vienna Variation, 3. Nf3 d5 4. Bg5 Bb4+",
  d4nf6c4e6nf3d5nc3dxc4e3:
    "Queen's Gambit Declined: Vienna Variation, Quiet Variation",
  d4nf6c4e6nf3d5nc3bb4bg5nbd7e3c5:
    "Queen's Gambit Declined: Westphalian Variation",
  d4d5c4e5: "Queen's Gambit Refused: Albin Countergambit",
  d4d5c4e5dxe5d4nf3nc6g3:
    "Queen's Gambit Refused: Albin Countergambit, Fianchetto Variation",
  d4d5c4e5dxe5d4nf3nc6g3be6:
    "Queen's Gambit Refused: Albin Countergambit, Fianchetto Variation, Be6 Line",
  d4d5c4e5dxe5d4nf3nc6g3bf5:
    "Queen's Gambit Refused: Albin Countergambit, Fianchetto Variation, Bf5 Line",
  d4d5c4e5dxe5d4nf3nc6g3bg4:
    "Queen's Gambit Refused: Albin Countergambit, Fianchetto Variation, Bg4 Line",
  'd4d5c4e5dxe5d4e3bb4+bd2dxe3':
    "Queen's Gambit Refused: Albin Countergambit, Lasker Trap",
  d4d5c4e5dxe5d4nf3nc6nbd2:
    "Queen's Gambit Refused: Albin Countergambit, Modern Line",
  d4d5c4e5dxe5d4nf3: "Queen's Gambit Refused: Albin Countergambit, Normal Line",
  d4d5c4e5dxe5d4nf3c5:
    "Queen's Gambit Refused: Albin Countergambit, Tartakower Defense",
  d4d5c4c5dxc5d4:
    "Queen's Gambit Refused: Austrian Attack, Salvio Countergambit",
  d4d5c4c5: "Queen's Gambit Refused: Austrian Defense",
  d4d5c4c5cxd5nf6:
    "Queen's Gambit Refused: Austrian Defense, Gusev Countergambit",
  'd4d5c4c5cxd5nf6e4nxe4dxc5qa5+':
    "Queen's Gambit Refused: Austrian Defense, Haberditz Variation",
  d4d5c4bf5: "Queen's Gambit Refused: Baltic Defense",
  'd4d5c4bf5cxd5bxb1qa4+c6dxc6nxc6':
    "Queen's Gambit Refused: Baltic Defense, Argentinian Gambit",
  d4d5c4bf5nc3e6nf3nc6:
    "Queen's Gambit Refused: Baltic Defense, Pseudo-Chigorin",
  d4d5nf3bf5c4e6nc3c6: "Queen's Gambit Refused: Baltic Defense, Pseudo-Slav",
  d4d5c4bf5qb3: "Queen's Gambit Refused: Baltic Defense, Queen Attack",
  d4d5c4bf5nc3e6qb3:
    "Queen's Gambit Refused: Baltic Defense, Queen Attack Deferred",
  d4d5c4nc6: "Queen's Gambit Refused: Chigorin Defense",
  d4d5c4nc6nc3: "Queen's Gambit Refused: Chigorin Defense, 2. c4 Nc6 3. Nc3",
  d4d5c4nc6nc3dxc4:
    "Queen's Gambit Refused: Chigorin Defense, 2. c4 Nc6 3. Nc3 dxc4",
  d4d5c4nc6cxd5qxd5:
    "Queen's Gambit Refused: Chigorin Defense, Exchange Variation",
  d4d5c4nc6cxd5qxd5e3e5nc3bb4bd2bxc3bxc3exd4ne2:
    "Queen's Gambit Refused: Chigorin Defense, Exchange Variation, Costa's Line",
  d4d5c4nc6nc3dxc4nf3:
    "Queen's Gambit Refused: Chigorin Defense, Janowski Variation",
  d4d5c4nc6nf3e5: "Queen's Gambit Refused: Chigorin Defense, Lazard Gambit",
  d4d5c4nc6nf3bg4: "Queen's Gambit Refused: Chigorin Defense, Main Line",
  d4d5c4nc6nf3bg4qa4:
    "Queen's Gambit Refused: Chigorin Defense, Main Line, Alekhine Variation",
  d4d5c4nc6nc3dxc4nf3nf6:
    "Queen's Gambit Refused: Chigorin Defense, Modern Gambit",
  d4d5c4nc6nc3e5: "Queen's Gambit Refused: Chigorin Defense, Tartakower Gambit",
  d4d5c4nf6: "Queen's Gambit Refused: Marshall Defense",
  d4d5c4nf6cxd5c6: "Queen's Gambit Refused: Marshall Defense, Tan Gambit",
  d4d5c4b5: "Queen's Gambit Refused: Zilbermints Gambit",
  d4nf6c4b6: "Queen's Indian Accelerated",
  d4nf6nf3b6: "Queen's Indian Defense",
  d4nf6c4e6nf3b6: "Queen's Indian Defense, 2. c4 e6 3. Nf3 b6",
  d4nf6c4e6nf3b6g3bb7bg2be7nc3:
    "Queen's Indian Defense: Anti-Queen's Indian System",
  'd4nf6c4e6nf3b6g3bb7bg2bb4+': "Queen's Indian Defense: Capablanca Variation",
  'd4nf6c4e6nf3b6g3bb7bg2be7o-o': "Queen's Indian Defense: Classical Variation",
  'd4nf6c4e6nf3b6g3bb7bg2be7o-oo-od5exd5nh4':
    "Queen's Indian Defense: Classical Variation, Polugaevsky Gambit",
  'd4nf6c4e6nf3b6g3bb7bg2be7o-oo-od5exd5nd4':
    "Queen's Indian Defense: Classical Variation, Taimanov Gambit",
  'nf3nf6c4e6g3b6bg2bb7o-obe7nc3o-od4na6':
    "Queen's Indian Defense: Classical Variation, Tiviakov Defense",
  'd4nf6c4e6nf3b6g3bb7bg2be7o-oo-onc3':
    "Queen's Indian Defense: Classical Variation, Traditional Variation",
  'd4nf6c4e6nf3b6g3bb7bg2be7o-oo-onc3ne4qc2nxc3qxc3':
    "Queen's Indian Defense: Classical Variation, Traditional Variation, Main Line",
  'd4nf6c4e6nf3b6g3bb7bg2be7o-oo-onc3d5':
    "Queen's Indian Defense: Classical Variation, Traditional Variation, Nimzowitsch Line",
  'd4nf6c4e6nf3b6g3bb7bg2be7o-oo-ob3': "Queen's Indian Defense: Euwe Variation",
  d4nf6c4e6nf3b6g3bb7: "Queen's Indian Defense: Fianchetto Traditional",
  d4nf6c4e6nf3b6g3: "Queen's Indian Defense: Fianchetto Variation",
  'd4nf6c4e6nf3b6g3ba6b3bb4+':
    "Queen's Indian Defense: Fianchetto Variation, Check Variation",
  'd4nf6c4e6nf3b6g3ba6b3bb4+bd2be7':
    "Queen's Indian Defense: Fianchetto Variation, Check Variation, Intermezzo Line",
  'd4nf6c4e6nf3b6g3ba6b3bb4+bd2qe7':
    "Queen's Indian Defense: Fianchetto Variation, Check Variation, Modern Line",
  'd4nf6c4e6nf3b6g3bb7bg2be7o-oo-ore1':
    "Queen's Indian Defense: Fianchetto Variation, Kramnik Variation",
  d4nf6c4e6nf3b6g3ba6:
    "Queen's Indian Defense: Fianchetto Variation, Nimzowitsch Variation",
  d4nf6c4e6nf3b6g3ba6qa4:
    "Queen's Indian Defense: Fianchetto Variation, Nimzowitsch Variation, Nimzowitsch Attack",
  d4nf6c4e6nf3b6g3ba6b3:
    "Queen's Indian Defense: Fianchetto Variation, Nimzowitsch Variation, Quiet Line",
  d4nf6c4e6nf3b6g3ba6qb3:
    "Queen's Indian Defense: Fianchetto Variation, Nimzowitsch Variation, Timman's Line",
  d4nf6c4e6nf3b6g3bb7bg2c5d5exd5nh4:
    "Queen's Indian Defense: Fianchetto Variation, Rubinstein Variation",
  d4nf6c4e6nf3b6g3bb7bg2c5:
    "Queen's Indian Defense: Fianchetto Variation, Saemisch Variation",
  d4nf6c4e6nf3b6nc3: "Queen's Indian Defense: Kasparov Variation",
  d4nf6c4e6nf3b6nc3bb4bg5h6bh4bb7:
    "Queen's Indian Defense: Kasparov Variation, 5. Bg5 h6 6. Bh4 Bb7",
  d4nf6c4e6nf3b6nc3bb7bg5h6bh4g5bg3nh5:
    "Queen's Indian Defense: Kasparov Variation, Botvinnik Attack",
  d4nf6c4e6nf3b6a3bb7nc3:
    "Queen's Indian Defense: Kasparov-Petrosian Variation",
  d4nf6c4e6nf3b6a3bb7nc3ne4:
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Andersson Variation",
  d4nf6c4e6nf3b6a3bb7nc3d5cxd5exd5:
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Classical Variation",
  d4nf6c4e6nf3b6a3bb7nc3g6:
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Hedgehog Variation",
  d4nf6c4e6nf3b6a3bb7nc3d5cxd5nxd5qc2:
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Kasparov Attack",
  d4nf6c4e6nf3b6a3bb7nc3d5:
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Main Line",
  d4nf6c4e6nf3b6a3bb7nc3be7:
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Marco Defense",
  d4nf6c4e6nf3b6a3bb7nc3d5cxd5nxd5:
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Modern Variation",
  d4nf6c4e6nf3b6a3bb7nc3d5cxd5nxd5e3:
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Petrosian Attack",
  d4nf6c4e6nf3b6nc3bb7a3d5cxd5nxd5e4:
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Polovodin Gambit",
  'd4nf6c4e6nf3b6a3bb7nc3d5cxd5nxd5qa4+':
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Rashkovsky Attack",
  d4nf6c4e6nf3b6a3bb7nc3d5cxd5nxd5bd2:
    "Queen's Indian Defense: Kasparov-Petrosian Variation, Romanishin Attack",
  d4nf6nf3b6g3bb7bg2c5c4cxd4qxd4:
    "Queen's Indian Defense: Marienbad System, Berg Variation",
  d4nf6c4e6nf3b6bf4: "Queen's Indian Defense: Miles Variation",
  d4nf6c4e6nf3b6g3bb7bg2be7nc3ne4bd2:
    "Queen's Indian Defense: Opocensky Variation",
  d4nf6c4e6nf3b6a3: "Queen's Indian Defense: Petrosian Variation",
  d4nf6c4e6nf3b6a3ba6qc2bb7:
    "Queen's Indian Defense: Petrosian Variation, Farago Defense",
  'd4nf6c4e6nf3b6g3bb7bg2bb4+bd2be7':
    "Queen's Indian Defense: Riumin Variation",
  d4nf6c4e6nf3b6e3: "Queen's Indian Defense: Spassky System",
  d4nf6c4e6nf3b6g3bb7bg2be7: "Queen's Indian Defense: Traditional Variation",
  'd4nf6c4e6nf3bb4+bd2a5g3b6bg2bb7': "Queen's Indian Defense: Yates Variation",
  'nf3c5b3nf6bb2e6e3be7d4o-obd3b6o-obb7c4cxd4nxd4':
    "Queen's Indian, Averbakh Variation",
  nf3nf6c4b6d4e6g3bb7bg2c5d5exd5ng5: "Queen's Indian, Buerger Variation",
  d4: "Queen's Pawn",
  d4d6: "Queen's Pawn, 1... d6",
  d4d5: "Queen's Pawn Game",
  d4d5e3: "Queen's Pawn Game, 2. e3",
  d4d5e3nf6: "Queen's Pawn Game, 2. e3 Nf6",
  d4d5nf3c5e3nf6nbd2e6b3: "Queen's Pawn Game, Zukertort Variation",
  d4c6c4d6: "Queen's Pawn Game: Anglo-Slav Opening",
  nf3d5d4bg4: "Queen's Pawn Game: Anti-Torre",
  'd4nf6nf3g6nc3d5bf4bg7e3o-obe2':
    "Queen's Pawn Game: Barry Attack, Gruenfeld Variation",
  d4d5nf3c5g3cxd4bg2: "Queen's Pawn Game: Chandler Gambit",
  d4d5nc3: "Queen's Pawn Game: Chigorin Variation",
  d4d5nf3nc6: "Queen's Pawn Game: Chigorin Variation, 2. Nf3 Nc6",
  d4nf6nc3d5: "Queen's Pawn Game: Chigorin Variation, 2. Nc3 d5",
  d4d5nf3nf6e3: "Queen's Pawn Game: Colle System",
  d4d5nf3nf6e3bf5: "Queen's Pawn Game: Colle System, Anti-Colle",
  d4d5nf3nf6e3g6bd3bg7: "Queen's Pawn Game: Colle System, Gruenfeld Formation",
  d4e5dxe5nc6nf3qe7qd5f6exf6nxf6: "Queen's Pawn Game: Englund Gambit",
  e4e6d4c5: "Queen's Pawn Game: Franco-Sicilian Defense",
  d4nf6nc3d5e4nxe4: "Queen's Pawn Game: Huebsch Gambit",
  d4d5nf3c5: "Queen's Pawn Game: Krause Variation",
  d4d5bg5: "Queen's Pawn Game: Levitsky Attack",
  d4d5nf3c6bg5h6bh4qb6:
    "Queen's Pawn Game: Levitsky Attack, Euwe Variation, Modern Line",
  d4d5bg5bg4: "Queen's Pawn Game: Levitsky Attack, Welling Variation",
  d4c5c4cxd4e3: "Queen's Pawn Game: Liedmann Gambit",
  d4d5nf3nf6bf4: "Queen's Pawn Game: London System",
  'd4g6nf3bg7bf4c5c3cxd4cxd4qa5+':
    "Queen's Pawn Game: London System, Pterodactyl Variation",
  d4d5bf4: "Queen's Pawn Game: Mason Attack",
  d4d5bf4c5e4: "Queen's Pawn Game: Morris Countergambit",
  d4d5bf4c5: "Queen's Pawn Game: Steinitz Countergambit",
  d4d5e3nf6bd3: "Queen's Pawn Game: Stonewall Attack",
  d4d5nf3nf6: "Queen's Pawn Game: Symmetrical Variation",
  d4d5nf3nf6g3: "Queen's Pawn Game: Symmetrical Variation, Pseudo-Catalan",
  d4d5nf3nf6bg5: "Queen's Pawn Game: Torre Attack",
  d4nf6nf3e6bg5d5e3c5c3qb6: "Queen's Pawn Game: Torre Attack, Breyer Variation",
  d4d5nf3nf6bg5ne4: "Queen's Pawn Game: Torre Attack, Gossip Variation",
  d4d5nf3nf6bg5g6: "Queen's Pawn Game: Torre Attack, Gruenfeld Variation",
  'd4nf6nf3g6bg5bg7nbd2d5e3o-o':
    "Queen's Pawn Game: Torre Attack, Gruenfeld Variation, Main Line",
  d4d5nc3bf5: "Queen's Pawn Game: Veresov Attack, Alburt Defense",
  d4d5nc3bg4: "Queen's Pawn Game: Veresov Attack, Anti-Veresov",
  d4nf6nc3d5bg5ne4: "Queen's Pawn Game: Veresov Attack, Boyce Defense",
  d4nf6nf3e6nc3d5bg5: "Queen's Pawn Game: Veresov Attack, Classical Defense",
  d4f5nc3d5: "Queen's Pawn Game: Veresov Attack, Dutch System",
  d4g6nf3bg7nc3d5: "Queen's Pawn Game: Veresov Attack, Fianchetto Defense",
  d4nf6nc3d5bg5bf5f3: "Queen's Pawn Game: Veresov Attack, Richter Variation",
  d4d5nc3e5: "Queen's Pawn Game: Veresov Attack, Shaviliuk Gambit",
  d4d5nc3h5: "Queen's Pawn Game: Veresov Attack, Shropshire Defense",
  d4nf6nc3d5bg5nbd7nf3: "Queen's Pawn Game: Veresov Attack, Two Knights System",
  d4nf6nc3d5bg5nbd7nf3g6:
    "Queen's Pawn Game: Veresov Attack, Two Knights System, Gruenfeld Defense",
  d4nf6nc3d5bg5bf5bxf6: "Queen's Pawn Game: Veresov Attack, Veresov Variation",
  d4d5nf3nf6c4b5: "Queen's Pawn Game: Zilbermints Countergambit",
  d4d5nf3: "Queen's Pawn Game: Zukertort Variation",
  d4d5g4: "Queen's Pawn Game: Zurich Gambit",
  d4d5nc3c5: "Queen's Pawn Opening: Veresov Attack, Irish Gambit",
  d4nf6f3d5nc3: "Queen's Pawn Opening: Veresov, Richter Attack",
  d4nf6c4g6qc2: "Queen's Pawn, Mengarini Attack",
  e4g6d4d6nc3c6: 'Rat Defense: Accelerated Gurgenidze',
  e4d6d4nd7: 'Rat Defense: Antal Defense',
  e4d6d4f5: 'Rat Defense: Balogh Defense',
  d4d6c4e5: 'Rat Defense: English Rat',
  d4d6c4e5dxe5nc6: 'Rat Defense: English Rat, Lisbon Gambit',
  e4d6f4d5exd5nf6: 'Rat Defense: Fuller Gambit',
  e4d6f4: 'Rat Defense: Harmonist',
  e4d6h4: 'Rat Defense: Petruccioli Attack',
  d4e6e4d6: 'Rat Defense: Small Center Defense',
  e4d6g4: 'Rat Defense: Spike Attack',
  nf3: 'Reti Opening',
  nf3d5: 'Reti Opening, 1... d5',
  nf3nf6: 'Reti Opening, 1... Nf6',
  nf3d5c4: 'Reti Opening, 2. c4',
  nf3d5c4d4: 'Reti Opening: Advance Variation',
  nf3d5c4d4b4c5: 'Reti Opening: Advance Variation, Michel Gambit',
  nf3d5b3nf6bb2g6c4c6: 'Reti Opening: Anglo-Slav Variation, Bled Variation',
  nf3d5c4c6b3: 'Reti Opening: Anglo-Slav Variation, Bogoljubov Variation',
  nf3d5c4c6b3bg4:
    'Reti Opening: Anglo-Slav Variation, Bogoljubov Variation, 2. c4 c6 3. b3 Bg4',
  nf3nf6c4c6b3d5bb2:
    'Reti Opening: Anglo-Slav Variation, Bogoljubov Variation, 3. b3 d5 4. Bb2',
  'nf3d5c4e6g3nf6bg2be7o-oo-ob3c6bb2':
    'Reti Opening: Anglo-Slav Variation, Bogoljubov Variation, Stonewall Line',
  c4nf6nf3c6b3d5bb2bg4:
    'Reti Opening: Anglo-Slav Variation, Capablanca Variation',
  c4nf6g3c6nf3d5b3bf5:
    'Reti Opening: Anglo-Slav Variation, London Defensive System',
  nf3nf6c4c6b3d5bb2bf5: 'Reti Opening: Anglo-Slav Variation, New York System',
  c4nf6g3c6nf3d5b3bg4: 'Reti Opening: Anglo-Slav Variation, Torre System',
  nf3d5c4d4rg1: 'Reti Opening: Penguin Variation',
  nf3d5c4dxc4: 'Reti Opening: Reti Accepted',
  nf3d5c4dxc4e3be6: 'Reti Opening: Reti Gambit, Keres Variation',
  nf3d5c4d4e3c5b4: 'Reti Opening: Reversed Blumenfeld Gambit',
  nf3d5c4b5: 'Reti Opening: Zilbermints Gambit',
  d4nf6nc3d5bg5: 'Richter-Veresov Attack',
  d4nf6nc3d5bg5bf5: 'Richter-Veresov Attack, 2. Nc3 d5 3. Bg5 Bf5',
  e4g6d4bg7: 'Robatsch (Modern) Defense',
  d4d6nf3g6c4bg7e4bg4: 'Robatsch Defense',
  d4nf6nf3e6e3c5bd3d5b3: 'Rubinstein Opening',
  'd4nf6nf3e6e3c5bd3d5b3nc6o-obd6bb2o-o':
    'Rubinstein Opening: Bogoljubov Defense',
  'd4nf6nf3e6e3c5bd3d5b3nc6o-obe7bb2o-o':
    'Rubinstein Opening: Classical Defense',
  'd4d5nf3nf6e3e6bd3bd6o-oo-ob3nbd7bb2':
    'Rubinstein Opening: Semi-Slav Defense',
  e4e5nf3nf6nxe5d6nf3nxe4d4: 'Russian Game: Classical Attack',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3be7o-onc6re1bg4c3f5nbd2':
    'Russian Game: Classical Attack, Berger Variation',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3be7o-onc6re1':
    'Russian Game: Classical Attack, Chigorin Variation',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3nc6o-obe7c4nb4cxd5':
    'Russian Game: Classical Attack, Chigorin Variation, Browne Attack',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3nc6o-obe7c4nb4be2':
    'Russian Game: Classical Attack, Chigorin Variation, Main Line',
  e4e5nf3nf6nxe5d6nf3nxe4d4nf6:
    'Russian Game: Classical Attack, Closed Variation',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3nc6o-obe7c4':
    'Russian Game: Classical Attack, Jaenisch Variation',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3nc6o-obe7re1bg4c3f5c4':
    'Russian Game: Classical Attack, Krause Variation',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3be7o-onc6re1bg4c3f5c4bh4':
    'Russian Game: Classical Attack, Maroczy Variation',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3bd6o-oo-oc4bg4cxd5f5re1bxh2+':
    'Russian Game: Classical Attack, Marshall Trap',
  e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3bd6:
    'Russian Game: Classical Attack, Marshall Variation',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3bd6o-oo-oc4c6re1bg4':
    'Russian Game: Classical Attack, Marshall Variation, Chinese Gambit',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3be7o-oo-o':
    'Russian Game: Classical Attack, Mason Variation',
  e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3nc6:
    'Russian Game: Classical Attack, Mason-Showalter Variation',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3bd6o-oo-oc4c6':
    'Russian Game: Classical Attack, Staunton Variation',
  'e4e5nf3nf6nxe5d6nf3nxe4d4d5bd3bd6o-oo-oc4bg4':
    'Russian Game: Classical Attack, Tarrasch Variation',
  e4e5nf3nf6nxe5d6nxf7: 'Russian Game: Cochrane Gambit',
  'e4e5nf3nf6nxe5d6nxf7kxf7bc4+':
    'Russian Game: Cochrane Gambit, Bishop Check Line',
  e4e5nf3nf6nxe5d6nxf7kxf7d4: 'Russian Game: Cochrane Gambit, Center Variation',
  e4e5nf3nf6nxe5d6nf3nxe4qe2: 'Russian Game: Cozio (Lasker) Attack',
  e4e5nf3nf6nxe5nxe4: 'Russian Game: Damiano Variation',
  e4e5nf3nf6nxe5nxe4qe2qe7: 'Russian Game: Damiano Variation, Kholmov Gambit',
  e4e5nf3nf6nxe5d6nf3nxe4d3: 'Russian Game: French Attack',
  e4e5nf3nf6nxe5d6nd3: 'Russian Game: Karklins-Martinovsky Variation',
  e4e5nf3nf6nxe5d6nf3nxe4c4: 'Russian Game: Kaufmann Attack',
  e4e5nf3nf6nxe5d6nf3nxe4bd3: 'Russian Game: Millennium Attack',
  e4e5nf3nf6d4: 'Russian Game: Modern Attack',
  e4e5nf3nf6d4exd4e5ne4qe2nc5nxd4nc6:
    'Russian Game: Modern Attack, Bardeleben Variation',
  e4e5nf3nf6d4exd4e5ne4qxd4: 'Russian Game: Modern Attack, Center Attack',
  e4e5nf3nf6d4nxe4bd3: 'Russian Game: Modern Attack, Center Variation',
  e4e5nf3nf6d4nxe4bd3nc6: 'Russian Game: Modern Attack, Murrey Variation',
  e4e5nf3nf6d4exd4e5ne4qe2: 'Russian Game: Modern Attack, Steinitz Variation',
  e4e5nf3nf6d4d5: 'Russian Game: Modern Attack, Symmetrical Variation',
  e4e5nf3nf6d4nxe4:
    'Russian Game: Modern Attack, Symmetrical Variation, 2. Nf3 Nf6 3. d4 Nxe4',
  e4e5nf3nf6d4exd4e5ne4bb5: 'Russian Game: Modern Attack, Tal Gambit',
  'e4e5nf3nf6d4nxe4bd3d5nxe5bd6o-oo-oc4bxe5':
    'Russian Game: Modern Attack, Trifunovic Variation',
  e4e5nf3nf6qe2nc6d4: 'Russian Game: Moody Gambit',
  e4e5nf3nf6nxe5d6nf3nxe4nc3: 'Russian Game: Nimzowitsch Attack',
  e4e5nf3nf6nxe5d6nc4: 'Russian Game: Paulsen Attack',
  e4e5nf3nf6nxe5nc6: 'Russian Game: Stafford Gambit',
  e4e5nf3nf6nc3: 'Russian Game: Three Knights Game',
  e4e5nf3nf6bc4: 'Russian Game: Urusov Gambit',
  e4e5nf3nc6bb5: 'Ruy Lopez',
  e4e5nf3nc6bb5a6: 'Ruy Lopez, 2. Nf3 Nc6 3. Bb5 a6',
  e4e5nf3nc6bb5nf6nxe5: 'Ruy Lopez Defense, Halloween Attack',
  e4e5nf3nc6bb5bb4: 'Ruy Lopez: Alapin Defense',
  e4e5nf3nc6bb5bb4c3ba5bxc6dxc6: 'Ruy Lopez: Alapin Defense, Alapin Gambit',
  e4e5nf3nc6bb5nf6: 'Ruy Lopez: Berlin Defense',
  'e4e5nf3nc6bb5nf6o-o': 'Ruy Lopez: Berlin Defense, 3. Bb5 Nf6 4. O-O',
  'e4e5nf3nc6bb5nf6d3d6bxc6+': 'Ruy Lopez: Berlin Defense, Anderssen Variation',
  'e4e5nf3nc6bb5nf6o-onxe4d4nd6bxc6dxc6dxe5nf5qxd8+kxd8nc3bd7':
    'Ruy Lopez: Berlin Defense, Berlin Wall',
  'e4e5nf3nc6bb5nf6o-obc5': 'Ruy Lopez: Berlin Defense, Beverwijk Variation',
  'e4e5nf3nc6bb5nf6o-od6d4bd7nc3be7bg5':
    'Ruy Lopez: Berlin Defense, Closed Bernstein Variation',
  'e4e5nf3nc6bb5nf6o-od6d4bd7nc3be7bxc6':
    'Ruy Lopez: Berlin Defense, Closed Showalter Variation',
  'e4e5nf3nc6bb5nf6o-od6d4bd7nc3exd4':
    'Ruy Lopez: Berlin Defense, Closed Wolf Variation',
  'e4e5nf3nc6bb5nf6o-onxe4d4be7qe2nd6bxc6bxc6dxe5nf5':
    'Ruy Lopez: Berlin Defense, Cordel Variation',
  e4e5nf3nc6bb5nf6d3d6c4: 'Ruy Lopez: Berlin Defense, Duras Variation',
  'e4e5nf3nc6bb5nf6o-ong4': 'Ruy Lopez: Berlin Defense, Fishing Pole Variation',
  'e4e5nf3nc6bb5nf6o-od6d4bd7nc3be7':
    'Ruy Lopez: Berlin Defense, Hedgehog Variation',
  'e4e5nf3nc6bb5nf6o-od6':
    'Ruy Lopez: Berlin Defense, Improved Steinitz Defense',
  'e4e5nf3nc6bb5nf6o-onxe4d4be7dxe5':
    'Ruy Lopez: Berlin Defense, Minckwitz Variation',
  'e4e5nf3nc6bb5nf6d4exd4o-o': 'Ruy Lopez: Berlin Defense, Nyholm Attack',
  'e4e5nf3nc6bb5nf6o-onxe4d4be7qe2nd6bxc6bxc6dxe5nb7b3':
    'Ruy Lopez: Berlin Defense, Pillsbury Variation',
  'e4e5nf3nc6bb5nf6o-onxe4': 'Ruy Lopez: Berlin Defense, Rio Gambit Accepted',
  'e4e5nf3nc6bb5nf6o-onxe4d4be7':
    'Ruy Lopez: Berlin Defense, Rio de Janeiro Variation',
  'e4e5nf3nc6bb5nf6o-onxe4d4a6':
    'Ruy Lopez: Berlin Defense, Rosenthal Variation',
  'e4e5nf3nc6bb5d6d4bd7nc3nf6o-obe7re1o-o':
    'Ruy Lopez: Berlin Defense, Tarrasch Trap',
  'e4e5nf3nc6bb5nf6o-onxe4d4be7qe2d5':
    'Ruy Lopez: Berlin Defense, Trifunovic Variation',
  'e4e5nf3nc6bb5nf6o-onxe4d4be7qe2nd6bxc6bxc6dxe5nb7nd4':
    'Ruy Lopez: Berlin Defense, Winawer Attack',
  'e4e5nf3nc6bb5nf6o-onxe4d4be7qe2nd6bxc6bxc6dxe5nb7c4':
    'Ruy Lopez: Berlin Defense, Zukertort Variation',
  'e4e5nf3nc6bb5nf6o-onxe4d4nd6':
    "Ruy Lopez: Berlin Defense, l'Hermet Variation",
  'e4e5nf3nc6bb5nf6o-onxe4d4nd6bxc6dxc6dxe5nf5qxd8+kxd8':
    "Ruy Lopez: Berlin Defense, l'Hermet Variation, Berlin Wall Defense",
  'e4e5nf3nc6bb5nf6o-onxe4d4nd6bxc6dxc6dxe5ne4':
    "Ruy Lopez: Berlin Defense, l'Hermet Variation, Westerinen Line",
  e4e5nf3nc6bb5nf6d3bc5be3: 'Ruy Lopez: Berlin Defense: Kaufmann Variation',
  e4e5nf3nc6bb5nf6d3ne7nxe5c6: 'Ruy Lopez: Berlin Defense: Mortimer Trap',
  e4e5nf3nc6bb5nf6d3ne7: 'Ruy Lopez: Berlin Defense: Mortimer Variation',
  'e4e5nf3nc6bb5nf6o-onxe4d4be7qe2nd6bxc6bxc6dxe5nb7nc3o-ore1nc5nd4ne6be3nxd4bxd4c5':
    'Ruy Lopez: Berlin Defense: Rio de Janeiro Variation',
  e4e5nf3nc6bb5nd4: 'Ruy Lopez: Bird Variation',
  'e4e5nf3nc6bb5nd4nxd4exd4o-one7':
    'Ruy Lopez: Bird Variation, Paulsen Variation',
  e4e5nf3nc6bb5a6ba4nd4: "Ruy Lopez: Bird's Defense Deferred",
  e4e5nf3nc6bb5g5: 'Ruy Lopez: Brentano Gambit',
  'e4e5nf3nc6bb5a6ba4nf6o-og6': 'Ruy Lopez: Brix Variation',
  e4e5nf3nc6bb5a5: 'Ruy Lopez: Bulgarian Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-od5': 'Ruy Lopez: Central Countergambit',
  'e4e5nf3nc6bb5nf6o-obc5c3o-od4bb6':
    'Ruy Lopez: Classical Defense: Benelux Variation',
  e4e5nf3nc6bb5bc5c3qe7: 'Ruy Lopez: Classical Defense: Boden Variation',
  'e4e5nf3nc6bb5bc5o-ond4b4': 'Ruy Lopez: Classical Defense: Zaitsev Variation',
  e4e5nf3nc6bb5bc5: 'Ruy Lopez: Classical Variation',
  e4e5nf3nc6bb5bc5c3: 'Ruy Lopez: Classical Variation, Central Variation',
  e4e5nf3nc6bb5bc5c3bb6: 'Ruy Lopez: Classical Variation, Charousek Variation',
  e4e5nf3nc6bb5bc5c3f5: 'Ruy Lopez: Classical Variation, Cordel Gambit',
  e4e5nf3nc6bb5bc5c3d5: 'Ruy Lopez: Classical Variation, Konikowski Gambit',
  'e4e5nf3nc6bb5nf6o-obc5c3o-od4bb6bg5':
    'Ruy Lopez: Classical Variation, Modern Main Line',
  e4e5nf3nc6bb5bc5b4: 'Ruy Lopez: Classical Variation, Spanish Wing Gambit',
  'e4e5nf3nc6bb5nf6o-obc5c3':
    'Ruy Lopez: Classical Variation, Zukertort Gambit',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3': 'Ruy Lopez: Closed',
  'e4e5nf3nc6bb5nf6o-od6d4nd7':
    'Ruy Lopez: Closed Berlin Defense: Chigorin Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3na5bc2c5d4qc7nbd2o-onf1bg4ne3bxf3qxf3':
    'Ruy Lopez: Closed Defense, Alekhine Gambit',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7': 'Ruy Lopez: Closed Variations',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3':
    'Ruy Lopez: Closed Variations, 8. c3 O-O 9. h3',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1d6':
    'Ruy Lopez: Closed Variations, Averbakh Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3na5bc2c5d4qc7a4':
    'Ruy Lopez: Closed Variations, Balla Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-od4bg4':
    'Ruy Lopez: Closed Variations, Bogoljubov Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3na5bc2c5d4nc6':
    'Ruy Lopez: Closed Variations, Borisenko Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3nb8d4nbd7nh4':
    'Ruy Lopez: Closed Variations, Breyer Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3nb8d4nbd7nbd2bb7bc2c5':
    'Ruy Lopez: Closed Variations, Breyer Defense, 11. Nbd2 Bb7 12. Bc2 c5',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7d4':
    'Ruy Lopez: Closed Variations, Center Attack',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7d4exd4e5ne4c3dxc3':
    'Ruy Lopez: Closed Variations, Center Attack, Basque Gambit',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3na5bc2c5d4qc7':
    'Ruy Lopez: Closed Variations, Chigorin Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3na5bc2c5d4qc7nbd2nc6':
    'Ruy Lopez: Closed Variations, Chigorin Defense, 11. d4 Qc7 12. Nbd2 Nc6',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3na5bc2c5d4qc7nbd2nc6dxc5':
    'Ruy Lopez: Closed Variations, Chigorin Defense, 12. Nbd2 Nc6 13. dxc5',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-o':
    'Ruy Lopez: Closed Variations, Closed Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3na5bc2':
    'Ruy Lopez: Closed Variations, Closed Defense, 9. h3 Na5 10. Bc2',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3na5bc2c5':
    'Ruy Lopez: Closed Variations, Closed Defense, 9. h3 Na5 10. Bc2 c5',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7bxc6':
    'Ruy Lopez: Closed Variations, Delayed Exchange',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3bb7':
    'Ruy Lopez: Closed Variations, Flohr System',
  'e4e5nf3nc6bb5a6ba4d6o-obd7c3nf6d4be7nbd2o-ore1be8':
    'Ruy Lopez: Closed Variations, Kecskemet Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3d6h3a5':
    'Ruy Lopez: Closed Variations, Keres Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3nd7':
    'Ruy Lopez: Closed Variations, Keres Defense, 8. c3 O-O 9. h3 Nd7',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3na5bc2c5d4nd7':
    'Ruy Lopez: Closed Variations, Keres Defense, 10. Bc2 c5 11. d4 Nd7',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3be6':
    'Ruy Lopez: Closed Variations, Kholmov Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-obc2':
    'Ruy Lopez: Closed Variations, Lutikov Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7d3':
    'Ruy Lopez: Closed Variations, Martinez Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7nc3':
    'Ruy Lopez: Closed Variations, Morphy Attack',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-od3d6c3':
    'Ruy Lopez: Closed Variations, Pilnik Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6d4':
    'Ruy Lopez: Closed Variations, Rosen Attack',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3h6':
    'Ruy Lopez: Closed Variations, Smyslov Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3bb7d4re8nbd2bf8a3h6':
    'Ruy Lopez: Closed Variations, Smyslov-Breyer-Zaitsev Hybrid',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oa3':
    'Ruy Lopez: Closed Variations, Suetin Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3bb7':
    'Ruy Lopez: Closed Variations, Trajkovic Counterattack',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7qe2':
    'Ruy Lopez: Closed Variations, Worrall Attack',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7qe2b5bb3o-o':
    'Ruy Lopez: Closed Variations, Worrall Attack, Castling Line',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7qe2b5bb3d6':
    'Ruy Lopez: Closed Variations, Worrall Attack, Delayed Castling Line',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-od4':
    'Ruy Lopez: Closed Variations, Yates Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-od4bg4a4':
    'Ruy Lopez: Closed Variations, Yates Variation, Short Attack',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3re8':
    'Ruy Lopez: Closed Variations, Zaitsev System',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-o': 'Ruy Lopez: Closed, 7... O-O',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3': 'Ruy Lopez: Closed, 8. c3',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oa4':
    'Ruy Lopez: Closed, Anti-Marshall 8. a4',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7d4exd4e5ne4c3':
    'Ruy Lopez: Closed, Basque Gambit (North Spanish Variation)',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3nb8d4':
    'Ruy Lopez: Closed, Breyer, 10. d4',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3na5bc2c5d4qc7nbd2bd7nf1rfe8ne3g6':
    'Ruy Lopez: Closed, Chigorin, Yugoslav System',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3na5bc2c5d4qc7h3nc6d5nb8nbd2g5':
    'Ruy Lopez: Closed, Leonhardt Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3d6h3na5bc2c6d4qc7':
    'Ruy Lopez: Closed, Rossolimo Defense',
  e4e5nf3nc6bb5a6ba4: 'Ruy Lopez: Columbus Variation',
  e4e5nf3nc6bb5nge7: 'Ruy Lopez: Cozio Defense',
  e4e5nf3nc6bb5nge7nc3g6: 'Ruy Lopez: Cozio Defense, Paulsen Variation',
  'e4e5nf3nc6bb5g6d4exd4nxd4bg7be3nge7nc3o-oqd2d5':
    'Ruy Lopez: Cozio Defense, Tartakower Gambit',
  e4e5nf3nc6bb5a6bxc6: 'Ruy Lopez: Exchange Variation',
  'e4e5nf3nc6bb5a6bxc6dxc6o-obg4h3h5':
    'Ruy Lopez: Exchange Variation, Alapin Gambit',
  e4e5nf3nc6bb5a6bxc6dxc6d4exd4qxd4qxd4nxd4bd6:
    'Ruy Lopez: Exchange Variation, Alekhine Variation',
  'e4e5nf3nc6bb5a6bxc6dxc6o-oqd6':
    'Ruy Lopez: Exchange Variation, Bronstein Variation',
  'e4e5nf3nc6bb5a6bxc6dxc6o-of6':
    'Ruy Lopez: Exchange Variation, Gligoric Variation',
  e4e5nf3nc6bb5a6bxc6dxc6nc3: 'Ruy Lopez: Exchange Variation, Keres Variation',
  'e4e5nf3nc6bb5a6bxc6dxc6o-obd6':
    "Ruy Lopez: Exchange Variation, King's Bishop Variation",
  e4e5nf3nc6bb5a6bxc6bxc6: 'Ruy Lopez: Exchange Variation, Lutikov Variation',
  'e4e5nf3nc6bb5a6bxc6dxc6o-o':
    'Ruy Lopez: Exchange Variation, Normal Variation',
  e4e5nf3nc6bb5a6bxc6dxc6nc3f6d3:
    'Ruy Lopez: Exchange Variation, Romanovsky Variation',
  e4e5nf3nc6bb5a6bxc6dxc6d4exd4qxd4qxd4nxd4bd7:
    'Ruy Lopez: Exchange, Alekhine Variation',
  e4e5nf3nc6bb5g6: 'Ruy Lopez: Fianchetto Defense',
  e4e5nf3nc6bb5be7: 'Ruy Lopez: Lucena Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3d5': 'Ruy Lopez: Marshall Attack',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3d5exd5nxd5nxe5nxe5rxe5c6d4':
    'Ruy Lopez: Marshall Attack, Main Line',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3d5exd5nxd5nxe5nxe5rxe5c6d4bd6re1qh4g3qh3':
    'Ruy Lopez: Marshall Attack, Modern Main Line',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3d5exd5nxd5nxe5nxe5rxe5c6':
    'Ruy Lopez: Marshall Attack, Modern Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3d5exd5nxd5nxe5nxe5rxe5nf6':
    'Ruy Lopez: Marshall Attack, Original Marshall Attack',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3d5exd5nxd5nxe5nxe5rxe5c6bxd5cxd5d4bd6re3':
    'Ruy Lopez: Marshall Attack, Re3 Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3d5exd5e4':
    'Ruy Lopez: Marshall Attack, Steiner Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3o-oc3d5exd5nxd5nxe5nxe5rxe5c6d4bd6re1qh4g3qh3be3bg4qd3rae8nd2re6a4qh5':
    'Ruy Lopez: Marshall, Main Line, Spassky Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-o': 'Ruy Lopez: Morphy Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-ob5bb3d6':
    'Ruy Lopez: Morphy Defense, 5. O-O b5 6. Bb3 d6',
  e4e5nf3nc6bb5a6ba4bb4: "Ruy Lopez: Morphy Defense, Alapin's Defense Deferred",
  e4e5nf3nc6bb5a6ba4nf6d3: 'Ruy Lopez: Morphy Defense, Anderssen Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-ob5bb3bb7':
    'Ruy Lopez: Morphy Defense, Arkhangelsk Variation',
  e4e5nf3nc6bb5a6ba4nf6bxc6: 'Ruy Lopez: Morphy Defense, Bayreuth Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3nb8':
    'Ruy Lopez: Morphy Defense, Breyer Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3nb8d3':
    'Ruy Lopez: Morphy Defense, Breyer Defense, Quiet Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3nb8d4nbd7':
    'Ruy Lopez: Morphy Defense, Breyer Defense, Zaitsev Hybrid',
  e4e5nf3nc6bb5a6ba4b5: 'Ruy Lopez: Morphy Defense, Caro Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6c3o-oh3na5bc2c5d4qc7nbd2cxd4cxd4':
    'Ruy Lopez: Morphy Defense, Chigorin Defense, Panov System',
  e4e5nf3nc6bb5a6ba4bc5:
    'Ruy Lopez: Morphy Defense, Classical Defense Deferred',
  e4e5nf3nc6bb5a6ba4nge7: 'Ruy Lopez: Morphy Defense, Cozio Defense',
  e4e5nf3nc6bb5a6ba4nf6d3d6c4: 'Ruy Lopez: Morphy Defense, Duras Variation',
  e4e5nf3nc6bb5a6ba4g6:
    'Ruy Lopez: Morphy Defense, Fianchetto Defense Deferred',
  e4e5nf3nc6bb5a6ba4b5bb3bc5: 'Ruy Lopez: Morphy Defense, Graz Variation',
  e4e5nf3nc6bb5a6ba4nf6c3: 'Ruy Lopez: Morphy Defense, Jaffe Gambit',
  e4e5nf3nc6bb5a6ba4nf6d4: 'Ruy Lopez: Morphy Defense, Mackenzie Variation',
  e4e5nf3nc6bb5a6ba4d6: 'Ruy Lopez: Morphy Defense, Modern Steinitz Defense',
  e4e5nf3nc6bb5a6ba4d6c3:
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, 4. Ba4 d6 5. c3',
  e4e5nf3nc6bb5a6ba4d6c4:
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, 4. Ba4 d6 5. c4',
  e4e5nf3nc6bb5a6ba4d6nc3:
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, 4. Ba4 d6 5. Nc3',
  'e4e5nf3nc6bb5a6ba4d6o-o':
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, 4. Ba4 d6 5. O-O',
  e4e5nf3nc6bb5a6ba4d6c3bd7:
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, 4. Ba4 d6 5. c3 Bd7',
  'e4e5nf3nc6bb5a6ba4d6bxc6+bxc6d4':
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, 5. Bxc6+ bxc6 6. d4',
  e4e5nf3nc6bb5a6ba4d6c3bd7d4nge7:
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, 5. c3 Bd7 6. d4 Nge7',
  'e4e5nf3nc6bb5a6ba4d6bxc6+bxc6d4f6':
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, 5. Bxc6+ bxc6 6. d4 f6',
  'e4e5nf3nc6bb5a6ba4d6c3f5exf5bxf5o-o':
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, 6. exf5 Bxf5 7. O-O',
  e4e5nf3nc6bb5g6c3a6ba4d6d4bd7:
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, Fianchetto Variation',
  e4e5nf3nc6bb5a6ba4d6c3f5:
    'Ruy Lopez: Morphy Defense, Modern Steinitz Defense, Siesta Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-obc5':
    'Ruy Lopez: Morphy Defense, Neo-Arkhangelsk Variation',
  e4e5nf3nc6bb5a6ba4b5bb3na5: 'Ruy Lopez: Morphy Defense, Norwegian Variation',
  'e4e5nf3nc6bb5a6ba4b5bb3na5bxf7+':
    'Ruy Lopez: Morphy Defense, Norwegian Variation, Nightingale Gambit',
  e4e5nf3nc6bb5a6ba4f5:
    'Ruy Lopez: Morphy Defense, Schliemann Defense Deferred',
  e4e5nf3nc6bb5a6ba4f5exf5:
    'Ruy Lopez: Morphy Defense, Schliemann Defense Deferred, Jaenisch Gambit Deferred',
  'e4e5nf3nc6bb5a6ba4nf6o-od6': 'Ruy Lopez: Morphy Defense, Steinitz Deferred',
  'e4e5nf3nc6bb5a6ba4nf6o-od6bxc6+bxc6d4nxe4':
    'Ruy Lopez: Morphy Defense, Steinitz Deferred, 6. Bxc6+ bxc6 7. d4 Nxe4',
  e4e5nf3nc6bb5a6ba4nf6nc3: 'Ruy Lopez: Morphy Defense, Tarrasch Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4qe2':
    'Ruy Lopez: Morphy Defense, Tartakower Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-ob5bb3be7a4':
    'Ruy Lopez: Morphy Defense, Wing Attack',
  e4e5nf3nc6bb5a6ba4nf6qe2: 'Ruy Lopez: Morphy Defense, Wormald Attack',
  e4e5nf3nc6bb5a6ba4b5bb3d6d4nxd4nxd4exd4qxd4c5: "Ruy Lopez: Noah's Ark Trap",
  'e4e5nf3nc6bb5a6ba4nf6o-obe7re1b5bb3d6d4nxd4nxd4exd4qxd4c5':
    "Ruy Lopez: Noah's Ark Trap, 9. Nxd4 exd4 10. Qxd4 c5",
  e4e5nf3nc6bb5f6: 'Ruy Lopez: Nuernberg Variation',
  e4e5nf3nc6bb5d6d4bd7c4:
    'Ruy Lopez: Old Steinitz Defense: Semi-Duras Variation',
  'e4e5nf3nc6bb5nf6o-onxe4d4nd6ba4':
    'Ruy Lopez: Open Berlin Defense: Showalter Variation',
  'e4e5nf3nc6bb5nf6o-onxe4d4nd6dxe5':
    "Ruy Lopez: Open Berlin Defense: l'Hermet Variation",
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4re1d5':
    'Ruy Lopez: Open Variation, Skipworth Gambit',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3': 'Ruy Lopez: Open Variations',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5':
    'Ruy Lopez: Open Variations, 7. Bb3 d5 8. dxe5',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3nc5':
    'Ruy Lopez: Open Variations, Berlin Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6nbd2':
    'Ruy Lopez: Open Variations, Bernstein Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6nbd2bc5qe1':
    'Ruy Lopez: Open Variations, Bernstein Variation, Luther Line',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3be7re1o-ond4nxe5':
    'Ruy Lopez: Open Variations, Breslau Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3be7':
    'Ruy Lopez: Open Variations, Classical Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4be7re1b5bb3d5dxe5be6c3':
    'Ruy Lopez: Open Variations, Classical Defense, Main Line',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3bc5nbd2o-obc2nxf2':
    'Ruy Lopez: Open Variations, Dilworth Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5nxe5':
    'Ruy Lopez: Open Variations, Friess Attack',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5c4':
    'Ruy Lopez: Open Variations, Harksen Gambit',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6qe2':
    'Ruy Lopez: Open Variations, Howell Attack',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6qe2be7c4':
    'Ruy Lopez: Open Variations, Howell Attack, 9. Qe2 Be7 10. c4',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3bc5':
    'Ruy Lopez: Open Variations, Italian Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6nbd2nc5c3d4ng5':
    'Ruy Lopez: Open Variations, Karpov Gambit',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6':
    'Ruy Lopez: Open Variations, Main Line',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3be7nbd2o-oqe2':
    'Ruy Lopez: Open Variations, Malkin Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3bc5qd3':
    'Ruy Lopez: Open Variations, Motzko Attack',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4': 'Ruy Lopez: Open Variations, Open Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5d5':
    'Ruy Lopez: Open Variations, Richter Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4exd4':
    'Ruy Lopez: Open Variations, Riga Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5a4nxd4':
    'Ruy Lopez: Open Variations, Schlechter Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3bc5nbd2':
    'Ruy Lopez: Open Variations, St. Petersburg Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5ne7':
    'Ruy Lopez: Open Variations, Zukertort Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4': 'Ruy Lopez: Open, 6. d4',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5': 'Ruy Lopez: Open, 6. d4 b5',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3': 'Ruy Lopez: Open, 9. c3',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5a4nxd4nxd4exd4nc3':
    'Ruy Lopez: Open, Berger Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6qe2be7rd1o-oc4bxc4bxc4qd7':
    'Ruy Lopez: Open, Howell Attack, Ekstrom Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4nc3': 'Ruy Lopez: Open, Knorre Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3bc5qd3ne7':
    'Ruy Lopez: Open, Motzko Attack, Nenarokov Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-onxe4d4b5bb3d5dxe5be6c3be7re1o-ond4qd7nxe6fxe6rxe4':
    'Ruy Lopez: Open, Tarrasch Trap',
  e4e5nf3nc6bb5na5: 'Ruy Lopez: Pollock Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-ob5bb3d6ng5d5exd5nd4re1bc5rxe5+kf8':
    'Ruy Lopez: Rabinovich Variation',
  e4e5nf3nc6bb5nb8: 'Ruy Lopez: Retreat Variation',
  e4e5nf3nc6bb5b6: 'Ruy Lopez: Rotary-Albany Gambit',
  e4e5nf3nc6bb5f5: 'Ruy Lopez: Schliemann Defense',
  e4e5nf3nc6bb5f5nc3fxe4nxe4d5nxe5dxe4nxc6qg5:
    'Ruy Lopez: Schliemann Defense, Classical Variation',
  e4e5nf3nc6bb5f5nc3: 'Ruy Lopez: Schliemann Defense, Dyckhoff Variation',
  e4e5nf3nc6bb5f5bxc6: 'Ruy Lopez: Schliemann Defense, Exchange Variation',
  e4e5nf3nc6bb5f5exf5:
    'Ruy Lopez: Schliemann Defense, Jaenisch Gambit Accepted',
  e4e5nf3nc6bb5f5nc3fxe4nxe4be7:
    'Ruy Lopez: Schliemann Defense, Kostic Defense',
  e4e5nf3nc6bb5f5nc3fxe4nxe4d5nxe5dxe4nxc6qd5:
    'Ruy Lopez: Schliemann Defense, Moehring Variation',
  e4e5nf3nc6bb5f5d4: 'Ruy Lopez: Schliemann Defense, Schoenemann Attack',
  e4e5nf3nc6bb5f5nc3fxe4nxe4nf6:
    'Ruy Lopez: Schliemann Defense, Tartakower Variation',
  e4e5nf3nc6bb5d5: 'Ruy Lopez: Spanish Countergambit',
  'e4e5nf3nc6bb5d5nxe5qg5o-o':
    'Ruy Lopez: Spanish Countergambit, Harding Countergambit, Fricke Gambit',
  e4e5nf3nc6bb5d5nxe5qg5nxc6:
    'Ruy Lopez: Spanish Countergambit, Harding Gambit',
  e4e5nf3nc6bb5d6: 'Ruy Lopez: Steinitz Defense',
  'e4e5nf3nc6bb5a6ba4nf6o-od6bxc6+bxc6d4nxe4re1f5dxe5d5nc3':
    'Ruy Lopez: Steinitz Defense Deferred, Boleslavsky Variation',
  'e4e5nf3nc6bb5a6ba4nf6o-od6bxc6+bxc6d4bg4':
    'Ruy Lopez: Steinitz Defense Deferred, Lipnitsky Variation',
  'e4e5nf3nc6bb5d6d4exd4o-o': 'Ruy Lopez: Steinitz Defense, Center Gambit',
  e4e5nf3nc6bb5d6d4bd7nc3nf6bxc6:
    'Ruy Lopez: Steinitz Defense, Nimzowitsch Attack',
  e4e5nf3nc6bb5qe7: 'Ruy Lopez: Vinogradov Variation',
  e4e5nf3nc6bb5a6ba4nf6qe2b5bb3be7d4d6c3bg4:
    'Ruy Lopez: Wormald Attack, Gruenfeld Variation',
  c3: 'Saragossa Opening',
  e4d5: 'Scandinavian Defense',
  e4d5b3: 'Scandinavian Defense: 2. b3',
  e4d5exd5qxd5nc3qa5d4e5: 'Scandinavian Defense: Anderssen Counterattack',
  e4d5exd5qxd5nc3qa5d4e5nf3bg4:
    'Scandinavian Defense: Anderssen Counterattack, Collijn Variation',
  e4d5exd5qxd5nc3qa5d4e5nf3:
    'Scandinavian Defense: Anderssen Counterattack, Goteborg System',
  e4d5exd5qxd5nc3qa5d4e5dxe5nc6nf3bb4bd2:
    'Scandinavian Defense: Anderssen Counterattack, Orthodox Attack',
  e4d5exd5c6dxc6nxc6: 'Scandinavian Defense: Blackburne Gambit',
  e4d5exd5c6: 'Scandinavian Defense: Blackburne-Kloosterboer Gambit',
  e4d5exd5e5dxe6bxe6: 'Scandinavian Defense: Boehnke Gambit',
  e4d5exd5qxd5nc3qd6d4nf6nf3a6: 'Scandinavian Defense: Bronstein Variation',
  e4d5exd5qxd5nc3qa5d4nf6nf3bf5: 'Scandinavian Defense: Classical Variation',
  e4d5exd5qxd5nc3qa5d4nf6nf3bf5ne5c6g4:
    'Scandinavian Defense: Gruenfeld Variation',
  e4d5exd5qxd5nc3qd6: 'Scandinavian Defense: Gubinsky-Melts Defense',
  e4d5exd5nf6c4e6: 'Scandinavian Defense: Icelandic-Palme Gambit',
  e4d5exd5nf6d4c6dxc6e5: 'Scandinavian Defense: Kadas Gambit',
  e4d5exd5nf6d4nxd5c4nb4: 'Scandinavian Defense: Kiel Variation',
  e4d5exd5c6dxc6e5: 'Scandinavian Defense: Kloosterboer Gambit',
  e4d5exd5qxd5nc3qa5d4nf6nf3bg4h3: 'Scandinavian Defense: Lasker Variation',
  e4d5exd5qxd5nc3qa5: 'Scandinavian Defense: Main Line',
  e4d5exd5qxd5nc3qa5b4: 'Scandinavian Defense: Main Line, Leonhardt Gambit',
  e4d5exd5qxd5nc3qa5d4nf6: 'Scandinavian Defense: Main Line, Mieses Variation',
  e4d5exd5nf6d4nxd5: 'Scandinavian Defense: Marshall Variation',
  e4d5exd5qxd5: 'Scandinavian Defense: Mieses-Kotroc Variation',
  e4d5exd5nf6: 'Scandinavian Defense: Modern Variation',
  e4d5exd5nf6d4: 'Scandinavian Defense: Modern Variation, 2. exd5 Nf6 3. d4',
  e4d5exd5nf6d4nxd5nf3bg4:
    'Scandinavian Defense: Modern Variation, Gipslis Variation',
  e4d5exd5nf6d4g6c4b5: 'Scandinavian Defense: Modern Variation, Wing Gambit',
  e4d5exd5nf6c4c6: 'Scandinavian Defense: Panov Transfer',
  e4d5exd5nf6d4bg4: 'Scandinavian Defense: Portuguese Variation',
  'e4d5exd5nf6d4bg4bb5+nbd7f3bf5':
    'Scandinavian Defense: Portuguese Variation, Portuguese Gambit',
  e4d5exd5nf6d4g6: 'Scandinavian Defense: Richter Variation',
  e4d5exd5nf6d4nxd5nf3g6:
    'Scandinavian Defense: Richter Variation, 3. d4 Nxd5 4. Nf3 g6',
  e4d5exd5qxd5nc3qd6d4c6: 'Scandinavian Defense: Schiller-Pytel Variation',
  e4d5exd5qxd5nc3qd6d4nf6bc4c6nge2bf5bf4qb4:
    'Scandinavian Defense: Schiller-Pytel Variation, Modern Variation',
  e4d5b4: 'Scandinavian Defense: Zilbermints Gambit',
  'e4e5nf3nc6d4exd4bc4bb4+c3dxc3bxc3': 'Scotch Gambit',
  e4e5nf3nc6d4: 'Scotch Game',
  e4e5nf3nc6d4exd4: 'Scotch Game, 2. Nf3 Nc6 3. d4 exd4',
  e4e5nf3nc6d4exd4nxd4: 'Scotch Game, 3. d4 exd4 4. Nxd4',
  'e4e5nf3nc6d4exd4nxd4qh4nb5bb4+bd2': 'Scotch Game, 5. Nb5 Bb4+ 6. Bd2',
  e4e5nf3nc6d4exd4nxd4nf6e5: 'Scotch Game: Alekhine Gambit',
  e4e5nf3nc6bc4be7d4exd4: 'Scotch Game: Benima Defense',
  'e4e5nf3nc6d4exd4nxd4qh4nb5bb4+nd2qxe4+be2qxg2bf3qh3nxc7+kd8nxa8nf6a3':
    'Scotch Game: Berger Variation',
  e4e5nf3nc6d4exd4nxd4bc5be3qf6nb5: 'Scotch Game: Blumenfeld Attack',
  e4e5nf3nc6d4exd4nxd4qh4be3: 'Scotch Game: Braune Variation',
  e4e5nf3nc6d4exd4nxd4bc5: 'Scotch Game: Classical Variation',
  e4e5nf3nc6d4exd4nxd4bc5be3qf6c3nge7qd2:
    'Scotch Game: Classical Variation, Blackburne Attack',
  e4e5nf3nc6d4exd4nxd4bc5nxc6qf6:
    'Scotch Game: Classical Variation, Intermezzo Variation',
  e4e5nf3nc6d4exd4nxd4bc5be3qf6c3qg6:
    'Scotch Game: Classical Variation, Millennium Variation',
  'e4e5nf3nc6d4exd4bc4bb4+c3dxc3bxc3ba5e5': 'Scotch Game: Cochrane Variation',
  'e4e5nf3nc6d4exd4bc4bc5ng5nh6nxf7nxf7bxf7+kxf7qh5+g6qxc5d5':
    'Scotch Game: Cochrane-Shumov Defense',
  e4e5nf3nc6d4exd4nxd4qh4nf3: 'Scotch Game: Fraser Variation',
  e4e5nf3nc6d4exd4nxd4nxd4qxd4d6bd3: 'Scotch Game: Ghulam-Kassim Variation',
  e4e5nf3nc6d4exd4c3: 'Scotch Game: Goering Gambit',
  e4e5nf3nc6d4exd4c3dxc3bc4nf6nxc3bb4:
    'Scotch Game: Goering Gambit, Bardeleben Variation',
  e4e5nf3nc6d4exd4c3dxc3bc4:
    'Scotch Game: Goering Gambit, Double Pawn Sacrifice',
  e4e5nf3nc6d4exd4c3dxc3nxc3bb4: 'Scotch Game: Goering Gambit, Main Line',
  'e4e5nf3nc6d4exd4nxd4bc5be3qf6c3nge7qd2d5nb5bxe3qxe3o-onxc7rb8nxd5nxd5exd5nb4':
    'Scotch Game: Gottschall Variation',
  'e4e5nf3nc6d4exd4bc4bb4+c3dxc3o-ocxb2bxb2nf6ng5o-oe5nxe5':
    'Scotch Game: Hanneken Variation',
  e4e5nf3nc6d4exd4bc4bc5: 'Scotch Game: Haxo Gambit',
  e4e5nf3nc6d4exd4nxd4qh4nb5: 'Scotch Game: Horwitz Attack',
  'e4e5nf3nc6d4exd4nxd4qh4nb5bb4+bd2qxe4+be2kd8o-obxd2qxd2':
    'Scotch Game: Horwitz Attack, Blackburne Variation',
  'e4e5nf3nc6d4exd4nxd4qh4nb5bb4+bd2qxe4+be2kd8o-obxd2nxd2qf4a4':
    'Scotch Game: Horwitz Attack, McDonnell Variation',
  'e4e5nf3nc6d4exd4nxd4qh4nb5bb4+bd2qxe4+be2kd8o-obxd2nxd2qf4c4':
    'Scotch Game: Horwitz Attack, Vienna Variation',
  e4e5nf3nc6d4nxd4: 'Scotch Game: Lolli Variation',
  'e4e5nf3nc6d4exd4nxd4bb4+': 'Scotch Game: Malaniuk Variation',
  e4e5nf3nc6d4exd4nxd4bc5be3qf6c3nge7nc2: 'Scotch Game: Meitner Variation',
  e4e5nf3nc6d4exd4nxd4nf6nxc6bxc6e5: 'Scotch Game: Mieses Variation',
  e4e5nf3nc6d4exd4nxd4qh4nc3bb4: 'Scotch Game: Modern Defense',
  e4e5nf3nc6d4nxd4nxd4exd4bc4: 'Scotch Game: Napoleon Gambit',
  e4e5nf3nc6d4exd4nxd4bc5be3qf6c3nge7bb5: 'Scotch Game: Paulsen Attack',
  e4e5nf3nc6d4exd4nxd4qh4nf5: 'Scotch Game: Paulsen Variation',
  e4e5nf3nc6d4exd4nxd4bc5be3qf6c3nge7bb5nd8:
    'Scotch Game: Paulsen, Gunsberg Defense',
  e4e5nf3nc6d4exd4nxd4bc5nb3: 'Scotch Game: Potter Variation',
  e4e5nf3nc6d4exd4bb5: 'Scotch Game: Relfsson Gambit',
  'e4e5nf3nc6d4exd4nxd4bc5nb3bb4+': 'Scotch Game: Romanishin Variation',
  'e4e5nf3nc6d4exd4nxd4qh4nb5bb4+bd2qxe4+be2kd8o-obxd2nxd2qg6':
    'Scotch Game: Rosenthal Variation',
  e4e5nf3nc6d4exd4nxd4nf6: 'Scotch Game: Schmidt Variation',
  e4e5nf3nc6d4exd4bc4: 'Scotch Game: Scotch Gambit',
  e4e5nf3nc6d4exd4bc4nf6e5: 'Scotch Game: Scotch Gambit, Advance Variation',
  'e4e5nf3nc6d4exd4bc4bc5o-od6c3bg4':
    'Scotch Game: Scotch Gambit, Cochrane-Anderssen Variation',
  e4e5nf3nc6bc4nf6d4exd4: 'Scotch Game: Scotch Gambit, Dubois Reti Defense',
  e4e5nf3nc6d4exd4c3d5: 'Scotch Game: Scotch Gambit, Goering Gambit Declined',
  e4e5nf3nc6bc4nf6d4exd4e5ng4: 'Scotch Game: Scotch Gambit, Kingside Variation',
  'e4e5nf3nc6d4exd4bc4bb4+': 'Scotch Game: Scotch Gambit, London Defense',
  e4e5nf3nc6d4exd4bc4bc5ng5: 'Scotch Game: Scotch Gambit, Sarratt Variation',
  e4e5nf3nc6d4exd4nxd4qh4: 'Scotch Game: Steinitz Variation',
  e4e5nf3nc6d4exd4nxd4qh4nc3:
    'Scotch Game: Steinitz Variation, 4. Nxd4 Qh4 5. Nc3',
  e4e5nf3nc6d4exd4nxd4nf6nxc6bxc6nd2: 'Scotch Game: Tartakower Variation',
  e4e5nf3nc6d4exd4bc4bc5ng5nh6qh5: 'Scotch Game: Vitzthum Attack',
  'e4e5nf3nc6d4nxd4nxe5ne6bc4c6o-onf6nxf7': 'Scotch, Cochrane Variation',
  'e4e5nf3nc6d4exd4c3dxc3nxc3d6bc4bg4o-one5nxe5bxd1bxf7+ke7nd5#':
    'Scotch, Sea-cadet Mate',
  d4c5d5e5e4d6: 'Semi-Bononi',
  d4d5c4c6nf3nf6nc3e6: 'Semi-Slav Defense',
  d4d5c4c6nf3nf6nc3e6bg5dxc4: 'Semi-Slav Defense Accepted',
  d4d5c4c6nc3nf6e3e6nf3a6: 'Semi-Slav Defense: Accelerated Meran Variation',
  d4d5c4e6nc3c6: 'Semi-Slav Defense: Accelerated Move Order',
  d4d5c4c6nf3nf6nc3e6bg5h6bh4: 'Semi-Slav Defense: Anti-Moscow Gambit',
  d4d5c4e6nc3c6e3f5g4:
    'Semi-Slav Defense: Anti-Noteboom, Stonewall Variation, Portisch Gambit',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3be7: 'Semi-Slav Defense: Bogoljubov Variation',
  d4d5c4c6nf3nf6nc3e6bg5dxc4e4b5e5h6bh4g5nxg5:
    'Semi-Slav Defense: Botvinnik System',
  d4nf6c4e6nf3d5nc3c6bg5dxc4e4b5e5h6bh4g5nxg5nd5:
    'Semi-Slav Defense: Botvinnik System, Alatortsev System',
  d4d5c4c6nf3nf6nc3e6bg5dxc4e4b5e5h6bh4g5exf6gxh4ne5:
    'Semi-Slav Defense: Botvinnik System, Ekstrom Variation',
  d4d5c4c6nf3nf6nc3e6bg5dxc4e4b5e5h6bh4g5nxg5hxg5bxg5nbd7g3:
    'Semi-Slav Defense: Botvinnik System, Lilienthal Variation',
  d4nf6c4e6nf3d5nc3c6bg5dxc4e4b5e5h6bh4g5nxg5hxg5bxg5nbd7qf3:
    'Semi-Slav Defense: Botvinnik System, Szabo Variation',
  d4d5c4c6nf3nf6nc3e6bg5dxc4e4: 'Semi-Slav Defense: Botvinnik Variation',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3bd6: 'Semi-Slav Defense: Chigorin Defense',
  d4d5c4e6nc3c6e4dxe4f3: 'Semi-Slav Defense: Gunderam Gambit',
  d4d5c4c6nc3nf6e3e6nf3: 'Semi-Slav Defense: Main Line',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3:
    'Semi-Slav Defense: Main Line, 5. Nf3 Nbd7 6. Bd3',
  d4d5c4e6nc3c6e4: 'Semi-Slav Defense: Marshall Gambit',
  'd4d5c4e6nc3c6e4dxe4nxe4bb4+nc3':
    'Semi-Slav Defense: Marshall Gambit, Forgotten Variation',
  'd4d5c4e6nc3c6e4dxe4nxe4bb4+bd2':
    'Semi-Slav Defense: Marshall Gambit, Main Line',
  'd4d5c4e6nc3c6e4dxe4nxe4bb4+bd2qxd4bxb4qxe4+be2c5bxc5qxg2':
    'Semi-Slav Defense: Marshall Gambit, Tolush Variation',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4b5: 'Semi-Slav Defense: Meran Variation',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4b5bd3a6:
    'Semi-Slav Defense: Meran Variation, 7. Bxc4 b5 8. Bd3 a6',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4b5bd3a6e4c5e5cxd4nxb5:
    'Semi-Slav Defense: Meran Variation, Blumenfeld Variation',
  d4d5c4c6nf3nf6nc3e6e3nbd7bd3dxc4bxc4b5bd3b4:
    'Semi-Slav Defense: Meran Variation, Lundin Variation',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4b5bd3a6e4c5e5:
    'Semi-Slav Defense: Meran Variation, Old Variation',
  d4d5c4e6nc3c6e3nf6nf3nbd7bd3dxc4bxc4b5bd3a6e4b4:
    'Semi-Slav Defense: Meran Variation, Pirc Variation',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4b5bd3a6e4c5e5cxd4nxb5ng4:
    'Semi-Slav Defense: Meran Variation, Rabinovich Variation',
  'd4d5c4c6nc3nf6nf3e6e3nbd7bd3dxc4bxc4b5bd3a6e4c5e5cxd4nxb5nxe5nxe5axb5o-oqd5qe2ba6bg5':
    'Semi-Slav Defense: Meran Variation, Rellstab Attack',
  d4d5c4c6nf3nf6nc3e6e3nbd7bd3dxc4bxc4b5bd3a6e4c5d5:
    "Semi-Slav Defense: Meran Variation, Reynolds' Variation",
  d4d5c4c6nf3nf6nc3e6e3nbd7bd3dxc4bxc4b5bd3a6e4c5e5cxd4nxb5nxe5:
    'Semi-Slav Defense: Meran Variation, Sozin Variation',
  'd4d5nf3nf6c4c6nc3e6e3nbd7bd3dxc4bxc4b5bd3a6e4c5e5cxd4nxb5nxe5nxe5axb5o-o':
    'Semi-Slav Defense: Meran Variation, Sozin Variation, 12. Nxe5 axb5 13. O-O',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4b5bd3a6e4c5e5cxd4nxb5nxe5nxe5axb5qf3:
    'Semi-Slav Defense: Meran Variation, Stahlberg Variation',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4b5bd3bb7:
    'Semi-Slav Defense: Meran Variation, Wade Variation',
  'd4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4b5bd3bb7e4b4na4c5e5nd5o-ocxd4nxd4':
    'Semi-Slav Defense: Meran Variation, Wade Variation, Kaidanov Gambit',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4b5bd3bb7e4b4na4c5e5nd5:
    'Semi-Slav Defense: Meran Variation, Wade Variation, Larsen Variation',
  d4d5c4c6nc3nf6e3e6nf3nbd7: 'Semi-Slav Defense: Normal Variation',
  d4d5c4e6nc3c6nf3dxc4: 'Semi-Slav Defense: Noteboom Variation',
  'd4d5c4e6nc3c6nf3dxc4a4bb4e3bxc3+bxc3b5axb5cxb5':
    'Semi-Slav Defense: Noteboom Variation, Abrahams Variation',
  d4d5c4e6nc3c6nf3dxc4g3:
    'Semi-Slav Defense: Noteboom Variation, Anti-Noteboom Gambit',
  d4d5c4e6nc3c6nf3dxc4bg5:
    'Semi-Slav Defense: Noteboom Variation, Anti-Noteboom Variation',
  d4d5c4e6nc3c6nf3dxc4bg5f6:
    'Semi-Slav Defense: Noteboom Variation, Anti-Noteboom Variation, Belyavsky Line',
  d4d5c4c6nf3nf6e3e6nbd2: 'Semi-Slav Defense: Quiet Variation',
  d4d5c4c6nf3nf6e3e6nbd2nbd7:
    'Semi-Slav Defense: Quiet Variation, 4. e3 e6 5. Nbd2 Nbd7',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3bb4: 'Semi-Slav Defense: Romih Variation',
  d4d5c4e6nc3c6nf3nf6e3nbd7ne5:
    'Semi-Slav Defense: Rubinstein (Anti-Meran) System',
  d4d5c4c6nc3nf6e3e6nf3nbd7bd3dxc4bxc4:
    'Semi-Slav Defense: Semi-Meran Variation',
  d4d5c4c6nc3nf6e3e6nf3nbd7qc2: 'Semi-Slav Defense: Stoltz Variation',
  d4d5c4c6nf3nf6nc3e6e3nbd7qc2bd6e4:
    'Semi-Slav Defense: Stoltz Variation, Center Variation',
  d4d5c4c6nf3nf6nc3e6e3nbd7qc2bd6e4dxe4nxe4nxe4qxe4e5dxe5:
    'Semi-Slav Defense: Stoltz Variation, Center Variation, Mikhalchishin Line',
  d4d5c4c6nf3nf6nc3e6e3nbd7qc2bd6g4:
    'Semi-Slav Defense: Stoltz Variation, Shabalov Attack',
  d4d5nf3nf6c4c6nc3e6e3ne4bd3f5: 'Semi-Slav Defense: Stonewall Defense',
  e4c5: 'Sicilian Defense',
  e4c5nf3: 'Sicilian Defense, 2. Nf3',
  e4c5nf3d6: 'Sicilian Defense, 2. Nf3 d6',
  e4c5nf3d6d4: 'Sicilian Defense, 2. Nf3 d6 3. d4',
  e4c5nf3d6d4cxd4: 'Sicilian Defense, 2. Nf3 d6 3. d4 cxd4',
  e4c5c3nf6e5nd5nf3nc6na3: 'Sicilian Defense: 2. c3, Heidenfeld Variation',
  e4c5nf3d6d4cxd4nxd4g6: 'Sicilian Defense: Accelerated Dragon',
  e4c5nf3nc6d4cxd4nxd4g6:
    'Sicilian Defense: Accelerated Dragon, 3. d4 cxd4 4. Nxd4 g6',
  e4c5nf3nc6d4cxd4nxd4g6nxc6:
    'Sicilian Defense: Accelerated Dragon, Exchange Variation',
  e4c5nf3nc6d4cxd4nxd4g6c4:
    'Sicilian Defense: Accelerated Dragon, Maroczy Bind',
  e4c5nf3nc6d4cxd4nxd4g6c4bg7be3:
    'Sicilian Defense: Accelerated Dragon, Maroczy Bind, 5. c4 Bg7 6. Be3',
  e4c5nf3nc6d4cxd4nxd4g6c4bg7be3nf6nc3ng4:
    'Sicilian Defense: Accelerated Dragon, Maroczy Bind, Breyer Variation',
  e4c5nf3nc6d4cxd4nxd4g6c4nf6nc3nxd4qxd4d6:
    'Sicilian Defense: Accelerated Dragon, Maroczy Bind, Gurgenidze Variation',
  e4c5nf3nc6d4cxd4nxd4g6nc3bg7be3nf6bc4:
    'Sicilian Defense: Accelerated Dragon, Modern Bc4 Variation',
  e4c5nf3nc6d4cxd4nxd4g6nc3:
    'Sicilian Defense: Accelerated Dragon, Modern Variation',
  e4c5nf3nc6d4cxd4nxd4g6c4bg7:
    'Sicilian Defense: Accelerated Fianchetto, Maroczy Bind, 5... Bg7',
  nf3c5c4g6d4cxd4nxd4nc6nc2bg7e4d6be2nh6:
    'Sicilian Defense: Accelerated Fianchetto, Simagin Variation',
  e4c5nf3g6c4bh6: 'Sicilian Defense: Acton Extension',
  e4c5c3: 'Sicilian Defense: Alapin Variation',
  e4c5c3d5exd5qxd5: 'Sicilian Defense: Alapin Variation, Barmen Defense',
  e4c5c3d5exd5qxd5d4cxd4cxd4nc6nf3bg4:
    'Sicilian Defense: Alapin Variation, Barmen Defense, Central Exchange',
  e4c5c3d5exd5qxd5d4cxd4cxd4nc6nf3bg4nc3bxf3gxf3qxd4qxd4nxd4:
    'Sicilian Defense: Alapin Variation, Barmen Defense, Endgame Variation',
  e4c5c3d5exd5qxd5d4nc6nf3cxd4cxd4e5nc3bb4be2:
    'Sicilian Defense: Alapin Variation, Barmen Defense, Milner-Barry Attack',
  e4c5c3d5exd5qxd5d4nf6nf3bg4:
    'Sicilian Defense: Alapin Variation, Barmen Defense, Modern Line',
  e4c5nf3e6c3nf6e5nd5d4nc6:
    'Sicilian Defense: Alapin Variation, Sherzer Variation',
  e4c5c3nf6e5nd5d4cxd4:
    'Sicilian Defense: Alapin Variation, Smith-Morra Declined',
  e4c5c3nf6e5nd5nf3nc6bc4nb6bb3:
    'Sicilian Defense: Alapin Variation, Stoltz Attack',
  e4c5c3nf6e5nd5nf3nc6bc4nb6bb3c4bc2qc7qe2g5:
    'Sicilian Defense: Alapin Variation, Stoltz Attack, Ivanchuk Line',
  e4c5qg4: 'Sicilian Defense: Amazon Attack',
  e4c5d3nc6c3d6f4: 'Sicilian Defense: Big Clamp Formation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6be2e5: 'Sicilian Defense: Boleslavsky Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6be2e5nb3:
    'Sicilian Defense: Boleslavsky Variation, 6. Be2 e5 7. Nb3',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6be2e5nxc6:
    'Sicilian Defense: Boleslavsky Variation, Louma Variation',
  e4c5bc4: 'Sicilian Defense: Bowdler Attack',
  e4c5nh3: 'Sicilian Defense: Brick Variation',
  e4c5nf3f5: 'Sicilian Defense: Brussels Gambit',
  e4c5nf3h6: 'Sicilian Defense: Buecker Variation',
  'e4c5nf3d6bb5+nc6o-obd7qe2g6e5':
    'Sicilian Defense: Canal Attack, Dorfman Gambit',
  'e4c5nf3d6bb5+bd7bxd7+qxd7o-onc6c3nf6d4':
    'Sicilian Defense: Canal Attack, Haag Gambit',
  'e4c5nf3d6bb5+bd7': 'Sicilian Defense: Canal Attack, Main Line',
  'e4c5nf3d6bb5+nc6o-obd7c3nf6re1a6bxc6bxc6d4bxe4bg5':
    'Sicilian Defense: Canal Attack, Moscow Gambit',
  'e4c5nf3d6bb5+': 'Sicilian Defense: Canal-Sokolsky Attack',
  'e4c5nf3d6bb5+bd7bxd7+qxd7c4':
    'Sicilian Defense: Canal-Sokolsky Attack, Sokolsky Variation',
  e4c5nf3d6d4cxd4qxd4: 'Sicilian Defense: Chekhover Variation',
  e4c5nf3d6d4cxd4qxd4nc6bb5qd7:
    'Sicilian Defense: Chekhover Variation, Zaitsev Defense',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6: 'Sicilian Defense: Classical Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6be2:
    'Sicilian Defense: Classical Variation, 5. Nc3 Nc6 6. Be2',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6bc4qb6:
    'Sicilian Defense: Classical Variation, Anti-Sozin Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6be2nxd4qxd4g6:
    'Sicilian Defense: Classical Variation, Dragon Transfer',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6g3:
    'Sicilian Defense: Classical Variation, Fianchetto Variation',
  e4c5nc3e6: 'Sicilian Defense: Closed',
  e4c5nc3e6g3: 'Sicilian Defense: Closed, 2. Nc3 e6 3. g3',
  e4c5nc3nc6g3g6: 'Sicilian Defense: Closed, 2. Nc3 Nc6 3. g3 g6',
  e4c5nc3nc6g3g6bg2bg7: 'Sicilian Defense: Closed, 3. g3 g6 4. Bg2 Bg7',
  e4c5nc3nc6g3g6bg2bg7d3d6: 'Sicilian Defense: Closed, 4. Bg2 Bg7 5. d3 d6',
  e4c5nf3nc6nc3e5bc4be7d3d6nd2bg5:
    'Sicilian Defense: Closed Sicilian, Anti-Sveshnikov Variation, Kharlov-Kramnik Line',
  e4c5nc3: 'Sicilian Defense: Closed Variation',
  e4c5nc3nc6g3g6bg2bg7d3d6f4:
    'Sicilian Defense: Closed Variation, 5. d3 d6 6. f4',
  e4c5nc3nc6g3g6bg2bg7d3d6be3:
    'Sicilian Defense: Closed Variation, 5. d3 d6 6. Be3',
  e4c5nc3nc6g3g6bg2bg7d3d6f4e5:
    'Sicilian Defense: Closed Variation, Botvinnik Defense',
  e4c5nc3nc6g3g6bg2bg7d3d6nge2e5:
    'Sicilian Defense: Closed Variation, Botvinnik Defense, 5. d3 d6 6. Nge2 e5',
  e4c5nc3nc6g3g6bg2bg7d3d6f4e5nh3nge7:
    'Sicilian Defense: Closed Variation, Botvinnik Defense, Edge Variation',
  e4c5nc3nc6nge2: 'Sicilian Defense: Closed Variation, Chameleon Variation',
  e4c5nc3nc6g3: 'Sicilian Defense: Closed Variation, Fianchetto Variation',
  e4c5nc3nc6g4: 'Sicilian Defense: Closed Variation, Grob Attack',
  e4c5nc3e6g3d5: 'Sicilian Defense: Closed Variation, Korchnoi Defense',
  e4c5nc3nc6: 'Sicilian Defense: Closed Variation, Traditional',
  e4c5nc3nc6g3g6bg2bg7d3e6be3nd4nce2:
    'Sicilian Defense: Closed, Smyslov Variation',
  e4c5d4cxd4qxd4nc6qd1nf6bc4: 'Sicilian Defense: Coles Sicilian Gambit',
  e4c5nf3d6c3: 'Sicilian Defense: Delayed Alapin',
  e4c5nf3e6c3: 'Sicilian Defense: Delayed Alapin Variation',
  'e4c5nf3d6c3nf6be2nc6d4cxd4cxd4nxe4d5qa5+nc3nxc3bxc3':
    'Sicilian Defense: Delayed Alapin, Basman-Palatnik Double Gambit',
  e4c5nf3d6c3nf6be2nc6d4cxd4cxd4nxe4:
    'Sicilian Defense: Delayed Alapin, Basman-Palatnik Gambit',
  e4c5nf3f5exf5nh6: 'Sicilian Defense: Double-Dutch Gambit',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6: 'Sicilian Defense: Dragon Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6be2:
    'Sicilian Defense: Dragon Variation, Classical Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7be2nc6:
    'Sicilian Defense: Dragon Variation, Classical Variation, 6. Be3 Bg7 7. Be2 Nc6',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be2bg7o-onc6be3':
    'Sicilian Defense: Dragon Variation, Classical Variation, 7. O-O Nc6 8. Be3',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7be2nc6nb3:
    'Sicilian Defense: Dragon Variation, Classical Variation, 7. Be2 Nc6 8. Nb3',
  'e4c5nf3nc6d4cxd4nxd4g6nc3bg7be3nf6be2o-oo-od6nb3a5':
    'Sicilian Defense: Dragon Variation, Classical Variation, Alekhine Line',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be2bg7o-oo-obe3nc6qd2':
    'Sicilian Defense: Dragon Variation, Classical Variation, Battery Variation',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be2bg7o-oo-obe3nc6nb3be6f4na5':
    'Sicilian Defense: Dragon Variation, Classical Variation, Maroczy Line',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be2bg7o-oo-obe3nc6nb3':
    'Sicilian Defense: Dragon Variation, Classical Variation, Normal Line',
  'e4c5nc3d6f4nc6nf3g6d4cxd4nxd4bg7be3nf6be2o-onb3be6o-ona5f5bc4nxa5bxe2qxe2qxa5g4':
    'Sicilian Defense: Dragon Variation, Classical Variation, Stockholm Attack',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be2bg7o-oo-obe3nc6nb3be6f4qc8':
    'Sicilian Defense: Dragon Variation, Classical Variation, Tartakower Line',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6g3:
    'Sicilian Defense: Dragon Variation, Fianchetto Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6f4:
    'Sicilian Defense: Dragon Variation, Levenfish Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6f4nbd7:
    'Sicilian Defense: Dragon Variation, Levenfish Variation, Main Line',
  e4c5nf3nc6d4cxd4nxd4g6nc3bg7be3nf6bc4d6:
    'Sicilian Defense: Dragon Variation, Modern Bc4 Variation',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3o-o':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3o-oqd2nc6':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, 7. f3 O-O 8. Qd2 Nc6',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3o-oqd2nc6bc4bd7':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, 8. Qd2 Nc6 9. Bc4 Bd7',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3o-oqd2nc6bc4bd7o-o-o':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, 9. Bc4 Bd7 10. O-O-O',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3nc6:
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, Belezky Line',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3nc6qd2o-obc4nxd4bxd4be6':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, Czerniak Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3:
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, Early Deviations',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3o-oqd2nc6bc4':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, Main Line',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3nc6qd2o-oo-o-o':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, Modern Line',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3o-oqd2nc6bc4bd7o-o-orc8':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, Old Line',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3o-oqd2nc6g4':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, Panov Variation',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3o-oqd2nc6bc4bd7o-o-oqa5h4rfc8bb3h5':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, Soltis Variation',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3nc6qd2o-obc4nd7':
    'Sicilian Defense: Dragon Variation, Yugoslav Attack, Sosonko Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6be3: 'Sicilian Defense: Dragon, 6. Be3',
  e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7be2:
    'Sicilian Defense: Dragon, Classical Attack',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6be2g6be3bg7qd2:
    'Sicilian Defense: Dragon, Classical, Amsterdam Variation',
  'e4c5nf3g6d4cxd4nxd4nf6nc3d6be2bg7o-oo-obe3nc6nb3be6f4na5f5bc4bd3bxd3cxd3d5':
    'Sicilian Defense: Dragon, Classical, Bernard Defense',
  'e4c5nf3nc6d4cxd4nxd4nf6nc3d6be2g6be3bg7qd2o-oo-o-o':
    'Sicilian Defense: Dragon, Classical, Grigoriev Variation',
  'e4c5nf3nc6d4cxd4nxd4g6nc3bg7be3nf6be2o-onb3d6o-obe6f4na5f5bc4bd3':
    'Sicilian Defense: Dragon, Classical, Spielmann Variation',
  'e4c5nf3nc6d4cxd4nxd4g6be3bg7be2nf6nc3o-oo-od6f4qb6e5':
    'Sicilian Defense: Dragon, Classical, Zollner Gambit',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3o-oqd2nc6bc4bd7h4qa5o-o-orfc8bb3':
    'Sicilian Defense: Dragon, Yugoslav Attack, 12. h4',
  'e4c5nf3d6d4cxd4nxd4nf6nc3g6be3bg7f3o-oqd2nc6bc4a5':
    'Sicilian Defense: Dragon, Yugoslav Attack, Byrne Variation',
  e4e6d4c5nf3a6: 'Sicilian Defense: Drazic Variation',
  e4c5nf3nc6d4cxd4nxd4qc7: 'Sicilian Defense: Flohr Variation',
  e4c5nf3e6d4cxd4nxd4nf6nc3nc6: 'Sicilian Defense: Four Knights Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e6ndb5bc5:
    'Sicilian Defense: Four Knights Variation, Cobra Variation',
  e4c5nf3e6d4cxd4nxd4nf6nc3nc6nxc6:
    'Sicilian Defense: Four Knights Variation, Exchange Variation',
  e4c5nf3nc6d4e6: 'Sicilian Defense: Franco-Sicilian Variation',
  e4c5nf3g6d4f5: 'Sicilian Defense: Frederico Variation',
  e4c5nf3e6: 'Sicilian Defense: French Variation',
  e4c5nf3e6d4cxd4nxd4nf6: 'Sicilian Defense: French Variation, Normal',
  e4c5nf3e6d4cxd4: 'Sicilian Defense: French Variation, Open',
  e4c5nf3e6b3: 'Sicilian Defense: French Variation, Westerinen Attack',
  e4c5nf3e6d4cxd4nxd4nf6nc3qb6: 'Sicilian Defense: Gaw-Paw Variation',
  e4c5c4d6nc3nc6g3h5: 'Sicilian Defense: Gloria Variation',
  e4c5nf3nc6d4cxd4nxd4qb6: 'Sicilian Defense: Godiva Variation',
  e4c5nc3nc6f4: 'Sicilian Defense: Grand Prix Attack',
  e4c5nc3nc6f4g6nf3bg7bc4e6f5:
    'Sicilian Defense: Grand Prix Attack, Schofman Variation',
  e4c5g4: 'Sicilian Defense: Grob Variation',
  e4c5d4cxd4f4: 'Sicilian Defense: Halasz Gambit',
  e4c5nf3g6: 'Sicilian Defense: Hyperaccelerated Dragon',
  e4c5nf3g6d4: 'Sicilian Defense: Hyperaccelerated Fianchetto',
  e4c5nf3g6d4bg7: 'Sicilian Defense: Hyperaccelerated Pterodactyl',
  'e4c5nf3g6d4bg7dxc5qa5+nc3bxc3+bxc3qxc3+':
    'Sicilian Defense: Hyperaccelerated Pterodactyl, Exchange Variation',
  e4c5nf3e5: 'Sicilian Defense: Jalalabad Variation',
  e4c5nf3nc6d4cxd4nxd4e5nb5d6: 'Sicilian Defense: Kalashnikov Variation',
  e4c5nf3e6d4cxd4nxd4a6: 'Sicilian Defense: Kan Variation',
  e4c5nf3e6d4cxd4nxd4a6nc3: 'Sicilian Defense: Kan Variation, Knight Variation',
  e4c5nf3e6d4cxd4nxd4a6c4nf6nc3bb4bd3nc6:
    'Sicilian Defense: Kan Variation, Maroczy Bind, Bronstein Variation',
  e4c5nf3e6d4cxd4nxd4a6c4g6:
    'Sicilian Defense: Kan Variation, Maroczy Bind, Hedgehog Variation',
  e4c5nf3e6d4cxd4nxd4a6c4:
    'Sicilian Defense: Kan Variation, Maroczy Bind, Reti Variation',
  e4c5nf3e6d4cxd4nxd4a6bd3: 'Sicilian Defense: Kan Variation, Modern Variation',
  e4c5nf3e6d4cxd4nxd4a6bd3bc5:
    'Sicilian Defense: Kan Variation, Polugaevsky Variation',
  e4c5nf3e6d4cxd4nxd4a6bd3g6:
    'Sicilian Defense: Kan Variation, Swiss Cheese Variation',
  e4c5nf3e6d4cxd4nxd4a6nc3b5: 'Sicilian Defense: Kan Variation, Wing Attack',
  e4c5nf3e6d4cxd4nxd4a6nc3b5bd3qb6be3bc5qg4:
    "Sicilian Defense: Kan Variation, Wing Attack, Christiansen's Dream",
  e4c5nf3e6nc3a6g3b5d4cxd4nxd4:
    'Sicilian Defense: Kan Variation, Wing Attack, Fianchetto Variation',
  e4c5nf3e6d4cxd4nxd4a6nc3b5bd3qb6nf3:
    'Sicilian Defense: Kan Variation, Wing Attack, Spraggett Attack',
  'e4c5nf3e6d4cxd4nxd4a6bd3nf6o-od6c4g6':
    'Sicilian Defense: Kan, Gipslis Variation',
  e4c5nf3e6d4cxd4nxd4a6c4nf6nc3bb4bd3nc6bc2:
    'Sicilian Defense: Kan, Maroczy Bind, Bronstein Variation',
  e4c5nf3b6: 'Sicilian Defense: Katalimov Variation',
  e4c5ne2: 'Sicilian Defense: Keres Variation',
  e4c5ke2: "Sicilian Defense: King David's Opening",
  e4c5nf3d6g3b5: 'Sicilian Defense: Kotov Gambit',
  e4c5nf3e6c4: 'Sicilian Defense: Kramnik Variation',
  e4c5na3: 'Sicilian Defense: Kronberger Variation',
  e4c5na3nc6d4cxd4bc4: 'Sicilian Defense: Kronberger Variation, Nemeth Gambit',
  e4c5nf3d6d4cxd4nxd4nf6nc3bd7: 'Sicilian Defense: Kupreichik Variation',
  e4c5nf3e6d4cxd4nxd4qb6: 'Sicilian Defense: Kveinis Variation',
  e4c5g3: 'Sicilian Defense: Lasker-Dunne Attack',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e5: 'Sicilian Defense: Lasker-Pelikan Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e5ndb5d6bg5a6na3be6:
    'Sicilian Defense: Lasker-Pelikan Variation, Bird Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e5nxc6:
    'Sicilian Defense: Lasker-Pelikan Variation, Exchange Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e5nf3:
    'Sicilian Defense: Lasker-Pelikan Variation, Retreat Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e5nb3:
    'Sicilian Defense: Lasker-Pelikan Variation, Schlechter Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e5ndb5d6bg5a6na3b5:
    'Sicilian Defense: Lasker-Pelikan Variation, Sveshnikov Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e5ndb5d6bg5a6na3b5bxf6gxf6nd5f5:
    'Sicilian Defense: Lasker-Pelikan Variation, Sveshnikov Variation, 9. Bxf6 gxf6 10. Nd5 f5',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e5ndb5d6bg5a6na3b5nd5:
    'Sicilian Defense: Lasker-Pelikan Variation, Sveshnikov Variation, Chelyabinsk Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e5ndb5d6bg5a6na3b5bxf6gxf6nd5bg7:
    'Sicilian Defense: Lasker-Pelikan Variation, Sveshnikov Variation, Novosibirsk Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3e5ndb5d6bg5a6na3b5bxf6gxf6nd5f5bxb5:
    "Sicilian Defense: Lasker-Pelikan Variation, Sveshnikov Variation, Peresypkin's Sacrifice",
  e4c5nf3nc6d4cxd4nxd4e5: 'Sicilian Defense: Loewenthal Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6bc4g6nxc6bxc6e5:
    'Sicilian Defense: Magnus Smith Trap',
  e4c5nf3e6d4d5: 'Sicilian Defense: Marshall Counterattack',
  e4c5nc3e6d4d5: 'Sicilian Defense: Marshall Gambit',
  e4c5f4: 'Sicilian Defense: McDonnell Attack',
  e4c5f4d5exd5nf6: 'Sicilian Defense: McDonnell Attack, Tal Gambit',
  e4c5a3: 'Sicilian Defense: Mengarini Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3: 'Sicilian Defense: Modern Variations',
  e4c5nf3d6d4nf6: 'Sicilian Defense: Modern Variations, Anti-Qxd4 Move Order',
  e4c5nf3d6d4nf6dxc5nxe4:
    'Sicilian Defense: Modern Variations, Anti-Qxd4 Move Order Accepted',
  e4c5nf3d6d4cxd4nxd4nf6: 'Sicilian Defense: Modern Variations, Main Line',
  e4c5nf3d6d4cxd4c3: 'Sicilian Defense: Modern Variations, Tartakower',
  e4c5nf3qa5: 'Sicilian Defense: Mongoose Variation',
  d4c5e4cxd4nf3: 'Sicilian Defense: Morphy Gambit',
  d4c5e4cxd4nf3e5c3: 'Sicilian Defense: Morphy Gambit, Andreaschek Gambit',
  e4c5h4: 'Sicilian Defense: Myers Attack',
  e4c5a4: 'Sicilian Defense: Myers Attack, 2. a4',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6: 'Sicilian Defense: Najdorf Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5:
    'Sicilian Defense: Najdorf Variation, 5. Nc3 a6 6. Bg5',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6:
    'Sicilian Defense: Najdorf Variation, 5. Nc3 a6 6. Bg5 e6',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4:
    'Sicilian Defense: Najdorf Variation, 6. Bg5 e6 7. f4',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4be7:
    'Sicilian Defense: Najdorf Variation, 6. Bg5 e6 7. f4 Be7',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6h3:
    'Sicilian Defense: Najdorf Variation, Adams Attack',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6f4:
    'Sicilian Defense: Najdorf Variation, Amsterdam Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4be7qf3h6bh4qc7:
    'Sicilian Defense: Najdorf Variation, Browne Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6g4:
    'Sicilian Defense: Najdorf Variation, Dekker Gambit',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6be3:
    'Sicilian Defense: Najdorf Variation, English Attack',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6be3ng4:
    'Sicilian Defense: Najdorf Variation, English Attack, Anti-English',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6rg1:
    'Sicilian Defense: Najdorf Variation, Freak Attack',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4be7qf3h6bh4g5:
    'Sicilian Defense: Najdorf Variation, Goteborg (Argentine)',
  'e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4be7qf3qc7o-o-onbd7':
    'Sicilian Defense: Najdorf Variation, Main Line',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4nc6:
    'Sicilian Defense: Najdorf Variation, Neo-Classical Defense',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6be2:
    'Sicilian Defense: Najdorf Variation, Opocensky Variation',
  'e4c5nf3d6d4cxd4nxd4nf6nc3a6be2e5nb3be7o-obe6':
    'Sicilian Defense: Najdorf Variation, Opocensky Variation, Modern Line',
  'e4c5nf3d6d4cxd4nxd4nf6nc3a6be2e5nb3be7o-oo-o':
    'Sicilian Defense: Najdorf Variation, Opocensky Variation, Traditional Line',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4qb6qd2qxb2rb1qa3:
    'Sicilian Defense: Najdorf Variation, Poisoned Pawn Accepted',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4qb6:
    'Sicilian Defense: Najdorf Variation, Poisoned Pawn Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4b5:
    'Sicilian Defense: Najdorf Variation, Polugaevsky Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4b5e5dxe5fxe5qc7qe2:
    'Sicilian Defense: Najdorf Variation, Polugaevsky Variation, Simagin Line',
  'e4c5nf3d6d4cxd4nxd4nf6nc3a6be2e6o-onbd7':
    'Sicilian Defense: Najdorf Variation, Scheveningen Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5e6f4be7qf3qc7:
    'Sicilian Defense: Najdorf Variation, Traditional Line',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6g3:
    'Sicilian Defense: Najdorf Variation, Zagreb (Fianchetto) Variation',
  'e4c5nf3d6d4cxd4nxd4nf6nc3a6bg5nbd7bc4qa5qd2e6o-o-ob5bb3bb7rhe1nc5e5':
    'Sicilian Defense: Najdorf, Ivkov Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bc4: 'Sicilian Defense: Najdorf, Lipnitsky Attack',
  e4c5nf3nc6d4cxd4nxd4d5: 'Sicilian Defense: Nimzo-American Variation',
  e4c5nf3nf6: 'Sicilian Defense: Nimzowitsch Variation',
  e4c5nf3nf6e5: 'Sicilian Defense: Nimzowitsch Variation, Advance Variation',
  e4c5nf3nf6nc3: 'Sicilian Defense: Nimzowitsch Variation, Closed Variation',
  e4c5nf3nf6e5nd5nc3nxc3:
    'Sicilian Defense: Nimzowitsch Variation, Exchange Variation',
  e4c5nf3nf6e5nd5nc3e6nxd5exd5d4nc6:
    'Sicilian Defense: Nimzowitsch Variation, Main Line',
  e4c5nf3nc6bb5: 'Sicilian Defense: Nyezhmetdinov-Rossolimo Attack',
  e4c5nf3nc6bb5g6:
    'Sicilian Defense: Nyezhmetdinov-Rossolimo Attack, Fianchetto Variation',
  'e4c5nf3nc6bb5g6o-obg7c3e5d4':
    'Sicilian Defense: Nyezhmetdinov-Rossolimo Attack, Fianchetto Variation, Gufeld Gambit',
  'e4c5nf3nc6bb5g6o-obg7c3nf6d4':
    'Sicilian Defense: Nyezhmetdinov-Rossolimo Attack, Fianchetto Variation, Lutikov Gambit',
  'e4c5nf3nc6bb5g6o-obg7c3nf6qa4':
    'Sicilian Defense: Nyezhmetdinov-Rossolimo Attack, Fianchetto Variation, Totsky Attack',
  'e4c5nf3nc6bb5g6o-obg7re1e5b4':
    'Sicilian Defense: Nyezhmetdinov-Rossolimo Attack, Gurgenidze Variation',
  e4c5nf3nc6bb5na5b4:
    'Sicilian Defense: Nyezhmetdinov-Rossolimo Attack, San Francisco Gambit',
  e4c5nf3a6: "Sicilian Defense: O'Kelly Variation",
  e4c5nf3a6be2: "Sicilian Defense: O'Kelly Variation, Aronin System",
  e4c5nf3a6b3: "Sicilian Defense: O'Kelly Variation, Kieseritzky System",
  e4c5nf3a6c4: "Sicilian Defense: O'Kelly Variation, Maroczy Bind",
  e4c5nf3nc6d4cxd4nxd4a6c4e5:
    "Sicilian Defense: O'Kelly Variation, Maroczy Bind, Geller Line",
  e4c5nf3a6c4e6:
    "Sicilian Defense: O'Kelly Variation, Maroczy Bind, Paulsen Line",
  e4c5nf3a6c4d6:
    "Sicilian Defense: O'Kelly Variation, Maroczy Bind, Robatsch Line",
  e4c5nf3a6d4: "Sicilian Defense: O'Kelly Variation, Normal System",
  e4c5nf3a6d4cxd4bc4:
    "Sicilian Defense: O'Kelly Variation, Normal System, Cortlever Gambit",
  e4c5nf3a6d4cxd4c3:
    "Sicilian Defense: O'Kelly Variation, Normal System, Smith-Morra Line",
  e4c5nf3a6d4cxd4nxd4e5:
    "Sicilian Defense: O'Kelly Variation, Normal System, Taimanov Line",
  e4c5nf3a6d4cxd4qxd4:
    "Sicilian Defense: O'Kelly Variation, Normal System, Zagorovsky Line",
  e4c5nf3a6d3: "Sicilian Defense: O'Kelly Variation, Quiet System",
  e4c5nf3a6g3: "Sicilian Defense: O'Kelly Variation, Reti System",
  e4c5nf3a6c3: "Sicilian Defense: O'Kelly Variation, Venice System",
  e4c5nf3a6c3nf6:
    "Sicilian Defense: O'Kelly Variation, Venice System, Barcza Line",
  e4c5nf3a6c3d5exd5nf6:
    "Sicilian Defense: O'Kelly Variation, Venice System, Gambit Line",
  e4c5nf3a6c3b5:
    "Sicilian Defense: O'Kelly Variation, Venice System, Ljubojevic Line",
  e4c5nf3a6c3d6:
    "Sicilian Defense: O'Kelly Variation, Venice System, Steiner Line",
  e4c5nf3a6b4: "Sicilian Defense: O'Kelly Variation, Wing Gambit",
  e4c5nf3a6nc3: "Sicilian Defense: O'Kelly Variation, Yerevan System",
  e4c5nf3nc6: 'Sicilian Defense: Old Sicilian',
  e4c5nf3nc6d4: 'Sicilian Defense: Open',
  e4c5nf3nc6d4cxd4: 'Sicilian Defense: Open, 2. Nf3 Nc6 3. d4 cxd4',
  e4c5nf3nc6d4cxd4nxd4: 'Sicilian Defense: Open, 3. d4 cxd4 4. Nxd4',
  e4c5nf3nc6d4cxd4nxd4nf6: 'Sicilian Defense: Open, 3. d4 cxd4 4. Nxd4 Nf6',
  e4c5nf3e6d4cxd4nxd4nc6: 'Sicilian Defense: Paulsen Variation',
  e4c5nf3e6d4cxd4nxd4nc6nc3a6:
    'Sicilian Defense: Paulsen Variation, 4. Nxd4 Nc6 5. Nc3 a6',
  'e4c5nf3e6d4cxd4nxd4nf6nc3nc6ndb5bb4nd6+':
    'Sicilian Defense: Paulsen Variation, American Attack',
  e4c5nf3e6d4cxd4nxd4nc6nc3qc7:
    'Sicilian Defense: Paulsen Variation, Bastrikov Variation',
  e4c5nf3e6d4cxd4nxd4nc6nc3qc7be3:
    'Sicilian Defense: Paulsen Variation, Bastrikov Variation, 5. Nc3 Qc7 6. Be3',
  e4c5nf3e6d4cxd4nxd4nc6nc3qc7be3a6be2:
    'Sicilian Defense: Paulsen Variation, Bastrikov Variation, 6. Be3 a6 7. Be2',
  e4c5nf3nc6d4cxd4nxd4qc7nc3e6be3a6f3:
    'Sicilian Defense: Paulsen Variation, Bastrikov Variation, English Attack',
  e4c5nf3e6d4cxd4nxd4nc6nc3qc7be3a6qd2:
    'Sicilian Defense: Paulsen Variation, Bastrikov Variation, English Attack, 6. Be3 a6 7. Qd2',
  e4c5nf3e6d4cxd4nxd4nc6nc3qc7ndb5qb8be3a6bb6:
    'Sicilian Defense: Paulsen Variation, Bastrikov Variation, Ponomariov Gambit',
  e4c5nf3e6d4cxd4nxd4nc6nb5d6c4nf6n1c3a6na3d5:
    'Sicilian Defense: Paulsen Variation, Gary Gambit',
  'e4c5nf3e6d4cxd4nxd4nc6nb5d6c4nf6n1c3a6na3be7be2o-oo-ob6':
    'Sicilian Defense: Paulsen Variation, Modern Line',
  e4c5nf3e6d4cxd4nxd4nc6nc3:
    'Sicilian Defense: Paulsen Variation, Normal Variation',
  e4c5nf3e6d4cxd4nxd4nc6nb5:
    'Sicilian Defense: Paulsen Variation, Szen Variation',
  e4c5nf3e6d4cxd4nxd4nc6nc3a6be2nge7:
    'Sicilian Defense: Paulsen Variation, Taimanov Variation',
  e4c5nf3e6d4cxd4nxd4bc5: 'Sicilian Defense: Paulsen-Basman Defense',
  e4c5nf3e6d4cxd4nxd4nf6nc3bb4: 'Sicilian Defense: Pin Variation',
  e4c5nf3e6d4cxd4nxd4nf6nc3bb4bd3e5:
    'Sicilian Defense: Pin Variation, Jaffe Variation',
  e4c5nf3e6d4cxd4nxd4nf6nc3bb4e5:
    'Sicilian Defense: Pin Variation, Koch Variation',
  e4c5nf3b5: 'Sicilian Defense: Polish Gambit',
  e4c5nf3d6d4cxd4nxd4nf6f3: 'Sicilian Defense: Prins Variation',
  'e4c5nf3d6d4cxd4nxd4nf6f3e5bb5+':
    'Sicilian Defense: Prins Variation, Venice Attack',
  e4c5nf3qc7: 'Sicilian Defense: Quinteros Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5: 'Sicilian Defense: Richter-Rauzer Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6qd3:
    'Sicilian Defense: Richter-Rauzer Variation, 6. Bg5 e6 7. Qd3',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6qd2be7:
    'Sicilian Defense: Richter-Rauzer Variation, Classical Variation',
  'e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6qd2be7o-o-oo-of4':
    'Sicilian Defense: Richter-Rauzer Variation, Classical Variation, 8. O-O-O O-O 9. f4',
  'e4c5nf3nc6d4cxd4nxd4nf6nc3d6bg5e6qd2be7o-o-oo-of4e5':
    'Sicilian Defense: Richter-Rauzer Variation, Classical Variation, 8. O-O-O O-O 9. f4 e5',
  'e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6qd2be7o-o-oo-of4nxd4qxd4':
    'Sicilian Defense: Richter-Rauzer Variation, Classical Variation, 9. f4 Nxd4 10. Qxd4',
  'e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6qd2be7o-o-onxd4qxd4a6f4b5':
    'Sicilian Defense: Richter-Rauzer Variation, Classical Variation, Kantscher Line',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6bg5g6:
    'Sicilian Defense: Richter-Rauzer Variation, Dragon Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6nxc6:
    'Sicilian Defense: Richter-Rauzer Variation, Exchange Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6qd2qb6:
    'Sicilian Defense: Richter-Rauzer Variation, Ivanov Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5bd7:
    'Sicilian Defense: Richter-Rauzer Variation, Modern Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6bg5bd7qd2:
    'Sicilian Defense: Richter-Rauzer Variation, Modern Variation, 6. Bg5 Bd7 7. Qd2',
  'e4c5nf3nc6d4cxd4nxd4nf6nc3d6bg5e6qd2a6o-o-obd7':
    'Sicilian Defense: Richter-Rauzer Variation, Neo-Modern Variation',
  'e4c5nf3nc6d4cxd4nxd4nf6nc3d6bg5e6qd2a6o-o-obd7f4be7':
    'Sicilian Defense: Richter-Rauzer Variation, Neo-Modern Variation, 8. O-O-O Bd7 9. f4 Be7',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6qd2a6:
    'Sicilian Defense: Richter-Rauzer Variation, Neo-Modern Variation, Early Deviations',
  'e4c5nf3nc6d4cxd4nxd4nf6nc3d6bg5e6qd2a6o-o-obd7f4be7nf3b5bxf6':
    'Sicilian Defense: Richter-Rauzer Variation, Neo-Modern Variation, Nyezhmetdinov Attack',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6bg5e6nb3:
    'Sicilian Defense: Richter-Rauzer Variation, Podebrady Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6qd2:
    'Sicilian Defense: Richter-Rauzer Variation, Traditional Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6bb5:
    'Sicilian Defense: Richter-Rauzer Variation, Vitolins Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6:
    'Sicilian Defense: Richter-Rauzer, 6... e6',
  'e4c5nf3d6d4cxd4nxd4nf6nc3nc6bg5e6qd2be7o-o-oo-of4nxd4':
    'Sicilian Defense: Richter-Rauzer, Rauzer Attack, 7... Be7 Defense: 9... Nxd4',
  e4c5nf3nc6bb5nb8:
    'Sicilian Defense: Rossolimo Variation, Brooklyn Retreat Defense',
  e4c5nf3e6d4cxd4nxd4nf6nc3d6: 'Sicilian Defense: Scheveningen Variation',
  e4c5nf3e6d4cxd4nxd4nf6nc3d6be2:
    'Sicilian Defense: Scheveningen Variation, Classical Variation',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6be2e6:
    'Sicilian Defense: Scheveningen Variation, Classical Variation, 5. Nc3 a6 6. Be2 e6',
  'e4c5nf3d6d4cxd4nxd4nf6nc3a6be2e6o-oqc7':
    'Sicilian Defense: Scheveningen Variation, Classical Variation, 6. Be2 e6 7. O-O Qc7',
  'e4c5nf3d6d4cxd4nxd4nf6nc3a6f4e6be2qc7o-onc6':
    'Sicilian Defense: Scheveningen Variation, Classical Variation, Paulsen Variation',
  'e4c5nf3e6d4cxd4nxd4nc6nc3qc7be2a6o-onf6be3d6f4':
    'Sicilian Defense: Scheveningen Variation, Classical Variation, Paulsen Variation, 8. Be3 d6 9. f4',
  'e4c5nf3e6d4cxd4nxd4nc6nc3qc7be2a6o-onf6kh1be7f4d6a4':
    'Sicilian Defense: Scheveningen Variation, Classical Variation, Paulsen Variation, 9. f4 d6 10. a4',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6be3e6g4:
    'Sicilian Defense: Scheveningen Variation, Delayed Keres Attack',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6be3e6g4e5nf5g6g5:
    'Sicilian Defense: Scheveningen Variation, Delayed Keres Attack, Perenyi Gambit',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6be3e6f3:
    'Sicilian Defense: Scheveningen Variation, English Attack',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6be3e6qd2:
    'Sicilian Defense: Scheveningen Variation, English Attack, 6. Be3 e6 7. Qd2',
  e4c5nf3e6d4cxd4nxd4nf6nc3d6g3:
    'Sicilian Defense: Scheveningen Variation, Fianchetto Variation',
  e4c5nf3e6d4cxd4nxd4nf6nc3d6g4:
    'Sicilian Defense: Scheveningen Variation, Keres Attack',
  e4c5nf3e6d4cxd4nxd4nf6nc3d6f4:
    'Sicilian Defense: Scheveningen Variation, Matanovic Attack',
  e4c5nf3e6d4cxd4nxd4nc6nc3d6be2nf6:
    'Sicilian Defense: Scheveningen Variation, Modern Variation',
  'e4c5nf3e6d4cxd4nxd4nf6nc3d6be2be7o-oo-of4nc6be3':
    'Sicilian Defense: Scheveningen Variation, Modern Variation, 8. f4 Nc6 9. Be3',
  'e4c5nf3e6d4cxd4nxd4nf6nc3d6be2be7o-oo-of4nc6be3bd7nb3':
    'Sicilian Defense: Scheveningen Variation, Modern Variation, 9. Be3 Bd7 10. Nb3',
  e4c5nf3e6d4cxd4nxd4nf6nc3d6f4nc6be3be7qf3:
    'Sicilian Defense: Scheveningen Variation, Tal Variation',
  'e4c5nf3e6d4cxd4nxd4nf6nc3d6bb5+':
    'Sicilian Defense: Scheveningen Variation, Vitolins Variation',
  'e4c5nf3e6d4cxd4nxd4nc6nc3qc7be2a6o-onf6be3be7f4d6qe1o-o':
    'Sicilian Defense: Scheveningen, Classical Main Line',
  e4c5d4: 'Sicilian Defense: Smith-Morra Gambit',
  e4c5d4cxd4c3: 'Sicilian Defense: Smith-Morra Gambit, 2. d4 cxd4 3. c3',
  'e4c5d4cxd4c3dxc3nxc3d6nf3e6bc4nf6o-oa6':
    'Sicilian Defense: Smith-Morra Gambit Accepted, Chicago Defense',
  'e4c5d4cxd4c3dxc3nxc3nc6nf3d6bc4a6o-onf6':
    'Sicilian Defense: Smith-Morra Gambit Accepted, Classical Formation',
  e4c5d4cxd4c3dxc3nxc3nc6nf3g6:
    'Sicilian Defense: Smith-Morra Gambit Accepted, Fianchetto Defense',
  e4c5d4cxd4c3dxc3nxc3e6nf3a6:
    'Sicilian Defense: Smith-Morra Gambit Accepted, Kan Formation',
  'e4c5d4cxd4c3dxc3nxc3nc6nf3e6bc4qc7qe2a6o-obd6':
    'Sicilian Defense: Smith-Morra Gambit Accepted, Larsen Defense',
  e4c5d4cxd4c3dxc3nxc3nc6nf3e6bc4bc5:
    'Sicilian Defense: Smith-Morra Gambit Accepted, Morphy Defense',
  'e4c5d4cxd4c3dxc3nxc3nc6nf3e6bc4a6o-ob5bb3bc5':
    'Sicilian Defense: Smith-Morra Gambit Accepted, Morphy Defense Deferred',
  e4c5d4cxd4c3dxc3nxc3nc6nf3e6bc4a6:
    'Sicilian Defense: Smith-Morra Gambit Accepted, Paulsen Formation',
  e4c5d4cxd4c3dxc3nxc3nc6nf3e6bc4bb4:
    'Sicilian Defense: Smith-Morra Gambit Accepted, Pin Defense',
  e4c5d4cxd4c3dxc3nxc3nc6nf3d6bc4e6:
    'Sicilian Defense: Smith-Morra Gambit Accepted, Scheveningen Formation',
  'e4c5d4cxd4c3dxc3nxc3nc6bc4e6nf3d6o-oa6qe2b5':
    'Sicilian Defense: Smith-Morra Gambit Accepted, Sozin Formation',
  e4c5d4cxd4c3dxc3nxc3e6bc4a6nf3ne7:
    'Sicilian Defense: Smith-Morra Gambit Accepted, Taimanov Formation',
  e4c5d4cxd4c3nf6:
    'Sicilian Defense: Smith-Morra Gambit Declined, Alapin Formation',
  e4c5c3e5d4cxd4:
    'Sicilian Defense: Smith-Morra Gambit Declined, Center Formation',
  e4c5d4cxd4c3d3c4:
    'Sicilian Defense: Smith-Morra Gambit Declined, Dubois Variation',
  e4c5d4cxd4c3d3:
    'Sicilian Defense: Smith-Morra Gambit Declined, Push Variation',
  e4c5d4cxd4c3d5:
    'Sicilian Defense: Smith-Morra Gambit Declined, Scandinavian Formation',
  e4c5d4cxd4c3qa5:
    'Sicilian Defense: Smith-Morra Gambit Declined, Wing Formation',
  e4c5nf3e6d4cxd4c3: 'Sicilian Defense: Smith-Morra Gambit Deferred',
  'e4c5d4cxd4c3dxc3nxc3nc6bc4e6nf3d6o-oa6qe2b5bb3ra7':
    'Sicilian Defense: Smith-Morra Gambit, Chicago Defense',
  e4c5d4cxd4c3dxc3nf3: 'Sicilian Defense: Smith-Morra Gambit, Danish Variation',
  e4c5b3: 'Sicilian Defense: Snyder Variation',
  e4c5b3b6: 'Sicilian Defense: Snyder Variation, Queen Fianchetto Variation',
  e4c5nf3e6d4cxd4nxd4nf6nc3d6bc4: 'Sicilian Defense: Sozin Attack',
  e4c5nf3d6d4cxd4nxd4nf6nc3a6bc4e6bb3b5:
    'Sicilian Defense: Sozin Attack, Flank Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6bc4e6:
    'Sicilian Defense: Sozin Attack, Leonhardt Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6bc4e6be3:
    'Sicilian Defense: Sozin Attack, Main Line',
  'e4c5nf3d6d4cxd4nxd4nf6nc3nc6bc4e6be3be7bb3o-oo-ona5f4b6':
    'Sicilian Defense: Sozin Attack, Main Line, Sherbakov Variation',
  'e4c5nf3nc6d4cxd4nxd4nf6nc3d6bc4e6bb3be7be3o-of4':
    'Sicilian Defense: Sozin, Fischer Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6bc4: 'Sicilian Defense: Sozin, not Scheveningen',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6nde2: 'Sicilian Defense: Spielmann Variation',
  e4c5c4: 'Sicilian Defense: Staunton-Cochrane Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6bc4e6be3be7qe2:
    'Sicilian Defense: Velimirovic Attack',
  'e4c5nf3d6d4cxd4nxd4nf6nc3e5bb5+': 'Sicilian Defense: Venice Attack',
  e4c5b4: 'Sicilian Defense: Wing Gambit',
  e4c5nf3e6b4: 'Sicilian Defense: Wing Gambit Deferred',
  e4c5b4cxb4bb2: 'Sicilian Defense: Wing Gambit, Abrahams Variation',
  e4c5b4cxb4a3bxa3: 'Sicilian Defense: Wing Gambit, Carlsbad Variation',
  e4c5nf3d6b4: 'Sicilian Defense: Wing Gambit, Deferred Variation',
  e4c5b4cxb4a3d5exd5qxd5bb2:
    'Sicilian Defense: Wing Gambit, Marienbad Variation',
  e4c5b4cxb4a3: 'Sicilian Defense: Wing Gambit, Marshall Variation',
  e4c5b4cxb4a3d5exd5qxd5nf3e5c4qe6bd3:
    'Sicilian Defense: Wing Gambit, Nanu Gambit',
  e4c5b4cxb4a3d5exd5qxd5nf3e5bb2nc6c4qe6:
    'Sicilian Defense: Wing Gambit, Romanian Defense',
  e4c5b4cxb4c4: 'Sicilian Defense: Wing Gambit, Santasiere Variation',
  e4c5nf3nc6d4cxd4nxd4nf6nc3d6bd3: 'Sicilian Defense: Yates Variation',
  d4d5c4c6: 'Slav Defense',
  d4d5c4c6nc3: 'Slav Defense, 2. c4 c6 3. Nc3',
  d4d5c4c6nc3dxc4: 'Slav Defense, 2. c4 c6 3. Nc3 dxc4',
  d4d5c4c6nf3nf6nc3dxc4a4: 'Slav Defense: Alapin Variation',
  d4d5c4c6nf3nf6nc3dxc4e3: 'Slav Defense: Alekhine Variation',
  d4d5c4c6nf3nf6bg5: 'Slav Defense: Bonet Gambit',
  d4d5c4c6nf3nf6nbd2: 'Slav Defense: Breyer Variation',
  d4d5c4c6nf3nf6nc3a6: 'Slav Defense: Chameleon Variation',
  d4d5c4c6nf3nf6nc3a6c5: 'Slav Defense: Chameleon Variation, Advance System',
  d4d5c4c6nf3nf6nc3dxc4a4bf5: 'Slav Defense: Czech Variation',
  d4d5c4c6nf3nf6nc3dxc4a4bf5nh4: 'Slav Defense: Czech Variation, Bled Attack',
  d4d5c4c6nf3nf6nc3dxc4a4bf5ne5nbd7nxc4qc7g3e5:
    'Slav Defense: Czech Variation, Carlsbad Variation',
  d4d5c4c6nf3nf6nc3dxc4a4bf5ne5nbd7nxc4qc7g3e5dxe5nxe5bf4nfd7bg2g5:
    'Slav Defense: Czech Variation, Carlsbad Variation, Morozevich Variation',
  d4d5c4c6nf3nf6nc3dxc4a4bf5e3:
    'Slav Defense: Czech Variation, Classical System',
  'd4d5c4c6nf3nf6nc3dxc4a4bf5e3e6bxc4bb4o-oo-oqe2':
    'Slav Defense: Czech Variation, Classical System, Main Line',
  d4d5c4c6nf3nf6nc3dxc4a4bf5ne5: 'Slav Defense: Czech Variation, Krause Attack',
  d4d5c4c6nf3nf6nc3dxc4a4bf5ne5na6e4:
    'Slav Defense: Czech Variation, Krause Attack, Fazekas Gambit',
  d4d5c4c6nf3nf6nc3dxc4a4bf5e3na6:
    'Slav Defense: Czech Variation, Lasker Variation',
  d4d5c4c6nf3nf6nc3dxc4a4bf5ne5e6:
    'Slav Defense: Czech Variation, Wiesbaden Variation',
  d4d5c4c6nf3nf6nc3dxc4a4bf5ne5e6f3bb4e4:
    'Slav Defense: Czech Variation, Wiesbaden Variation, Sharp Line',
  c4c6e4d5d4: 'Slav Defense: Diemer Gambit',
  d4d5c4c6cxd5: 'Slav Defense: Exchange Variation',
  d4d5c4c6nf3nf6cxd5cxd5:
    'Slav Defense: Exchange Variation, 3. Nf3 Nf6 4. cxd5 cxd5',
  d4d5nf3nf6e3bf5c4c6cxd5cxd5nc3:
    'Slav Defense: Exchange Variation, Schallopp Variation',
  d4d5c4c6cxd5cxd5nc3nf6nf3nc6bf4bf5:
    'Slav Defense: Exchange Variation, Symmetrical Line',
  d4d5c4c6nf3nf6cxd5cxd5nc3nc6bf4bf5e3e6qb3bb4:
    'Slav Defense: Exchange Variation, Trifunovic Variation',
  d4d5c4c6nf3nf6nc3dxc4e4: 'Slav Defense: Geller Gambit',
  d4d5c4c6nf3nf6nc3dxc4e4b5e5: 'Slav Defense: Geller Gambit, 5. e4 b5 6. e5',
  d4d5c4c6nf3nf6: 'Slav Defense: Modern',
  d4d5c4c6nf3: 'Slav Defense: Modern Line',
  d4d5c4c6nf3nf6e3: 'Slav Defense: Quiet Variation',
  d4d5c4c6nf3nf6e3bg4: 'Slav Defense: Quiet Variation, Pin Defense',
  d4d5c4c6nf3nf6e3bf5: 'Slav Defense: Quiet Variation, Schallopp Defense',
  d4d5c4c6nf3nf6nc3g6: 'Slav Defense: Schlechter Variation',
  d4d5c4c6nc3dxc4e4: 'Slav Defense: Slav Gambit, Alekhine Attack',
  d4d5c4c6nf3nf6nc3dxc4a4na6: 'Slav Defense: Smyslov Variation',
  d4d5c4c6nf3nf6nc3dxc4a4e6: 'Slav Defense: Soultanbeieff Variation',
  d4d5c4c6nf3nf6nc3dxc4a4bg4: 'Slav Defense: Steiner Variation',
  d4d5c4c6nf3nf6nc3qb6: 'Slav Defense: Suechting Variation',
  d4d5c4c6nf3nf6nc3: 'Slav Defense: Three Knights Variation',
  d4d5c4c6nf3nf6nc3dxc4: 'Slav Defense: Two Knights Attack',
  d4d5c4c6nc3e5: 'Slav Defense: Winawer Countergambit',
  d4d5c4c6nc3e5e4: 'Slav Defense: Winawer Countergambit, Anti-Winawer Gambit',
  d4nf6c4c6: 'Slav Indian',
  d4c6nf3nf6c4b5: 'Slav Indian: Kudischewitsch Gambit',
  na3: 'Sodium Attack',
  na3e5d3bxa3bxa3d5e3c5rb1: 'Sodium Attack: Celadon Variation',
  na3g6g4: 'Sodium Attack: Chenoboskion Variation',
  na3e5nc4nc6e4f5: 'Sodium Attack: Durkin Gambit',
  e4e5nf3nc6bb5g6c3f5: 'Spanish Opening: Fianchetto Defense, Kevitz Gambit',
  e4a6: 'St. George Defense',
  e4e6d4a6: 'St. George Defense, 2. d4 a6',
  e4e6d4a6c4b5: 'St. George Defense: New St. George, Sanky-George Gambit',
  e4e6d4a6c4: 'St. George Defense: New St. George, Three Pawn Attack',
  'e4e6d4a6nf3b5bd3c5c3bb7o-onf6':
    'St. George Defense: New St. George, Traditional Line',
  d4b5e4a6nf3bb7bd3e6: 'St. George Defense: Polish Variation',
  'e4a6d4b5nf3bb7bd3d6o-og6c3bg7': 'St. George Defense: San Jorge Variation',
  e4e6d4a6c4b5cxb5axb5: 'St. George Defense: St. George Gambit',
  e4a6d4e5: 'St. George Defense: Zilbermints Gambit',
  f4f5d4d5: 'System: Double Duck Formation',
  d4d5c4e6nc3c5: 'Tarrasch Defense',
  'd4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7o-oo-o':
    'Tarrasch Defense: Classical Variation',
  'd4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7o-oo-obg5c4':
    'Tarrasch Defense: Classical Variation, Advance Variation',
  'd4nf6c4e6nc3c5nf3d5cxd5exd5g3nc6bg2be7o-oo-obg5be6rc1c4':
    'Tarrasch Defense: Classical Variation, Bogoljubov Variation',
  'd4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7o-oo-obg5':
    'Tarrasch Defense: Classical Variation, Carlsbad Variation',
  'd4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7o-oo-obg5cxd4nxd4h6be3re8rc1be6':
    'Tarrasch Defense: Classical Variation, Chandler Variation',
  'd4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7o-oo-odxc5d4':
    'Tarrasch Defense: Classical Variation, Classical Tarrasch Gambit',
  'd4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7o-oo-obg5be6':
    'Tarrasch Defense: Classical Variation, Endgame Variation',
  'd4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7o-oo-obg5cxd4nxd4h6be3re8':
    'Tarrasch Defense: Classical Variation, Main Line',
  'd4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7o-oo-obg5cxd4nxd4re8':
    'Tarrasch Defense: Classical Variation, Petursson Variation',
  'd4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7o-oo-odxc5bxc5na4':
    'Tarrasch Defense: Classical Variation, Reti Variation',
  'd4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7o-oo-obg5cxd4nxd4h6be3bg4':
    'Tarrasch Defense: Classical Variation, Spassky Variation',
  d4d5c4e6nc3c5cxd5exd5nf3nc6dxc5d4na4b5: 'Tarrasch Defense: Gruenfeld Gambit',
  d4d5c4e6nc3c5cxd5exd5e4: 'Tarrasch Defense: Marshall Gambit',
  d4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6: 'Tarrasch Defense: Prague Variation',
  d4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2be7:
    'Tarrasch Defense: Prague Variation, Main Line',
  d4d5c4e6nc3c5cxd5exd5nf3nc6g3: 'Tarrasch Defense: Rubinstein System',
  d4d5c4e6nc3c5cxd5cxd4: 'Tarrasch Defense: Schara Gambit',
  d4d5c4e6nc3c5cxd5exd5nf3nc6g3c4: 'Tarrasch Defense: Swedish Variation',
  d4d5c4e6nc3c5cxd5exd5nf3nc6g3c4e4:
    'Tarrasch Defense: Swedish Variation, Central Break',
  d4nf6c4e6nf3c5e3d5nc3nc6: 'Tarrasch Defense: Symmetrical Variation',
  d4d5c4e6nc3c5cxd5exd5dxc5d4na4b5: 'Tarrasch Defense: Tarrasch Gambit',
  d4d5c4e6nc3c5cxd5exd5nf3: 'Tarrasch Defense: Two Knights Variation',
  d4d5c4e6nc3c5cxd5exd5nf3nc6g3nf6bg2bg4: 'Tarrasch Defense: Wagner Variation',
  d4d5c4e6nc3c5cxd5cxd4qxd4nc6qd1exd5qxd5be6:
    'Tarrasch Defense: von Hennig Gambit',
  e4e5nf3nc6be2nf6d4: 'Tayler Opening',
  e4e5nf3nc6nc3: 'Three Knights Opening',
  e4e5nf3nc6nc3bb4: 'Three Knights Opening, 2. Nf3 Nc6 3. Nc3 Bb4',
  e4e5nf3nc6nc3bb4nd5nf6: 'Three Knights Opening: Schlechter Variation',
  e4e5nf3nc6nc3g6: 'Three Knights Opening: Steinitz Defense',
  e4e5nf3nc6nc3g6d4exd4nd5:
    'Three Knights Opening: Steinitz-Rosenthal Variation',
  e4e5nf3nc6nc3f5: 'Three Knights Opening: Winawer Defense',
  d4nf6nf3: 'Torre Attack',
  d4nf6nf3e6bg5: 'Torre Attack, 2. Nf3 e6 3. Bg5',
  d4nf6nf3g6bg5: 'Torre Attack, 2. Nf3 g6 3. Bg5',
  d4nf6nf3e6bg5h6: 'Torre Attack: Classical Defense, Nimzowitsch Variation',
  d4nf6nf3e6bg5c5e3b6d5: 'Torre Attack: Classical Defense, Petrosian Gambit',
  d4nf6nf3g6bg5bg7nbd2c5: 'Torre Attack: Fianchetto Defense, Euwe Variation',
  d4nf6nf3e6bg5c5e4: 'Torre Attack: Wagner Gambit',
  d4nf6bg5: 'Trompowsky Attack',
  d4nf6bg5ne4bf4g5: 'Trompowsky Attack: Borg Variation',
  d4nf6bg5e6: 'Trompowsky Attack: Classical Defense',
  d4nf6bg5e6e4: 'Trompowsky Attack: Classical Defense, Big Center Variation',
  d4nf6bg5ne4bh4: 'Trompowsky Attack: Edge Variation',
  d4nf6bg5ne4bh4d5f3nf6nc3bf5e4:
    'Trompowsky Attack: Edge Variation, Hergert Gambit',
  d4nf6bg5ne4bh4c6nd2qa5c3nxd2qxd2d5e4:
    'Trompowsky Attack: Edge Variation, Hergert Gambit, 6. Qxd2 d5 7. e4',
  d4nf6bg5c5d5qb6nc3: 'Trompowsky Attack: Poisoned Pawn Variation',
  d4nf6bg5ne4h4: 'Trompowsky Attack: Raptor Variation',
  d4nf6bg5ne4h4nxg5hxg5e5:
    'Trompowsky Attack: Raptor Variation, Hergert Gambit',
  d3e5nd2: 'Valencia Opening',
  nc3: 'Van Geet Opening',
  a3e5nc3: 'Van Geet Opening: Battambang Variation',
  e4nc6d4d5nc3dxe4d5: 'Van Geet Opening: Berlin Gambit',
  nc3e5nf3bc5: 'Van Geet Opening: Billockus-Johansen Gambit',
  nc3d5e4c6h3: "Van Geet Opening: Caro-Kann Variation, St. Patrick's Attack",
  nc3d5f4e5: 'Van Geet Opening: Damhaug Gambit',
  nc3d5e4dxe4f3: 'Van Geet Opening: Dougherty Gambit',
  nc3c5b4: 'Van Geet Opening: Duesseldorf Gambit',
  nc3d5e4dxe4d3: 'Van Geet Opening: Dunst-Perrenet Gambit',
  nc3e5b3d5e4dxe4d3: 'Van Geet Opening: Gladbacher Gambit',
  e4d5nc3dxe4nxe4e5: 'Van Geet Opening: Gruenfeld Defense',
  e4e5f4d5nc3dxe4nxe4: 'Van Geet Opening: Gruenfeld Defense, Steiner Gambit',
  nc3d5e4dxe4bc4: 'Van Geet Opening: Hector Gambit',
  nc3d6f4e5fxe5nc6: 'Van Geet Opening: Hergert Gambit',
  nc3e5e3d5qh5be6: 'Van Geet Opening: Hulsemann Gambit',
  nc3d5f4d4ne4f5nf2nf6nf3c5b4: 'Van Geet Opening: Jendrossek Gambit',
  nc3f5e4fxe4d3: 'Van Geet Opening: Kluever Gambit',
  nc3b5: 'Van Geet Opening: Laroche Gambit',
  nc3e5e3d5qh5nf6: 'Van Geet Opening: Liebig Gambit',
  nc3d5f4d4ne4c5: 'Van Geet Opening: Melleby Gambit',
  nc3g6h4: 'Van Geet Opening: Myers Attack',
  nc3e5nf3nc6d4: 'Van Geet Opening: Napoleon Attack',
  nc3c5d4cxd4qxd4nc6qh4: 'Van Geet Opening: Novosibirsk Variation',
  e4e5f4exf4nc3: 'Van Geet Opening: Nowokunski Gambit',
  nc3d5f4d4ne4e5: 'Van Geet Opening: Pfeiffer Gambit',
  nc3d5f4d4ne4e5nf3:
    'Van Geet Opening: Pfeiffer Gambit, Sleipnir Countergambit',
  nc3e5: 'Van Geet Opening: Reversed Nimzowitsch',
  nc3e5d4exd4qxd4nc6qa4: 'Van Geet Opening: Reversed Scandinavian',
  nc3c5nf3nc6d4cxd4nxd4: 'Van Geet Opening: Sicilian Two Knights',
  nc3d5e3e5d4bb4: 'Van Geet Opening: Sleipnir Gambit',
  nc3nf6g4: 'Van Geet Opening: Tuebingen Gambit',
  nc3c5rb1: 'Van Geet Opening: Twyble Attack',
  nc3d5d3nf6g3: 'Van Geet Opening: Venezolana Variation',
  nc3d5f4g5: 'Van Geet Opening: Warsteiner Gambit',
  e3: "Van't Kruijs Opening",
  e3e5bc4b5bb3: "Van't Kruijs Opening: Bouncing Bishop Variation",
  e3d5nc3nf6a3e5f4exf4nf3: "Van't Kruijs Opening: Keoni-Hiva Gambit Delayed",
  e3e5nc3nf6f4exf4nf3:
    "Van't Kruijs Opening: Keoni-Hiva Gambit, Akahi Variation",
  e3e5nc3nc6f4exf4nf3:
    "Van't Kruijs Opening: Keoni-Hiva Gambit, Alua Variation",
  e3e5nc3d5f4exf4nf3:
    "Van't Kruijs Opening: Keoni-Hiva Gambit, Ekolu Variation",
  d3c5nc3nc6g3: 'Venezolana Opening',
  d4nf6nc3d5bg5c5bxf6gxf6e4dxe4d5: 'Veresov Opening: Malich Gambit',
  e4e5nc3: 'Vienna Game',
  e4e5nc3nf6bc4nxe4: 'Vienna Game, 2. Nc3 Nf6 3. Bc4 Nxe4',
  e4e5nc3nf6bc4nxe4qh5nd6bb3nc6d4: "Vienna Game: Adams' Gambit",
  e4e5nc3bc5: 'Vienna Game: Anderssen Defense',
  e4e5nc3nf6: 'Vienna Game: Falkbeer Variation',
  e4e5nc3nc6d4: 'Vienna Game: Fyfe Gambit',
  e4e5nc3bc5qg4: 'Vienna Game: Giraffe Attack',
  e4e5nc3nc6f4exf4nf3g5h4g4ng5d6:
    'Vienna Game: Hamppe-Allgaier Gambit, Alapin Variation',
  e4e5nc3bc5na4: 'Vienna Game: Hamppe-Meitner Variation',
  'e4e5nc3nc6f4exf4nf3g5bc4g4o-o': 'Vienna Game: Hamppe-Muzio Gambit',
  'e4e5nc3nc6f4exf4nf3g5bc4g4o-ogxf3qxf3ne5qxf4qf6':
    'Vienna Game: Hamppe-Muzio, Dubois Variation',
  e4e5nc3nf6f4d5fxe5nxe4qf3f5d4: 'Vienna Game: Heyde Variation',
  e4e5nc3nc6: 'Vienna Game: Max Lange Defense',
  e4e5nc3nf6a3: 'Vienna Game: Mengarini Variation',
  e4e5nc3nf6g3: 'Vienna Game: Mieses Variation',
  e4e5nc3nf6g3d5exd5c6: 'Vienna Game: Mieses Variation, Erben Gambit',
  e4e5nc3d6f4: 'Vienna Game: Omaha Gambit',
  e4e5nc3nc6g3: 'Vienna Game: Paulsen Variation',
  e4e5nc3nc6g3bc5bg2h5nf3h4: 'Vienna Game: Paulsen Variation, Mariotti Gambit',
  e4e5nc3nf6g3bc5bg2nc6nge2d5exd5:
    'Vienna Game: Paulsen Variation, Pollock Gambit',
  e4e5nc3nc6g3nf6bg2bc5nge2d5:
    'Vienna Game: Paulsen Variation: 3... Nf6 4. Bg2',
  e4e5nc3nc6d4f5: 'Vienna Game: Philidor Countergambit',
  'e4e5nc3nc6f4exf4nf3g5d4g4bc4gxf3o-od5exd5bg4dxc6':
    'Vienna Game: Pierce Gambit, Rushmere Attack',
  e4e5nc3nf6bc4: 'Vienna Game: Stanley Variation',
  e4e5nc3nf6bc4nxe4qh5nd6bb3be7nf3nc6nxe5:
    'Vienna Game: Stanley Variation, Alekhine Variation',
  e4e5nc3nc6bc4nf6f4nxe4nf3: 'Vienna Game: Stanley Variation, Bronstein Gambit',
  e4e5nc3nf6bc4bc5nge2b5: 'Vienna Game: Stanley Variation, Eifel Gambit',
  'e4e5nc3nf6bc4nxe4qh5nd6bb3nc6nb5g6qf3f5qd5qe7nxc7+kd8nxa8b6':
    'Vienna Game: Stanley Variation, Frankenstein-Dracula Variation',
  e4e5nc3nc6bc4bc5qg4qf6nd5:
    'Vienna Game: Stanley Variation, Meitner-Mieses Gambit',
  e4e5nc3nf6bc4nxe4qh5nd6bb3be7:
    'Vienna Game: Stanley Variation, Monster Declined',
  e4e5nc3nf6bc4bb4: 'Vienna Game: Stanley Variation, Reversed Spanish',
  e4e5nc3nc6bc4nf6: 'Vienna Game: Stanley Variation, Three Knights Variation',
  e4e5nc3nc6f4: 'Vienna Game: Vienna Gambit',
  e4e5nc3nf6f4: 'Vienna Game: Vienna Gambit, 2. Nc3 Nf6 3. f4',
  e4e5nc3nf6f4d5fxe5nxe4qf3f5:
    'Vienna Game: Vienna Gambit, Bardeleben Variation',
  e4e5nc3nf6f4d5fxe5nxe4nf3be7: 'Vienna Game: Vienna Gambit, Breyer Variation',
  e4e5nc3nc6f4exf4nf3be7: 'Vienna Game: Vienna Gambit, Cunningham Defense',
  e4e5nc3nc6f4exf4nf3g5h4g4ng5:
    'Vienna Game: Vienna Gambit, Hamppe-Allgaier Gambit',
  e4e5f4exf4nf3nc6nc3g5h4g4ng5h6nxf7kxf7d4:
    'Vienna Game: Vienna Gambit, Hamppe-Allgaier-Thorold Gambit',
  'e4e5nc3nc6f4exf4nf3g5bc4g4o-ogxf3':
    'Vienna Game: Vienna Gambit, Hamppe-Muzio Gambit',
  e4e5nc3nf6f4d5fxe5nxe4nf3bg4qe2:
    'Vienna Game: Vienna Gambit, Kaufmann Variation',
  e4e5nc3nf6f4d5: 'Vienna Game: Vienna Gambit, Main Line',
  e4e5nc3nf6f4d5fxe5nxe4d3: 'Vienna Game: Vienna Gambit, Modern Variation',
  e4e5nc3nf6f4d5fxe5nxe4qf3: 'Vienna Game: Vienna Gambit, Paulsen Attack',
  e4e5nc3nc6f4exf4nf3g5d4: 'Vienna Game: Vienna Gambit, Pierce Gambit',
  e4e5nc3nc6f4bc5fxe5d6: 'Vienna Game: Vienna Gambit, Quelle Gambit',
  e4e5nc3nc6f4exf4d4: 'Vienna Game: Vienna Gambit, Steinitz Gambit',
  'e4e5nc3nc6f4exf4d4qh4+ke2b6':
    'Vienna Game: Vienna Gambit, Steinitz Gambit, Fraser-Minckwitz Defense',
  e4e5nc3nc6f4exf4nf3:
    'Vienna Game: Vienna Gambit, Steinitz Gambit, Knight Variation',
  'e4e5nc3nc6f4exf4d4qh4+ke2':
    'Vienna Game: Vienna Gambit, Steinitz Gambit, Main Line',
  'e4e5nc3nc6f4exf4d4qh4+ke2d6':
    'Vienna Game: Vienna Gambit, Steinitz Gambit, Paulsen Defense',
  'e4e5nc3nc6f4exf4d4qh4+ke2g5':
    'Vienna Game: Vienna Gambit, Steinitz Gambit, Soerensen Defense',
  'e4e5nc3nc6f4exf4d4qh4+ke2d5':
    'Vienna Game: Vienna Gambit, Steinitz Gambit, Zukertort Defense',
  e4e5nc3nf6f4d5d3: 'Vienna Game: Vienna Gambit, Steinitz Variation',
  'e4e5nc3nf6f4d5fxe5nxe4d3qh4+g3nxg3nf3qh5nxd5':
    'Vienna Game: Vienna Gambit, Wurzburger Trap',
  e4e5nc3bb4: 'Vienna Game: Zhuravlev Countergambit',
  e4e5nc3bb4qg4: 'Vienna Game: Zhuravlev Countergambit, 2. Nc3 Bb4 3. Qg4',
  e4e5nc3bb4qg4nf6:
    'Vienna Game: Zhuravlev Countergambit, 2. Nc3 Bb4 3. Qg4 Nf6',
  d4nf6c4c5d5ne4: 'Vulture Defense',
  d4d6nf3bg4: 'Wade Defense',
  e4a5: 'Ware Defense',
  e4a5d4nc6: 'Ware Defense: Snagglepuss Defense',
  a4: 'Ware Opening',
  a4b6d4d5nc3nd7: 'Ware Opening: Cologne Gambit',
  a4e5ra3: 'Ware Opening: Meadow Hay Trap',
  a4e5a5d5e3f5a6: 'Ware Opening: Ware Gambit',
  a4b5axb5bb7: 'Ware Opening: Wing Gambit',
  d4nf6nf3e6e3: 'Yusupov-Rubinstein System',
  d4nc6d5nb8e4nf6e5ng8: 'Zaire Defense',
  nf3na6e4nh6: 'Zukertort Defense: Drunken Cavalry Variation',
  d4g6nf3nh6: 'Zukertort Defense: Kingside Variation',
  e4na6nf3c5: 'Zukertort Defense: Sicilian Knight Variation',
  nf3nf6nc3nc6: 'Zukertort Opening',
  nf3d5rg1: 'Zukertort Opening: Ampel Variation',
  nf3f6: 'Zukertort Opening: Arctic Defense',
  nf3f6e4nh6d4nf7:
    'Zukertort Opening: Arctic Defense, Drunken Knight Variation',
  nf3h6: 'Zukertort Opening: Basman Defense',
  nf3nc6: 'Zukertort Opening: Black Mustang Defense',
  'nf3nf6g3g6b3bg7bb2o-obg2d6o-o':
    'Zukertort Opening: Double Fianchetto Attack',
  nf3f5: 'Zukertort Opening: Dutch Variation',
  'nf3d5g3c5bg2nc6d4e6o-o': 'Zukertort Opening: Gruenfeld Reversed',
  nf3g5: 'Zukertort Opening: Herrstrom Gambit',
  nf3g6: 'Zukertort Opening: Kingside Fianchetto',
  nf3nf6e4: 'Zukertort Opening: Lemberger Gambit',
  nf3f5e4: 'Zukertort Opening: Lisitsyn Gambit',
  nf3f5d3nf6e4: 'Zukertort Opening: Lisitsyn Gambit Deferred',
  nf3nf6a4g6b4: 'Zukertort Opening: Myers Polish Attack',
  nf3nf6b3: 'Zukertort Opening: Nimzo-Larsen Variation',
  nf3d5d3: 'Zukertort Opening: Old Indian Attack',
  nf3d5e3c5c4dxc4b3: 'Zukertort Opening: Pachman Gambit',
  nf3d6: 'Zukertort Opening: Pirc Invitation',
  nf3b5: 'Zukertort Opening: Polish Defense',
  nf3e6: "Zukertort Opening: Queen's Gambit Invitation",
  nf3b6: 'Zukertort Opening: Queenside Fianchetto Variation',
  nf3nf6e3: 'Zukertort Opening: Quiet System',
  nf3d5b3c5c4dxc4nc3: 'Zukertort Opening: Regina-Nu Gambit',
  nc3d5nf3: 'Zukertort Opening: Reversed Mexican Defense',
  nf3e5: 'Zukertort Opening: Ross Gambit',
  b4d5nf3: "Zukertort Opening: Santasiere's Folly",
  nf3e6c4a6nc3c5g3b5: 'Zukertort Opening: Shabalov Gambit',
  nf3c5: 'Zukertort Opening: Sicilian Invitation',
  nf3c6: 'Zukertort Opening: Slav Invitation',
  nf3c5d4cxd4e3: 'Zukertort Opening: Speelsmet Gambit',
  nf3a6: 'Zukertort Opening: St. George Defense',
  e4d5nf3: 'Zukertort Opening: Tennison Gambit',
  nf3d5a4: 'Zukertort Opening: The Potato',
  nf3e5nxe5nc6nxc6dxc6: 'Zukertort Opening: The Walrus',
  nf3d6d4e5: 'Zukertort Opening: Vos Gambit',
  nf3d6e4bg4: 'Zukertort Opening: Wade Defense',
  d4d6nf3bg4c4nd7qb3rb8: 'Zukertort Opening: Wade Defense, Chigorin Plan',
  nf3a5: 'Zukertort Opening: Ware Defense',
}

export default ECO
