"use client";
import "react-phone-input-2/lib/style.css";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { FC } from "react";
import styles from "./ClientOrderForm.module.css";
import PhoneInput from "react-phone-input-2";
import { Response, RouteSectionData } from "../../../types/webSiteContentTypes";

interface Props {
  routes: Response<RouteSectionData[]>
}
interface UserData {
  name: string;
  email: string;
  phone: string;
}
interface RouteData {
  route_id: number;
  departure_id: number;
  date: string;
  count: number;
}
interface IFromData {
  user: UserData;
  route: RouteData;
}

const OrderForm: FC<Props> = ({ routes }) => {
  return (
    <div className={`bg-gray-300 w-dvw py-80 ${styles.container}`}>
      <h1 className={`${styles.title} pl-10`}>Забронировать поездку</h1>

      <Formik
        initialValues={{
          user: {
            name: "",
            email: "",
            phone: "",
          },
          route: {
            route_id: 0,
            departure_id: 0,
            date: "",
            count: 0,
          }
        }}
        onSubmit={(
          values: IFromData,
          { setSubmitting }: FormikHelpers<IFromData>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => (
          <Form className=" grid grid-cols-2 pt-20 sm:px-2 lg:px-10">
            <div className="flex flex-col gap-2  sm:px-2 lg:px-10 py-20">
              <label htmlFor="route.route_id" className={`${styles.route_title}`}>Выберите маршрут</label>

              <Field name="route.route_id" id="route.route_id" as="select" className="h-12 w-full rounded rounded-sm px-4 outline outline-neutral-700">
                {
                  routes && routes?.data && routes?.data.map((route) => {
                    return <option key={route.attributes.name + "-" + route.id} value={route.id}>{route.attributes.name.trim()}</option>
                  })
                }
              </Field>
              <div className="flex gap-2  pt-10 w-[100%]">
                <div className="flex-grow">
                  <label htmlFor="route.date">Дата</label>
                  <Field id="route.date" name="route.date" type="date" className="h-12 px-4 rounded-sm outline outline-neutral-700" />
                </div>
                <div className="flex-grow">

                  <label htmlFor="route.departure">Время отправления</label>
                  <Field as="select" id="route.departure" name="route.departure" className="h-12 w-full  rounded-sm px-4 outline outline-neutral-700"
                  >
                    {
                      routes && routes?.data && routes?.data.map((route) => {
                        return <option key={route.attributes.name + "-" + route.id} value={route.id}>{route.attributes.name.trim()}</option>
                      })
                    }
                  </Field>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2  p-20">
              <label htmlFor="user.name">Ваше имя</label>
              <Field type="text" id="user.name" name="user.name" placeholder="Иван" className="h-12 mb-[32px] border rounded-sm px-4 outline outline-neutral-700" />
              <PhoneInput
                inputStyle={{
                  height: '3rem',
                  fontSize: '1.4rem',
                  border:'1px solid transparent',
                  borderRadius:'0.125rem',
                  outline:'1px solid #404040',
                  }}
                  buttonStyle={{
                    border:'1px solid transparent',
                  borderRadius:'0.125 0 0 0.125',
                  height: '3rem',
                  fontSize: '1.4rem',
                }}
                inputClass="rounded-sm px-4 outline outline-neutral-700"
                specialLabel="Номер телефона"
                country={"ru"}
                value={props.values.user.phone}
                onChange={(phone) => props.setFieldValue("user.phone", phone)}
                isValid={(value, country: object, ...other) => {
                  console.log(country);
                  if (
                    !country ||
                    !("format" in country) ||
                    !("countryCode" in country)
                  ) {
                    return false; // or some other default value
                  }
                  const { countryCode, format } = country;
                  if (value.length === 0 || value === countryCode) return true;
                  if (
                    country &&
                    format &&
                    typeof format === "string" &&
                    format.length > 0
                  ) {
                    const validNumberCount: number | null =
                      countryCode === "7"
                        ? 11
                        : (format.match(/\./g)?.length as number | null);
                    // console.log('country',validNumberCount,'--',value.length, '//',countryCode,'//', format)

                    if (!validNumberCount || value.length !== validNumberCount) {
                      return "Номер не полный";
                    } else {
                      return true;
                    }
                  }
                  return true;
                }}
              />

              <label htmlFor="user.email">Почта (необязательно)</label>
              <Field
                id="user.email"
                name="user.email"
                placeholder="name@mail.ru"
                type="user.email"
                className="h-12  px-4"
              />

              <button type="submit" className="h-12 mt-20 border border-white">Оставить заявку</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { OrderForm };