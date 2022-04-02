import ContentCard from "../components/ContentCard"
import Layout from "../components/Layout"

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ContentCard
          title="Grid Algorithms"
          algorithms={["Bread First Search", "Dijkstra", "A-Star", "Depth First Search"]}
        />
      </div>
    </Layout>
  )
}
