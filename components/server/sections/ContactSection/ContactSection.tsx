import Image from "next/image";
import { AboutSectionData, ContactInfoData, Image as IImage, Response, RouteSectionData } from "../../../../types/webSiteContentTypes";
import { OrderForm } from "../../../client/ClientOrderForm/OrderForm";
import { TextWrapper } from "../../../client/motion/TextWrapper";
import { formatPhone } from "../../../utils/formatPhone";
import { AboutGallery } from "../../AboutGallery/AboutGallery";
import styles from "./ContactSection.module.css";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
const ContactSection = ({contactContent, imgData}:{contactContent:Response<ContactInfoData>, imgData:IImage | undefined}) => {
  const {title,content,summary,address, phone_number } = contactContent.data.attributes
    return (
      <section  className={`${styles.container} section flex sm:flex-col md:flex-row justify-center`} id="contacts"> 
      <div className="w-[50%]  flex flex-col items-center justify-between">
     {imgData && <Image
      src={process.env.API_URL + (imgData.attributes.formats.small.url || "")}
      alt={imgData.attributes.alternativeText || ""}
      className={styles.image}
      width="220"
      height="100"
      />}
       <h2 className={`${styles.title} pt-40`}>{title}</h2>
      <div>
        <span className={``}>{formatPhone(phone_number)}</span>
        <address className={``}>{address}</address>
      </div>
      </div>
      <div className={`w-[50%]  flex flex-col gap-2  border-left ${styles.content}`}>
       
        <p className={``}>{JSON.stringify(content)}</p>
        <BlocksRenderer content={content} />
      </div>
      </section>
    );
  };
  
  export { ContactSection };