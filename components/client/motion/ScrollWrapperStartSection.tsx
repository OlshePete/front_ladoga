'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import { relative } from 'path/posix';
import React, { FC, useEffect } from 'react'

interface Props {
    children: JSX.Element;
    opposite?:boolean;
  }
const ScrollWrapperStartSection:FC<Props> = ({children, opposite = false}) => {
    const scroll = useScroll()
    const { scrollYProgress,scrollX } = scroll
    const top = useTransform(scrollYProgress, [0, 0.2], [0, -200]);
    const bottom = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
      
    return (
      <motion.div
        style={{ 
          translateY:opposite?bottom:top,
          // position:'relative',
          // top:top,
          zIndex:3
        }}
      >
            {children}
      </motion.div>
    )
}

export {ScrollWrapperStartSection}