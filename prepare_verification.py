
import json
import os

def v_to_str(p):
    lines = ['6,6']
    for v in p['vehicles']:
        lines.append(f"{v['id']},{v['col']},{v['row']},{v['orientation']},{v['length']}")
    return '\n'.join(lines)

# Sources
easy_json = '/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/PUZZLE/rush_hour_easy_puzzles.json'
mh_json = '/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/PUZZLE/rush_hour_puzzles_solution.json'

with open(easy_json, 'r') as f:
    easy_data = json.load(f)
with open(mh_json, 'r') as f:
    mh_data = json.load(f)

# Combine
all_sources = {
    'easy': [v_to_str(p) for p in easy_data['puzzles']],
    'medium': [v_to_str(p) for p in mh_data['puzzles'] if p['difficulty'] == 'medium'],
    'hard': [v_to_str(p) for p in mh_data['puzzles'] if p['difficulty'] == 'hard']
}

# Write to temp file for verification script
with open('/Users/jinhojung/Documents/강의-발표-기획/2026-01-01 100일 창작 100d100d/42 RUSH HOUR/RushHourGame/web/src/data/temp_puzzles.ts', 'w') as f:
    f.write(f"export const puzzles = {json.dumps(all_sources, indent=4)};")

print("Generated temp_puzzles.ts for verification.")
