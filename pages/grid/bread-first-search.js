import { useState } from "react";

import Layout from "../../components/Layout"
import GridNode from "../../components/GridNode";
import {
  runBreadFirstSearch, 
  findPath,
  getInitialGrid
} from "../../algorithms/grid";

const GRID_ROWS = 10, GRID_COLS = 20;

export default function BreadFirstSearch() {
  const startNode = {row: 0, col: 0 };
  const targetNode = { row: GRID_ROWS - 1, col: GRID_COLS - 1 };
  
  const [grid, setGrid] = useState(getInitialGrid(
    GRID_ROWS, GRID_COLS, startNode, targetNode
  ));

  const [mousePressed, setMousePressed] = useState(false);

  const toggleGridNode = (row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const mouseDownHandler = (row, col) => {
    const newGrid = toggleGridNode(row, col);
    setGrid(newGrid);
    setMousePressed(true);
  };
  const mouseEnterHandler = (row, col) => {
    if (!mousePressed) return;
    const newGrid = toggleGridNode(row, col);
    setGrid(newGrid);
  };
  const mouseUpHandler = () => {
    setMousePressed(false);
  };

  const runAlgorithm = () => {
    const { reachTargetNode, visitedNodeOrder } = runBreadFirstSearch(
      grid[startNode.row][startNode.col], grid, GRID_ROWS, GRID_COLS
    );
    const path = reachTargetNode ? findPath(grid[targetNode.row][targetNode.col]) : null;
    animateAlgorithm(visitedNodeOrder, path);
  };
  const animateAlgorithm = (visitedNodeOrder, path) => {
    for (let i = 0; i <= visitedNodeOrder.length; i++) {
      if (i === visitedNodeOrder.length) {
        setTimeout(() => {
          if (path) {
            animatePath(path);
            return;
          }
        }, 20*i);
        break;
      }
      setTimeout(() => {
        const node = visitedNodeOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).classList.add(
          'bg-sky-400'
        );
      }, 20*i);
    }
  };
  const animatePath = path => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        document.getElementById(`node-${node.row}-${node.col}`).classList.remove(
          'bg-sky-400'
        );
        document.getElementById(`node-${node.row}-${node.col}`).classList.add(
          'bg-yellow-300'
        );
      }, 50*i);
    }
  };

  return (
    <Layout
      title="Bread First Search"
      mainClassName="py-10"
    >
      <button onClick={runAlgorithm}>{"Simulate"}</button>
      <div className="w-11/12 m-auto">
        {grid.map((row, i) => (
          <div key={i} className="flex justify-center">
            {row.map((node, j) => {
              const { row, col, weight, isStartNode, isTargetNode, isWall } = node;
              return (
                <GridNode
                  row={row}
                  col={col}
                  weight={weight}
                  isStartNode={isStartNode}
                  isTargetNode={isTargetNode}
                  isWall={isWall}
                  onMouseDown={() => mouseDownHandler(row, col)}
                  onMouseEnter={() => mouseEnterHandler(row, col)}
                  onMouseUp={mouseUpHandler}
                  key={j}
                />
              );
            })}
          </div>
        ))}
      </div>
    </Layout>
  )
}