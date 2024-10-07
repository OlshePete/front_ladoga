import { Response, RouteSectionData } from "../types/webSiteContentTypes";
import { wrapRequest } from "./utils";

const { API_TOKEN, API_URL } = process.env;
const headers = {
  Authorization: `bearer ${API_TOKEN}`,
};
async function getRoutes() {
  console.log(API_URL)
  const response = await fetch(`${API_URL}/api/routes?populate=*`, {
    headers,
    next:{
      revalidate:0
    }
  });

  const routes: Response<RouteSectionData[]> = await response.json();
  console.log(`Получено маршрутов , ${routes?.data?.map(r=>r.attributes.summary)}`);

  return routes;
}

export const wrappedGetRoutes = wrapRequest(getRoutes);
