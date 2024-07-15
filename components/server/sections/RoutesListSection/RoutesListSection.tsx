import Image from "next/image";
import { Response, RouteSectionData } from "../../../../types/webSiteContentTypes";
import styles from "./RoutesListSection.module.scss";
import { GiDuration } from "react-icons/gi";
import { getTimeInHour } from "../../../utils/getTimeInHour";
import { IoIosBoat } from "react-icons/io";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { getDepartureCountString } from "../../../utils/getDepartureCountString";
import Link from "next/link";
const RoutesListSection = ({ routes }: { routes: Response<RouteSectionData[]> }) => {
  return (
    <section className={`${styles.container} section`} id="routes-list">
      <h2 className={styles.title}>наши маршруты</h2>
      <div className={styles.routes_list_content}>
        <div className="carousel carousel-start">
          {
            routes && Array.isArray(routes.data) && routes.data.map((route, routeIndex) => {
              const { name, description, summary, images, price, duration, boatsCount, ...other } = route.attributes
              const departures = other.departures.data
              

              return (
                <div className="carousel-item" key={'top-routes-' + route.id}>
                  <div className={styles.route_container} key={'top-routes-' + route.id}>
                    <div className={styles.route_content}>
                      <h2 className={styles.route_name}>{name}</h2>
                      <ul>
                        <li className="flex flex-row justify-start items-center gap-2"><GiDuration />{getTimeInHour(duration)}</li>
                      { boatsCount && boatsCount>0 && <li className="flex flex-row justify-start items-center gap-2"><IoIosBoat />{boatsCount} лодок на маршруте</li>}
                        <li className="flex flex-row justify-start items-center gap-2"><LiaBusinessTimeSolid />{getDepartureCountString(departures.length)}</li>
                      </ul>
                      <br />
                      <div className="flex flex-row justify-between">
                        <span className={styles.content}>
                          {price} руб.
                        </span>
                        <Link href='#new-order' className="border rounded-box px-4 py-2 hover:boder-[black]"> Оформить</Link>
                      </div>
                    </div>
                  </div>
                </div>)
            })
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