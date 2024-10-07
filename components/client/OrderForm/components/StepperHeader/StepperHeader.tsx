import React, { FC, useEffect, useState } from 'react'
import styles from './StepperHeader.module.scss'
const StepperHeader:FC<{step:number}> = ({step}) => {
    const [value, setValue] = useState<number>(step*25)
    useEffect(() => {
        setValue(step*25)
    }, [step])
  const steps = ["Маршрут", "Отправление", "Контакты", "Подтверждение"];
    
  return (
    <div className={`${styles.container} flex justify-between items-center px-10`}>
       <h1 className=''>{steps[step-1]}</h1> <span className=''>{step}/4</span>
        <progress className="progress progress-accent" value={value} max="100"></progress>
    </div>
  )
}

export default StepperHeader