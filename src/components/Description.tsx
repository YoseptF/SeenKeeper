import { FC } from "react";

export interface SeriesDescription {
  Title: string,
  Year: string,
  Rated: string,
  Released: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Poster: string,
  Ratings: {
    Source: string,
    Value: string
  }[],
  Metascore: string,
  imdbRating: string,
  imdbVotes: string,
  imdbID: string,
  Type: string,
  totalSeasons: string,
  Response: string
}

const ignoreKeys = ['Poster', 'Ratings', 'Response', 'imdbID', 'Type', 'Metascore', 'totalSeasons', 'Awards', 'Language'];

const Description: FC<SeriesDescription> = (props) => (
  <div className="flex flex-col gap-2 text-white">
    {
      Object.entries(props)
      .filter(([key]) => !ignoreKeys.includes(key))
      .map(([key, value]) => (
        <p
          key={`detail-${key}`}
          className="max-w-2xl"
        >
          <strong>{key}:</strong>
          &nbsp;
          {String(value)}
        </p>
      ))
    }
  </div>
)

export default Description;