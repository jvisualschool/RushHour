import type { Vehicle, Direction } from '../types/game';

export class RushHourPuzzle {
  boardHeight: number = 0;
  boardWidth: number = 0;
  vehicles: Vehicle[] = [];
  walls: [number, number][] = [];
  board: string[][] = [];

  constructor(csvData?: string) {
    if (csvData) {
      this.parseCSV(csvData);
      this.setBoard();
    }
  }

  parseCSV(csvData: string) {
    const lines = csvData.trim().split('\n').filter(line => line.trim());

    // First line = board size
    const [height, width] = lines[0].split(',').map(Number);
    this.boardHeight = height;
    this.boardWidth = width;

    // Parse remaining lines
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(s => s.trim());
      if (!parts[0]) continue;

      if (parts[0] === '#') {
        const c = parseInt(parts[1]);
        const r = parseInt(parts[2]);
        this.walls.push([r, c]);
      } else {
        const vid = parts[0];
        const c = parseInt(parts[1]);
        const r = parseInt(parts[2]);
        const orientation = parts[3] as 'H' | 'V';
        const length = parseInt(parts[4]);

        this.vehicles.push({
          id: vid,
          row: r,
          col: c,
          orientation,
          length,
        });
      }
    }
  }

  setBoard() {
    // Initialize empty board
    this.board = Array(this.boardHeight)
      .fill(null)
      .map(() => Array(this.boardWidth).fill(' '));

    // Place walls
    for (const [r, c] of this.walls) {
      if (r >= 0 && r < this.boardHeight && c >= 0 && c < this.boardWidth) {
        this.board[r][c] = '#';
      }
    }

    // Place vehicles
    for (const v of this.vehicles) {
      const { row: r, col: c, length, orientation } = v;

      for (let i = 0; i < length; i++) {
        const rPos = orientation === 'V' ? r + i : r;
        const cPos = orientation === 'H' ? c + i : c;

        if (rPos >= 0 && rPos < this.boardHeight && cPos >= 0 && cPos < this.boardWidth) {
          if (this.board[rPos][cPos] !== ' ' && this.board[rPos][cPos] !== v.id) {
            console.error(`Overlap detected at (${cPos}, ${rPos}) by vehicles ${this.board[rPos][cPos]} and ${v.id}`);
          }
          this.board[rPos][cPos] = v.id;
        }
      }
    }
  }

  isGoal(): boolean {
    const redCar = this.vehicles.find(v => v.id === 'X');
    if (!redCar || redCar.orientation !== 'H') return false;

    return redCar.col === this.boardWidth - redCar.length;
  }

  getVehicleAt(row: number, col: number): string | null {
    if (row < 0 || row >= this.boardHeight || col < 0 || col >= this.boardWidth) {
      return null;
    }
    const id = this.board[row][col];
    return id === ' ' || id === '#' ? null : id;
  }

  canMove(vehicleId: string, direction: Direction): boolean {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return false;

    const { row: r, col: c, length, orientation } = vehicle;

    if (direction === 'left' && orientation === 'H') {
      return c > 0 && this.board[r][c - 1] === ' ';
    }
    if (direction === 'right' && orientation === 'H') {
      return c + length < this.boardWidth && this.board[r][c + length] === ' ';
    }
    if (direction === 'up' && orientation === 'V') {
      return r > 0 && this.board[r - 1][c] === ' ';
    }
    if (direction === 'down' && orientation === 'V') {
      return r + length < this.boardHeight && this.board[r + length][c] === ' ';
    }

    return false;
  }

  moveVehicle(vehicleId: string, direction: Direction): boolean {
    if (!this.canMove(vehicleId, direction)) return false;

    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return false;

    if (direction === 'left') vehicle.col--;
    else if (direction === 'right') vehicle.col++;
    else if (direction === 'up') vehicle.row--;
    else if (direction === 'down') vehicle.row++;

    this.setBoard();
    return true;
  }

  clone(): RushHourPuzzle {
    const clone = new RushHourPuzzle();
    clone.boardHeight = this.boardHeight;
    clone.boardWidth = this.boardWidth;
    clone.vehicles = this.vehicles.map(v => ({ ...v }));
    clone.walls = [...this.walls];
    clone.setBoard();
    return clone;
  }

  getStateKey(): string {
    return JSON.stringify(this.board);
  }

  solve(): Array<{ vehicleId: string; direction: Direction }> | null {
    const queue: Array<{ puzzle: RushHourPuzzle; path: Array<{ vehicleId: string; direction: Direction }> }> = [];
    const visited = new Set<string>();

    queue.push({ puzzle: this.clone(), path: [] });
    visited.add(this.getStateKey());

    const maxIterations = 100000; // Increased limit for complex puzzles
    let iterations = 0;

    while (queue.length > 0 && iterations < maxIterations) {
      iterations++;
      const { puzzle, path } = queue.shift()!;

      if (puzzle.isGoal()) {
        return path;
      }

      // Try moving each vehicle in each valid direction (one step at a time)
      for (const vehicle of puzzle.vehicles) {
        const directions: Direction[] = vehicle.orientation === 'H' ? ['left', 'right'] : ['up', 'down'];

        for (const direction of directions) {
          if (puzzle.canMove(vehicle.id, direction)) {
            const newPuzzle = puzzle.clone();
            newPuzzle.moveVehicle(vehicle.id, direction);

            const stateKey = newPuzzle.getStateKey();
            if (!visited.has(stateKey)) {
              visited.add(stateKey);

              const newPath = [...path, { vehicleId: vehicle.id, direction }];
              queue.push({
                puzzle: newPuzzle,
                path: newPath
              });
            }
          }
        }
      }
    }

    return null; // No solution found
  }
}

