'use client'
import React, { FC } from 'react'
import { LuPhoneCall } from "react-icons/lu";
import styles from "./CallBackButton.module.scss";
interface IProps {
}

const CallBackButton:FC<IProps> = () => {
    const handleClick = () => {
        alert()
    }
  return (
    <button
        type='button'
        onClick={handleClick}
        className={styles.button}
    >
        <LuPhoneCall/>  
    </button>
  )
}

export default CallBackButton