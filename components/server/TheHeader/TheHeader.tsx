import styles from './TheHeader.module.css'
import { HiOutlineArrowDown } from "react-icons/hi";
import { BiMenuAltLeft } from "react-icons/bi";
import { Image as  TImage} from '../../../types/webSiteContentTypes';
import Image from 'next/image';
import { ActionButton } from '../buttons/ActionButton/ActionButton';

const TheHeader = ({logo}:{logo:{data:TImage}}) => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
<BiMenuAltLeft />
<div className={styles.logo}>
        <Image
          src={process.env.CMS_URL + (logo.data.attributes.url|| "")}
          alt={logo.data.attributes.alternativeText || ""}
          className={styles.image}
          width="120"
          height="80"
        />  
</div>
<ActionButton/>
      </div>
      <div className={styles.separator}></div>
    </header>
  );
};

export { TheHeader };