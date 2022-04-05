export default function findTargetNode(grid) {
  for (const row of grid) {
    for (const node of row) {
      if (node.isTargetNode) return node;
    }
  }
  return null;
}