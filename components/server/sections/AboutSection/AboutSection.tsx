import ImageSlider from "../../../client/ImageSlider";
import styles from "./AboutSection.module.scss";
import ImageGalleryItem from "../../ImageGallery/ImageGalleryItem";
import {wrappedGetAbout} from "../../../../services/getWebSiteContent"
function splitText(text: string): string[] {
  const middleIndex = Math.floor(text.length / 2);
  let indexToSplit = middleIndex;
  while (indexToSplit > 0 && !/\s/.test(text[indexToSplit])) {
    indexToSplit--;
  }
  while (indexToSplit < text.length && !/\s/.test(text[indexToSplit])) {
    indexToSplit++;
  }
  const firstPart = text.substring(0, indexToSplit);
  const secondPart = text.substring(indexToSplit).trim();
  return [firstPart, secondPart];
}


const AboutSection = async () => {
 
  const content = await wrappedGetAbout()
  if(!content) return <></>
  const { title, sub_title, images } = content.data.attributes
  const splittedText = splitText(content.data.attributes.content)
  return (
    <section className={`${styles.container} section`} id="about">
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.sub_title}>{sub_title || 'ПОЧУВСТВУЙТЕ МАГИЮ Ладожского озера и создайте незабываемые впечатления'}</h3>
      <div className={styles.content}>
        <div className={styles.slider} style={{ background: 'inherit' }}>
          <div className={`${styles.slider_wrapper} relative`}>
            <ImageSlider images={images.data} >
              <>
                {
                  images.data && images.data.map((image, index) => {
                    return <div 
                      key={'slider-image-' + index} 
                      style={{
                        overflow: 'hidden',
                        display: "flex",
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                      >
                      <ImageGalleryItem
                        image={image}
                      />
                    </div>
                  })
                }
              </>
            </ImageSlider>
          </div>
        </div>
        <div className={`${styles.text_container}`}>
          <div className={styles.content_text}>
            {
              splittedText.map((block, index) => {
                return <div className={styles.text} key={index}>{block}</div>
              })
            }
            {/* <button className={styles.about_company_btn}>Подробнее о компании</button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection };