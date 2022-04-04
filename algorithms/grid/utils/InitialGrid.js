import createNode from "./CreateNode";

export default function getInitialGrid(
  gridRows,
  gridCols,
  startNode,
  targetNode,
) {
  const grid = [];
  for (let row = 0; row < gridRows; row++) {
    const subGrid = [];
    for (let col = 0; col < gridCols; col++) {
      subGrid.push(createNode(
        row, col,
        startNode.row == row && startNode.col == col,
        targetNode.row == row && targetNode.col == col,
      ));
    }
    grid.push(subGrid);
  }
  return grid;
}