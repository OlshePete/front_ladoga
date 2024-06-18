'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { FC } from 'react'

interface Props {
    children: JSX.Element;
  }
const ScrollWrapper:FC<Props> = ({children}) => {
    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
      
    return (
      <motion.div
        style={{ scale }}
      >
        <motion.div
          style={{
            scaleY: scrollYProgress
          }}
        >
            {children}
        </motion.div>
      </motion.div>
    )
}

export {ScrollWrapper}