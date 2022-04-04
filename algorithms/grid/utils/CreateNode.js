export default function createNode(
  row,
  col,
  isStartNode,
  isTargetNode,
  weight
) {
  return {
    row,
    col,
    weight,
    isStartNode,
    isTargetNode,
    isVisited: false,
    isWall: false,
    prevNode: null
  };
}