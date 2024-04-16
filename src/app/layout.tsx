import "./globals.css";

import { Inter, Poppins } from "next/font/google";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, poppins.variable)}>{children}</body>
    </html>
  );
}
