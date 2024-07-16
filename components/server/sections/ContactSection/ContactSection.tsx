import Image from "next/image";
import { ContactInfoData, Image as IImage, Response, Video } from "../../../../types/webSiteContentTypes";
import { formatPhone } from "../../../utils/formatPhone";
import styles from "./ContactSection.module.scss";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import VideoSection from "../VideoSection/VideoSection";
import YandexMapLink from "../../buttons/YandexMapLink/YandexMapLink";
const ContactSection = ({contactContent, videoData}:{contactContent:Response<ContactInfoData>, videoData:Response<Video> | undefined}) => {
  const {title,content,summary,address, phone_number } = contactContent.data.attributes
    return (
      <section  className={`${styles.container} section flex flex-wrap sm:flex-col md:flex-row items-center justify-center`} id="contacts"> 
      <div className="w-[100%] h-[30%] flex flex-row sm:flex-col items-start pl-[4px] sm:pl-[40px] md:pl-[240px]">
         <h2 key={title} className={`${styles.title}  w-[auto] leading-none  `}>{title}</h2>

      </div>
      <div className="w-[100%] h-[40vh] flex flex-grow">
      <div className="hidden sm:flex w-[30%] lg:w--[30%] text-left flex flex-col items-center justify-start">
      </div>

      <div className={`border-t-white border-t-[1px] w-[50%] flex-grow flex flex-col gap-2  border-left ${styles.content}`}>
       
      
      <div className={`py-10 pr-4 flex justify-center gap-4 sm:gap-20 md:gap-40 flex-col sm:flex-row`}>
        <div className="flex flex-col items-center gap-6">
          <span className="uppercase text-lg opacity-60">Телефон</span>
        <span className={`hover:underline underline-offset-2`}><a  href={`tel:+7${phone_number}`}>{formatPhone(phone_number)}</a></span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <span className="uppercase text-lg  opacity-60">адрес</span>
          <YandexMapLink address={address}/>
        
        </div>
      </div>
      <div className={`border-t-white border-t-[1px]`}></div>
      </div>

      </div>
      </section>
    );
  };
  
  export { ContactSection };