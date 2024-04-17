'use client';

import { FC, useEffect, useState } from "react";
import { defaultResults, loadingResults } from "@/utils/defaultValues";
import { useRouter, useSearchParams } from "next/navigation";

import { ResultProps } from "@/components/ResultsShowcase/Result";
import ResultsShowcase from "@/components/ResultsShowcase";
import { generateUrl } from "@/utils";

interface SearchResultSuccess {
  Response: string,
  Search: ResultProps[],
  totalResults: string
}

interface SearchResultError {
  Response: string,
  Error: string
}

type SearchResult = SearchResultSuccess | SearchResultError;

const Search: FC = () => {
  const [results, setResults] = useState(defaultResults);

  const searchParams = useSearchParams()

  const search = searchParams.get('query');

  const router = useRouter();

  useEffect(() => {
    let ignore = false;
    const fetchResults = async () => {
      if (!search) {
        setResults(defaultResults);
        return;
      };

      let bufferResults: ResultProps[] = [];

      setResults(currentResults => {
        bufferResults = currentResults;
        return loadingResults;
      });

      const url = generateUrl({
        baseUrl: "http://www.omdbapi.com/",
        searchParams: {
          s: search.trim(),
          apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
          type: 'series'
        }
      })

      const response = await fetch(url);

      if (ignore) return;

      const data = await response.json() as SearchResult;

      if ('Error' in data) {
        router.push(`?error=${data.Error}`);
        setResults(bufferResults);
        return;
      }

      setResults(data.Search);

      console.debug(data);
    }

    if (search) fetchResults();

    return () => { ignore = true; }
  }, [search, router])

  return (
    <ResultsShowcase results={results} />
  );
}

export default Search;