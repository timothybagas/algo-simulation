export default function findPath(targetNode) {
  const path = [];
  for (let cur = targetNode; cur !== null; cur = cur.prevNode) {
    path.push(cur);
  }
  return path.reverse();
}