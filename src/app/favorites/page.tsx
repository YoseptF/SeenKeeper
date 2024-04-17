'use client';

import { FC, useEffect, useMemo, useState } from "react";
import FavoriteSeries, { FavoriteSeriesInfo } from "@/components/FavoriteSeries";

import { LOCAL_STORAGE_KEY } from "@/utils/defaultValues";
import Placeholder from "@/components/Placeholder";

type FavoriteEpisodesBySeries = {
  [seriesId: string]: FavoriteSeriesInfo,
}

const Favorites: FC = () => {
  const [seriesById, setSeriesById] = useState<[string, FavoriteSeriesInfo][]>([]);

  useEffect(() => {
    const favoriteEpisodes = localStorage.getItem(LOCAL_STORAGE_KEY);
    const favoriteEpisodesBySeries = (favoriteEpisodes ? JSON.parse(favoriteEpisodes) : {}) as FavoriteEpisodesBySeries;

    setSeriesById(Object.entries(favoriteEpisodesBySeries))

    const handleStorageChange = () => {
      setSeriesById(Object.entries(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}')))
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  },[])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-white">Favorites</h1>
      <div className="flex flex-col items-start justify-center w-full p-14 gap-7">
        {
          seriesById.length > 0
            ? seriesById.map(([seriesId, series]) => (
              <FavoriteSeries
                key={seriesId}
                seriesId={seriesId}
                series={series}
              />
            ))
            : <Placeholder message="Your favorites list is empty." />
        }
      </div>
    </div>
  )
}

export default Favorites;