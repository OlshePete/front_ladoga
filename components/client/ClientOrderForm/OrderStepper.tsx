import React, { useState } from 'react'
const FORM_STEPS = [
    "Маршрут",
    "Контакты",
]
function OrderStepper({active, handler}:{active:1|2, handler:()=>void}) {

    return (
          <ul className="steps w-[100%] pt-10 pb-4">
              {
                  FORM_STEPS.map((step,index)=>{
                      const activeClass = index+1===active? 'step-success':index+1===1 && active===2 ?'step-success':""
                      return(
                          <li key={index} className={`step ${activeClass}`} onClick={handler}>{step}</li>
                      )
                  })
              }
    {/* <li className={`step step-primary`}>Маршрут</li>
    <li className={`step `}>Контакты</li> */}
  </ul>
  )
}

export default OrderStepper