import Head from "next/head"

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{(title ? title + " - " : "") + "Algo Simulation"}</title>
      </Head>
      <div>
        {children}
      </div>
    </>
  )
}