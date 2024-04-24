'use client';

import { EpisodeInfo, setFavorites } from "@/lib/db";
import { FC, useContext } from "react";
import { FavoritesContext, useIsFavorite } from "@/contexts/Favorites";
import { GoHeart, GoHeartFill } from "react-icons/go";

import Poster from "../Poster";
import classNames from "classnames";
import structuredClone from '@ungap/structured-clone';

export interface EpisodeProps extends EpisodeInfo { }

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
  const isFavorite = useIsFavorite({ seriesId, season, episode: EpisodeNumber });
  const { favoriteEpisodes } = useContext(FavoritesContext);


  const handleFavorite = () => {
    const bufferFavorites = structuredClone(favoriteEpisodes);
    if (isFavorite) {
      delete bufferFavorites[seriesId].seasons[season][EpisodeNumber];
      if (Object.keys(bufferFavorites[seriesId].seasons[season]).length === 0) {
        delete bufferFavorites[seriesId].seasons[season];
        if (Object.keys(bufferFavorites[seriesId].seasons).length === 0) {
          delete bufferFavorites[seriesId];
        }
      }
    } else {
      bufferFavorites[seriesId] = {
        seriesName: seriesTitle,
        seasons: {
          ...bufferFavorites[seriesId]?.seasons,
          [season]: {
            ...bufferFavorites[seriesId]?.seasons?.[season],
            [EpisodeNumber]: {
              Title,
              Released,
              imdbRating,
              backgroundImage,
              seriesId,
              seriesTitle,
              Episode: EpisodeNumber,
              season
            }
          }
        },
      };
    };

    setFavorites(bufferFavorites);
  };

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
  );
};

export default Episode;