import { Response, RouteSectionData } from "../types/webSiteContentTypes";

const { CMS_TOKEN="", CMS_URL="" } = process.env
const headers = {
  Authorization:
    `Bearer ${CMS_TOKEN}`,
}
export async function getRoutes() {
    const response = await fetch('http://localhost:1337/api/routes?populate=*', {
      next:{
        revalidate:60
      },
      headers
    })
    
  const intro_content:Response<RouteSectionData[]> = await response.json()
  return intro_content;
  }