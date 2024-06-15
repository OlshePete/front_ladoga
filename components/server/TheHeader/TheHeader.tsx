import styles from "./TheHeader.module.css";
import { Image as TImage } from "../../../types/webSiteContentTypes";
import Image from "next/image";
import { ActionButton } from "../buttons/ActionButton/ActionButton";
import { OverlayMenu } from "../../client/header/OverlayMenu";
import { ClientHeaderWrapper } from "../../client/header/ClientHeaderWrapper";

const TheHeader = ({ logo }: { logo: { data: TImage } }) => {
  const API_URL = process.env.API_URL;
  return (
    <header className={styles.container}>
      <ClientHeaderWrapper>
        <>
          <div className={styles.content}>
            <OverlayMenu />
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
          <div className={styles.separator} id={"header_separator"}></div>
        </>
      </ClientHeaderWrapper>
    </header>
  );
};

export { TheHeader };
