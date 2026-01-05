
import re

def parse_markdown(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    puzzles_sections = re.split(r'### 퍼즐 #\d+', content)[1:]
    
    all_puzzles = []
    for section in puzzles_sections:
        # Extract table rows more flexibly
        # Look for | ID | Direction | Length | (Row, Col) |
        rows = re.findall(r'\| ([A-Z]) \| ([^|]+) \| (\d) \| \((\d+),\s*(\d+)\) \|', section)
        
        if not rows:
            # Try without spaces
            rows = re.findall(r'\|([A-Z])\|([^|]+)\|(\d)\|\((\d+),(\d+)\)\|', section)

        puzzle_lines = ["6,6"]
        for vid, orient_icon, length, row, col in rows:
            orient = 'H' if '↔' in orient_icon or 'H' in orient_icon or 'Horizontal' in orient_icon or '↔️' in orient_icon else 'V'
            puzzle_lines.append(f"{vid},{col.strip()},{row.strip()},{orient},{length}")
        
        all_puzzles.append('\n'.join(puzzle_lines))
    
    return all_puzzles

puzzles = parse_markdown('/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/PUZZLE/rush_hour_puzzles.md')

easy = puzzles[:20]
medium = puzzles[20:40]
hard = puzzles[40:60]

print("export const puzzles: Record<Level, string[]> = {")
print("    easy: [")
for p in easy:
    print(f"        `{p}`,")
print("    ],")
print("    medium: [")
for p in medium:
    print(f"        `{p}`,")
print("    ],")
print("    hard: [")
for p in hard:
    print(f"        `{p}`,")
print("    ]")
print("};")
