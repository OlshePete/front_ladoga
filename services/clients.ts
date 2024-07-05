import { Response } from "../types/webSiteContentTypes";
import { wrapRequest } from "./utils";

interface IClientResponse extends Response<{
    id: number;
    attributes: {
      name: string;
      phone: string;
    };
  }> {}
  const { API_TOKEN, API_URL } = process.env
  const headers = {
    Authorization:
      `bearer ${API_TOKEN}`,
  }
  export interface IClientRequest {
      data:{
        name: string,
        phone: string
      }
  }
  const addClient = async (clientData: IClientRequest) => {
    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });
  
    if (!response.ok) throw new Error('Ошибка при добавлении клиента.');
  
    const data: IClientResponse = await response.json();
    console.log('Клиент добавлен успешно');
  
    return data.data.id;
  };
  
  export const wrappedAddClient = wrapRequest(addClient);