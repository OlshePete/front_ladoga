import Image from "next/image";
import { wrappedGetContacts } from '../../../../services/getWebSiteContent'
import { Response, RouteSectionData } from "../../../../types/webSiteContentTypes";
import RouteModal from "../../../client/RouteModal";
import styles from "./NewRoutesSection.module.scss";
import ImageGalleryItem from "../../ImageGallery/ImageGalleryItem";

const NewRoutesSection = async ({ routes }: { routes: Response<RouteSectionData[]> }) => {
  const API_URL = process.env.API_URL

  const contactContent = await wrappedGetContacts()
  return (
    <section className={`${styles.container} section`} id={'top-routes'}>
      {
        routes && Array.isArray(routes.data) && routes.data.slice(0, 3).map((route, routeIndex) => {
          const { name, description, summary, images } = route.attributes
          return (
            <div
              className={styles.route_container}
              key={'top-routes-' + route.id}
              id={'top-routes-' + route.id}>
              <div className={styles.route_content}>
                {
                  images.data[0] && <Image
                    src={API_URL + (images.data[0].attributes.formats?.medium.url)}
                    alt={`Product gallery ${images.data[0].id}`}
                    className={`${styles.image}`}
                    fill={true}
                    priority
                  />
                }
                <h3>{summary}</h3>
                <h2>{name}</h2>
                <RouteModal route={route} contactContent={contactContent}>
                <>
                {
                  route.attributes.images.data && route.attributes.images.data.map((image, index) => {
                    return <div 
                      key={'slider-image-' + index} 
                      style={{
                        overflow: 'hidden',
                        display: "flex",
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                      >
                      <ImageGalleryItem
                        image={image}
                      />
                    </div>
                  })
                }
              </>
                </RouteModal>
              </div>
              <div className={styles.backdrop}></div>
            </div>)
        })
      }
    </section>
  );
};

export { NewRoutesSection };