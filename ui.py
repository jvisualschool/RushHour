

import sys, argparse, time, csv, random
from copy import deepcopy
from collections import deque
from pathlib import Path
from typing import List, Tuple, Optional, Dict, Set

try:
    import pygame
except ImportError as e:
    print("This interface requires pygame. Install it with: pip install pygame")
    raise



class RushHourPuzzle:
    def __init__(self, csv_file: str):
        self.board_width = 0
        self.board_height = 0
        self.vehicles = []   
        self.walls = []      
        self.board = []      
        self.csv_file = csv_file
        self._load_csv(csv_file)
        self._build_board()

    def _load_csv(self, csv_path: str):
        with open(csv_path, newline='', encoding='utf-8') as f:
            reader = csv.reader(f)
           
            first = next(reader)
            first = [c.strip() for c in first if c is not None and str(c).strip() != ""]
            if len(first) < 2:
                raise ValueError(f"Invalid header in {csv_path}: {first}")
            a, b = int(first[0]), int(first[1])
            self.board_width, self.board_height = a, b
            raw_rows = []
            for row in reader:
                
                row = [c.strip() for c in row if c is not None and str(c).strip() != ""]
                if not row:
                    continue
                if row[0].startswith("//") or row[0].startswith(";"):
                    continue
                raw_rows.append(row)
        self._raw_rows = raw_rows

    def _try_fill_from_rows(self) -> bool:
        vehicles = []
        walls = []
        for row in self._raw_rows:
            if row[0] == "#":
                if len(row) < 3:
                    raise ValueError(f"Wall row malformed in {self.csv_file}: {row}")
                c, r = int(row[1]), int(row[2])
                walls.append((r, c))
            else:
                if len(row) < 5:
                    raise ValueError(f"Vehicle row malformed in {self.csv_file}: {row}")
                vid = row[0]
                c, r = int(row[1]), int(row[2])
                o = row[3].upper()
                L = int(row[4])
                vehicles.append({"id": vid, "row": r, "col": c, "orientation": o, "length": L})

        board = [[" " for _ in range(self.board_width)] for _ in range(self.board_height)]
        for (r, c) in walls:
            if not (0 <= r < self.board_height and 0 <= c < self.board_width):
                return False
            if board[r][c] != " ":
                return False
            board[r][c] = "#"

        for v in vehicles:
            r, c, L, o = v["row"], v["col"], v["length"], v["orientation"]
            for i in range(L):
                rr = r + i if o == "V" else r
                cc = c + i if o == "H" else c
                if not (0 <= rr < self.board_height and 0 <= cc < self.board_width):
                    return False
                if board[rr][cc] != " ":
                    return False
            for i in range(L):
                rr = r + i if o == "V" else r
                cc = c + i if o == "H" else c
                board[rr][cc] = v["id"]

        self.vehicles = vehicles
        self.walls = walls
        self.board = board
        return True

    def _build_board(self):
        if not self._try_fill_from_rows():
            
            self.board_width, self.board_height = self.board_height, self.board_width
            if not self._try_fill_from_rows():
                raise ValueError(f"Could not place elements for {self.csv_file} with either header ordering")

    def rebuild_board(self):
        self.board = [[" " for _ in range(self.board_width)] for _ in range(self.board_height)]
        for (r,c) in self.walls:
            self.board[r][c] = "#"
        for v in self.vehicles:
            r, c, L, o = v["row"], v["col"], v["length"], v["orientation"]
            for i in range(L):
                rr = r + i if o == "V" else r
                cc = c + i if o == "H" else c
                self.board[rr][cc] = v["id"]

    def isGoal(self) -> bool:
        for v in self.vehicles:
            if v["id"] == "X":
                if v["orientation"] != "H":
                    return False
                return (v["col"] + v["length"] - 1) == (self.board_width - 1)
        return False

    def getStateKey(self):
        veh_key = tuple(sorted(
            (v["id"], v["row"], v["col"], v["orientation"], v["length"])
            for v in self.vehicles
        ))
        walls_key = tuple(sorted(self.walls))
        size_key = (self.board_height, self.board_width)
        return (size_key, walls_key, veh_key)

    def find_vehicle_at(self, r: int, c: int):
        for v in self.vehicles:
            rr, cc = v["row"], v["col"]
            L, o = v["length"], v["orientation"]
            for i in range(L):
                r2 = rr + i if o == "V" else rr
                c2 = cc + i if o == "H" else cc
                if r2 == r and c2 == c:
                    return v
        return None

    def can_move(self, v, dr: int, dc: int) -> bool:
        if v["orientation"] == "H" and dr != 0: return False
        if v["orientation"] == "V" and dc != 0: return False
        r, c, L, o = v["row"], v["col"], v["length"], v["orientation"]
        if o == "H":
            if dc == 1:
                if c + L >= self.board_width: return False
                return self.board[r][c + L] == " "
            elif dc == -1:
                if c - 1 < 0: return False
                return self.board[r][c - 1] == " "
        else:
            if dr == 1:
                if r + L >= self.board_height: return False
                return self.board[r + L][c] == " "
            elif dr == -1:
                if r - 1 < 0: return False
                return self.board[r - 1][c] == " "
        return False

    def move(self, v, dr: int, dc: int) -> bool:
        if not self.can_move(v, dr, dc):
            return False
        if v["orientation"] == "H":
            v["col"] += dc
        else:
            v["row"] += dr
        self.rebuild_board()
        return True

    def successors(self) -> List[Tuple[str, "RushHourPuzzle"]]:
        succs = []
        for v in self.vehicles:
            vid = v["id"]
            r, c, L, o = v["row"], v["col"], v["length"], v["orientation"]
            if o == "H":
                if c + L < self.board_width and self.board[r][c + L] == " ":
                    new_p = deepcopy(self)
                    for nv in new_p.vehicles:
                        if nv["id"] == vid:
                            nv["col"] += 1
                            break
                    new_p.rebuild_board()
                    succs.append((f"{vid}→", new_p))
                if c - 1 >= 0 and self.board[r][c - 1] == " ":
                    new_p = deepcopy(self)
                    for nv in new_p.vehicles:
                        if nv["id"] == vid:
                            nv["col"] -= 1
                            break
                    new_p.rebuild_board()
                    succs.append((f"{vid}←", new_p))
            else:
                if r + L < self.board_height and self.board[r + L][c] == " ":
                    new_p = deepcopy(self)
                    for nv in new_p.vehicles:
                        if nv["id"] == vid:
                            nv["row"] += 1
                            break
                    new_p.rebuild_board()
                    succs.append((f"{vid}↓", new_p))
                if r - 1 >= 0 and self.board[r - 1][c] == " ":
                    new_p = deepcopy(self)
                    for nv in new_p.vehicles:
                        if nv["id"] == vid:
                            nv["row"] -= 1
                            break
                    new_p.rebuild_board()
                    succs.append((f"{vid}↑", new_p))
        return succs



