'use client'
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, HStack, IconButton, Input, InputGroup, InputLeftElement, Text, Textarea, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import React, { FC } from 'react'
import styles from './ClientOrderForm.module.css'
import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
  } from 'react-icons/md';
  import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import { Response, RouteSectionData } from '../../../types/webSiteContentTypes';
const ClientOrderForm:FC<{routes:Response<RouteSectionData[]>}> = ({routes}) => {
  return (
<div className="container bg-white-600 w-dvw h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-40">
  <div className=" lg:col-span-2">
<h1 className={styles.title}>Забронировать поездку</h1>
    <div className="join join-vertical w-full p-48 pl-0">
      {routes.data.map((route, index) => {
        const defaultChecked=index===0
        return(
          <div 
           key={index}
          className="collapse  join-item border border-base-300">
     <input type="radio" name="my-accordion-4" defaultChecked={defaultChecked} /> 
     <div className={`${styles.route_title} collapse-title text-xl font-medium text-white`} >
     {route.attributes.name}
     </div>
     <input type="checkbox"  className="checkbox collapse-arrow" />
     <div className="collapse-content"> 
       <p className={`${styles.text} text-white`}>{route.attributes.summary}</p>
       <p>{route.attributes.price} руб.</p>
     </div> 
  
   </div>)
      })}
    </div> 
    <p>время </p>
    <p>количество </p>
  </div>
  <div className="bg-teal">
    <p>данные пользователя</p>
  </div>
  {/* <div className="flex">
    <div className="bg-transparent text-white rounded-lg m-sm-4 m-md-16 m-lg-2 p-sm-5 p-md-5 p-lg-16">
      <div className="p-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <h2 className="text-2xl font-bold mb-3">Оставить заявку</h2>
            <p className="text-gray-500 mb-5">Fill up the form below to contact</p>
            <div className="py-5 md:py-8 lg:py-10">
              <div className="flex flex-col space-y-3">
                {routes.data.map((route, index) => (
                  <button
                    key={index}
                    className="bg-transparent hover:border-2 hover:border-[#1C6FEB] text-[#DCE2FF] w-200px h-48px rounded-lg"
                  >
                    <span className="mr-2">
                      <MdPhone size="20px" color="#1970F1" />
                    </span>
                    {route.attributes.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-start space-x-5 px-5 mt-10 md:mt-10">
              <button
                className="bg-transparent hover:bg-[#0D74FF] rounded-full"
                aria-label="facebook"
              >
                <MdFacebook size="28px" />
              </button>
              <button
                className="bg-transparent hover:bg-[#0D74FF] rounded-full"
                aria-label="github"
              >
                <BsGithub size="28px" />
              </button>
              <button
                className="bg-transparent hover:bg-[#0D74FF] rounded-full"
                aria-label="discord"
              >
                <BsDiscord size="28px" />
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <div className="bg-white rounded-lg p-8">
              <div className="text-[#0B0E3F]">
                <div className="space-y-5">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2" >
                      Ваше имя
                    </label>
                    <div className="flex items-center border border-[#E0E1E7] rounded-lg">
                      <span className="mr-2">
                        <BsPerson color="gray.800" />
                      </span>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 text-sm text-gray-700"
                        id="name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2" >
                      Номер телефона
                    </label>
                    <div className="flex items-center border border-[#E0E1E7] rounded-lg">
                      <span className="mr-2">
                        <MdOutlineEmail color="gray.800" />
                      </span>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 text-sm text-gray-700"
                        id="name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2" >
                      Комментарий
                    </label>
                    <textarea
                      className="w-full pl-4 pr-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                      placeholder="message"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-[#0D74FF] text-white hover:bg-[#0D74FF] rounded-lg py-2 px-4"
                    >
                      Забронировать поездку
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
</div>
  )
}

export default ClientOrderForm