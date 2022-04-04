export default function createNode(
  row,
  col,
  isStartNode,
  isTargetNode,
) {
  return {
    row,
    col,
    distance: Infinity,
    isStartNode,
    isTargetNode,
    isVisited: false,
    isWall: false,
    prevNode: null
  };
}