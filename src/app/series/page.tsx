'use client';

import Description, { SeriesDescription } from "@/components/Description";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { FaRegCircleLeft } from "react-icons/fa6";
import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import Poster from "@/components/Poster";
import { RiExternalLinkFill } from "react-icons/ri";
import Season from "@/components/Season";
import classNames from "classnames";
import { defaultSeries } from "@/utils/defaultValues";
import { generateUrl } from "@/utils";

interface ErrorResult {
  Response: string,
  Error: string
}

type Result = SeriesDescription | ErrorResult;

const Series: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [series, setSeries] = useState(defaultSeries);
  const episodesInDatabase = Number(series.totalSeasons);

  const [iterableSeries, setIterableSeries] = useState<boolean[]>([]);

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
      });

      const response = await fetch(url);

      if (ignore) return;

      const data = await response.json() as Result;

      if ('Error' in data) {
        console.error(data.Error);
        return;
      }

      setSeries(data);
      setIterableSeries(new Array(Number(data.totalSeasons)).fill(true));
    };

    fetchData();

    return () => { ignore = true; };
  }, [id]);

  if (!id) return null;

  const hasEpisodesInDatabase = !Number.isNaN(episodesInDatabase);

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
      <form className="w-full flex gap-4 text-white items-center">
        <span className="font-bold text-lg">Filter:</span>
        {
          iterableSeries.map((checked, i) => (
            <div
              className={classNames(
                "flex items-center gap-3 border rounded-md [&_span]:p-2",
                !checked && "line-through"
              )}
              key={`label-season-${i + 1}`}
            >
              <Link
                href={`#season-${i + 1}`}
                // if checked, disable the link
                className={classNames(
                  "flex items-center gap-1",
                  !checked ? "cursor-not-allowed" : "cursor-pointer"
                )}
                onClick={(e) => !checked && e.preventDefault()}
              >
                <span className="border-r pr-3 block">
                  <RiExternalLinkFill className={classNames(
                    "text-2xl",
                    checked && "hover:text-gray-500"
                  )} />
                </span>
              </Link>
              <label className="flex items-center gap-1 pr-3 cursor-pointer">
                Season {i + 1}
                <input
                  hidden
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    setIterableSeries((prev) => prev.map((_, index) => index === i ? !checked : _));
                  }}
                />
              </label>
            </div>
          ))
        }
      </form>
      <section className="w-full flex flex-col gap-4">
        {
          hasEpisodesInDatabase && iterableSeries.some(Boolean)
            ? iterableSeries
              .map((show, i) => (
                <Season
                  key={`showcase-season-${i + 1}`}
                  seriesId={id}
                  seasonId={`${i + 1}`}
                  seriesBackgroundImage={series.Poster}
                  seriesTitle={series.Title}
                  hidden={!show}
                />
              ))
            : <Placeholder message="No episodes found." />
        }
      </section>
    </section>
  );
};

export default Series;