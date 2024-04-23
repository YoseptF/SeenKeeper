'use client';

import Episode, { EpisodeProps } from "./Episode";
import { FC, useEffect, useState } from "react";

import RowTitle from "./RowTitle";
import { generateUrl } from "@/utils";

interface EpisodesResponse {
  Title: string;
  Season: string;
  totalSeasons: string;
  Episodes: EpisodeProps[];
}

interface ErrorResult {
  Response: string,
  Error: string
}

type Result = EpisodesResponse | ErrorResult;

const defaultSeries: EpisodesResponse = {
  Title: "Loading...",
  Season: "Loading...",
  totalSeasons: "Loading...",
  Episodes: Array.from({ length: 10 }, () => ({
    Title: "Loading...",
    Released: "Loading...",
    Episode: "Loading...",
    imdbRating: "Loading...",
    backgroundImage: "/loading.png",
    seriesId: "Loading...",
    season: "Loading",
    seriesTitle: "Loading"
  }))
};

interface SeasonProps {
  seriesId: string;
  seasonId: string;
  seriesBackgroundImage?: string;
  seriesTitle: string;
}

const Season: FC<SeasonProps> = ({
  seasonId,
  seriesId,
  seriesBackgroundImage = '',
  seriesTitle
}) => {

  const [series, setSeries] = useState(defaultSeries);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      if (!seriesId || !seasonId) return;

      const url = generateUrl({
        baseUrl: "https://www.omdbapi.com/",
        searchParams: {
          i: seriesId.trim(),
          Season: seasonId.trim(),
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

    };

    fetchData();

    return () => { ignore = true; };
  }, [seasonId, seriesId]);

  return (
    <section className="flex flex-col gap-4">
      <RowTitle Season={series.Season} Title={series.Title} />
      <ul className="flex gap-3 flex-wrap">
        {
          series.Episodes.map((episode, i) => (
            <Episode
              key={i}
              {...episode}
              backgroundImage={seriesBackgroundImage}
              seriesId={seriesId}
              seriesTitle={seriesTitle}
              season={seasonId}
            />
          ))
        }
      </ul>
    </section>
  );
};

export default Season;