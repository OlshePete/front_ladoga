import Image from 'next/image'
import React from 'react'
import { Image as TImage} from '../../../types/webSiteContentTypes'
import styles from './AboutGallery.module.css'
const API_URL = process.env.API_URL
const AboutGallery = ({images, withLabels=true}:{withLabels?:boolean,images:{data:TImage[]}}) => {
    const image_list = images && images.data
  return (
    <div className={styles.container}>
      {image_list && Array.isArray(image_list) && image_list?.map((image) => (
        <div
        key={`product-gallery-${image.id}`}
        className={styles.imageContainer}
       >
          <Image
            src={API_URL+ image.attributes.url}
            alt={`Product gallery ${image.id}`}
            className={`${styles.image} ${withLabels?styles.labled:""}`}
            fill={true}
            style={{
              objectFit:'cover',
            }}
          />
          {withLabels && <span className={styles.image_caption}>
              {image.attributes.alternativeText}
            </span>}
          </div>
      ))}
  </div>
  )
}

export {AboutGallery}