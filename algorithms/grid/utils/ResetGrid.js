import { useState, useEffect } from "react";
import getInitialGrid from "./InitialGrid";
import reupdateGrid from "./ReupdateGrid";

const GRID_ROWS = parseInt(process.env.NEXT_PUBLIC_GRID_ROWS, 10);
const GRID_COLS = parseInt(process.env.NEXT_PUBLIC_GRID_COLS, 10);

export default function resetGrid({
  grid,
  setGrid,
  startNode,
  targetNode,
  algorithmIsRunning,
  setAlgorithmIsFinished,
}) {
  const [resetGrid, setResetGrid] = useState(false);
  const [clearPath, setClearPath] = useState(false);

  useEffect(() => {
    setGrid(getInitialGrid(
      GRID_ROWS, GRID_COLS, startNode, targetNode
    ));
  }, [resetGrid]);

  useEffect(() => {
    setGrid(reupdateGrid(grid, startNode, targetNode));
  }, [clearPath]);

  const resetGridHandler = (removeAll = true) => {
    if (algorithmIsRunning) return;
    for (const row of grid) {
      for (const node of row) {
        document.getElementById(`node-${node.row}-${node.col}`).classList.remove('bg-sky-400', 'bg-yellow-300');
      }
    }
    if (removeAll) {
      setResetGrid(!resetGrid);
    } else {
      setClearPath(!clearPath);
    }
    setAlgorithmIsFinished(false);
  };

  return { resetGridHandler };
}