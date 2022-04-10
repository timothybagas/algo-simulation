export default function transformGridNode({
  grid,
  startNode,
  setStartNode,
  targetNode,
  setTargetNode,
}) {
  const toggleGridNode = (row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (node.isStartNode | node.isTargetNode) return grid;
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
    if (currentStartNode.isWall | currentStartNode.isTargetNode) return grid;
    
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
    if (currentTargetNode.isWall | currentTargetNode.isStartNode) return grid;

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

  return { toggleGridNode, moveStartNode, moveTargetNode };
}