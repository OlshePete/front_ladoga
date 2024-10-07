import React, { useState } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../anim';
import {ALink} from './Link';
import { BiLogoTelegram, BiLogoVk, BiLogoYoutube } from 'react-icons/bi';
import Link from 'next/link';




const navItems = [
  {
    title: "В начало",
    href: "/",
  },
  {
    title: "Маршруты",
    href: "#top-routes",
  },
  {
    title: "Бронирование",
    href: "#new-order",
  },
  {
    title: "Контакты",
    href: "#contacts",
  }
]

const Nav = () => {

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className={styles.menu}
      >
       <div className={styles.body}>
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
                    <div className={styles.header}>
                        <p>Навигация</p>
                    </div>
                    {
                      navItems.map( (data, index) => {
                        return <ALink 
                        key={index} 
                        data={{...data, index}} 
                        isActive={selectedIndicator == data.href} 
                        setSelectedIndicator={setSelectedIndicator}
                      />
                      })
                    }
            </div>
            <div className={styles.footer}>
                <Link href={'#'}>
                <BiLogoTelegram size={34} />
                </Link>
                <Link href={'#'}>
                <BiLogoYoutube size={34}/>
                </Link>
                <Link href={'#'}>
                  <BiLogoVk size={34}/>
                </Link>
            </div>
        </div>
    </motion.div>
  )
}
export {Nav}
