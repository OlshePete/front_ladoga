'use client';
import React, { FC, useRef } from "react";
import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image as IImage } from "../../../types/webSiteContentTypes";
import styles from "./ImageSlider.module.scss"
import { RiArrowRightWideLine } from "react-icons/ri";
import { RiArrowLeftWideLine } from "react-icons/ri";

interface IProps {
    children: JSX.Element,
    images: IImage[];
    tabIndex?:undefined|number;
}
interface ArrowProps {
    className: string;
    style: React.CSSProperties;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}


const ImageSlider: FC<IProps> = ({ images, tabIndex, children }) => {

    const slider = useRef<Slider | null>(null)
    var settings:Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        swipeToSlide: true,
        arrows:false,
        autoplay:true
    };
    console.log(images, children)
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://ladoga-travel.ru/cms'
    return (<>
        <button tabIndex={tabIndex||undefined} className={styles.prev_icon} style={{}} onClick={() => slider?.current?.slickPrev()}>< RiArrowLeftWideLine /></button>
        <button tabIndex={tabIndex||undefined} className={styles.next_icon} style={{}} onClick={() => slider?.current?.slickNext()}>< RiArrowRightWideLine /></button>
        <Slider 
        
            {...settings} 
            ref={slider} 
            //@ts-ignore
            style={{
                zIndex: 2,
                width: '100%',
            }}
        >
            {children}
        </Slider></>
    );
}
export default ImageSlider