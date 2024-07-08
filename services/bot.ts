import { IOrderResponse } from "./orders";
const { BOT_URL="http://localhost:4000" } = process.env
export const newOrderNotificationBot = async (newOrder:IOrderResponse) => {
    const response = await fetch(`${BOT_URL}/bot/task/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });
  
    if (!response.ok) console.log("Ошибка при оповещении в боте", response);
    
    console.log("Оповещение доставлено",response);
    
    return response;
}