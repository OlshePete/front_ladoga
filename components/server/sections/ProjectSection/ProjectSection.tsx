import { AboutSectionData, Response } from "../../../../types/webSiteContentTypes";
import { TextWrapper } from "../../../client/motion/TextWrapper";
import { AboutGallery } from "../../AboutGallery/AboutGallery";
import styles from "./ProjectSection.module.css";

const ProjectSection = ({ content }: { content: Response<AboutSectionData> }) => {
  const { title, sub_title, images } = content.data.attributes
  const text = content.data.attributes.content
  return (
    <section className={`${styles.container} section`}>
      <div className={`${styles.content} w-[100%] flex-col sm:flex-col md:flex-col lg:flex-row`} >
        <div className={`${styles.content_title} min-w-[48%] sm:min-w-[100%] lg:min-w-[50%]  sm:mb-[4vw] lg:mb-[20vw]`}>
          <TextWrapper opposite tag="h2" containerClass={`${styles.title} text-xl sm:text-sm md:text-lg`} styles={{fontSize:'2rem'}}>{title}</TextWrapper>
          {sub_title &&<TextWrapper opposite tag="h3" containerClass={`${styles.sub_title}`}>{sub_title}</TextWrapper>}
        </div>
        <div className={`${styles.content_text} border-s-2 w-[100%] xs:w-[100%] sm:w-[100%] md:w-[100%] lg:w-[50%] py-10`}>

          <TextWrapper containerClass={` mt-10 xs:max-w-[100%] sm:max-w-[100%] md:max-w-[60%] lg:max-w-[100%] xl:max-w-[100%] px-5 sm:px-10 md:px-10 lg:px-10 xl:px-10  `}>{text}</TextWrapper>
          <TextWrapper containerClass={` mt-10 xs:max-w-[100%] sm:max-w-[100%] md:max-w-[60%] lg:max-w-[100%] xl:max-w-[100%] px-5 sm:px-10 md:px-10 lg:px-10 xl:px-10 `} opposite>{text}</TextWrapper>

        </div>
      </div>
      <AboutGallery images={images} />
    </section>
  );
};

export { ProjectSection };