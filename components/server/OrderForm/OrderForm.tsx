import React from 'react';

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
}

interface OrderFormData {
  date: string;
  seats: number;
  route: string;
  name: string;
  phone: string;
}
async function createOrder(data:FormData) {
    'use server'
    const { date, count, route1, name, phone} = Object.fromEntries(data)
    console.log(date, count, route1, name, phone)
}
const OrderForm: React.FC<{}> = () => {
 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmit({ date, seats, route, name, phone });
  };

  return (
    <form action={createOrder}>
      <label>
        Дата:
        <input type="date" name="date" required />
      </label>

      <label>
        Количество мест:
        <input
          type="number"
          name="count"
          min={1}
          required
        />
      </label>

      <label>
        Маршрут:
        <div>
          <input
            type="checkbox"
          name="route1"
          />
          <span>Маршрут 1</span>
        </div>
        <div>
          <input
            type="checkbox"
          name="route2"
          />
          <span>Маршрут 2</span>
        </div>
        <div>
          <input
            type="checkbox"
          name="route3"
          />
          <span>Маршрут 3</span>
        </div>
      </label>

      <h2>Контактная информация</h2>

      <label>
        Имя:
        <input type="text" name='name' required />
      </label>

      <label>
        Телефон:
        <input type="tel" name='phone' required />
      </label>

      <button type="submit">Отправить</button>
    </form>
  );
};

export default OrderForm;