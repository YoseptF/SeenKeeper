import '../utils/polyfillLocalStorage';
import "./globals.css";

import { Inter, Poppins } from "next/font/google";

import FavoritesProvider from "@/contexts/Favorites";
import Header from "@/components/Header";
import type { Metadata } from "next";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: ['700'],
  variable: '--font-poppins',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Seen Keeper | Keep your favorite series in one place",
  description: "Keep your favorite series in one place",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={classNames(
      inter.className,
      poppins.variable,
      'flex flex-col min-h-screen'
    )}>
      <FavoritesProvider>
        <Header />
        <main className="h-full">{children}</main>
      </FavoritesProvider>
    </body>
  </html>
);

export default RootLayout;