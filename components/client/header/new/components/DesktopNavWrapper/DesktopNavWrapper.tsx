import { motion } from 'framer-motion'
import React, { FC } from 'react'
import styles from './DesktopNavWrapper.module.scss'
interface INavProps {
  children: JSX.Element,
}
const DesktopNavWrapper: FC<INavProps> = ({ children }) => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-label="Navigation-Menu"
      className={`${styles.nav_container}`}>
      {children}
    </motion.nav>
  )
}
export default DesktopNavWrapper