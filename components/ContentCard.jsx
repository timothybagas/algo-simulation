import Link from "next/link"
import Image from "next/image"

export default function ContentCard({
  title,
  algorithms,
  type,
  imageSrc,
  imageAlt
}) {
  return (
    <div className="rounded-xl drop-shadow-xl bg-white hover:bg-gray-100 cursor-pointer">
      <div className="p-5">
        <h2 className="font-bold text-2xl">{title}</h2>
      </div>
      <div className="w-full h-36 relative">
        <Image
          src={imageSrc}
          alt={imageAlt || "thumb"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-5 space-y-3">
        <p className="font-bold">{"List of algorithms :"}</p>
        <div className="w-full">
          {algorithms.map((algorithm, key) => (
            <div
              className="bg-gray-200 p-2 hover:bg-sky-400 hover:text-white duration-200 ease-in rounded-lg w-fit inline-block m-1"
              key={key}
            >
              <Link href={`/${type}/${algorithm.toLowerCase().split(/ /).join('-')}`}>
                <a>{algorithm}</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>  
  )
}