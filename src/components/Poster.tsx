import { FC } from "react";
import classNames from "classnames";

interface PosterProps {
  backgroundImage: string;
  width?: number;
  height?: number;
  blurry?: boolean;
}

const Poster: FC<PosterProps> = ({
  backgroundImage,
  width = 300,
  height = 450,
  blurry
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        width,
        height
      }}
      className={
        classNames(
          "bg-cover bg-center rounded-lg shadow-lg",
          "hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in",
          blurry && "filter blur-sm"
        )
      }
    />
  )
}

export default Poster;