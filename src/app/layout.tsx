import "./globals.css";

import { Inter, Poppins } from "next/font/google";

import Header from "@/components/Header";
import type { Metadata } from "next";
import Search from "@/components/SearchBar";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.debug('--RootLayout', Date.now());
  return (
    <html lang="en">
      <body className={classNames(
        inter.className,
        poppins.variable,
        'flex flex-col min-h-screen'
      )}>
        <Header />
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}
