
import json

json_easy_path = '/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/PUZZLE/rush_hour_easy_puzzles.json'
json_mh_path = '/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/PUZZLE/rush_hour_puzzles_solution.json'
output_path = '/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/web/src/data/puzzles.ts'

def v_to_str(p):
    lines = ['6,6']
    for v in p['vehicles']:
        lines.append(f"{v['id']},{v['col']},{v['row']},{v['orientation']},{v['length']}")
    return '\n'.join(lines)

# Load Easy
with open(json_easy_path, 'r', encoding='utf-8') as f:
    easy_data = json.load(f)
easy = [v_to_str(p) for p in easy_data['puzzles']]

# Load Medium/Hard
with open(json_mh_path, 'r', encoding='utf-8') as f:
    mh_data = json.load(f)
medium = [v_to_str(p) for p in mh_data['puzzles'] if p['difficulty'] == 'medium']
hard = [v_to_str(p) for p in mh_data['puzzles'] if p['difficulty'] == 'hard']

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

print(f"Successfully updated {output_path}")
print(f"Easy: {len(easy)}, Medium: {len(medium)}, Hard: {len(hard)}")
