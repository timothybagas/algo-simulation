import { useState } from "react";
import { useRouter } from "next/router";
import {
  BsPlayCircleFill,
  BsFillBackspaceFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";

import Layout from "../Layout"
import GridNode from "./GridNode";
import {
  getInitialGrid,
  animateAlgorithm,
  mouseHandler,
  resetGrid,
} from "../../algorithms/grid";

const GRID_ROWS = parseInt(process.env.NEXT_PUBLIC_GRID_ROWS, 10);
const GRID_COLS = parseInt(process.env.NEXT_PUBLIC_GRID_COLS, 10);

export default function Grid({ algorithmName, algorithm }) {
  const [startNode, setStartNode] = useState({row: 0, col: 0 });
  const [targetNode, setTargetNode] = useState({ row: GRID_ROWS - 1, col: GRID_COLS - 1 });
  
  const [grid, setGrid] = useState(getInitialGrid(
    GRID_ROWS, GRID_COLS, startNode, targetNode
  ));
  
  const [algorithmIsFinished, setAlgorithmIsFinished] = useState(false);
  const [algorithmIsRunning, setAlgorithmIsRunning] = useState(false);

  const router = useRouter();
  const routerHandler = e => {
    e.preventDefault();
    if (algorithmIsRunning) return;
    router.push('/');
  };

  const { resetGridHandler } = resetGrid({
    grid: grid,
    setGrid: setGrid,
    startNode: startNode,
    targetNode: targetNode,
    algorithmIsRunning: algorithmIsRunning,
    setAlgorithmIsFinished: setAlgorithmIsFinished,
  });

  const { mouseDownHandler, mouseEnterHandler, mouseUpHandler } = mouseHandler({
    grid: grid,
    setGrid: setGrid,
    startNode: startNode,
    setStartNode: setStartNode,
    targetNode: targetNode,
    setTargetNode: setTargetNode,
    algorithmIsFinished: algorithmIsFinished,
  });

  const runAlgorithm = () => {
    if (algorithmIsRunning) return;
    setAlgorithmIsFinished(true);
    setAlgorithmIsRunning(true);
    const { path, visitedNodeOrder } = algorithm(
      grid[startNode.row][startNode.col], grid, GRID_ROWS, GRID_COLS
    );
    if (visitedNodeOrder)
      animateAlgorithm(visitedNodeOrder, path, setAlgorithmIsRunning);
  };

  return (
    <Layout
      title={algorithmName}
      mainClassName="py-10 space-y-10"
    >
      <div className="px-10 flex items-center space-x-2 font-bold text-3xl">
        <button className="bg-transparent border-0" onClick={routerHandler}>
          <IoMdArrowRoundBack />
        </button>
        <h1>{algorithmName}</h1>
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
          onClick={() => resetGridHandler()}
        >
          <BsFillBackspaceFill className="mr-1" />
          {"Reset Grid"}
        </button>

        {/* clear path */}
        <button
          className="bg-red-400 text-white font-bold p-2 rounded-lg flex items-center"
          onClick={() => resetGridHandler(false)}
        >
          <BsFillTrashFill className="mr-1" />
          {"Clear Path"}
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
                const { row, col, isStartNode, isTargetNode, isWall } = node;
                return (
                  <GridNode
                    row={row}
                    col={col}
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