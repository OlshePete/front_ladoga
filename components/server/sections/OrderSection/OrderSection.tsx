import { AboutSectionData, Response, RouteSectionData } from "../../../../types/webSiteContentTypes";
import { OrderForm } from "../../../client/ClientOrderForm/OrderForm";
import { TextWrapper } from "../../../client/motion/TextWrapper";
import { AboutGallery } from "../../AboutGallery/AboutGallery";
import styles from "./OrderSection.module.css";

const OrderSection = ({routes}:{routes:Response<RouteSectionData[]>}) => {
    return (
      <section  className={`${styles.container} section`} id="new-order">
{routes && <OrderForm routes={routes}/>}
      </section>
    );
  };
  
  export { OrderSection };