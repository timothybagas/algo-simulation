import createNode from "./CreateNode";

export default function reupdateGrid(grid, startNode, targetNode) {
  const newGrid = [];
  for (const row of grid) {
    const subGrid = [];
    for (const node of row) {
      subGrid.push(createNode(
        node.row, node.col,
        startNode.row == node.row && startNode.col == node.col,
        targetNode.row == node.row && targetNode.col == node.col,
        node.isWall
      ));
    }
    newGrid.push(subGrid);
  }
  return newGrid;
}