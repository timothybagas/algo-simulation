export default function runBreadFirstSearch(startNode, grid, gridRows, gridCols) {
  const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];
  let reachTargetNode = false;
  const queue = [], visitedNodeOrder = [];
  queue.push(startNode);

  while (queue.length) {
    const cur = queue.shift();
    if (cur.isVisited) continue;
    cur.isVisited = true;

    visitedNodeOrder.push(cur);
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
      node.prevNode = cur;
      queue.push(node);
    }
  }
  return {reachTargetNode, visitedNodeOrder};
}