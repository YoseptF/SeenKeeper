'use client';

import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { FavoriteEpisodesBySeries, getFavorites } from "@/lib/db";

interface IFavoritesContext {
  favoriteEpisodes: FavoriteEpisodesBySeries,
  hasFavorites: boolean
}

const initialFavoriteEpisodes = getFavorites();

export const FavoritesContext = createContext<IFavoritesContext>({
  favoriteEpisodes: initialFavoriteEpisodes,
  hasFavorites: Object.keys(initialFavoriteEpisodes).length > 0,
});

interface FavoritesProviderProps {
  children: ReactNode
}

const FavoritesProvider: FC<FavoritesProviderProps> = ({ children }) => {
  const [favoriteEpisodes, setFavorites] = useState(initialFavoriteEpisodes);
  const [hasFavorites, setHasFavorites] = useState(Object.keys(initialFavoriteEpisodes).length > 0);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.newValue) throw new Error('No new value in storage event');
      const favoriteEpisodes = JSON.parse(e.newValue) as FavoriteEpisodesBySeries;
      setFavorites(favoriteEpisodes);
      setHasFavorites(Object.keys(favoriteEpisodes).length > 0);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  });

  return (
    <FavoritesContext.Provider value={{ favoriteEpisodes, hasFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

interface UseIsFavoriteProps {
  seriesId: string;
  season: string;
  episode: string;
}

export const useIsFavorite = ({ episode, season, seriesId }: UseIsFavoriteProps) => {
  const { favoriteEpisodes } = useContext(FavoritesContext);

  const [isFavorite, setIsFavorite] = useState(!!favoriteEpisodes[seriesId]?.seasons[season]?.[episode]);

  useEffect(() => {
    setIsFavorite(!!favoriteEpisodes[seriesId]?.seasons[season]?.[episode]);
  }, [favoriteEpisodes, seriesId, season, episode]);

  return isFavorite;
};

export default FavoritesProvider;