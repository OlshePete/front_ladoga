import styles from './style.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../../anim';
import { FC } from 'react';
interface NavProps {
  data:{
    title:string,
    href:string,
    index:number
  };
  isActive:boolean;
  setSelectedIndicator:(href:string)=>void;
}
const ALink:FC<NavProps> = ({data, isActive, setSelectedIndicator})=> {
  
    const { title, href, index} = data;
  
    return (
      <motion.div 
        className={styles.link} 
        onMouseEnter={() => {setSelectedIndicator(href)}} 
        custom={index} 
        variants={slide} 
        initial="initial" 
        animate="enter" 
        exit="exit"
      >
        <motion.div 
          variants={scale} 
          animate={isActive ? "open" : "closed"} 
          className={styles.indicator}>
        </motion.div>
        <Link href={href}>{title}</Link>
      </motion.div>
    )
}
export {ALink}