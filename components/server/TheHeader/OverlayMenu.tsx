'use client'
import React, { FC, useState } from 'react';
import { BiMenuAltLeft } from "react-icons/bi";

const OverlayMenu:FC<{}> = ({}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
   <>
    <div className="fixed z-90 w-0 h-0 flex justify-center items-center bg-gray-900 opacity-0 duration-700" style={{ width: menuOpen ? '100vw' : '0', height: menuOpen ? '100vh' : '0', opacity: menuOpen ? 0.95 : 0 }}>
      <a href="#" className="fixed top-6 right-8 text-white hover:text-amber-500 text-7xl font-semibold duration-300" onClick={handleCloseMenu}>&times;</a>
      <div className="flex flex-col text-white text-center text-xl font-light space-y-3">
        <a className="hover:text-amber-500 duration-300" href="#">KindaCode.com</a>
        <a className="hover:text-amber-500 duration-300" href="#">About Us</a>
        <a className="hover:text-amber-500 duration-300" href="#">Get In Touch</a>
        <a className="hover:text-amber-500 duration-300" href="#">Privacy Policy</a>
        <a className="hover:text-amber-500 duration-300" href="#">Terms of Use</a>
      </div>
    </div>

    <div className="container p-20 space-y-8">
      <h1 className="text-4xl font-light">Welcome to KindaCode.com</h1>
      <h2 className="text-xl">Full-screen overlay navigation menu example</h2>
      <p>
         <BiMenuAltLeft  onClick={handleOpenMenu}/> 
      </p>
    </div>
   </>
  );
};

export {OverlayMenu};