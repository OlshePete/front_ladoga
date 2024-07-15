'use client'
import styles from './Header.module.scss'
import { useEffect, useState } from 'react';
// import {Nav} from './nav';
import { AnimatePresence } from 'framer-motion';
import { useParams, usePathname } from 'next/navigation';
import { Nav } from './nav';
import Image from 'next/image';
import { Image as TImage } from '../../../../types/webSiteContentTypes';
const HeaderGlobal = ({ logo }: { logo: { data: TImage } }) => {

  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const params = useParams();

  // console.log("1Hash:  ", window.location.hash);
  useEffect(() => {
    console.log("Hash2:", window?.location?.hash, JSON.stringify(isActive));
    if(isActive) setIsActive(false)
  }, [params, ]);
  // useEffect( () => {
  //   console.log("******",location, pathname)
  // }, [pathname, location])
  
  const {API_URL} = process.env
  console.log("******",process.env)
  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>

        <Image
          src={'http://localhost:1337' + (logo.data.attributes.formats.small.url || "")}
          alt={logo.data.attributes.alternativeText || ""}
          className={styles.image}
          width="120"
          height="80"
          />
          <div onClick={() => {setIsActive(!isActive)}} className={styles.button}>
            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav/>}
      </AnimatePresence>
    </>
  )
}
export {HeaderGlobal}