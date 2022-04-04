import Grid from "../../components/grid/Grid";
import {
  runBreadFirstSearch,
} from "../../algorithms/grid";

export default function BreadFirstSearch() {
  return (
    <Grid
      algorithmName="Bread First Search"
      algorithm={runBreadFirstSearch}
    />
  )
}