def bfs_solve(initial: RushHourPuzzle, node_cap=400_000):
    Node = tuple  
    frontier = deque()
    visited: Set[tuple] = set()
    nodes: List[Node] = []

    if initial.isGoal():
        return []

    key0 = initial.getStateKey()
    visited.add(key0)
    nodes.append((deepcopy(initial), -1, None))
    frontier.append(0)

    explored = 0
    while frontier:
        if explored >= node_cap:
            return None
        idx = frontier.popleft()
        state, parent, act = nodes[idx]
        explored += 1
        for action, succ in state.successors():
            k = succ.getStateKey()
            if k in visited:
                continue
            visited.add(k)
            nodes.append((succ, idx, action))
            if succ.isGoal():
                
                actions = []
                cur = len(nodes) - 1
                while cur != -1 and nodes[cur][2] is not None:
                    actions.append(nodes[cur][2])
                    cur = nodes[cur][1]
                actions.reverse()
                return actions
            frontier.append(len(nodes) - 1)
    return None



def h_distance_to_exit(state: RushHourPuzzle) -> int:
    X = next(v for v in state.vehicles if v["id"] == "X")
    return (state.board_width - 1) - (X["col"] + X["length"] - 1)

def h_blockers(state: RushHourPuzzle) -> int:
    X = next(v for v in state.vehicles if v["id"]=="X")
    row = X["row"]
    right_edge = X["col"] + X["length"] - 1
    blockers: Set[str] = set()
    for c in range(right_edge + 1, state.board_width):
        ch = state.board[row][c]
        if ch not in (" ", "#"):
            blockers.add(ch)
    return len(blockers)

