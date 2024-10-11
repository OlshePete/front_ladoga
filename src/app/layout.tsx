import type { Metadata } from "next";
import { Open_Sans, Dela_Gothic_One } from "next/font/google";
import "./globals.scss";
import localFont from 'next/font/local'
const deltaGO = localFont({
  src:"../../styles/fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
  // subsets: ["cyrillic"],
  // weight: "400",
  variable: "--font-header",
  preload: false,
});
const openSans = localFont({
  src:"../../styles/fonts/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  // subsets: ["cyrillic"],
  // weight: ["400", "300", "700"],
  variable: "--font-content",
  preload: false,
});

export const metadata: Metadata = {
  title: "Магия севера",
  description: "Экскурсии на катере в городе Сортавала",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" style={{scrollBehavior:'smooth'}}>
      <body className={`${deltaGO.variable} ${openSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
