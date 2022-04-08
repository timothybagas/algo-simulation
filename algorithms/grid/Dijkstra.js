import findPath from "./utils/FindPath";

export default function runDijkstra(startNode, grid, gridRows, gridCols) {
  const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];  
  startNode.distance = 0;
  const queue = [startNode], visitedNodeOrder = [];

  while (queue.length) {
    const cur = queue.shift();
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
      
      if (node.distance > cur.distance + 1) {
        node.distance = cur.distance + 1;
        node.prevNode = cur;
        queue.push(node);
      }
    }
  }
  return { path: null, visitedNodeOrder };
}