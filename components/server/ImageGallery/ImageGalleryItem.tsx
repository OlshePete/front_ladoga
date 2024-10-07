import React, {FC} from 'react'
import styles from './ImageGalleryItem.module.scss'
import Image from 'next/image'
import {Image as IImage} from '../../../types/webSiteContentTypes'
interface IProps {
  image:IImage
}

const ImageGalleryItem:FC<IProps>=({image})=> {
  const API_URL = process.env.API_URL || ""

  return (
    <div style={{width:'700px',height:'600px'}}>

   {image &&  <Image
      src={API_URL + (image.attributes.formats.medium.url || "")}
      alt={API_URL + image.attributes.alternativeText || ""}
      className={`${styles.image} ${false ? styles.labled : ""}`}
      width='700'
      height='600'
      />} 
      </div>
  )
}

export default ImageGalleryItem