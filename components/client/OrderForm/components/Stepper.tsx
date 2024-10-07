'use client'
import React, { FC } from "react";
import "./Stepper.css";
import { TiTick } from "react-icons/ti";
import StepperHeader from "./StepperHeader";
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
      <StepperHeader step={currentStep}/>
      {children}
      <div
        className="pb-20 px-10 flex items-center w-[100%] justify-between"
      >
        <button
          className={`${currentStep === 1?'opacity-0':''} stepper-button button-secondary hover:text-[#0294CD]`}
          type={ "button"}
          disabled={currentStep === 1}
          onClick={(e) => {
              e.stopPropagation()
            setCurrentStep((prev) => prev - 1);
            setComplete(false)
          }}
        >
          Назад
        </button>
      {!complete && (
        <button
          className={`stepper-button hover:text-[#0294CD] z-[4]`}
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
          {currentStep === steps.length ? "Забронировать" : "Дальше"}
        </button>
      )}
      </div>
    </>
  );
};

export default Stepper;