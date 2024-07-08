'use client'
import React, { FC } from 'react'
import { BiCheckCircle } from 'react-icons/bi'
import { IOrderResponse } from '../../../services/getOrders'

const FormComplete:FC<{formComplete:IOrderResponse, setFormComplete:()=>void}> = ({formComplete, setFormComplete}) => {
  const order = formComplete
    return (
    <div className='h-[80dvh] flex flex-col items-center justify-center gap-10 py-10'>
        <h3 className='text-center'> Ваш заказ №{order.data.id} успешно оформлен!</h3>
        <div>
        <BiCheckCircle size={64} color={'green'}/>
        </div>
        <button className='btn border-black' onClick={(e)=>{e.preventDefault();setFormComplete()}}>Обновить</button>
    </div>
  )
}

export  {FormComplete}