'use client';

import Episode, { EpisodeProps } from "./Episode";
import { FC, useEffect, useRef, useState } from "react";

import Placeholder from "../Placeholder";
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
  const scrolled = useRef(false);

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
        setSeries({ ...defaultSeries, Episodes: [] });
        return;
      }

      setSeries(data);

    };

    fetchData();

    return () => { ignore = true; };
  }, [seasonId, seriesId]);

  const handleAutoScroll = (node: HTMLElement | null) => {
    if (node && !scrolled.current) {
      if (window.location.hash.split("#").includes(`season-${seasonId}`)) {
        scrolled.current = true;
        setTimeout(() => {
          node.scrollIntoView({ block: "end", behavior: "smooth" });
        }, 350);
      }
    }
  };

  return (
    <section
      className="flex flex-col gap-4"
      id={`season-${seasonId}`}
      ref={handleAutoScroll}
    >
      <RowTitle Season={seasonId} Title={seriesTitle} />
      <ul className="flex gap-3 flex-wrap">
        {
          series.Episodes.length > 0
            ? series.Episodes.map((episode, i) => (
              <Episode
                key={i}
                {...episode}
                backgroundImage={seriesBackgroundImage}
                seriesId={seriesId}
                seriesTitle={seriesTitle}
                season={seasonId}
              />
            ))
            : <Placeholder message="No episodes found for this season." />
        }
      </ul>
    </section>
  );
};

export default Season;