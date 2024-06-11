import React from 'react'
import { HiOutlineArrowDown } from 'react-icons/hi'
import styles from './ActionButton.module.css'
const ActionButton = () => {
  return (
    <button className={styles.action_btn}><span>Сделать заказ<HiOutlineArrowDown/></span></button>
  )
}

export {ActionButton}