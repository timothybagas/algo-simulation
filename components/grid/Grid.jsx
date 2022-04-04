import { useState, useEffect } from "react";
import Link from "next/link";
import { BsPlayCircleFill, BsFillBackspaceFill } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";

import Layout from "../Layout"
import GridNode from "./GridNode";
import {
  findPath,
  getInitialGrid
} from "../../algorithms/grid";

const GRID_ROWS = 10, GRID_COLS = 20;

export default function Grid({ algorithm }) {
  const [startNode, setStartNode] = useState({row: 0, col: 0 });
  const [targetNode, setTargetNode] = useState({ row: GRID_ROWS - 1, col: GRID_COLS - 1 });
  const [changeNodeMode, setChangeNodeMode] = useState(0);
  
  const [grid, setGrid] = useState(getInitialGrid(
    GRID_ROWS, GRID_COLS, startNode, targetNode
  ));
  
  const [resetGrid, setResetGrid] = useState(false);
  const [algorithmRunned, setAlgorithmRunned] = useState(false);
  const [algorithmIsRunning, setAlgorithmIsRunning] = useState(false);

  const resetGridHandler = () => {
    if (algorithmIsRunning) return;
    for (const row of grid) {
      for (const node of row) {
        document.getElementById(`node-${node.row}-${node.col}`).classList.remove('bg-sky-400', 'bg-yellow-300');
      }
    }
    setResetGrid(!resetGrid);
    setAlgorithmRunned(false);
  };

  useEffect(() => {
    setGrid(getInitialGrid(
      GRID_ROWS, GRID_COLS, startNode, targetNode
    ));
  }, [resetGrid]);

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

  const moveStartNode = (row, col) => {
    const newGrid = grid.slice();
    const oldStartNode = newGrid[startNode.row][startNode.col];

    const currentStartNode = newGrid[row][col];
    if (currentStartNode.isWall) return grid;
    
    const newOldStartNode = {
      ...oldStartNode,
      isStartNode: false
    };
    const newCurrentStartNode = {
      ...currentStartNode,
      isStartNode: true
    };
    
    newGrid[startNode.row][startNode.col] = newOldStartNode;
    newGrid[row][col] = newCurrentStartNode;
    setStartNode({ row: row, col: col });
    return newGrid;
  };

  const moveTargetNode = (row, col) => {
    const newGrid = grid.slice();
    const oldTargetNode = newGrid[targetNode.row][targetNode.col];
    
    const currentTargetNode = newGrid[row][col];
    if (currentTargetNode.isWall) return grid;

    const newOldTargetNode = {
      ...oldTargetNode,
      isTargetNode: false
    };
    const newCurrentTargetNode = {
      ...currentTargetNode,
      isTargetNode: true
    };

    newGrid[targetNode.row][targetNode.col] = newOldTargetNode;
    newGrid[row][col] = newCurrentTargetNode;
    setTargetNode({ row, col });
    return newGrid;
  };

  const mouseDownHandler = (row, col) => {
    if (algorithmRunned) return;
    const node = grid[row][col];
    let newGrid = [];
    if (!node.isStartNode && !node.isTargetNode) {
      newGrid = toggleGridNode(row, col);
      setChangeNodeMode(0);
    } else if (node.isStartNode) {
      newGrid = moveStartNode(row, col);
      setChangeNodeMode(1);
    } else {
      newGrid = moveTargetNode(row, col);
      setChangeNodeMode(2);
    }
    setGrid(newGrid);
    setMousePressed(true);
  };
  const mouseEnterHandler = (row, col) => {
    if (algorithmRunned) return;
    if (!mousePressed) return;
    let newGrid = [];
    if (changeNodeMode === 0) {
      newGrid = toggleGridNode(row, col);
    } else if (changeNodeMode === 1) {
      newGrid = moveStartNode(row, col);
    } else {
      newGrid = moveTargetNode(row, col);
    }
    setGrid(newGrid);
  };
  const mouseUpHandler = () => {
    setMousePressed(false);
    setChangeNodeMode(0);
  };

  const runAlgorithm = () => {
    setAlgorithmRunned(true);
    setAlgorithmIsRunning(true);
    const { reachTargetNode, visitedNodeOrder } = algorithm(
      grid[startNode.row][startNode.col], grid, GRID_ROWS, GRID_COLS
    );
    const path = reachTargetNode ? findPath(grid[targetNode.row][targetNode.col]) : null;
    animateAlgorithm(visitedNodeOrder, path, reachTargetNode);
  };
  const animateAlgorithm = (visitedNodeOrder, path, reachTargetNode) => {
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
        if (!reachTargetNode && i === visitedNodeOrder.length - 1) {
          setAlgorithmIsRunning(false);
        }
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
        if (i === path.length - 1) {
          setAlgorithmIsRunning(false);
        }
      }, 50*i);
    }
  };

  return (
    <Layout
      title="Bread First Search"
      mainClassName="py-10 space-y-10"
    >
      <div className="px-10 flex items-center space-x-2 font-bold text-3xl">
        <Link href="/">
          <a><IoMdArrowRoundBack /></a>
        </Link>
        <h1>{"Bread First Search"}</h1>
      </div>

      <div className="flex justify-center space-x-5">
        {/* simulate */}
        <button
          className="bg-green-500 text-white font-bold p-2 rounded-lg flex items-center"
          onClick={runAlgorithm}
        >
          <BsPlayCircleFill className="mr-1" />
          {"Simulate"}
        </button>

        {/* reset grid */}
        <button
          className="bg-red-500 text-white font-bold p-2 rounded-lg flex items-center"
          onClick={resetGridHandler}
        >
          <BsFillBackspaceFill className="mr-1" />
          {"Reset Grid"}
        </button>
      </div>

      <div className="w-11/12 m-auto">
        <p className="text-center">
          <span className="font-bold">{"Note : "}</span>
          {"Tap an empty grid cell to add/remove wall"}
        </p>
        <div className="w-full">
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
      </div>
    </Layout>
  )
}