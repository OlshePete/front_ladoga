import styles from "./TheHeader.module.css";
import { HiOutlineArrowDown } from "react-icons/hi";
import { Image as TImage } from "../../../types/webSiteContentTypes";
import Image from "next/image";
import { ActionButton } from "../buttons/ActionButton/ActionButton";
import { OverlayMenu } from "./OverlayMenu";

const TheHeader = ({ logo }: { logo: { data: TImage } }) => {
  const API_URL = process.env.API_URL;
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <OverlayMenu/>
        <div className={styles.logo}>
          <Image
            src={API_URL + (logo.data.attributes.formats.small.url || "")}
            alt={logo.data.attributes.alternativeText || ""}
            className={styles.image}
            width="120"
            height="80"
          />
        </div>
        <ActionButton />
      </div>
      <div className={styles.separator}></div>
    </header>
  );
};

export { TheHeader };
