import React from 'react'
import styles from "./TheHeader.module.scss";
import { Image as TImage } from "../../../types/webSiteContentTypes";
import Image from "next/image";
import { HeaderGlobal } from "../../client/header/new/Header";
import Link from 'next/link';

const TheHeader = ({ logo,links }: { logo: { data: TImage },links:{name:string, url:string}[] }) => {
  const API_URL = process.env.API_URL;
  
  return (
    <header className={styles.container}>
       <HeaderGlobal logo={logo} scrollY={420}>
      <Image
        src={API_URL + (logo.data.attributes.formats.small.url || "")}
        alt={logo.data.attributes.alternativeText || ""}
        className={styles.image}
        width="120"
        height="80"
      />
     
        <ul className="flex flex-wrap justify-center items-center">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.url}
                className="transition duration-300 ease-in-out mx-2"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </HeaderGlobal>
    </header>
  );
};
export default TheHeader