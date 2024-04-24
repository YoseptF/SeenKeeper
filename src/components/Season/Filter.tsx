import { Dispatch, FC, SetStateAction } from "react";

import Link from "next/link";
import { RiExternalLinkFill } from "react-icons/ri";
import classNames from "classnames";

interface FilterProps {
  iterableSeries: boolean[];
  setIterableSeries: Dispatch<SetStateAction<boolean[]>>;
}

const Filter: FC<FilterProps> = ({
  iterableSeries,
  setIterableSeries
}) => (
  <form className="w-full flex gap-4 text-white items-center">
    <span className="font-bold text-lg">Filter:</span>
    {
      iterableSeries.map((checked, i) => (
        <div
          className={classNames(
            "flex items-center gap-3 border rounded-md [&_span]:p-2",
            !checked && "line-through"
          )}
          key={`label-season-${i + 1}`}
        >
          <Link
            href={`#season-${i + 1}`}
            // if checked, disable the link
            className={classNames(
              "flex items-center gap-1",
              !checked ? "cursor-not-allowed" : "cursor-pointer"
            )}
            onClick={(e) => !checked && e.preventDefault()}
          >
            <span className="border-r pr-3 block">
              <RiExternalLinkFill className={classNames(
                "text-2xl",
                checked && "hover:text-gray-500"
              )} />
            </span>
          </Link>
          <label className="flex items-center gap-1 pr-3 cursor-pointer">
            Season {i + 1}
            <input
              hidden
              type="checkbox"
              checked={checked}
              onChange={() => {
                setIterableSeries((prev) => prev.map((_, index) => index === i ? !checked : _));
              }}
            />
          </label>
        </div>
      ))
    }
  </form>
);

export default Filter;