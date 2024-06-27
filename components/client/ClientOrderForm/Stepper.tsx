'use client'
import React, { FC, useState } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";
interface Props {
    children: JSX.Element;
    complete:boolean;
    currentStep:number;
    steps:Array<string>;
    setCurrentStep:React.Dispatch<React.SetStateAction<number>>;
    setComplete:React.Dispatch<React.SetStateAction<boolean>>;
    validate:(index:number)=>boolean
}
const Stepper:FC<Props> = ({children, complete,currentStep,steps,setComplete,setCurrentStep, validate }) => {

  return (
    <>
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500 text-[12px] text-nowrap">{step}</p>
          </div>
        ))}
      </div>
      {children}
      <div
        className="pb-20 flex items-center gap-60 border w-[50%] justify-center"
      >
        
        <button
          className="btn border-black"
          type={ "button"}
          disabled={currentStep === 1}
          onClick={(e) => {
              e.stopPropagation()
            setCurrentStep((prev) => prev - 1);
            if (currentStep === steps.length && complete) {
              setComplete(false)
            }
          }}
        >
          Назад
        </button>
      {!complete && (
        <button
          className="btn border-black"
          type="button"
          onClick={(e) => {
              e.stopPropagation()
              const isStepValid = validate(currentStep)
              console.log('isStepValid',isStepValid)
              if (isStepValid){
                if (currentStep === steps.length){
                  setComplete(true)
                } else setCurrentStep((prev) => prev + 1);
              }
          }}
        >
          {currentStep === steps.length ? "Бронировать" : "Дальше"}
        </button>
      )}
      </div>
    </>
  );
};

export default Stepper;