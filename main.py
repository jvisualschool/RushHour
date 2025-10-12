from rush_hour import RushHourPuzzle
from BFS import bfs

def main():
    # 1. Create the puzzle
    puzzle = RushHourPuzzle(csv_file="examples/1.csv")

    print("Board size:", puzzle.board_height, "x", puzzle.board_width)
    puzzle.printBoard()
    print("Is goal state?", puzzle.isGoal())

    # 2. Run BFS to solve the puzzle
    solution_node = bfs(
        puzzle,
        RushHourPuzzle.successorFunction,
        RushHourPuzzle.isGoal
    )

    # 3. Print the sequence of boards and moves
    if solution_node:
        print("\nSolution found! Moves to solve the puzzle:")
        path = solution_node.getPath()
        actions = solution_node.getSolution()
        for i, state in enumerate(path):
            print(f"\nStep {i}:")
            state.printBoard()
            if i < len(actions):
                print(f" → {actions[i]}")

    else:
        print("No solution found.")

if __name__ == "__main__":
    main()
