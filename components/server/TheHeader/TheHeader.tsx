import styles from "./TheHeader.module.css";
import { Image as TImage } from "../../../types/webSiteContentTypes";
import Image from "next/image";
import { ActionButton } from "../buttons/ActionButton/ActionButton";
import { OverlayMenu } from "../../client/header/OverlayMenu";
import { ClientHeaderWrapper } from "../../client/header/ClientHeaderWrapper";
import { HeaderSeparator } from "../../client/header/HeaderSeparator";
import { ScrollWrapperHeaderSeparator } from "../../client/motion/ScrollWrapperHeaderSeparator";

const TheHeader = ({ logo }: { logo: { data: TImage } }) => {
  const API_URL = process.env.API_URL;
  return (
    <header className={styles.container}>
        <>
          <div className={styles.content}>
            <div className={styles.btn_container}>
            <ActionButton />
            </div>
            <div className={styles.logo}>
            <ScrollWrapperHeaderSeparator>
              <Image
                src={API_URL + (logo.data.attributes.formats.small.url || "")}
                alt={logo.data.attributes.alternativeText || ""}
                className={styles.image}
                width="120"
                height="80"
                />
                </ScrollWrapperHeaderSeparator>
            </div>
            <OverlayMenu />
          </div>
          <HeaderSeparator/>
          
        </>
    </header>
  );
};

export { TheHeader };
