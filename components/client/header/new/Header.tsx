'use client'
import styles from './Header.module.scss'
import { FC, useEffect, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Nav } from './nav';
import Image from 'next/image';
import { Image as TImage } from '../../../../types/webSiteContentTypes';
import { DesktopNavWrapper } from './components';
import Link from 'next/link';

interface IHeaderProps {
  children: [JSX.Element, JSX.Element],
  logo: { data: TImage },
  scrollY: number,
  logoEl?: typeof Image
}
const HeaderGlobal: FC<IHeaderProps> = ({ logo, logoEl, scrollY: defaultScroll, children }) => {

  const { scrollY } = useScroll();
  const [isActive, setIsActive] = useState(false);
  const params = useParams();
  const [isShrink, setIsShrink] = useState<boolean>(false)

  useEffect(() => {
    console.log("Hash2:", window?.location?.hash, JSON.stringify(isActive));
    if (isActive) setIsActive(false)
  }, [params,]);


  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsShrink(latest > defaultScroll);
  })

  return (
    <>
      <div className={`${styles.header} ${isShrink ? styles.shrinked : ""}`}>
        <AnimatePresence mode="wait" initial={false}>
          <Link href='/'>
            {
              !isShrink ? 
                children[0] :
                  <span className={''} style={{fontWeight:800}}>
                    Магия Севера
                  </span>
            }
          </Link>
          <DesktopNavWrapper>
            {children[1]}
          </DesktopNavWrapper>
          {
            isShrink && <Link href={'/#new-order'}><button type='button' className={`${styles.action_button}`}>бронировать</button></Link>
          }
        </AnimatePresence>
        <div onClick={() => { setIsActive(!isActive) }} className={styles.button}>
          <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  )
}
export { HeaderGlobal }
