export type Level = 'easy' | 'medium' | 'hard';

export interface PuzzleData {
    board: string;
    solutionUrl: string;
    minMoves: number;
}

export const puzzles: Record<Level, PuzzleData[]> = {
    easy: [
        { board: `6,6
#, 0, 3
X, 0, 2, H, 2
B, 1, 0, H, 3
C, 4, 0, H, 2
E, 2, 3, H, 2
F, 1, 5, H, 3
G, 4, 5, H, 2
H, 0, 0, V, 2
I, 2, 1, V, 2
J, 3, 1, V, 2
K, 5, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#HBBBCCHoIJoKAAIJoKxoEEoooooooooFFFGG/7', minMoves: 7 },
        { board: `6,6
#, 4, 4
X, 0, 2, H, 2
B, 4, 0, H, 2
C, 0, 3, H, 2
D, 2, 3, H, 2
F, 3, 0, V, 3
G, 4, 2, V, 2
H, 5, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oooFBBoooFoHAAoFGHCCDDGoooooxooooooo/7', minMoves: 7 },
        { board: `6,6
#, 0, 1
#, 3, 4
X, 0, 2, H, 2
C, 1, 1, H, 2
D, 1, 4, H, 2
F, 0, 3, V, 2
G, 2, 2, V, 2
H, 3, 0, V, 2
I, 4, 0, V, 3
J, 5, 0, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oooHIJxCCHIJAAGoIJFoGoooFDDxoooooooo/7', minMoves: 7 },
        { board: `6,6
#, 1, 2
X, 2, 2, H, 2
C, 2, 0, H, 3
D, 1, 1, H, 2
E, 3, 1, H, 2
F, 2, 4, H, 3
G, 0, 5, H, 2
H, 0, 0, V, 2
I, 0, 2, V, 2
J, 1, 3, V, 2
K, 4, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#HoCCCoHDDEEoIxAAKoIJooKooJFFFoGGoooo/8', minMoves: 8 },
        { board: `6,6
#, 5, 0
#, 1, 5
X, 1, 2, H, 2
B, 1, 0, H, 2
C, 3, 0, H, 2
E, 4, 3, H, 2
G, 2, 5, H, 2
H, 4, 5, H, 2
I, 0, 0, V, 3
J, 0, 3, V, 2
K, 2, 3, V, 2
L, 4, 1, V, 2
M, 5, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#IBBCCxIoooLMIAAoLMJoKoEEJoKooooxGGHH/8', minMoves: 8 },
        { board: `6,6
#, 2, 0
#, 1, 1
X, 1, 2, H, 2
C, 3, 0, H, 2
E, 2, 1, H, 2
F, 4, 3, H, 2
G, 2, 5, H, 3
H, 0, 2, V, 2
I, 0, 4, V, 2
J, 1, 4, V, 2
K, 3, 2, V, 2
L, 4, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooxCCooxEELoHAAKLoHooKFFIJooooIJGGGo/8', minMoves: 8 },
        { board: `6,6
#, 1, 0
X, 0, 2, H, 2
C, 2, 0, H, 3
D, 0, 1, H, 2
E, 2, 4, H, 2
F, 4, 4, H, 2
G, 0, 3, V, 3
H, 1, 3, V, 3
I, 4, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oxCCCoDDooIoAAooIoGHooooGHEEFFGHoooo/8', minMoves: 8 },
        { board: `6,6
X, 0, 2, H, 2
B, 1, 0, H, 3
C, 4, 0, H, 2
D, 4, 3, H, 2
E, 0, 0, V, 2
F, 2, 1, V, 3
G, 3, 1, V, 2
H, 3, 3, V, 2
I, 5, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#EBBBCCEoFGoIAAFGoIooFHDDoooHoooooooo/9', minMoves: 9 },
        { board: `6,6
X, 2, 2, H, 2
B, 2, 0, H, 2
C, 4, 0, H, 2
D, 2, 3, H, 3
E, 4, 4, H, 2
F, 0, 5, H, 2
G, 0, 0, V, 2
H, 1, 0, V, 2
I, 1, 2, V, 3
J, 4, 1, V, 2
K, 5, 1, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#GHBBCCGHooJKoIAAJKoIDDDKoIooEEFFoooo/10', minMoves: 10 },
        { board: `6,6
#, 2, 1
X, 1, 2, H, 2
B, 1, 0, H, 3
D, 3, 1, H, 2
E, 2, 4, H, 3
F, 0, 5, H, 2
G, 2, 5, H, 3
H, 0, 0, V, 2
I, 0, 2, V, 3
J, 3, 2, V, 2
K, 4, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#HBBBooHoxDDoIAAJKoIooJKoIoEEEoFFGGGo/10', minMoves: 10 },
        { board: `6,6
#, 4, 0
X, 0, 2, H, 2
B, 1, 0, H, 3
D, 1, 1, H, 3
E, 0, 3, H, 2
F, 1, 4, H, 2
G, 3, 4, H, 2
H, 0, 0, V, 2
I, 3, 2, V, 2
J, 4, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#HBBBxoHDDDJoAAoIJoEEoIoooFFGGooooooo/10', minMoves: 10 },
        { board: `6,6
#, 5, 1
#, 1, 3
X, 0, 2, H, 2
B, 2, 0, H, 3
E, 2, 3, H, 2
F, 2, 5, H, 2
G, 4, 5, H, 2
H, 0, 0, V, 2
I, 1, 4, V, 2
J, 2, 1, V, 2
K, 3, 1, V, 2
L, 4, 2, V, 2
M, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#HoBBBoHoJKoxAAJKLMoxEELMoIoooooIFFGG/10', minMoves: 10 },
        { board: `6,6
X, 2, 2, H, 2
B, 1, 0, H, 3
C, 4, 4, H, 2
D, 0, 5, H, 3
E, 1, 1, V, 3
F, 3, 4, V, 2
G, 4, 0, V, 2
H, 4, 2, V, 2
I, 5, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oBBBGooEooGIoEAAHIoEooHooooFCCDDDFoo/10', minMoves: 10 },
        { board: `6,6
X, 2, 2, H, 2
B, 1, 0, H, 3
C, 1, 1, H, 3
D, 4, 3, H, 2
E, 4, 4, H, 2
F, 3, 3, V, 3
G, 4, 1, V, 2
H, 5, 0, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oBBBoHoCCCGHooAAGHoooFDDoooFEEoooFoo/10', minMoves: 10 },
        { board: `6,6
#, 5, 0
#, 0, 2
X, 1, 2, H, 2
C, 1, 0, H, 3
E, 1, 3, H, 2
F, 3, 3, H, 3
G, 0, 5, H, 3
H, 3, 5, H, 2
I, 0, 3, V, 2
J, 3, 1, V, 2
K, 4, 1, V, 2
L, 5, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oCCCoxoooJKLxAAJKLIEEFFFIoooooGGGHHo/10', minMoves: 10 },
        { board: `6,6
X, 0, 2, H, 2
B, 4, 5, H, 2
C, 1, 4, V, 2
D, 2, 1, V, 2
E, 2, 3, V, 3
F, 3, 3, V, 3
G, 4, 1, V, 2
H, 5, 0, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oooooHooDoGHAADoGHooEFoooCEFoooCEFBB/10', minMoves: 10 },
        { board: `6,6
#, 2, 0
X, 0, 2, H, 2
C, 1, 3, H, 3
D, 4, 5, H, 2
E, 0, 3, V, 2
F, 2, 1, V, 2
G, 3, 4, V, 2
H, 4, 1, V, 2
I, 5, 1, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooxoooooFoHIAAFoHIECCCoIEooGoooooGDD/10', minMoves: 10 },
        { board: `6,6
#, 2, 0
X, 0, 2, H, 2
C, 0, 3, H, 3
D, 1, 5, H, 2
E, 3, 5, H, 3
F, 0, 4, V, 2
G, 2, 1, V, 2
H, 4, 1, V, 2
I, 5, 1, V, 2
J, 5, 3, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooxoooooGoHIAAGoHICCCooJFooooJFDDEEE/10', minMoves: 10 },
        { board: `6,6
#, 0, 0
#, 5, 0
X, 0, 2, H, 2
C, 1, 0, H, 2
E, 1, 1, H, 2
F, 0, 3, H, 2
G, 3, 3, H, 2
H, 3, 5, H, 2
I, 2, 2, V, 2
J, 2, 4, V, 2
K, 3, 0, V, 2
L, 4, 0, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#xCCKLxoEEKLoAAIoooFFIGGoooJoooooJHHo/10', minMoves: 10 },
        { board: `6,6
#, 0, 0
X, 2, 2, H, 2
C, 1, 0, H, 2
D, 3, 4, H, 2
E, 3, 5, H, 2
F, 0, 1, V, 2
G, 1, 1, V, 2
H, 2, 3, V, 2
I, 4, 0, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#xCCoIoFGooIoFGAAIoooHoooooHDDooooEEo/10', minMoves: 10 },
    ],
    medium: [
        { board: `6,6
#, 3, 1
#, 0, 3
X, 1, 2, H, 2
B, 0, 0, H, 2
E, 4, 3, H, 2
F, 3, 4, H, 3
G, 0, 1, V, 2
H, 2, 3, V, 2
I, 3, 2, V, 2
J, 4, 0, V, 2
K, 5, 0, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#BBooJKGooxJKGAAIoKxoHIEEooHFFFoooooo/11', minMoves: 11 },
        { board: `6,6
#, 2, 3
#, 1, 4
X, 3, 2, H, 2
B, 1, 0, H, 2
C, 3, 0, H, 2
D, 3, 1, H, 2
G, 4, 4, H, 2
H, 0, 0, V, 3
I, 2, 1, V, 2
J, 3, 3, V, 2
K, 5, 0, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#HBBCCKHoIDDKHoIAAKooxJoooxoJGGoooooo/11', minMoves: 11 },
        { board: `6,6
#, 5, 4
X, 0, 2, H, 2
B, 1, 0, H, 2
C, 3, 0, H, 3
D, 1, 1, H, 2
E, 3, 1, H, 3
G, 1, 5, H, 2
H, 3, 5, H, 2
I, 0, 3, V, 3
J, 4, 2, V, 3
K, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oBBCCCoDDEEEAAooJKIoooJKIoooJxIGGHHo/11', minMoves: 11 },
        { board: `6,6
#, 5, 0
X, 0, 2, H, 2
B, 2, 0, H, 3
D, 0, 1, H, 3
E, 3, 3, H, 3
F, 2, 4, H, 2
G, 2, 5, H, 2
H, 4, 5, H, 2
I, 1, 3, V, 3
J, 2, 2, V, 2
K, 4, 1, V, 2
L, 5, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooBBBxDDDoKLAAJoKLoIJEEEoIFFoooIGGHH/11', minMoves: 11 },
        { board: `6,6
X, 1, 2, H, 2
B, 3, 0, H, 3
C, 1, 1, H, 2
D, 4, 1, H, 2
E, 3, 3, H, 2
F, 3, 4, H, 2
G, 0, 5, H, 3
H, 2, 3, V, 2
I, 3, 1, V, 2
J, 5, 2, V, 2
K, 5, 4, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oooBBBoCCIDDoAAIoJooHEEJooHFFKGGGooK/11', minMoves: 11 },
        { board: `6,6
#, 2, 5
X, 1, 2, H, 2
B, 1, 0, H, 2
C, 4, 0, H, 2
D, 0, 4, H, 2
F, 3, 5, H, 2
G, 0, 0, V, 2
H, 0, 2, V, 2
I, 3, 0, V, 3
J, 4, 1, V, 2
K, 4, 3, V, 2
L, 5, 2, V, 2
M, 5, 4, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#GBBICCGooIJoHAAIJLHoooKLDDooKMooxFFM/12', minMoves: 12 },
        { board: `6,6
#, 4, 0
#, 5, 1
X, 1, 2, H, 2
B, 1, 0, H, 2
E, 3, 3, H, 2
F, 0, 5, H, 2
G, 4, 5, H, 2
H, 0, 0, V, 2
I, 0, 2, V, 3
J, 2, 3, V, 3
K, 3, 4, V, 2
L, 5, 2, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#HBBoxoHooooxIAAooLIoJEELIoJKoLFFJKGG/12', minMoves: 12 },
        { board: `6,6
#, 4, 4
X, 0, 2, H, 2
B, 2, 0, H, 3
C, 2, 1, H, 2
D, 4, 1, H, 2
E, 0, 3, H, 2
G, 1, 5, H, 3
H, 4, 5, H, 2
I, 0, 0, V, 2
J, 1, 0, V, 2
K, 4, 2, V, 2
L, 5, 2, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#IJBBBoIJCCDDAAooKLEEooKLooooxLoGGGHH/12', minMoves: 12 },
        { board: `6,6
#, 5, 0
#, 2, 1
X, 1, 2, H, 2
D, 0, 3, H, 2
E, 2, 3, H, 2
F, 4, 4, H, 2
G, 2, 4, V, 2
H, 3, 4, V, 2
I, 4, 1, V, 3
J, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oooooxooxoIooAAoIJDDEEIJooGHFFooGHoo/12', minMoves: 12 },
        { board: `6,6
#, 2, 0
#, 0, 3
X, 2, 2, H, 2
C, 4, 0, H, 2
E, 3, 3, H, 2
F, 1, 5, H, 2
G, 0, 0, V, 3
H, 0, 4, V, 2
I, 1, 1, V, 2
J, 2, 3, V, 2
K, 3, 4, V, 2
L, 4, 1, V, 2
M, 5, 1, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#GoxoCCGIooLMGIAALMxoJEEMHoJKooHFFKoo/13', minMoves: 13 },
        { board: `6,6
#, 5, 4
X, 1, 2, H, 2
B, 1, 0, H, 3
C, 4, 0, H, 2
D, 2, 1, H, 2
E, 4, 1, H, 2
G, 0, 5, H, 2
H, 3, 5, H, 2
I, 0, 0, V, 2
J, 0, 2, V, 3
K, 2, 4, V, 2
L, 3, 2, V, 3
M, 4, 2, V, 2
N, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#IBBBCCIoDDEEJAALMNJooLMNJoKLoxGGKHHo/13', minMoves: 13 },
        { board: `6,6
#, 0, 3
X, 0, 2, H, 2
B, 4, 1, H, 2
D, 2, 5, H, 2
E, 0, 4, V, 2
F, 1, 4, V, 2
G, 2, 0, V, 3
H, 3, 0, V, 2
I, 3, 2, V, 2
J, 4, 2, V, 2
K, 4, 4, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooGHooooGHBBAAGIJoxooIJoEFooKoEFDDKo/13', minMoves: 13 },
        { board: `6,6
X, 0, 2, H, 2
B, 0, 0, H, 3
C, 0, 1, H, 2
D, 2, 3, H, 3
E, 4, 4, H, 2
F, 0, 5, H, 2
G, 1, 3, V, 2
H, 3, 4, V, 2
I, 4, 0, V, 3
J, 5, 0, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#BBBoIJCCooIJAAooIJoGDDDooGoHEEFFoHoo/14', minMoves: 14 },
        { board: `6,6
#, 3, 1
#, 0, 3
X, 1, 2, H, 2
B, 2, 0, H, 3
E, 1, 3, H, 2
F, 3, 4, H, 2
G, 2, 4, V, 2
H, 3, 2, V, 2
I, 4, 1, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooBBBooooxIooAAHIoxEEHIoooGFFoooGooo/14', minMoves: 14 },
        { board: `6,6
X, 0, 2, H, 2
B, 0, 0, H, 3
C, 0, 1, H, 3
D, 1, 4, H, 2
E, 0, 3, V, 2
F, 2, 2, V, 2
G, 4, 1, V, 2
H, 4, 3, V, 2
I, 5, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#BBBoooCCCoGIAAFoGIEoFoHoEDDoHooooooo/15', minMoves: 15 },
        { board: `6,6
#, 1, 0
X, 2, 2, H, 2
C, 4, 0, H, 2
D, 3, 3, H, 2
E, 0, 5, H, 3
F, 0, 1, V, 2
G, 1, 1, V, 3
H, 2, 3, V, 2
I, 3, 0, V, 2
J, 3, 4, V, 2
K, 4, 1, V, 2
L, 5, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oxoICCFGoIKLFGAAKLoGHDDoooHJooEEEJoo/15', minMoves: 15 },
        { board: `6,6
#, 4, 0
#, 4, 5
X, 0, 2, H, 2
C, 0, 1, H, 3
D, 3, 3, H, 2
E, 2, 4, H, 2
F, 2, 5, H, 2
H, 1, 4, V, 2
I, 2, 2, V, 2
J, 4, 1, V, 2
K, 5, 0, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooooxKCCCoJKAAIoJoooIDDooHEEoooHFFxo/16', minMoves: 16 },
        { board: `6,6
#, 1, 0
#, 1, 3
X, 1, 2, H, 2
C, 2, 0, H, 3
E, 3, 3, H, 2
F, 3, 4, H, 3
G, 1, 5, H, 3
H, 4, 5, H, 2
I, 2, 3, V, 2
J, 3, 1, V, 2
K, 5, 0, V, 2
L, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oxCCCKoooJoKoAAJoLoxIEELooIFFFoGGGHH/16', minMoves: 16 },
        { board: `6,6
X, 1, 2, H, 2
B, 4, 0, H, 2
C, 0, 3, H, 2
D, 2, 3, H, 2
E, 1, 4, H, 2
F, 3, 4, H, 2
G, 2, 5, H, 3
H, 0, 4, V, 2
I, 2, 0, V, 2
J, 3, 0, V, 2
K, 4, 1, V, 3
L, 5, 1, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooIJBBooIJKLoAAoKLCCDDKoHEEFFoHoGGGo/19', minMoves: 19 },
        { board: `6,6
#, 0, 0
#, 0, 2
X, 3, 2, H, 2
D, 1, 0, H, 2
E, 1, 1, H, 2
F, 4, 3, H, 2
G, 4, 4, H, 2
H, 1, 5, H, 2
I, 3, 5, H, 2
J, 2, 2, V, 2
K, 3, 0, V, 2
L, 3, 3, V, 2
M, 5, 0, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#xDDKoMoEEKoMxoJAAMooJLFFoooLGGoHHIIo/20', minMoves: 20 },
    ],
    hard: [
        { board: `6,6
#, 5, 4
X, 2, 2, H, 2
B, 0, 0, H, 3
C, 0, 1, H, 3
D, 3, 4, H, 2
F, 0, 5, H, 3
G, 0, 2, V, 3
H, 1, 2, V, 3
I, 2, 3, V, 2
J, 4, 0, V, 3
K, 5, 0, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#BBBoJKCCCoJKGHAAJoGHIoooGHIDDxFFFooo/21', minMoves: 21 },
        { board: `6,6
#, 2, 0
#, 5, 4
X, 3, 2, H, 2
C, 4, 0, H, 2
D, 0, 3, H, 3
E, 1, 4, H, 2
G, 1, 5, H, 2
H, 3, 5, H, 2
I, 1, 1, V, 2
J, 2, 1, V, 2
K, 3, 0, V, 2
L, 4, 3, V, 2
M, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooxKCCoIJKoooIJAAMDDDoLMoEEoLxoGGHHo/21', minMoves: 21 },
        { board: `6,6
#, 0, 0
#, 5, 5
X, 2, 2, H, 2
C, 3, 0, H, 2
D, 0, 3, H, 3
E, 3, 5, H, 2
G, 0, 1, V, 2
H, 1, 1, V, 2
I, 2, 0, V, 2
J, 2, 4, V, 2
K, 3, 3, V, 2
L, 4, 1, V, 3
M, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#xoICCoGHIoLoGHAALMDDDKLMooJKooooJEEx/21', minMoves: 21 },
        { board: `6,6
#, 0, 0
#, 3, 4
X, 1, 2, H, 2
C, 3, 0, H, 2
D, 3, 1, H, 2
E, 4, 3, H, 2
F, 0, 4, H, 2
H, 4, 4, H, 2
I, 0, 1, V, 3
J, 2, 0, V, 2
K, 3, 2, V, 2
L, 5, 0, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#xoJCCLIoJDDLIAAKooIooKEEFFoxHHoooooo/21', minMoves: 21 },
        { board: `6,6
#, 2, 5
X, 1, 2, H, 2
B, 0, 0, H, 2
C, 1, 1, H, 2
D, 0, 3, H, 2
E, 3, 4, H, 3
G, 0, 1, V, 2
H, 2, 3, V, 2
I, 4, 0, V, 2
J, 4, 2, V, 2
K, 5, 0, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#BBooIKGCCoIKGAAoJKDDHoJoooHEEEooxooo/22', minMoves: 22 },
        { board: `6,6
X, 1, 2, H, 2
B, 0, 3, H, 3
C, 3, 4, H, 2
D, 0, 5, H, 2
E, 3, 5, H, 2
F, 0, 0, V, 3
G, 2, 4, V, 2
H, 3, 0, V, 2
I, 3, 2, V, 2
J, 4, 1, V, 3
K, 5, 1, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#FooHooFooHJKFAAIJKBBBIJKooGCCoDDGEEo/22', minMoves: 22 },
        { board: `6,6
#, 0, 3
#, 5, 5
X, 3, 2, H, 2
B, 1, 0, H, 2
C, 3, 0, H, 2
E, 1, 3, H, 2
F, 4, 4, H, 2
H, 0, 0, V, 3
I, 2, 1, V, 2
J, 3, 3, V, 2
K, 5, 0, V, 2
L, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#HBBCCKHoIooKHoIAALxEEJoLoooJFFooooox/22', minMoves: 22 },
        { board: `6,6
#, 5, 0
#, 1, 3
X, 1, 2, H, 2
B, 0, 0, H, 2
C, 2, 0, H, 2
E, 4, 1, H, 2
G, 2, 3, H, 2
H, 1, 4, H, 2
I, 3, 4, H, 2
J, 0, 1, V, 2
K, 0, 3, V, 2
L, 3, 1, V, 2
M, 4, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#BBCCoxJooLEEJAALMoKxGGMoKHHIIooooooo/23', minMoves: 23 },
        { board: `6,6
#, 5, 0
#, 2, 4
X, 3, 2, H, 2
B, 1, 0, H, 2
D, 1, 3, H, 2
F, 4, 4, H, 2
G, 0, 5, H, 2
H, 2, 5, H, 3
I, 0, 0, V, 2
J, 0, 2, V, 3
K, 1, 1, V, 2
L, 2, 1, V, 2
M, 3, 3, V, 2
N, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#IBBooxIKLoooJKLAANJDDMoNJoxMFFGGHHHo/23', minMoves: 23 },
        { board: `6,6
#, 4, 0
#, 1, 1
X, 0, 2, H, 2
B, 1, 0, H, 2
E, 4, 1, H, 2
F, 3, 3, H, 2
G, 1, 4, H, 2
H, 0, 5, H, 2
I, 0, 0, V, 2
J, 0, 3, V, 2
K, 2, 1, V, 3
L, 3, 4, V, 2
M, 5, 2, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#IBBoxoIxKoEEAAKooMJoKFFMJGGLoMHHoLoo/23', minMoves: 23 },
        { board: `6,6
#, 4, 0
#, 5, 4
X, 0, 2, H, 2
C, 0, 1, H, 2
D, 2, 1, H, 2
E, 3, 3, H, 2
F, 2, 4, H, 2
H, 0, 5, H, 2
I, 2, 5, H, 3
J, 1, 3, V, 2
K, 2, 2, V, 2
L, 4, 1, V, 2
M, 5, 0, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooooxMCCDDLMAAKoLooJKEEooJFFoxHHIIIo/23', minMoves: 23 },
        { board: `6,6
#, 2, 0
#, 3, 1
X, 0, 2, H, 2
C, 0, 1, H, 2
E, 1, 3, H, 2
F, 3, 3, H, 2
G, 1, 4, H, 2
H, 0, 5, H, 2
I, 0, 3, V, 2
J, 2, 1, V, 2
K, 3, 4, V, 2
L, 4, 0, V, 3
M, 5, 1, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooxoLoCCJxLMAAJoLMIEEFFMIGGKooHHoKoo/23', minMoves: 23 },
        { board: `6,6
#, 0, 0
#, 0, 4
X, 1, 2, H, 2
C, 3, 0, H, 3
D, 2, 3, H, 2
E, 4, 3, H, 2
G, 2, 4, H, 2
H, 0, 5, H, 2
I, 0, 2, V, 2
J, 1, 3, V, 2
K, 2, 0, V, 2
L, 3, 1, V, 2
M, 4, 4, V, 2
N, 5, 4, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#xoKCCCooKLooIAALooIJDDEExJGGMNHHooMN/23', minMoves: 23 },
        { board: `6,6
#, 5, 0
#, 5, 1
X, 1, 2, H, 2
B, 2, 0, H, 2
E, 4, 3, H, 2
F, 3, 4, H, 2
G, 3, 5, H, 2
H, 0, 0, V, 3
I, 1, 0, V, 2
J, 2, 3, V, 3
K, 3, 2, V, 2
L, 5, 4, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#HIBBoxHIoooxHAAKooooJKEEooJFFLooJGGL/24', minMoves: 24 },
        { board: `6,6
#, 1, 4
X, 1, 2, H, 2
B, 3, 0, H, 3
C, 4, 1, H, 2
D, 2, 3, H, 2
F, 2, 4, H, 2
G, 0, 5, H, 2
H, 2, 5, H, 2
I, 0, 0, V, 3
J, 0, 3, V, 2
K, 2, 0, V, 2
L, 3, 1, V, 2
M, 5, 2, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#IoKBBBIoKLCCIAALoMJoDDoMJxFFoMGGHHoo/24', minMoves: 24 },
        { board: `6,6
#, 4, 0
X, 1, 2, H, 2
B, 1, 0, H, 2
D, 0, 1, H, 2
E, 2, 1, H, 2
F, 4, 3, H, 2
G, 3, 4, H, 2
H, 0, 5, H, 2
I, 0, 2, V, 2
J, 2, 3, V, 2
K, 3, 2, V, 2
L, 4, 1, V, 2
M, 5, 4, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#oBBoxoDDEELoIAAKLoIoJKFFooJGGMHHoooM/24', minMoves: 24 },
        { board: `6,6
#, 1, 1
#, 5, 4
X, 2, 2, H, 2
B, 2, 0, H, 3
D, 2, 3, H, 2
F, 0, 5, H, 2
G, 3, 5, H, 2
H, 1, 2, V, 3
I, 2, 4, V, 2
J, 4, 1, V, 3
K, 5, 0, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooBBBKoxooJKoHAAJooHDDJooHIooxFFIGGo/24', minMoves: 24 },
        { board: `6,6
#, 0, 3
X, 0, 2, H, 2
B, 0, 1, H, 2
D, 3, 3, H, 2
E, 4, 4, H, 2
F, 1, 5, H, 2
G, 1, 3, V, 2
H, 2, 0, V, 2
I, 2, 2, V, 2
J, 3, 4, V, 2
K, 5, 0, V, 2
L, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooHooKBBHooKAAIooLxGIDDLoGoJEEoFFJoo/24', minMoves: 24 },
        { board: `6,6
#, 2, 0
#, 3, 5
X, 0, 2, H, 2
C, 4, 1, H, 2
D, 1, 3, H, 2
E, 1, 4, H, 2
F, 0, 5, H, 2
H, 0, 3, V, 2
I, 2, 1, V, 2
J, 3, 0, V, 2
K, 4, 2, V, 3
L, 5, 2, V, 2`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#ooxJooooIJCCAAIoKLHDDoKLHEEoKoFFoxoo/24', minMoves: 24 },
        { board: `6,6
#, 0, 2
X, 1, 2, H, 2
C, 2, 0, H, 3
D, 4, 1, H, 2
E, 1, 3, H, 3
F, 2, 4, H, 2
G, 2, 5, H, 2
H, 0, 0, V, 2
I, 0, 3, V, 2
J, 1, 4, V, 2
K, 3, 1, V, 2
L, 4, 2, V, 3
M, 5, 2, V, 3`, solutionUrl: 'https://www.michaelfogleman.com/static/rush/#HoCCCoHooKDDxAAKLMIEEELMIJFFLMoJGGoo/25', minMoves: 25 },
    ]
};
