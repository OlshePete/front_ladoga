'use client'
import React, { FC } from 'react'
import { BiErrorCircle, BiLogoTelegram, BiLogoVk } from 'react-icons/bi'
import Link from 'next/link'

const FormError:FC<{refreshError:()=>void}> = ({ refreshError}) => {
    return (
    <div className='h-[80vh] flex flex-col items-center justify-center gap-10 py-10'>
        <BiErrorCircle size={64} color={'darkred'}/>
        <h3 className='text-center'> К сожалению, во время бронирования произошла внутренняя ошибка.</h3>
        <span>Повторите бронирование через несколько минут или свяжитесь с нами в любом из мессенджеров. </span>
        <div className='flex gap-4'>
            <Link href={'#'}>
                <BiLogoTelegram size={34} />
            </Link>
            <Link href={'https://vk.com/magic_of_north'} target='_blank'>
                <BiLogoVk size={34} />
            </Link>
        </div>
        <button 
            className='btn border-black' 
            onClick={(e)=>{e.preventDefault();refreshError()}}
        >
            Обновить
        </button>
    </div>
  )
}

export  {FormError}