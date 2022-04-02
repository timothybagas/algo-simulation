import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{(title ? title + " - " : "") + "Algo Simulation"}</title>
      </Head>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}