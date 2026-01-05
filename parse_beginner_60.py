
import re

def string_to_csv(board_str):
    if len(board_str) != 36:
        return None
    
    grid = [board_str[i:i+6] for i in range(0, 36, 6)]
    vehicles = {} # id -> list of (r, c)
    walls = []
    
    for r in range(6):
        for c in range(6):
            char = grid[r][c]
            if char == 'o' or char == '.' or char == ' ':
                continue
            if char == 'x':
                walls.append((r, c))
                continue
            if char not in vehicles:
                vehicles[char] = []
            vehicles[char].append((r, c))
    
    csv_lines = ["6,6"]
    
    # Walls
    for r, c in walls:
        csv_lines.append(f"#,{c},{r}")
        
    # Vehicles
    # Fogleman uses 'A' for target. Game uses 'X'.
    for vid in sorted(vehicles.keys()):
        coords = vehicles[vid]
        rs = [p[0] for p in coords]
        cs = [p[1] for p in coords]
        min_r, max_r = min(rs), max(rs)
        min_c, max_c = min(cs), max(cs)
        
        orient = 'H' if min_r == max_r else 'V'
        length = len(coords)
        
        save_id = 'X' if vid == 'A' else vid
        csv_lines.append(f"{save_id},{min_c},{min_r},{orient},{length}")
        
    return '\n'.join(csv_lines)

def parse_markdown_to_puzzles(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Sections: 🟢 쉬움, 🟡 보통, 🔴 어려움
    sections = re.split(r'## .*?\((\d+-\d+ moves)\)', content)
    # This might be tricky if move ranges vary. 
    # Let's just find all table rows with 36-char strings.
    
    # regex for table row: | No | moves | board | link |
    # | 1 | **7** | `HBBBCCHoIJoKAAIJoKxoEEoooooooooFFFGG` | [▶️](...) |
    rows = re.findall(r'\| \d+ \| \*\*\d+\*\* \| `([A-Za-z0-9.x ]{36})` \|', content)
    
    if len(rows) != 60:
        print(f"Warning: Found {len(rows)} puzzles instead of 60.")
        
    puzzles_csv = [string_to_csv(r) for r in rows]
    return puzzles_csv

puzzles = parse_markdown_to_puzzles('/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/PUZZLE/rush_hour_beginner_60.md')

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

print(f"Successfully updated puzzles.ts with {len(puzzles)} verified puzzles.")
