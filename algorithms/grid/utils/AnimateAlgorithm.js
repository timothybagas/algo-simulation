export default function animateAlgorithm(visitedNodeOrder, path, setAlgorithmIsRunning) {
  for (let i = 0; i <= visitedNodeOrder.length; i++) {
    if (i === visitedNodeOrder.length) {
      setTimeout(() => {
        if (path) {
          animatePath(path, setAlgorithmIsRunning);
          return;
        }
        setAlgorithmIsRunning(false);
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
}

function animatePath(path, setAlgorithmIsRunning) {
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
}