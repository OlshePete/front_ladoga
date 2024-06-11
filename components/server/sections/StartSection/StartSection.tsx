import Image from "next/image";
import { StartSectionData, Response } from "../../../../types/webSiteContentTypes";
import styles from "./StartSection.module.css";
const { CMS_URL="" } = process.env
const StartSection = ({content}:{content:Response<StartSectionData>}) => {
  const {title, background, sub_title} = content.data.attributes;
    return (
      <section className={styles.container}>
        <div className={styles.title_container}>

        <h1 className={styles.title}>{title}</h1>
        {sub_title && <h2 className={styles.sub_title}>{sub_title}</h2>}
        </div>
        <Image
          src={CMS_URL + (background.data.attributes.url|| "")}
          alt={background.data.attributes.alternativeText || ""}
          className={styles.image}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </section>
    );
  };
  
  export { StartSection };