import { Response, RouteSectionData } from "../types/webSiteContentTypes";

// const res = await fetch(`${API_URL}/api/intro?populate=*`, {
//   headers: {
//     authorization: ,
//   },
// });

const { API_TOKEN, API_URL } = process.env
const headers = {
  Authorization:
    `bearer ${API_TOKEN}`,
}
export async function getRoutes() {

    const response = await fetch(`${API_URL}/api/routes?populate=*`, {
      next:{
        revalidate:60
      },
      headers
    })
    
  const intro_content:Response<RouteSectionData[]> = await response.json()
  return intro_content;
  }