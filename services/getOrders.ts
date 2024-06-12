const { API_TOKEN, API_URL } = process.env
const headers = {
  Authorization:
    `bearer ${API_TOKEN}`,
}

export const getAllorders = async () => {
    const response = await fetch(`${API_URL}/orders`, {
        headers,
        next:{
          revalidate:60
        },
    });
  
    if (!response.ok) throw new Error("Ошибка при загрузке списка заказов.");
  
    return response.json();
  };
  
  export const getordersBySearch = async (search: string) => {
    const response = await fetch(
      `${API_URL}/orders?q=${search}`
      , {
        headers,
        next:{
          revalidate:60
        },
    });
  
    if (!response.ok) throw new Error("Ошибка при загрузке списка заказов.");
  
    return response.json();
  };