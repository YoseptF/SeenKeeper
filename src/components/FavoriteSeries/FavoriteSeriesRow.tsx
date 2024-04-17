import Episode, { EpisodeProps } from "../Season/Episode";

import { FC } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import RowTitle from "../Season/RowTitle";

interface FavoriteSeriesRowProps {
  seriesId: string;
  seasonId: string;
  season: {
    [episodeNumber: string]: EpisodeProps;
  },
  seriesName: string;
}

const FavoriteSeriesRow: FC<FavoriteSeriesRowProps> = ({
  seasonId,
  seriesId,
  season,
  seriesName
}) => (
  <div className="flex flex-col gap-4">
    <Link href={`/series?id=${seriesId}`} className="flex gap-3 items-center hover:text-gray-500 hover:underline w-fit">
      <RowTitle Season={seasonId} Title={seriesName} />
      <FaExternalLinkAlt className="text-xl text-white" />
    </Link>
    <ul className="flex gap-3 flex-wrap">
      {
        Object.entries(season).map(([episodeNumber, episode]) => (
          <Episode
            key={`season-${seasonId}-episode-${episodeNumber}`}
            {...episode}
            seriesId={seriesId}
            season={seasonId}
          />
        ))
      }
    </ul>
  </div>
)

export default FavoriteSeriesRow;