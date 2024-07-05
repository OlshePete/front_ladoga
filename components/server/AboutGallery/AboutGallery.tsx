import Image from 'next/image'
import React from 'react'
import { Image as TImage} from '../../../types/webSiteContentTypes'
import HorizontalWrapper from '../../client/motion/HorizontalWrapper'
import styles from './AboutGallery.module.css'
const API_URL = process.env.API_URL
const AboutGallery = ({images, withLabels=true}:{withLabels?:boolean,images:{data:TImage[]}}) => {
    const image_list = images && images.data
  return (
    <HorizontalWrapper 
      direction={-1000}
      height={'-50rem'}
    >

    <div className={`${styles.container} `}>
      {image_list && Array.isArray(image_list) && image_list?.map((image) => (
        <div
        key={`product-gallery-${image.id}`}
        className={styles.imageContainer}
        >
          <Image
            src={API_URL+ image.attributes.formats.small.url}
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
      </HorizontalWrapper>
  )
}

export {AboutGallery}