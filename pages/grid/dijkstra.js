import Grid from "../../components/grid/Grid";
import {
  runDijkstra,
} from "../../algorithms/grid";

export default function Dijkstra() {
  return (
    <Grid
      algorithmName="Dijkstra"
      algorithm={runDijkstra}
    />
  )
}