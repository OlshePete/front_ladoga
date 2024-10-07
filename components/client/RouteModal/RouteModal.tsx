'use client'
import { useRouter } from 'next/navigation'
import React, { FC, useRef, useState } from 'react'
import { RouteSectionData, ContactInfoData, Response } from '../../../types/webSiteContentTypes'
import ImageSlider from '../ImageSlider'
import styles from './RouteModal.module.scss'
import { IoIosClose } from "react-icons/io";
import { getTimeInHour } from '../../utils/getTimeInHour'
interface IRouteModalProps {
    route: RouteSectionData;
    children: JSX.Element;
    contactContent: Response<ContactInfoData> | null
}
const RouteModal: FC<IRouteModalProps> = ({ route, children, contactContent }) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const handleBooking = () => {
        router.push('/#new-order')
        setOpen(false)
    }
    const { boatsCount, departures, duration } = route.attributes

    return (
        <>
            <button
                type='button'
                className={styles.action_button}
                onClick={() => setOpen(true)}
            >
                Описание маршрута</button>
            <dialog 
                id="my_modal_1" 
                open={open} 
                tabIndex={open?undefined:-1}
                className={`modal modal-middle ${styles.modal_container}`} onClick={(event) => {
                if (event.target === event.currentTarget) {
                    setOpen(false)
                    event.stopPropagation()
                }
            }}>
                <div className={`modal-box ${styles.modal_content}`}>
                    <div className={styles.image_container}>
                        <div className={`${styles.image_box} relative`}>
                            <ImageSlider
                                images={route.attributes.images.data}
                                tabIndex={open?undefined:-1}
                            >
                                {children}
                            </ImageSlider>
                        </div>
                    </div>
                    <div className={styles.description_container}>

                        <div className={styles.description_header}>
                            <h3 className="">{route.attributes.name}</h3>
                            <p className={styles.summary}>{departures.data.length} отправления в день, {getTimeInHour(duration)} в пути</p>
                        </div>
                            <div className={styles.actions}>

                        <button type='button' className={styles.action_button} onClick={handleBooking}>Бронировать место</button>
                            </div>
                        <p className="">{route.attributes.description}</p>
                        <div className={styles.text_block}>
                            <span className='font-bold'> Место посадки: </span>
                            <p className="">
                                {contactContent && contactContent.data.attributes.address}
                            </p>
                        </div>
                        <div className={styles.text_block}>
                            <span className='font-bold'> В стоимость поездки входит: </span>
                            <ul className="list-disc pl-4">
                                <li>
                                    место в комфортном катере
                                </li>
                                <li>
                                    спасательный жилет
                                </li>
                                <li>
                                    в сумме около 2 часов свободного времени на островах
                                </li>
                                <li>
                                    возврат или перенос в случае непогоды
                                </li>
                            </ul>
                        </div>
                        <div className={styles.text_block}>
                            <span className='font-bold'> Дополнительные услуги (по предварительной договоренности): </span>
                            <ul className="list-disc pl-4">
                                <li>
                                    экскурсия во время поездки
                                </li>
                                <li>
                                    фотосессия
                                </li>
                                <li>
                                    трансфер из СПб и Петрозаводска
                                </li>
                                <li>
                                    дополнение (изменение) маршрута
                                </li>
                            </ul>
                        </div>
                            <button type='button' onClick={() => setOpen(false)} className={styles.close_btn}><IoIosClose /></button>
                        

                    </div>

                </div>
            </dialog>
        </>
    )
}

export default RouteModal