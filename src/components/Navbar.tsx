import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <nav className={"z-10 w-full max-w-5xl items-center justify-between flex p-6"}>
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
      <div className="fixed bottom-0 left-0 flex items-end justify-center lg:static">
        <Image
          src="https://via.placeholder.com/34?text=JF"
          alt="Vercel Logo"
          className="dark:invert rounded-full"
          width={34}
          height={34}
          priority
        />
      </div>
    </nav>
  )
}

export default Navbar;