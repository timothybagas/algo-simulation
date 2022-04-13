import { getInitialGrid } from "../../";
import createNode from "../CreateNode";

export default function generateRandomMaze(gridRows, gridCols) {
  const grid = getInitialGrid(
    gridRows,
    gridCols,
    createNode(1, 1, true, false),
    createNode(gridRows - 2, gridCols - 2, false, true)
  );
  addOuterWalls(grid, gridRows, gridCols);
  recursiveDivision(grid, [1, gridCols - 2], [1, gridRows - 2]);
  return grid;
}

function addOuterWalls(grid, gridRows, gridCols) {
  for (let i = 0; i < gridRows; i++) {
    if(i === 0 || i === gridRows - 1) {
      for (let j = 0; j < gridCols; j++) {
        const node = toWall(grid[i][j]);
        grid[i][j] = node;
      }
    }
    {
      const node = toWall(grid[i][0]);
        grid[i][0] = node;
    }
    {
      const node = toWall(grid[i][gridCols - 1]);
      grid[i][gridCols - 1] = node;
    }
  }
}

function toWall(node) {
  const newNode = {
    ...node,
    isWall: true,
  };
  return newNode;
}

function recursiveDivision(grid, x, y) {
  const dx = x[1] - x[0];
  const dy = y[1] - y[0];
  
  if (dx < 2 || dy < 2) return;
  const applyToRow = dx !== dy ? dx < dy : Boolean(getRandomNumber(0, 1));

  if (applyToRow) {
    const col = Math.floor(getRandomNumber(...y)/2)*2;
    buildHorizontalWall(grid, x[0], x[1], col);

    recursiveDivision(grid, x, [y[0], col - 1]);
    recursiveDivision(grid, x, [col + 1, y[1]]);
  } else {
    const row = Math.floor(getRandomNumber(...x)/2)*2;
    buildVerticalWall(grid, y[0], y[1], row);

    recursiveDivision(grid, [x[0], row - 1], y);
    recursiveDivision(grid, [row + 1, x[1]], y);
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildHorizontalWall(
  grid,
  minCol,
  maxCol,
  row
) {
  const passage = Math.floor(getRandomNumber(minCol, maxCol)/2)*2 + 1;
  for (let i = minCol; i <= maxCol; i++) {
    if (i === passage) continue;
    grid[row][i] = toWall(grid[row][i]);
  }
}

function buildVerticalWall(
  grid,
  minRow,
  maxRow,
  col
) {
  const passage = Math.floor(getRandomNumber(minRow, maxRow)/2)*2 + 1;
  for (let i = minRow; i <= maxRow; i++) {
    if (i === passage) continue;
    grid[i][col] = toWall(grid[i][col]);
  }
}