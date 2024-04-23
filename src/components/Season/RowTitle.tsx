import { FC } from "react";

interface RowTitleProps {
  Title: string;
  Season: string;
}

const RowTitle: FC<RowTitleProps> = ({
  Season,
  Title
}) => (
  <h2
    className="text-white text-3xl"
    id={`season-${Season}`}
  >{Title} - Season {Season}</h2>
);

export default RowTitle;