import Image from "next/image";
import { Response, RouteSectionData } from "../../../../types/webSiteContentTypes";
import { TextWrapper } from "../../../client/motion/TextWrapper";
import { ActionButton } from "../../buttons/ActionButton/ActionButton";
import styles from "./RoutesSection.module.scss";

const RoutesSection = ({ routes }: { routes: Response<RouteSectionData[]> }) => {
  const API_URL = process.env.API_URL
  // routes.data.forEach(console.log)
  console.log(API_URL)
  return (
    <section className={`${styles.container} section`} id={'top-routes'}>
      {
        routes && Array.isArray(routes.data) && routes.data.slice(0, 2).map((route, routeIndex) => {
          const { name, description, summary, images } = route.attributes
          return (
            <div className={styles.route_container} key={'top-routes-' + route.id} id={'top-routes-' + route.id}>
              <div className={styles.route_content}>
                {images.data[1] ? <Image
                  src={API_URL + images.data[1].attributes.formats.small.url}
                  alt={`Product gallery ${images.data[1].id}`}
                  className={`${styles.image}`}        
                  fill={true}
                  // sizes="100vw"
                  // placeholder="blur"
                  // blurDataURL={background.data.attributes.formats.small.url}
                  priority
                /> : <div style={{ height: '300px' }} />}

                  <TextWrapper containerClass={`${styles.content}`}>
                    {summary}
                  </TextWrapper>
                <br />
                  <TextWrapper opposite containerClass={`${styles.content} order-last`}>
                    {description}
                  </TextWrapper>

                {/* <ActionButton/> */}
              </div>
              <div className={styles.route_image} style={{
                order: routeIndex % 2 === 0 ? -1 : undefined,

                justifyContent: routeIndex % 2 !== 0 ? 'flex-end' : 'flex-start'
              }}>
                <h2 className={`${styles.title} ${routeIndex % 2 !== 0 ? 'pl-24' : 'pl-0'}`}
                  style={{
                    right: routeIndex % 2 !== 0 ? '10%' : '-40%',

                  }}
                >{name}</h2>

                <div className={styles.image_container}>
                  <Image
                    src={API_URL + images.data[0].attributes.formats.medium.url}
                    alt={`Product gallery ${images.data[0].id}`}
                    className={`${styles.image}`}
                    style={{ objectFit: "cover" }}
                    fill={true}
                  />
                </div>
              </div>
            </div>
          )
        })
      }
    </section>
  );
};

export { RoutesSection };