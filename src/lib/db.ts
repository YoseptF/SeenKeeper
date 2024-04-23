export interface EpisodeInfo {
  Title: string;
  Released: string;
  Episode: string;
  imdbRating: string;
  backgroundImage: string;
  seriesId: string;
  seriesTitle: string;
  season: string;
}

interface SeasonInfo {
  [episodeNumber: string]: EpisodeInfo
}

export interface SeriesInfo {
  seriesName: string;
  seasons: {
    [seasonId: string]: SeasonInfo
  }
}

export interface FavoriteEpisodesBySeries {
  [seriesId: string]: SeriesInfo
}

export const FAVORITES_LOCAL_STORAGE_KEY = 'favoriteEpisodes';

export const getFavorites = (): FavoriteEpisodesBySeries => {
  const value = localStorage.getItem(FAVORITES_LOCAL_STORAGE_KEY);
  return value ? JSON.parse(value) : {};
};

export const setFavorites = (value: FavoriteEpisodesBySeries) => {
  localStorage.setItem(FAVORITES_LOCAL_STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new StorageEvent('storage', { newValue: JSON.stringify(value) }));
};
