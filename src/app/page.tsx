import { ContactSection } from "../../components/server/sections/ContactSection/ContactSection";
import { OrderSection } from "../../components/server/sections/OrderSection/OrderSection";
import { StartSection } from "../../components/server/sections/StartSection/StartSection";
import { TheFooter } from "../../components/server/TheFooter/TheFooter";
import { wrappedGetRoutes } from "../../services/getRoutes";
import { wrappedGetServices, wrappedGetContacts, wrappedGetContent, wrappedGetIntro } from "../../services/getWebSiteContent";
import styles from "./page.module.scss";
// import CookieNotification from "../../components/client/CookieNotification";
import { AboutSection } from "../../components/server/sections/AboutSection/AboutSection";
import { NewRoutesSection } from "../../components/server/sections/NewRoutesSection/NewRoutesSection";
import HorizontalListSection from "../../components/server/sections/HorizontalListSection";
import TheHeader from "../../components/server/TheHeader";
import CallBackButton from "../../components/client/ui/buttons/CallBackButton";
import dynamic from "next/dynamic";

// const OrderSection = dynamic(() => import('../../components/server/sections/OrderSection/OrderSection'))
const CookieNotification = dynamic(() => import('../../components/client/CookieNotification'), { ssr: false })

export default async function Home() {
  const routes = await wrappedGetRoutes()
  const services = await wrappedGetServices()
  // const content = await wrappedGetContent()
  const intro_content = await wrappedGetIntro()
  const links = [
    { name: 'описание', url: '/#about' },
    { name: 'маршруты', url: '/#top-routes' },
    { name: 'контакты', url: '/#contacts' },
    { name: 'цены', url: '/#new-order' }
  ];

  return (
    <main className={styles.main} >
      {
        intro_content?.data.attributes.logo &&
        <TheHeader 
          logo={intro_content?.data.attributes.logo} 
          links={links} 
        />
        }
      {intro_content && <StartSection content={intro_content} />}
      <AboutSection />
      {routes && <NewRoutesSection routes={routes} />}
      {routes && <OrderSection routes={routes} />}
      <HorizontalListSection variant="feedback" />
      <HorizontalListSection variant="services" />
      <ContactSection />
      <CallBackButton />
      <TheFooter />
      <CookieNotification />
    </main>
  );
}
