export default function createNode(
  row,
  col,
  isStartNode,
  isTargetNode,
  isWall = false
) {
  return {
    row,
    col,
    distance: Infinity,
    isStartNode,
    isTargetNode,
    isVisited: false,
    isWall,
    prevNode: null
  };
}