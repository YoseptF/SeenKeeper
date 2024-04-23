'use client';

import { FC, useContext } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

import { FavoritesContext } from "@/contexts/Favorites";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

const Header: FC = () => {

  const { hasFavorites } = useContext(FavoritesContext);

  return (
    <nav className="flex flex-col items-center gap-2 [&>*]:max-w-5xl">
      <div className="z-10 w-full items-center justify-between flex p-6 sticky top-0">
        <section className="flex gap-1 items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Next.js Logo"
              width={80}
              height={80}
              priority
            />
          </Link>
        </section>
        <div className="relative bottom-0 left-0 flex items-end justify-center">
          <Link href="/favorites">
            {
              hasFavorites
                ? <GoHeartFill className="text-red-500 text-3xl cursor-pointer" />
                : <GoHeart className="text-red-500 text-3xl cursor-pointer" />
            }
          </Link>
        </div>
      </div>
      <SearchBar />
    </nav>
  );
};

export default Header;