# ----------------------- UI (auto-player) -----------------------

CELL = 84
MARGIN = 40
PANEL_W = 0  # plus de panneau latéral
BG = (245,245,245)
GRID = (210,210,210)
WALL = (120,120,120)
XCOLOR = (220,70,70)
VCOLOR = (80,130,210)
TXT = (32,32,32)

# Bouton Reset
BTN_W, BTN_H = 260, 48
BTN_BG = (30,180,120)
BTN_BG_HOVER = (26,160,108)
BTN_TXT = (255,255,255)
BTN_RADIUS = 10

def draw_board(screen, font, state: RushHourPuzzle, button_rect, info_text: Optional[str]):
    
    w = MARGIN*2 + state.board_width*CELL
    h = MARGIN*2 + state.board_height*CELL + BTN_H + 16
    screen.fill(BG)

    
    for r in range(state.board_height+1):
        pygame.draw.line(screen, GRID,
                         (MARGIN, MARGIN + r*CELL),
                         (MARGIN + state.board_width*CELL, MARGIN + r*CELL), 1)
    for c in range(state.board_width+1):
        pygame.draw.line(screen, GRID,
                         (MARGIN + c*CELL, MARGIN),
                         (MARGIN + c*CELL, MARGIN + state.board_height*CELL), 1)

    
    for (r,c) in state.walls:
        rect = pygame.Rect(MARGIN + c*CELL, MARGIN + r*CELL, CELL, CELL)
        pygame.draw.rect(screen, WALL, rect)

   
    for v in state.vehicles:
        color = XCOLOR if v["id"] == "X" else VCOLOR
        if v["orientation"] == "H":
            rect = pygame.Rect(MARGIN + v["col"]*CELL, MARGIN + v["row"]*CELL, v["length"]*CELL, CELL)
        else:
            rect = pygame.Rect(MARGIN + v["col"]*CELL, MARGIN + v["row"]*CELL, CELL, v["length"]*CELL)
        pygame.draw.rect(screen, color, rect, border_radius=16)
        label = font.render(v["id"], True, (255,255,255))
        screen.blit(label, (rect.x + 8, rect.y + 6))

    
    try:
        X = next(v for v in state.vehicles if v["id"] == "X")
        ex_r = X["row"]
    except StopIteration:
        ex_r = state.board_height // 2
    ex_rect = pygame.Rect(MARGIN + (state.board_width-1)*CELL, MARGIN + ex_r*CELL, CELL, CELL)
    pygame.draw.rect(screen, (60,200,100), ex_rect, width=3)

    # Bouton Reset
    mx, my = pygame.mouse.get_pos()
    is_hover = button_rect.collidepoint(mx, my)
    pygame.draw.rect(screen, BTN_BG_HOVER if is_hover else BTN_BG, button_rect, border_radius=BTN_RADIUS)
    txt = font.render("Reset (Shuffle + BFS Solve)", True, BTN_TXT)
    screen.blit(txt, (button_rect.x + (BTN_W - txt.get_width())//2, button_rect.y + (BTN_H - txt.get_height())//2))

    if info_text:
        info = font.render(info_text, True, TXT)
        screen.blit(info, (MARGIN, button_rect.y - info.get_height() - 6))

def run_ui(paths: List[str], speed_fps=6):
    
    idx = 0
    state0 = RushHourPuzzle(paths[idx])
    state = deepcopy(state0)

    pygame.init()
    
    font = pygame.font.SysFont(None, 24)

    W = MARGIN*2 + state.board_width*CELL + PANEL_W
    H = MARGIN*2 + state.board_height*CELL + BTN_H + 16
    screen = pygame.display.set_mode((W, H))
    pygame.display.set_caption("Rush Hour — Auto Player")

    clock = pygame.time.Clock()

    
    solution_actions: Optional[List[str]] = None
    playing = False
    play_ptr = 0
    speed = max(1, speed_fps)  

    # Bouton Reset 
    button_rect = pygame.Rect(
        MARGIN + (state.board_width*CELL - BTN_W)//2,
        MARGIN + state.board_height*CELL + 8,
        BTN_W, BTN_H
    )

    def apply_action_label(s: RushHourPuzzle, act: str):
        
        vid = act[0]
        arrow = act[1]
        v = next(v for v in s.vehicles if v["id"] == vid)
        if arrow == "→":
            s.move(v, 0, +1)
        elif arrow == "←":
            s.move(v, 0, -1)
        elif arrow == "↑":
            s.move(v, -1, 0)
        elif arrow == "↓":
            s.move(v, +1, 0)

    def randomize_state(base: RushHourPuzzle, steps: int = 120) -> RushHourPuzzle:
        """Génère un état atteignable en appliquant au hasard des successeurs valides."""
        s = deepcopy(base)
        for _ in range(steps):
            succs = s.successors()
            if not succs:
                break
            _, s = random.choice(succs)
        return s

    def shuffle_and_solve():
        nonlocal state, solution_actions, playing, play_ptr, state0

        
        base = deepcopy(state0)

        #  Essais de shuffle (du plus long au plus court) puis BFS
        trials = [180, 120, 80, 40, 20]
        found = False
        for st in trials:
            s = randomize_state(base, steps=st)
            actions = bfs_solve(deepcopy(s), node_cap=400_000)
            if actions:
                state = s
                solution_actions = actions
                playing = True
                play_ptr = 0
                found = True
                break
        if not found:
           
            state = deepcopy(base)
            solution_actions = None
            playing = False
            play_ptr = 0

    shuffle_and_solve()

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                
                if event.key in (pygame.K_ESCAPE, pygame.K_q):
                    running = False
                elif event.key == pygame.K_n:
                    if len(paths) > 1:
                        idx = (idx + 1) % len(paths)
                        state0 = RushHourPuzzle(paths[idx])
                        state = deepcopy(state0)
                        solution_actions = None
                        playing = False
                        play_ptr = 0
                        # relancer auto
                        shuffle_and_solve()
                elif event.key == pygame.K_p:
                    if len(paths) > 1:
                        idx = (idx - 1) % len(paths)
                        state0 = RushHourPuzzle(paths[idx])
                        state = deepcopy(state0)
                        solution_actions = None
                        playing = False
                        play_ptr = 0
                        shuffle_and_solve()
            elif event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                if button_rect.collidepoint(event.pos):
                    
                    shuffle_and_solve()

        if playing and solution_actions:
            if play_ptr < len(solution_actions):
                act = solution_actions[play_ptr]
                apply_action_label(state, act)
                play_ptr += 1
            else:
                playing = False  

       
        info_text = None
        if solution_actions is not None:
            info_text = f"Solution length: {len(solution_actions)}  •  Playing: {'Yes' if playing else 'No'}"

       
        draw_board(screen, font, state, button_rect, info_text)
        pygame.display.flip()
        clock.tick(speed if playing else 60)

    pygame.quit()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--levels", nargs="*", help="CSV puzzle files", default=[])
    ap.add_argument("--speed", type=int, default=6, help="Playback speed (steps/s)")
    args = ap.parse_args()

    if not args.levels:
        print("Usage: python ui.py --levels 1.csv 2.csv ...")
        return

    run_ui(args.levels, speed_fps=args.speed)

if __name__ == "__main__":
    main()
