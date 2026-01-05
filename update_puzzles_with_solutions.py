
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
    for r, c in walls:
        csv_lines.append(f"#,{c},{r}")
        
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
        
    return '\\n'.join(csv_lines)

def parse_solutions(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    data = {'easy': [], 'medium': [], 'hard': []}
    
    for line in lines:
        if '|' not in line:
            continue
        parts = line.strip().split('|')
        if len(parts) < 5:
            continue
            
        diff = parts[1].lower()
        if diff == 'easy':
            data['easy'].append({
                'board': string_to_csv(parts[3]),
                'solutionUrl': parts[4],
                'minMoves': int(parts[2])
            })
        elif diff == 'medium':
            data['medium'].append({
                'board': string_to_csv(parts[3]),
                'solutionUrl': parts[4],
                'minMoves': int(parts[2])
            })
        elif diff == 'hard':
            data['hard'].append({
                'board': string_to_csv(parts[3]),
                'solutionUrl': parts[4],
                'minMoves': int(parts[2])
            })
            
    return data

results = parse_solutions('/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/PUZZLE/rush_puzzles_solutions.txt')

output_path = '/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/web/src/data/puzzles.ts'

ts_content = """export type Level = 'easy' | 'medium' | 'hard';

export interface PuzzleData {
    board: string;
    solutionUrl: string;
    minMoves: number;
}

export const puzzles: Record<Level, PuzzleData[]> = {
    easy: [
"""

for p in results['easy']:
    ts_content += f"        {{ board: `{p['board']}`, solutionUrl: '{p['solutionUrl']}', minMoves: {p['minMoves']} }},\n"

ts_content += "    ],\n    medium: [\n"

for p in results['medium']:
    ts_content += f"        {{ board: `{p['board']}`, solutionUrl: '{p['solutionUrl']}', minMoves: {p['minMoves']} }},\n"

ts_content += "    ],\n    hard: [\n"

for p in results['hard']:
    ts_content += f"        {{ board: `{p['board']}`, solutionUrl: '{p['solutionUrl']}', minMoves: {p['minMoves']} }},\n"

ts_content += """    ]
};
"""

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Successfully updated puzzles.ts with solution URLs.")
