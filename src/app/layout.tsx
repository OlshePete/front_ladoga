import type { Metadata } from "next";
import { Open_Sans, Dela_Gothic_One } from "next/font/google";
import "./globals.scss";

const deltaGO = Dela_Gothic_One({
  subsets: ["cyrillic"],
  weight: "400",
  variable: "--font-header",
});
const openSans = Open_Sans({
  subsets: ["cyrillic"],
  weight: ["400", "300", "700"],
  variable: "--font-content",
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
