import Grid from "../../components/grid/Grid";
import {
  runDepthFirstSearch,
} from "../../algorithms/grid";

export default function DepthFirstSearch() {
  return (
    <Grid
      algorithmName="Depth First Search"
      algorithm={runDepthFirstSearch}
    />
  )
}