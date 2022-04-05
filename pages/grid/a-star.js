import Grid from "../../components/grid/Grid";
import {
  runAStar,
} from "../../algorithms/grid";

export default function AStar() {
  return (
    <Grid
      algorithmName="A-Star"
      algorithm={runAStar}
    />
  )
}