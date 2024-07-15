import React from "react";
import { HiOutlineArrowDown } from "react-icons/hi";
// import styles from './ActionButton.module.scss'
const ActionButton = () => {
  return (
    <button className="bg-transparent border border-white text-white hover:bg-black hover:text-white focus:bg-black focus:text-white font-bold py-2 px-2 rounded flex items-center justify-between"
      style={{
        width:'200px',
      }}
    >
      Сделать заказ
      <HiOutlineArrowDown />
    </button>
  );
};

export { ActionButton };
