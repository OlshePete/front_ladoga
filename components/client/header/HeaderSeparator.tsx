'use client'
import React from 'react'
import { ScrollWrapperHeaderSeparator } from '../motion/ScrollWrapperHeaderSeparator'
import styles from './Header.module.css'
const HeaderSeparator = () => {
  return (
      <ScrollWrapperHeaderSeparator>

    <div className={styles.separator} id={"header_separator"}></div>
      </ScrollWrapperHeaderSeparator>
  )
}

export {HeaderSeparator}