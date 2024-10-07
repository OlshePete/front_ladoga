import type { Metadata } from "next";
import { Open_Sans, Dela_Gothic_One } from "next/font/google";
import "./globals.scss";
import localFont from 'next/font/local'
const deltaGO = localFont({
  src:"public/Dela_Gothic_One/DelaGothicOne-Regular.ttf",
  // subsets: ["cyrillic"],
  // weight: "400",
  variable: "--font-header",
  preload: false,
});
// const openSans = localFont({
//   src:"public/Open_Sans/DelaGothicOne-Regular.ttf",
//   // subsets: ["cyrillic"],
//   // weight: ["400", "300", "700"],
//   variable: "--font-content",
//   preload: false,
// });

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
      <body className={`${deltaGO.variable} ${'openSans.variable'}`}>
        {children}
      </body>
    </html>
  );
}
