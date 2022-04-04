export default function Footer() {
  return (
    <footer className="bg-gray-100 p-4 flex justify-center">
      <p>
        {"Algo Simulation by "}
        <a
          href="https://github.com/timothybagas/"
          className="hover:text-sky-400 duration-200 ease-in font-bold"
          target="_blank"
          rel="noreferrer"
        >
          {"@timothybagas"}
        </a>
      </p>
    </footer>
  )
}