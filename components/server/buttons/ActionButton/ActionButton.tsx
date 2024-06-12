import React from "react";
import { HiOutlineArrowDown } from "react-icons/hi";
// import styles from './ActionButton.module.css'
const ActionButton = () => {
  return (
    <button className="bg-transparent border border-white text-white hover:bg-black hover:text-white focus:bg-black focus:text-white font-bold py-2 px-4 rounded inline-flex items-center gap-1">
      Сделать заказ
      <HiOutlineArrowDown />
    </button>
  );
};

export { ActionButton };
