import { Response, RouteSectionData } from "../../../../types/webSiteContentTypes";
import OrderForm from "../../../client/OrderForm";
import styles from "./OrderSection.module.scss";

const OrderSection = ({routes}:{routes:Response<RouteSectionData[]>}) => {
    return (
      <section  className={`${styles.container} section`} id="new-order">
        <h2 className={`${styles.section_title}`} >Бронировать место</h2>
        {routes && <OrderForm routes={routes}/>}
      </section>
    );
  };
  
  export { OrderSection };