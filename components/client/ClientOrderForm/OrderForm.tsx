"use client";
import "react-phone-input-2/lib/style.css";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { ChangeEvent, FC, useState } from "react";
import styles from "./ClientOrderForm.module.css";
import PhoneInput from "react-phone-input-2";
import { Response, RouteSectionData } from "../../../types/webSiteContentTypes";
import { LiaAtSolid } from "react-icons/lia";
import OrderStepper from "./OrderStepper";
import { formatDate } from "../../utils/formatDate";
interface Props {
  routes: Response<RouteSectionData[]>
}
interface UserData {
  name: string;
  email: string;
  phone: string;
  comment:string;
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

interface ICountry extends Object {
  countryCode: string,
  format: string,
}
const OrderForm: FC<Props> = ({ routes }) => {
  const [firstStep, setFirstStep] = useState(true)
  const nowDate = formatDate(new Date())
  console.log(nowDate);
  
  return (
    <div className={`bg-transparent ${styles.container} drop-shadow-[0_15px_15px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_25px_25px_rgba(255,255,255,0.25)] ease-in-out pt-4 w-[1200px] h-[100%]`}>
      <h1 className={`${styles.title} pl-10`}>Забронировать поездку</h1>
      <OrderStepper active={firstStep ? 1 : 2} handler={() => setFirstStep(p => !p)} />

      <Formik
        initialValues={{
          user: {
            name: "",
            email: "",
            phone: "",
            comment:"",
          },
          route: {
            route_id: 1,
            departure_id: 0,
            date: nowDate,
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
        {(props) => {
          const { values, setFieldValue } = props
          const isDeparturesDisabled = values.route.route_id === 0
          const currentRoute = routes.data.find(r => r.id === +values.route.route_id)
          console.log("7777", currentRoute?.attributes.departures.data);

          return (
            <Form className=" flex flex-col gap-2 pt-6 sm:px-2 lg:px-10 h-[fit-content]">
              {
                firstStep && <div className="flex flex-row gap-2 px-0    items-center ">
                  <div className="flex-grow gap-2 flex flex-col ">
                    {
                      routes && routes?.data && routes?.data.map((route) => {
                        const hiddenClass = values.route.route_id === route.id ? '' : 'opacity-0'
                        return (
                          <div className="form-control cursor-pointer" key={route.attributes.name + "-" + route.id}>
                            <label className="cursor-pointer label justify-start gap-4 w-[fit-content] flex-row-reverse">
                              <span className={`${styles.route_title} label-text`}>{route.attributes.name.trim()}</span>
                              <input type="checkbox" checked={values.route.route_id === route.id} className={`checkbox checkbox-success ${hiddenClass}`} onChange={() => setFieldValue('route.route_id', +route.id)} />
                            </label>
                          </div>)
                      })
                    }
                  </div>

                  <div className="flex flex-col gap-4 items-end gap-2   sm:py-2 lg:py-10  ">
                    <div className="w-[220px] flex flex-col items-end">
                      <label htmlFor="route.date" className="text-xs pb-2  ">Дата</label>
                      <Field as={'input'} id="route.date" name="route.date" type="date" min={nowDate}
                      error={true}
                      onChange={(e:ChangeEvent<HTMLInputElement>)=>setFieldValue('route.date',e.target.value)}
                      defaulValue={values.route.date} className="error h-12  px-4 rounded-sm outline outline-neutral-700 w-[100%]" />
                    </div>
                    <div className="w-[220px]  flex flex-col items-end">
                      <label htmlFor="route.departure" className="text-xs pb-2" >Время отправления</label>
                      <Field as="select" id="route.departure" name="route.departure_id" className="h-12  w-full  rounded-sm px-4 outline outline-neutral-700"
                        disabled={isDeparturesDisabled}
                      >
                        {
                          currentRoute && Array.isArray(currentRoute.attributes.departures.data) && currentRoute.attributes.departures.data.map((depart) => {
                            // return <option >{JSON.stringify(depart)}</option>
                            return <option key={depart.attributes.time + "-" + depart.id} value={depart.id}>{depart.attributes.time.slice(0, 5)}</option>
                          })
                        }
                      </Field>
                    </div>
                    <div className="w-[220px]  flex flex-col items-end">
                      <label htmlFor="route.count" className="text-xs pb-2" >Количество пассажиров</label>
                      <Field as="input" type='number' id="route.count" name="route.count" min="0" max="12" className="h-12  w-full rounded-sm px-4 outline outline-neutral-700"
                        />
                    </div>
                  </div>
                </div>
              }
              {
                !firstStep && <div className="flex flex-row gap-10  pt-10">
                  <div className="flex flex-col gap-2 w-[300px] ">
                  <label htmlFor="user.name" className="text-xs pb-2">Ваше имя</label>
                  <Field type="text" id="user.name" name="user.name" placeholder="Иван" className="h-12 mb-[32px] border rounded-sm px-4 outline outline-neutral-700" />
                  
                  <label htmlFor="user.phone" className="text-xs pb-2">Телефон</label>

                  <PhoneInput
                    inputStyle={{
                      height: '3rem',
                      fontSize: '1.4rem',
                      border: '1px solid transparent',
                      borderRadius: '0.125rem',
                      outline: '1px solid #404040',
                    }}
                    buttonStyle={{
                      border: '1px solid transparent',
                      borderRadius: '0.125 0 0 0.125',
                      height: '3rem',
                      fontSize: '1.4rem',
                    }}
                    inputClass="rounded-sm px-4 outline outline-neutral-700"
                    specialLabel="Номер телефона"
                    country={"ru"}
                    value={props.values.user.phone}
                    onChange={(phone) => props.setFieldValue("user.phone", phone)}
                    isValid={(value, country: object, ...other) => {
                      if (
                        !country ||
                        !("format" in country) ||
                        !("countryCode" in country)
                      ) {
                        return false; // or some other default value
                      }
                      const { countryCode, format } = country as ICountry

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

                  <label htmlFor="user.email" className="text-xs pb-2">Почта (необязательно)</label>
                  <Field
                    id="user.email"
                    name="user.email"
                    placeholder="name@mail.ru"
                    type="user.email"
                    className="h-12  px-4"
                  />
                  </div>
                  <div className="flex flex-col gap-2 w-[auto] flex-grow">
                  <label htmlFor="user.comment" className="text-xs pb-2" >Комментарий (необязательно)</label>
                      <Field as="textarea" type='text' id="user.comment" name="user.comment"  rows="5" className="h-64  w-full rounded-sm px-4 outline outline-neutral-700"
                        />
                  </div>
                 
                </div>
              }
              <div className="flex flex-row justify-between w-[100%] h-[fit-content] pb-10">

                <div onClick={() =>{
                  props.validateField('route.date')
                   setFirstStep(p => !p)
                }} className="w-[160px] rounded h-12 mt-20 button border border-black flex justify-center items-center cursor-pointer">
                  {
                    firstStep ? "Продолжить" : "Назад"
                  }

                </div>
                {
                  !firstStep && <button type="submit" className="button border border-black w-[200px] rounded  h-12 mt-20 border border-black">Оставить заявку</button>

                }
              </div>

            </Form>
          )
        }}
      </Formik>
    </div>
  );
}

export { OrderForm };