import ClientOrderForm from "../../components/client/ClientOrderForm/ClientOrderForm";
import OrderForm from "../../components/server/OrderForm/OrderForm";
import { ProjectSection } from "../../components/server/sections/ProjectSection/ProjectSection";
import { RoutesListSection } from "../../components/server/sections/RoutesListSection/RoutesListSection";
import { RoutesSection } from "../../components/server/sections/RoutesSection/RoutesSection";
import { StartSection } from "../../components/server/sections/StartSection/StartSection";
import { TheFooter } from "../../components/server/TheFooter/TheFooter";
import { TheHeader } from "../../components/server/TheHeader/TheHeader";
import { wrappedGetRoutes } from "../../services/getRoutes";
import {wrappedGetAbout,wrappedGetContacts,wrappedGetContent,wrappedGetIntro } from "../../services/getWebSiteContent";
import styles from "./page.module.css";

const API_URL = process.env.CMS_URL;
const API_TOKEN = process.env.CMS_TOKEN;

export default async function Home() {
const routes = await wrappedGetRoutes()
const content = await wrappedGetContent()
const intro_content = await wrappedGetIntro()
const about_content = await wrappedGetAbout()
const contacts_content = await wrappedGetContacts()
// console.log('process.env.CMS_URL home',process.env.CMS_URL)


  return (
    <main className={styles.main} >
      {/* <header style={{color:'white'}}>{JSON.stringify(data)}</header> */}
      {intro_content?.data.attributes.logo && <TheHeader logo={intro_content.data.attributes.logo}/>}
     {intro_content && <StartSection content={intro_content}/>}
    {about_content && <ProjectSection content={about_content}/>}
     {routes && <RoutesSection routes={routes}/>}
     {routes && <RoutesListSection routes={routes}/>}
     {}
     <section className="section">
     <button className="btn btn-primary">boats_summary</button>
     <p>boats_gallery</p>
     <p>boats_sale_summary_list</p>
     </section>
     <section className="section">

     {routes && <ClientOrderForm routes={routes}/>}

     </section>
     <section className="section">
test
     {/* <p>{JSON.stringify(contacts_content)}</p> */}
     </section>

     <TheFooter/>
     
    </main>
  );
}
