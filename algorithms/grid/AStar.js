import findTargetNode from "./utils/FindTargetNode";

export default function runAStar(startNode, grid, gridRows, gridCols) {
  const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];
  const g = [...Array(gridRows)].map(_ => Array(gridCols).fill(0));

  let reachTargetNode = false;
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
      reachTargetNode = true;
      break;
    }
    for (let i = 0; i < 4; i++) {
      const nr = cur.row + dr[i];
      const nc = cur.col + dc[i];

      if (nr < 0 || nc < 0 || nr >= gridRows || nc >= gridCols) continue;
      const node = grid[nr][nc];
      
      if (node.isVisited || node.isWall) continue;
      const f = g[row][col] + 1 + squaredEuclideanDistance(targetNode, node);

      if (node.distance > f) {
        node.distance = f;
        g[node.row][node.col] = g[row][col] + 1;
        node.prevNode = cur;
        queue.push(node);
      }
    }
  }
  return { reachTargetNode, visitedNodeOrder };
}

function squaredEuclideanDistance(a, b) {
  return Math.pow(a.row - b.row, 2) + Math.pow(a.col - b.col, 2);
}