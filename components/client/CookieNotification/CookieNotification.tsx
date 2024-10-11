'use client'
import React, { useEffect, useState } from 'react'

import styles from './CookieNotification.module.scss'

const CookieNotification = () => {
    const [showNotification, setShowNotification] = useState<boolean>(true);
  
    useEffect(() => {
      if(document) {

        const cookieExists = document.cookie.includes('cookie_notification_accepted=true');
        if (cookieExists) {
          setShowNotification(false);
        }
      }
      }, []);

    const handleAccept = () => {
      // Set a cookie to indicate that the user has accepted the notification
      document.cookie = 'cookie_notification_accepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT;';
      setShowNotification(false);
    };
  
  return (
    <div
      className={`${styles.container} fixed bottom-0 left-0 right-0 p-4 shadow-md ${
        showNotification ? 'block' : 'hidden'
      }`}
    >
      <div className="flex justify-center align-center gap-10">
        <p className="text-sm text-gray-600 my-auto">
        Мы используем <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-900 transition duration-300 ease-in-out"
          >
            cookie
          </a> для того, чтобы предоставить вам больше возможностей при использовании сайта 
          .
        </p>
        <button
          className="text-white font-bold py-2 px-4 rounded-full uppercase"
          onClick={handleAccept}
        >
          Продолжить
        </button>
      </div>
    </div>
  )
}

export default CookieNotification