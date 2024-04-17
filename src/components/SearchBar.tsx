"use client";

import { ChangeEventHandler, FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { PATHS_WITHOUT_SEARCH_BAR } from "@/utils/defaultValues";
import classNames from "classnames";
import { debounce } from "@/utils";

const SearchBar: FC = () => {

  const router = useRouter();

  const searchParams = useSearchParams();

  const error = searchParams.get('error');
  const query = searchParams.get('query');

  const debouncedSearch = debounce(async (query: string) => router.push(`/search?query=${query}`), 350);

  const pathname = usePathname();

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => debouncedSearch(e.target.value);

  if (PATHS_WITHOUT_SEARCH_BAR.includes(pathname)) return null;

  return (
    <section className="w-full relative">
      <FaMagnifyingGlass className="absolute left-2 h-5 w-5 top-1/2 -translate-y-1/2" />
      <input
        defaultValue={query || undefined}
        className={classNames(
          "shadow appearance-none rounded py-4 px-9 text-gray-300 leading-tight w-full",
          "focus:outline-none focus:shadow-outline",
          "bg-[#ffffff3d] focus:bg-[#ffffff71]",
          "font-extrabold"
        )}
        onChange={handleSearchChange}
      />
      {
        error && (
          <span
            className="absolute right-8 top-1/2 -translate-y-1/2 text-red-600"
          >
            Error: {error}
          </span>
        )
      }
    </section>
  )
}

export default SearchBar;