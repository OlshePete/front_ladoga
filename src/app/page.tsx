import Image from "next/image";
import ClientOrderForm from "../../components/client/ClientOrderForm/ClientOrderForm";
import OrderForm from "../../components/server/OrderForm/OrderForm";
import { ProjectSection } from "../../components/server/sections/ProjectSection/ProjectSection";
import { RoutesListSection } from "../../components/server/sections/RoutesListSection/RoutesListSection";
import { RoutesSection } from "../../components/server/sections/RoutesSection/RoutesSection";
import { StartSection } from "../../components/server/sections/StartSection/StartSection";
import { TheFooter } from "../../components/server/TheFooter/TheFooter";
import { TheHeader } from "../../components/server/TheHeader/TheHeader";
import { getRoutes } from "../../services/getRoutes";
import { getAbout, getContacts, getContent, getIntro } from "../../services/getWebSiteContent";
import styles from "./page.module.css";

export default async function Home() {
const routes = await getRoutes()
const content = await getContent()
const intro_content = await getIntro()
const about_content = await getAbout()
const contacts_content = await getContacts()
console.log(about_content)
  return (
    <main className={styles.main}>
     <TheHeader logo={intro_content.data.attributes.logo}/>
     <StartSection content={intro_content}/>
     <ProjectSection content={about_content}/>
     <RoutesSection routes={routes}/>
     <RoutesListSection routes={routes}/>
     
     <section>
     <p>boats_summary</p>
     <p>boats_gallery</p>
     <p>boats_sale_summary_list</p>
     </section>
     <section>

     <ClientOrderForm routes={routes}/>

     </section>
     <section>

     <p>{JSON.stringify(contacts_content)}</p>
     </section>

     <TheFooter/>
     
    </main>
  );
}
