import { FC } from "react";
import FavoriteSeriesRow from "./FavoriteSeriesRow";
import { SeriesInfo } from "@/lib/db";

export interface FavoriteSeriesProps {
  seriesId: string;
  series: SeriesInfo;
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
          seriesName={series.seriesName}
          seasonId={seasonId}
          seriesId={seriesId}
        />
      ))
    }
  </div>
)

export default FavoriteSeries;