'use client';

import Result, { ResultProps } from "./Result";

import { FC } from "react";
import { defaultResults } from "@/utils/defaultValues";

interface ShowcaseProps {
  results?: ResultProps[];
}

const ResultsShowcase: FC<ShowcaseProps> = ({
  results = defaultResults,
}) => (
  <section className="flex flex-wrap gap-6 justify-center pt-6">
    {results.map((result) => <Result key={result.imdbID} {...result} />)}
  </section>
);


export default ResultsShowcase;