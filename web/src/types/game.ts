export interface Vehicle {
  id: string;
  row: number;
  col: number;
  orientation: 'H' | 'V';
  length: number;
}

export interface PuzzleState {
  boardHeight: number;
  boardWidth: number;
  vehicles: Vehicle[];
  walls: [number, number][];
  board: string[][];
}

export type Direction = 'up' | 'down' | 'left' | 'right';

