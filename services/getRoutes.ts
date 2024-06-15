import { Response, RouteSectionData } from "../types/webSiteContentTypes";
import { wrapRequest } from "./utils";

const { API_TOKEN, API_URL } = process.env;
const headers = {
  Authorization: `bearer ${API_TOKEN}`,
};
async function getRoutes() {
  const response = await fetch(`${API_URL}/api/routes?populate=*`, {
    next: {
      revalidate: 60,
    },
    headers,
  });

  const routes: Response<RouteSectionData[]> = await response.json();
  console.log(`Получено маршрутов, ${routes.data.length}`);

  return routes;
}

export const wrappedGetRoutes = wrapRequest(getRoutes);
