'use client';

import Description, { SeriesDescription } from "@/components/Description";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FaRegCircleLeft } from "react-icons/fa6";
import Placeholder from "@/components/Placeholder";
import Poster from "@/components/Poster";
import Season from "@/components/Season";
import { defaultSeries } from "@/utils/defaultValues";
import { generateUrl } from "@/utils";

interface ErrorResult {
  Response: string,
  Error: string
}

type Result = SeriesDescription | ErrorResult;

const Series: FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [series, setSeries] = useState(defaultSeries)

  const id = searchParams.get('id');

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      if (!id) return;

      const url = generateUrl({
        baseUrl: "https://www.omdbapi.com/",
        searchParams: {
          i: id.trim(),
          apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
        }
      })

      const response = await fetch(url);

      if (ignore) return;

      const data = await response.json() as Result;

      if ('Error' in data) {
        console.error(data.Error);
        return;
      }

      setSeries(data);
    }

    fetchData();

    return () => { ignore = true }
  }, [id])

  if (!id) return null;

  const episodesInDatabase = Number(series.totalSeasons)

  const hasEpisodesInDatabase = !Number.isNaN(episodesInDatabase)

  return (
    <section className="p-5 flex gap-4 flex-col items-center">
      <FaRegCircleLeft
        className="fixed top-5 left-5 text-4xl cursor-pointer text-white hover:text-gray-500"
        onClick={() => router.back()}
      />
      <article className="flex gap-3 max-w-5xl">
        <Poster backgroundImage={series.Poster} />
        <Description {...series} />
      </article>
      <section className="w-full flex flex-col gap-4">
        {
          hasEpisodesInDatabase
            ? Array.from({ length: Number(series.totalSeasons) }, (_, i) => (
              <Season
                key={`season-${i}`}
                seriesId={id}
                seasonId={`${i + 1}`}
                seriesBackgroundImage={series.Poster}
                seriesTitle={series.Title}
              />
            ))
            : <Placeholder message="No episodes found." />
        }
      </section>
    </section>
  )
}

export default Series;