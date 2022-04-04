import Link from "next/link"

export default function Header() {
  return (
    <header className="flex justify-between bg-blue-900 py-5 px-10">
      <div className="text-white font-bold text-xl">
        <Link href="/">
          <a className="flex items-center">
            <div className="bg-sky-400 p-2 rounded-xl">
              <p>{"algo"}</p>
            </div>
            <p className="ml-1">{"simulation"}</p>
          </a>
        </Link>
      </div>
    </header>
  )
}