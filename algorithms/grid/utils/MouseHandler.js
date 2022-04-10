import { useState } from "react";
import transformGridNode from "./TransformGridNode";

export default function mouseHandler({
  grid,
  setGrid,
  startNode,
  setStartNode,
  targetNode,
  setTargetNode,
  algorithmIsFinished,
  pickedNode,
  setPickedNode,
}) {
  const [mousePressed, setMousePressed] = useState(false);
  const { toggleGridNode, moveStartNode, moveTargetNode } = transformGridNode({
    grid, startNode, setStartNode, targetNode, setTargetNode,
  });

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
    if (pickedNode.isStartNode) {
      newGrid = moveStartNode(row, col);
    } else if (pickedNode.isTargetNode) {
      newGrid = moveTargetNode(row, col);
    } else {
      newGrid = toggleGridNode(row, col);
    }
    setGrid(newGrid);
  };

  const mouseUpHandler = () => {
    setMousePressed(false);
    setPickedNode({
      isStartNode: false, isTargetNode: false
    });
  };

  return { mouseDownHandler, mouseEnterHandler, mouseUpHandler };
}