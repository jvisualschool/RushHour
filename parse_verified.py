
import re

def parse_verified_md(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by puzzle sections
    puzzles_raw = re.split(r'### 퍼즐 #\d+', content)[1:]
    
    all_puzzles = []
    for raw in puzzles_raw:
        # Extract the grid block
        grid_match = re.search(r'```\n(.*?)\n```', raw, re.DOTALL)
        if not grid_match:
            continue
        
        grid_lines = grid_match.group(1).strip().split('\n')
        # Clean up lines and ensure 6x6 (padding with spaces if needed)
        grid = []
        for line in grid_lines:
            row = line.split()
            # If row is shorter than 6, it means the rest are empty or implied
            while len(row) < 6:
                row.append('o')
            grid.append(row)
        
        # We need to find all vehicles. 
        # A vehicle is a sequence of same letters.
        vehicles = {} # id -> list of (r, c)
        for r in range(len(grid)):
            for c in range(len(grid[r])):
                char = grid[r][c]
                if char != 'o' and char != '.':
                    if char not in vehicles:
                        vehicles[char] = []
                    vehicles[char].append((r, c))
        
        puzzle_data = ["6,6"]
        for vid, coords in sorted(vehicles.items()):
            # Determine orientation and length
            rs = [p[0] for p in coords]
            cs = [p[1] for p in coords]
            min_r, max_r = min(rs), max(rs)
            min_c, max_c = min(cs), max(cs)
            
            orient = 'H' if min_r == max_r else 'V'
            length = len(coords)
            
            # Use 'X' for 'A'
            save_id = 'X' if vid == 'A' else vid
            puzzle_data.append(f"{save_id},{min_c},{min_r},{orient},{length}")
        
        all_puzzles.append('\n'.join(puzzle_data))
    
    return all_puzzles

puzzles = parse_verified_md('/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/PUZZLE/rush_hour_verified_60.md')

easy = puzzles[:20]
medium = puzzles[20:40]
hard = puzzles[40:60]

output_path = '/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/web/src/data/puzzles.ts'

ts_content = """export type Level = 'easy' | 'medium' | 'hard';

export const puzzles: Record<Level, string[]> = {
    easy: [
"""

for p in easy:
    ts_content += f"        `{p}`,\n"

ts_content += "    ],\n    medium: [\n"

for p in medium:
    ts_content += f"        `{p}`,\n"

ts_content += "    ],\n    hard: [\n"

for p in hard:
    ts_content += f"        `{p}`,\n"

ts_content += """    ]
};
"""

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully processed {len(puzzles)} puzzles.")
