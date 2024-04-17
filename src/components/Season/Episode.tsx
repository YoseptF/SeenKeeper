'use client';

import { FC, useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

import Poster from "../Poster";
import classNames from "classnames";

export interface EpisodeProps {
  Title: string;
  Released: string;
  Episode: string;
  imdbRating: string;
  backgroundImage: string;
  seriesId: string;
  seriesTitle: string;
  season: string;
}

const Episode: FC<EpisodeProps> = ({
  Episode: EpisodeNumber,
  Released,
  Title,
  imdbRating,
  backgroundImage,
  seriesId,
  seriesTitle,
  season
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteEpisodes = localStorage.getItem('favoriteEpisodes');
    const parsedFavoriteEpisodes = favoriteEpisodes ? JSON.parse(favoriteEpisodes) : {};

    if (parsedFavoriteEpisodes[seriesId]?.seasons?.[season]?.[EpisodeNumber]) {
      setIsFavorite(true);
    }
  }, [Title, seriesId, EpisodeNumber, season])

  const handleFavorite = () => {
    const favoriteEpisodes = localStorage.getItem('favoriteEpisodes');
    const parsedFavoriteEpisodes = favoriteEpisodes ? JSON.parse(favoriteEpisodes) : {};

    if (isFavorite) {
      delete parsedFavoriteEpisodes[seriesId].seasons[season][EpisodeNumber];
      if (Object.keys(parsedFavoriteEpisodes[seriesId].seasons[season]).length === 0) {
        delete parsedFavoriteEpisodes[seriesId];

        window.dispatchEvent(new StorageEvent('storage'));
      }
    } else {
      parsedFavoriteEpisodes[seriesId] = {
        series: seriesTitle,
        seasons: {
          ...parsedFavoriteEpisodes[seriesId]?.seasons,
          [season]: {
            ...parsedFavoriteEpisodes[seriesId]?.seasons?.[season],
            [EpisodeNumber]: {
              Title,
              Released,
              imdbRating,
              backgroundImage,
              seriesId,
              seriesTitle,
              Episode: EpisodeNumber
            } as EpisodeProps
          }
        },
      }
    };
  

  localStorage.setItem('favoriteEpisodes', JSON.stringify(parsedFavoriteEpisodes));
  window.dispatchEvent(new StorageEvent('storage'));

  setIsFavorite(!isFavorite);
}

return (
  <li
    className={(classNames(
      "relative text-white cursor-pointer hover:text-start",
      "[&:hover_button]:scale-125 transition-transform duration-300 ease-in-out animate-fade-in",
    ))}
    onClick={handleFavorite}
  >
    <Poster backgroundImage={backgroundImage} height={300} width={300} blurry />
    <div className={classNames(
      "absolute p-2 bg-[#00000025] rounded-lg",
      "top-1/2 -translate-y-1/2",
      "left-1/2 -translate-x-1/2",
      "[&>*]:w-max [&>*]:max-w-44",
      "pointer-events-none"
    )}>
      <h3><strong>Title:</strong> {Title}</h3>
      <p><strong>Episode:</strong> {EpisodeNumber}</p>
      <p><strong>Released:</strong> {Released}</p>
      <p><strong>Rating:</strong> {imdbRating}</p>
    </div>
    <div className={classNames(
      "absolute p-2 bg-[#00000025] rounded-lg",
      "top-2 right-2",
      "pointer-events-none"
    )}>
      <button
        className="text-red-500"
      >
        {
          isFavorite
            ? <GoHeartFill size={24} />
            : <GoHeart size={24} />
        }
      </button>
    </div>
  </li>
)
}

export default Episode;