import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"

export default function Layout({ title, mainClassName, children }) {
  return (
    <>
      <Head>
        <title>{(title ? title + " - " : "") + "Algo Simulation"}</title>
      </Head>
      <div>
        <Header />
        <main className={mainClassName || "p-10"}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}