'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { FC } from 'react'

interface Props {
    children: JSX.Element;
  }
const ScrollWrapperHeaderSeparator:FC<Props> = ({children}) => {
    const scroll = useScroll()
    const { scrollYProgress } = scroll
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
      
    return (
      <motion.div
        style={{ 
          opacity,
          zIndex:12
        }}
      >
            {children}
      </motion.div>
    )
}

export {ScrollWrapperHeaderSeparator}