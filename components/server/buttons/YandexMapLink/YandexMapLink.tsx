'use client'
import styles from './YandexMapLink.module.css'
import React, { FC } from 'react'

const YandexMapLink:FC<{address:string}> = ({address}) => {
  return (
    <address className={`w-[240px] hover:underline cursor-pointer underline-offset-2`} 
    onClick={() => {
      const url = `https://maps.yandex.ru/?text=${encodeURIComponent(address)}`;
      window.open(url, '_blank');
    }}>{address}</address>
  )
}

export default YandexMapLink