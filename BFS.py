from collections import deque
from node import Node

def bfs(s, successorFn, isGoal):
    Open = deque()
    visited = set()

    init_node = Node(state=s)
    if isGoal(init_node.state):
        return init_node

    visited.add(init_node.state.getStateKey())
    Open.append(init_node)

    while Open:
        current = Open.popleft()

        for (action, successor) in successorFn(current.state):
            key = successor.getStateKey()
            if key in visited:
                continue

            child = Node(state=successor, parent=current, action=action)

            if isGoal(child.state):
                return child

            visited.add(key)
            Open.append(child)

    return False
