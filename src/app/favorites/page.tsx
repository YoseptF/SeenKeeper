'use client';

import { FC, useContext, useMemo } from "react";

import FavoriteSeries from "@/components/FavoriteSeries";
import { FavoritesContext } from "@/contexts/Favorites";
import Placeholder from "@/components/Placeholder";

const Favorites: FC = () => {
  const { favoriteEpisodes } = useContext(FavoritesContext);

  const seriesById = useMemo(() => Object.entries(favoriteEpisodes), [favoriteEpisodes]);

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
  );
};

export default Favorites;