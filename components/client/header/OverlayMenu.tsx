'use client'
import React, { FC, useEffect, useState } from 'react';
import { BiMenuAltLeft } from "react-icons/bi";
import styles from './Header.module.scss'
const OverlayMenu:FC<{}> = ({}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  console.log('component menuopen', menuOpen)
  useEffect(() => {
   console.log('effect menuopen', menuOpen)
  }, [menuOpen])
  
  return (
   <>
    <div className="fixed z-90 w-0 h-0 flex justify-center items-center bg-gray-900 opacity-0 duration-700" 
    style={{ 
        width: menuOpen ? '100vw' : '0',
         height: menuOpen ? '100vh' : '0',
         opacity: menuOpen ? 0.95 : 0 ,
         position: menuOpen ? "absolute":'inherit',
         zIndex: menuOpen ? 'inherit': 1,
         top:0,
         left:0
        }}
    >
      <a href="#" className="fixed top-6 right-8 text-white hover:text-amber-500 text-7xl font-semibold duration-300" onClick={handleCloseMenu}>&times;</a>
      <div className={`flex flex-col text-white text-center text-xl font-light space-y-10 ${styles.list}`} onClick={handleCloseMenu} >
        <a className="hover:text-amber-500 duration-300" href="#top-routes">Валаам</a>
        <a className="hover:text-amber-500 duration-300" href="#top-routes">Ладожские Шхеры</a>
        <a className="hover:text-amber-500 duration-300" href="#new-order">Оставить заявку</a>
        <a className="hover:text-amber-500 duration-300" href="#contacts">Контакты</a>
      </div>
    </div>

    <div className="container p-4 space-y-8 flex justify-end" 
         style={{
           zIndex:menuOpen? 0:2,
           opacity:menuOpen? 0:1,
         }}>
         <BiMenuAltLeft onClick={()=>{
           console.log('click icon')
           handleOpenMenu()
         }} className={styles.openButton}/> 
    </div>
   </>
  );
};

export {OverlayMenu};