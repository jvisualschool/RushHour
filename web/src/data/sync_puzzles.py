import re
import os

def decode_hash(hash_str):
    board_data = [hash_str[i:i+6] for i in range(0, 36, 6)]
    vehicles = {}
    walls = []
    
    for r in range(6):
        for c in range(6):
            char = board_data[r][c]
            if char == 'x':
                walls.append((c, r))
            elif char != 'o':
                vid = 'X' if char == 'A' else char
                if vid not in vehicles:
                    vehicles[vid] = {'coords': []}
                vehicles[vid]['coords'].append((c, r))
                
    csv_lines = ["6,6"]
    for wall_c, wall_r in walls:
        csv_lines.append(f"#, {wall_c}, {wall_r}")
        
    for vid, data in sorted(vehicles.items(), key=lambda x: (0 if x[0] == 'X' else 1, x[0])):
        coords = sorted(data['coords'])
        c, r = coords[0]
        length = len(coords)
        if length > 1:
            if coords[1][0] > c:
                orientation = 'H'
            else:
                orientation = 'V'
        else:
            orientation = 'H'
        csv_lines.append(f"{vid}, {c}, {r}, {orientation}, {length}")
        
    return "\n".join(csv_lines)

file_path = 'puzzles.ts'
with open(file_path, 'r') as f:
    content = f.read()

pattern = re.compile(r'\{ board: `([^`]+)`, solutionUrl: \'([^\']+)\', minMoves: (\d+) \}')

def replacer(match):
    old_board = match.group(1)
    url = match.group(2)
    min_moves = match.group(3)
    
    hash_match = re.search(r'#([^/]+)/', url)
    if not hash_match: return match.group(0)
    
    state_hash = hash_match.group(1)
    if len(state_hash) != 36: return match.group(0)
    
    new_board = decode_hash(state_hash)
    return f'{{ board: `{new_board}`, solutionUrl: \'{url}\', minMoves: {min_moves} }}'

new_content = pattern.sub(replacer, content)

with open(file_path, 'w') as f:
    f.write(new_content)

print("Puzzles synchronized.")
