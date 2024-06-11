export const getAllorders = async (baseUrl:string) => {
    const response = await fetch(`${baseUrl}/orders`, {
        headers: {
          Authorization: 'Bearer 328dea84b41ec0116b49e133c3a2acdb46460f56fb2742afcac4b003ebb5ee498b27b37db4ca7aaffc2a5909af0c623b3dd6a670a372b89774f148585d2c3ddcacd8cd0f09e28de6a0c1c19cabb2bc887786af6260456809bbef8e360e03385a164282d5fa4bab7eda268cb4599e1beb8dfc8c18f3aed4adaa877156020c5a97'
        },
        next:{
          revalidate:60
        },
    });
  
    if (!response.ok) throw new Error("Ошибка при загрузке списка заказов.");
  
    return response.json();
  };
  
  export const getordersBySearch = async (baseUrl:string,search: string) => {
    const response = await fetch(
      `${baseUrl}/orders?q=${search}`
      , {
        headers: {
          Authorization: 'Bearer 328dea84b41ec0116b49e133c3a2acdb46460f56fb2742afcac4b003ebb5ee498b27b37db4ca7aaffc2a5909af0c623b3dd6a670a372b89774f148585d2c3ddcacd8cd0f09e28de6a0c1c19cabb2bc887786af6260456809bbef8e360e03385a164282d5fa4bab7eda268cb4599e1beb8dfc8c18f3aed4adaa877156020c5a97'
        },
        next:{
          revalidate:60
        },
    });
  
    if (!response.ok) throw new Error("Ошибка при загрузке списка заказов.");
  
    return response.json();
  };