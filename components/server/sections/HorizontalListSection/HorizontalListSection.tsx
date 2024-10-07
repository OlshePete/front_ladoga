import React, { FC } from 'react'
import styles from './HorizontalListSection.module.scss'
import { wrappedGetServices, wrappedGetFeedbacks } from '../../../../services/getWebSiteContent'
import ListItem from './components/ListItem'
interface IProps {
    variant:'services'|'feedback'
}
const variantsConfig = {
  services:{
    title:"Дополнительные услуги",
    clb:wrappedGetServices,
    link:""
  },
  feedback:{
    title:"Отзывы наших туристов",
    clb:wrappedGetFeedbacks,
    link:""
  },
}

const HorizontalListSection:FC<IProps> = async ({ variant}) => {
  const {title, clb} = variantsConfig[variant]
  const data = await clb()
  if(!data) return <></>
  return (
    <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.items}>
            {
              data && data.data.map((item,index)=>{
                const name = item.attributes.name
                const text = 'text' in item.attributes ?item.attributes.text as string:undefined
                return <ListItem name={name} text={text} image={item.attributes.image.data}/>
              })
            }
        </div>
    </div>
  )
}

export default HorizontalListSection