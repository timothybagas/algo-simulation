import { useState, useEffect } from "react";
import transformGridNode from "./TransformGridNode";
import reupdateGrid from "./ReupdateGrid";

export default function mouseHandler({
  grid,
  setGrid,
  startNode,
  setStartNode,
  targetNode,
  setTargetNode,
  algorithmIsFinished,
}) {
  const [mousePressed, setMousePressed] = useState(false);
  const [pickedNode, setPickedNode] = useState({
    isStartNode: false, isTargetNode: false
  });

  const { toggleGridNode, moveStartNode, moveTargetNode } = transformGridNode({
    grid, startNode, setStartNode, targetNode, setTargetNode,
  });

  const [updateGrid, setUpdateGrid] = useState(false);

  useEffect(() => {
    setGrid(reupdateGrid(grid, startNode, targetNode));
  }, [updateGrid]);

  const mouseDownHandler = (row, col) => {
    if (algorithmIsFinished) return;
    const node = grid[row][col];
    let newGrid = [];
    if (node.isStartNode) {
      newGrid = moveStartNode(row, col);
      setPickedNode({
        isStartNode: true, isTargetNode: false
      });
    } else if (node.isTargetNode) {
      newGrid = moveTargetNode(row, col);
      setPickedNode({
        isStartNode: false, isTargetNode: true
      });
    } else {
      newGrid = toggleGridNode(row, col);
    }
    setGrid(newGrid);
    setMousePressed(true);
  };

  const mouseEnterHandler = (row, col) => {
    if (algorithmIsFinished) return;
    if (!mousePressed) return;
    let newGrid = [];
    if (!pickedNode.isStartNode && !pickedNode.isTargetNode) {
      newGrid = toggleGridNode(row, col);
      setGrid(newGrid);
    } else {
      if (pickedNode.isStartNode) {
        newGrid = moveStartNode(row, col);
      } else {
        newGrid = moveTargetNode(row, col);
      }
      setUpdateGrid(!updateGrid);
    }
  };

  const mouseUpHandler = () => {
    setMousePressed(false);
    setPickedNode({
      isStartNode: false, isTargetNode: false
    });
  };

  return { mouseDownHandler, mouseEnterHandler, mouseUpHandler };
}