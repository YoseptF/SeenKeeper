import { FC } from "react";
import Link from "next/link";
import PosterComponent from "@/components/Poster";

export interface ResultProps {
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
  imdbID: string
}

const Result: FC<ResultProps> = ({
  Poster,
  Title,
  Type,
  Year,
  imdbID
}) => {
  return (
    <Link key={imdbID} href={`/${Type}?id=${imdbID}`}>
      <article className="flex flex-col gap-2 ">
        <PosterComponent backgroundImage={Poster} />
        <div>
          <h2 className="font-bold max-w-72 text-white">{Title}</h2>
          <p className="text-gray-300">{Year}</p>
        </div>
      </article>
    </Link>
  )
}

export default Result;