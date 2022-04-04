import createNode from "./CreateNode";

const MAX_NODE_WEIGHT = 200;

export default function getInitialGrid(
  gridRows,
  gridCols,
  startNode,
  targetNode,
  setWeight = false,
) {
  const grid = [];
  for (let row = 0; row < gridRows; row++) {
    const subGrid = [];
    for (let col = 0; col < gridCols; col++) {
      subGrid.push(createNode(
        row, col,
        startNode.row == row && startNode.col == col,
        targetNode.row == row && targetNode.col == col,
        setWeight ? Math.ceil(Math.random()*MAX_NODE_WEIGHT) : Infinity,
      ));
    }
    grid.push(subGrid);
  }
  return grid;
}