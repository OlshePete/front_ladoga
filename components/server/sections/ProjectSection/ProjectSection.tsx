import { AboutSectionData, Response } from "../../../../types/webSiteContentTypes";
import { TextWrapper } from "../../../client/motion/TextWrapper";
import { AboutGallery } from "../../AboutGallery/AboutGallery";
import styles from "./ProjectSection.module.css";

const ProjectSection = ({content}:{content:Response<AboutSectionData>}) => {
  const {title,sub_title, images} = content.data.attributes
  const text = content.data.attributes.content
    return (
      <section  className={`${styles.container} section`}>
        <div className={styles.content}>
        <div className={styles.content_title}>
        <h2 className={styles.title}>{title}</h2>
        {
          sub_title && <h3 className={styles.sub_title}>{sub_title}</h3>
        }
        </div>
        <div className={styles.content_text}>
          <TextWrapper>

        <p className={styles.text}>{text}</p>
          </TextWrapper>
          <TextWrapper opposite>

<p className={styles.text}>{text}</p>
  </TextWrapper>
        </div>
        </div>
        <AboutGallery images={images}/>
      </section>
    );
  };
  
  export { ProjectSection };