import findTargetNode from "./utils/FindTargetNode";
import findPath from "./utils/FindPath";

export default function runAStar(startNode, grid, gridRows, gridCols) {
  const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];
  const g = [...Array(gridRows)].map(_ => Array(gridCols).fill(0));

  const queue = [startNode], visitedNodeOrder = [];
  const targetNode = findTargetNode(grid);

  while (queue.length) {
    queue.sort((a, b) => a.distance - b.distance);
    const cur = queue.shift();
    const { row, col } = cur;

    if (!cur.isVisited) {
      visitedNodeOrder.push(cur);
    }
    cur.isVisited = true;

    if (cur.isTargetNode) {
      return { path: findPath(cur), visitedNodeOrder };
    }
    for (let i = 0; i < 4; i++) {
      const nr = cur.row + dr[i];
      const nc = cur.col + dc[i];

      if (nr < 0 || nc < 0 || nr >= gridRows || nc >= gridCols) continue;
      const node = grid[nr][nc];
      
      if (node.isVisited || node.isWall) continue;
      const f = g[row][col] + 1 + manhattanDistance(targetNode, node);

      if (node.distance > f) {
        node.distance = f;
        g[node.row][node.col] = g[row][col] + 1;
        node.prevNode = cur;
        queue.push(node);
      }
    }
  }
  return { path: null, visitedNodeOrder };
}

function manhattanDistance(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}