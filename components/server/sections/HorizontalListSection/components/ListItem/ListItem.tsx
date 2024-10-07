import React from 'react'
import styles from './ListItem.module.scss'
import { Image as IImage } from '../../../../../../types/webSiteContentTypes'
import Image from 'next/image'
export interface IListItem {
 name:string,
 text?:string,
 image?:IImage
}
const ListItem:React.FC<IListItem> = ({text, name, image}) => {
    const API_URL = process.env.API_URL

  return (
    <div className={`${styles.container} flex flex-col ${text?'justify-between':'justify-end'} items-center `}>
        {text && <p className={`${styles.text} text-center`}>«{text} »</p>}
         <span className={`${styles.name} uppercase text-center`}>{name}</span>
         {image && <Image
            src={API_URL + (image.attributes.url || "")}
            alt={image.attributes.alternativeText || ""}
            className={styles.image}
            fill={true}
            style={{
            objectFit: "cover",
            }}
         />}
         {text && <div className={styles.backdrop}></div>}
    </div>
  )
}

export default ListItem