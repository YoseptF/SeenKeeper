import Episode, { EpisodeProps } from "../Season/Episode";

import { FC } from "react";
import FavoriteSeriesRow from "./FavoriteSeriesRow";
import RowTitle from "../Season/RowTitle";

export interface FavoriteSeriesInfo {
  series: string;
  seasons: {
    [seasonId: string]: {
      [episodeNumber: string]: EpisodeProps
    }
  }
}

export interface FavoriteSeriesProps {
  seriesId: string;
  series: FavoriteSeriesInfo;
}

const FavoriteSeries: FC<FavoriteSeriesProps> = ({
  series,
  seriesId,
}) => (
  <div key={`series-${seriesId}`} className="flex flex-col gap-3 flex-wrap items-start">
    {
      Object.entries(series.seasons).map(([seasonId, season]) => (
        <FavoriteSeriesRow
          key={`series-${seriesId}-season-${seasonId}`}
          season={season}
          seriesName={series.series}
          seasonId={seasonId}
          seriesId={seriesId}
        />
      ))
    }
  </div>
)

export default FavoriteSeries;