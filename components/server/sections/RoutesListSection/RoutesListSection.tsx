import Image from "next/image";
import { Response, RouteSectionData } from "../../../../types/webSiteContentTypes";
import styles from "./RoutesListSection.module.css";

const RoutesListSection =  ({routes}:{routes:Response<RouteSectionData[]>}) => {
  routes.data.forEach(console.log)

    return (
      <section className={styles.container}>
      <h2 className={styles.title}>наши маршруты</h2>
                <div className={styles.routes_list_content}>
        {
          routes && Array.isArray(routes.data) && routes.data.map((route, routeIndex)=>{
            const {name, description, summary, images, price, duration} = route.attributes
            return (
              <div className={styles.route_container} key={'top-routes-'+route.id}>
                <div className={styles.route_content}>
                <h2 className={styles.route_name}>{name}</h2>
                <span className={styles.content}>
                  Цена: {price} руб.
                  </span><br/>
                  <span className={styles.content}>
                  Продолжительность: {duration} мин.
                  </span><br/>
                </div>
               
              </div>
            )
          })
        }
              </div>

      </section>
    );
  };
  
  export { RoutesListSection };