import pygame
import os

from rush_hour import RushHourPuzzle
from BFS import bfs
from Astar import astar, h1, h2, h3
from loader import load_atlas

csv_file = "examples/1.csv"

# === CONSTANTS ===
CELL = 84
PADDING = 8
MARGIN = 40
BG = (245, 245, 245)
GRID = (210, 210, 210)
XCOLOR = (220, 70, 70)
VCOLOR = (80, 130, 210)
EXIT_COLOR = (60, 200, 100)
TXT = (255, 255, 255)

BTN_W, BTN_H = 220, 48
BTN_BG = (30, 180, 120)
BTN_BG_HOVER = (26, 160, 108)
BTN_BG_DISABLED = (160, 160, 160)
BTN_TXT = (255, 255, 255)
BTN_RADIUS = 10



#DRAW FUNCTION
def draw_board(screen, font, state: RushHourPuzzle, sprites, selected_vehicle_id=None):
    # Road background
    ROAD_COLOR = (50, 50, 50)
    LANE_COLOR = (255, 255, 255)
    DASH_LENGTH = 20

    screen.fill(ROAD_COLOR)

    # Draw horizontal lanes (dashed)
    for r in range(state.board_height + 1):
        y = MARGIN + r * CELL
        for x in range(MARGIN, MARGIN + state.board_width * CELL, DASH_LENGTH * 2):
            pygame.draw.line(screen, LANE_COLOR, (x, y), (x + DASH_LENGTH, y), 2)

    # Draw vertical lanes (dashed)
    for c in range(state.board_width + 1):
        x = MARGIN + c * CELL
        for y in range(MARGIN, MARGIN + state.board_height * CELL, DASH_LENGTH * 2):
            pygame.draw.line(screen, LANE_COLOR, (x, y), (x, y + DASH_LENGTH), 2)

    # Determine exit row (red car)
    try:
        X = next(v for v in state.vehicles if v["id"] == "X")
        exit_row = X["row"]
    except StopIteration:
        exit_row = state.board_height // 2

    # Draw exit
    exit_x = MARGIN + state.board_width * CELL - (PADDING // 2)
    exit_y = MARGIN + exit_row * CELL + PADDING
    exit_h = CELL - 2 * PADDING
    pygame.draw.rect(screen, EXIT_COLOR, (exit_x, exit_y, 12, exit_h), border_radius=6)

    # Draw walls as barriers
    for (r, c) in state.walls:
        x = MARGIN + c * CELL
        y = MARGIN + r * CELL
        w = CELL
        h = CELL
        rect = pygame.Rect(x, y, w, h)
        pygame.draw.rect(screen, (80, 80, 80), rect, border_radius=10)
        pygame.draw.rect(screen, (0, 0, 0), rect, 1, border_radius=10)

    # Function to select sprite
    def get_vehicle_sprite(v):
        if v["id"] == "X":
            return sprites["figo2"]
        elif v["length"] == 3:
            return sprites["truck2"]
        else:
            return sprites["mustang3"]

    # Draw vehicles
    for v in state.vehicles:
        r, c = v["row"], v["col"]
        sprite = get_vehicle_sprite(v)
        if v["orientation"] == "H":
            w = v["length"] * CELL
            h = CELL
            sprite = pygame.transform.rotate(sprite, -90)
        else:
            w = CELL
            h = v["length"] * CELL

        x = MARGIN + c * CELL
        y = MARGIN + r * CELL

        # Draw selection highlight
        if selected_vehicle_id and v["id"] == selected_vehicle_id:
            highlight_rect = pygame.Rect(x - 3, y - 3, w + 6, h + 6)
            pygame.draw.rect(screen, (255, 255, 0), highlight_rect, 4, border_radius=5)

        scaled_sprite = pygame.transform.scale(sprite, (w, h))
        screen.blit(scaled_sprite, (x, y))




# BUTTON DRAW
def draw_button(screen, font, rect, text, enabled=True):
    mx, my = pygame.mouse.get_pos()
    is_hover = rect.collidepoint(mx, my)
    color = BTN_BG_DISABLED if not enabled else (BTN_BG_HOVER if is_hover else BTN_BG)
    pygame.draw.rect(screen, color, rect, border_radius=BTN_RADIUS)
    txt = font.render(text, True, BTN_TXT)
    screen.blit(txt, (rect.x + (rect.width - txt.get_width()) // 2,
                      rect.y + (rect.height - txt.get_height()) // 2))


def get_vehicle_at_pos(state: RushHourPuzzle, pos):
    """Get vehicle ID at mouse position"""
    mx, my = pos
    if mx < MARGIN or my < MARGIN:
        return None
    
    c = (mx - MARGIN) // CELL
    r = (my - MARGIN) // CELL
    
    if r >= state.board_height or c >= state.board_width:
        return None
    
    vehicle_id = state.board[r][c]
    if vehicle_id == " " or vehicle_id == "#":
        return None
    
    return vehicle_id

def move_vehicle(state: RushHourPuzzle, vehicle_id, direction):
    """Move a vehicle in the given direction (up, down, left, right)"""
    # Find the vehicle
    vehicle = None
    for v in state.vehicles:
        if v["id"] == vehicle_id:
            vehicle = v
            break
    
    if not vehicle:
        return False
    
    r, c = vehicle["row"], vehicle["col"]
    length = vehicle["length"]
    orientation = vehicle["orientation"]
    
    # Check if move is valid and perform it
    if direction == "left" and orientation == "H":
        if c - 1 >= 0 and state.board[r][c - 1] == " ":
            vehicle["col"] -= 1
            state.setBoard()
            return True
    elif direction == "right" and orientation == "H":
        if c + length < state.board_width and state.board[r][c + length] == " ":
            vehicle["col"] += 1
            state.setBoard()
            return True
    elif direction == "up" and orientation == "V":
        if r - 1 >= 0 and state.board[r - 1][c] == " ":
            vehicle["row"] -= 1
            state.setBoard()
            return True
    elif direction == "down" and orientation == "V":
        if r + length < state.board_height and state.board[r + length][c] == " ":
            vehicle["row"] += 1
            state.setBoard()
            return True
    
    return False

def run_ui():
    os.environ['SDL_VIDEO_CENTERED'] = '1'
    pygame.init()

    pygame.display.set_mode((1, 1))
    sprites = load_atlas("assets/cars.atlas", "assets/cars.png") 
    font = pygame.font.SysFont(None, 26)


    puzzle = RushHourPuzzle(csv_file=csv_file)
    W = MARGIN * 2 + puzzle.board_width * CELL
    H = MARGIN * 2 + puzzle.board_height * CELL + BTN_H + 20
    screen = pygame.display.set_mode((W, H))
    pygame.display.set_caption("Rush Hour — Play & Solve")
    clock = pygame.time.Clock()

    # Buttons
    manual_btn = pygame.Rect(W // 2 - BTN_W * 1.5 - 10, MARGIN + puzzle.board_height * CELL + 8, BTN_W, BTN_H)
    bfs_btn = pygame.Rect(W // 2 - BTN_W // 2, MARGIN + puzzle.board_height * CELL + 8, BTN_W, BTN_H)
    astar_btn = pygame.Rect(W // 2 + BTN_W // 2 + 10, MARGIN + puzzle.board_height * CELL + 8, BTN_W, BTN_H)
    restart_btn = pygame.Rect(W // 2 - BTN_W // 2, MARGIN + puzzle.board_height * CELL + 8, BTN_W, BTN_H)

    # States
    path = None
    step = 0
    playing = False
    solving = False
    algo = None
    manual_mode = False
    selected_vehicle = None
    won = False
    STEP_DELAY = 500
    last_step_time = pygame.time.get_ticks()

    running = True
    while running:
        current_time = pygame.time.get_ticks()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.MOUSEBUTTONDOWN:
                if manual_mode and not won:
                    # Check if clicking on board
                    if event.pos[1] < MARGIN + puzzle.board_height * CELL:
                        clicked_vehicle = get_vehicle_at_pos(puzzle, event.pos)
                        if clicked_vehicle:
                            selected_vehicle = clicked_vehicle
                elif not solving and not path and not manual_mode:
                    if manual_btn.collidepoint(event.pos):
                        manual_mode = True
                        selected_vehicle = None
                        won = False
                    elif bfs_btn.collidepoint(event.pos):
                        algo = "BFS"
                        solving = True
                        node = bfs(puzzle, RushHourPuzzle.successorFunction, RushHourPuzzle.isGoal)
                        if node:
                            path = node.getPath()
                        solving = False
                        playing = True
                        step = 0
                    elif astar_btn.collidepoint(event.pos):
                        algo = "A*"
                        solving = True
                        node = astar(puzzle, h1, RushHourPuzzle.successorFunction, RushHourPuzzle.isGoal)
                        if node:
                            path = node.getPath()
                        solving = False
                        playing = True
                        step = 0
                elif (path or manual_mode) and restart_btn.collidepoint(event.pos):
                    puzzle = RushHourPuzzle(csv_file=csv_file)
                    path = None
                    algo = None
                    playing = False
                    solving = False
                    manual_mode = False
                    selected_vehicle = None
                    won = False
                    step = 0
            elif event.type == pygame.KEYDOWN and manual_mode and not won:
                if selected_vehicle:
                    moved = False
                    if event.key == pygame.K_LEFT:
                        moved = move_vehicle(puzzle, selected_vehicle, "left")
                    elif event.key == pygame.K_RIGHT:
                        moved = move_vehicle(puzzle, selected_vehicle, "right")
                    elif event.key == pygame.K_UP:
                        moved = move_vehicle(puzzle, selected_vehicle, "up")
                    elif event.key == pygame.K_DOWN:
                        moved = move_vehicle(puzzle, selected_vehicle, "down")
                    
                    if moved and puzzle.isGoal():
                        won = True

        # Auto-advance for solver
        if playing and not solving and path and current_time - last_step_time >= STEP_DELAY:
            if step < len(path) - 1:
                step += 1
                last_step_time = current_time
            else:
                playing = False

        # Draw board
        if manual_mode:
            draw_board(screen, font, puzzle, sprites, selected_vehicle)
        else:
            draw_board(screen, font, puzzle if not path else path[step], sprites)

        # Draw buttons and info
        if manual_mode:
            draw_button(screen, font, restart_btn, "Restart", enabled=True)
            if selected_vehicle:
                hint = font.render(f"Selected: {selected_vehicle} | Use Arrow Keys", True, TXT)
                screen.blit(hint, (restart_btn.right + 20, restart_btn.centery - hint.get_height() // 2))
            else:
                hint = font.render("Click a vehicle, then use Arrow Keys", True, TXT)
                screen.blit(hint, (restart_btn.right + 20, restart_btn.centery - hint.get_height() // 2))
            
            if won:
                win_msg = font.render("🎉 You Won! 🎉", True, (255, 255, 0))
                screen.blit(win_msg, (restart_btn.right + 20, restart_btn.centery + 20))
        elif not path:
            draw_button(screen, font, manual_btn, "Play Manually", enabled=not solving)
            draw_button(screen, font, bfs_btn, "Solve with BFS", enabled=not solving)
            draw_button(screen, font, astar_btn, "Solve with A*", enabled=not solving)
        else:
            draw_button(screen, font, restart_btn, "Restart", enabled=not solving)
            info = f"{algo} | Step: {step}/{len(path) - 1}"
            info_surf = font.render(info, True, TXT)
            screen.blit(info_surf, (restart_btn.right + 20, restart_btn.centery - info_surf.get_height() // 2))
            if not playing:
                done_surf = font.render("Done!", True, TXT)
                screen.blit(done_surf, (restart_btn.right + 20, restart_btn.centery + info_surf.get_height()))

        pygame.display.flip()
        clock.tick(30)

    pygame.quit()


if __name__ == "__main__":
    run_ui()
