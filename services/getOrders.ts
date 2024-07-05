import { IFromData } from "../components/client/ClientOrderForm/OrderForm";
import { AboutSectionData, Response, RouteSectionData } from "../types/webSiteContentTypes";
import { wrappedAddClient } from "./clients";
import { generateRequestBody, wrapRequest } from "./utils";

const { API_TOKEN, API_URL } = process.env
const headers = {
  Authorization:
    `bearer ${API_TOKEN}`,
}
interface IOrderResponse extends Response<IOrderResponse> {}

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
  export interface INewPost {
    count:number;
    comment?:string;
    client:number;
    route:number;
    date:string;
    departure:number;
  }
  export interface IAddOrderRequest {
    data:INewPost
  }
  const addOrder = async (props:IFromData) => {
    const orderData = await generateRequestBody(props)
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
  
    if (!response.ok) throw new Error('Ошибка при добавлении заказа.');
  
    const data: IOrderResponse = await response.json();
    console.log('Заказ добавлен успешно');
  
    return data;
  };
  
  export const wrappedAddOrder = wrapRequest(addOrder);
export const wrapperdGetAllOrders = wrapRequest(getAllorders);
export const wrapperdGetordersBySearch = wrapRequest(getOrdersBySearch);
