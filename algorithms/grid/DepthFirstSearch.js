import findPath from "./utils/FindPath";

export default function runDepthFirstSearch(startNode, grid, gridRows, gridCols) {
  const dr = [0, 1, 0, -1], dc = [1, 0, -1, 0];  
  const stack = [startNode], visitedNodeOrder = [];

  while (stack.length) {
    const cur = stack.pop();
    visitedNodeOrder.push(cur);
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
      node.prevNode = cur;
      stack.push(node);
    }
  }
  return { path: null, visitedNodeOrder };
}