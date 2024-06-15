import { AboutSectionData, Response, RouteSectionData } from "../types/webSiteContentTypes";
import { wrapRequest } from "./utils";

const { API_TOKEN, API_URL } = process.env
const headers = {
  Authorization:
    `bearer ${API_TOKEN}`,
}
interface IOrderResponse extends Response<{
  id:number;
  attributes:Object;
}[]> {}
 const getAllorders = async () => {
    const response = await fetch(`${API_URL}/orders`, {
        headers,
        next:{
          revalidate:60
        },
    });
  
    if (!response.ok) throw new Error("Ошибка при загрузке списка заказов.");
    
    const data:IOrderResponse = await response.json()
    console.log("Получено ${} заказов");
    
    return data;
  };
  
   const getOrdersBySearch = async (search: string) => {
    const response = await fetch(
      `${API_URL}/orders?q=${search}`
      , {
        headers,
        next:{
          revalidate:60
        },
    });
  
    if (!response.ok) throw new Error("Ошибка при загрузке списка заказов.");

    const data:IOrderResponse = await response.json()
    console.log("Найдено ${} заказов");
    return data;
  };
export const wrapperdGetAllOrders = wrapRequest(getAllorders);
export const wrapperdGetordersBySearch = wrapRequest(getOrdersBySearch);
