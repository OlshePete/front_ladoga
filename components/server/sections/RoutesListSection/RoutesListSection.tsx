import Image from "next/image";
import { Response, RouteSectionData } from "../../../../types/webSiteContentTypes";
import styles from "./RoutesListSection.module.css";
import { GiDuration } from "react-icons/gi";
import { getTimeInHour } from "../../../utils/getTimeInHour";
import { IoIosBoat } from "react-icons/io";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { getDepartureCountString } from "../../../utils/getDepartureCountString";
const RoutesListSection =  ({routes}:{routes:Response<RouteSectionData[]>}) => {
console.log(routes);

    return (
      <section  className={`${styles.container} section`}>
      <h2 className={styles.title}>наши маршруты</h2>
                <div className={styles.routes_list_content}>
                  <div className="carousel carousel-start">
{
         
         routes && Array.isArray(routes.data) && routes.data.map((route, routeIndex)=>{
          const {name, description, summary, images, price, duration, ...other} = route.attributes
          const departures = other.departures.data

          return (
           <div className="carousel-item"  key={'top-routes-'+route.id}>
                           <div className={styles.route_container} key={'top-routes-'+route.id}>
                <div className={styles.route_content}>
                <h2 className={styles.route_name}>{name}</h2>
                <ul>
                  <li className="flex flex-row justify-start items-center gap-2"><GiDuration/>{getTimeInHour(duration)}</li>
                  <li className="flex flex-row justify-start items-center gap-2"><IoIosBoat/>{6} лодок на маршруте</li>
                  <li className="flex flex-row justify-start items-center gap-2"><LiaBusinessTimeSolid/>{getDepartureCountString(departures.length)}</li>
                </ul>
                <br/>
                  {/* <span className={styles.content}>
                  Продолжительность: {duration} мин.
                  </span><br/> */}
                  <div className="flex flex-row justify-between">
                  <span className={styles.content}>
                  {price} руб.
                  </span>
                <button className="border rounded-box px-4"> Оформить</button>
                </div>
                </div>
              </div>
            </div> )})
}
        </div>

        {/* {
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
        } */}
              </div>

      </section>
    );
  };
  
  export { RoutesListSection };