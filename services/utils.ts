import { IFromData } from "../components/client/ClientOrderForm/OrderForm";
import { IClientRequest, wrappedAddClient } from "./clients";
import { IAddOrderRequest } from "./getOrders";

export type RequestFunction = (...args: any[]) => Promise<any>;

export function wrapRequest<T>(
  requestFn: (...args: any[]) => Promise<T>
): (...args: any[]) => Promise<T | null> {
  return async function (...args: any[]): Promise<T | null> {
    try {
      const res = await requestFn(...args);
      console.log("успешный запрос");
      return res;
    } catch (error: any) {
      console.error(`Ошибка при выполнении запроса: ${error.message}`);
      console.error(error.stack);
      return null;
    }
  };
}
export const generateRequestBody = async (body:IFromData):Promise<IAddOrderRequest> => {
  const {route,user} = body
  const client = await wrappedAddClient({
    data:{
      name:user.name,
      phone:user.phone
    }
  })
  if (!client) throw new Error('клиент не создан')
  return {
  data:{
    client:client,
    date:route.date,
    count:route.count,
    departure:route.departure_id,
    route:route.route_id,
    comment:user.comment
  }
}
 
}