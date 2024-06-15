import Image from "next/image";
import {
  StartSectionData,
  Response,
} from "../../../../types/webSiteContentTypes";
import styles from "./StartSection.module.css";

const StartSection = ({ content }: { content: Response<StartSectionData> }) => {
  const API_URL = process.env.API_URL;
  const { title, background, sub_title } = content.data.attributes;
  return (
    <section className={`${styles.container} section`}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>{title}</h1>
        {sub_title && <h2 className={styles.sub_title}>{sub_title}</h2>}
      </div>

      <Image
        src={API_URL + (background.data.attributes.url || "")}
        alt={background.data.attributes.alternativeText || ""}
        className={styles.image}
        fill={true}
        sizes="100vw"
        // style={{
        //   objectFit: "cover",
        // }}
        // quality={100}
      />
    </section>
  );
};

export { StartSection };
