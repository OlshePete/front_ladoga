"use client";
import "react-phone-input-2/lib/style.css";
import { AddOrder } from './form-action'
import { Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import React, { ChangeEvent, FC, useState } from "react";
import styles from "./ClientOrderForm.module.scss";
import PhoneInput from "react-phone-input-2";
import { IOrder, Response, RouteSectionData } from "../../../types/webSiteContentTypes";
import { formatDate } from "../../utils/formatDate";
import Stepper from "./Stepper";
import { formatDateToRender } from "../../utils/formatDateToRender";
import { FormComplete } from "./FormComplete";
import { IOrderResponse } from "../../../services/orders";
interface Props {
  routes: Response<RouteSectionData[]>
}
interface UserData {
  name: string;
  email: string;
  phone: string;
  comment: string;
}
interface RouteData {
  route_id: number;
  departure_id: string;
  date: string;
  count: number;
}
export interface IFromData {
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
  const steps = ["Маршрут", "Отправление", "Контакты", "Подтверждение"];
  const fields = [
    ['route.route_id'],
    ['route.date', 'route.date', 'route.departure', 'route.count'],
    ['user.name', 'user.phone', 'user.email', 'user.comment'],
    ['route.route_id'],
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [completeStepper, setCompleteStepper] = useState(false);
  const [formComplete, setFormComplete] = useState<IOrderResponse | null>(null) 
  const renderStep = (activeIndex: number, values: IFromData, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => any, errors: FormikErrors<IFromData>) => {

    const currentRoute = routes.data.find(r => r.id === +values.route.route_id)

    switch (activeIndex) {
      case 1:
        return (<div key={`form-order-${activeIndex}-${steps[activeIndex - 1]}`} className="flex-grow gap-2 flex flex-col w-[100%] justify-center">
          {
            routes && routes?.data && routes?.data.map((route) => {
              const hiddenClass = values.route.route_id === route.id ? '' : 'opacity-0'
              return (
                <div className={`form-control cursor-pointer`} key={route.attributes.name + "-" + route.id}>
                  <label className="cursor-pointer label justify-start gap-4 w-[fit-content] flex-row-reverse">
                    <span className={`${styles.route_title} label-text  text-nowrap `}>{route.attributes.name.trim()}</span>
                    <input type="checkbox"

                      checked={values.route.route_id === route.id} className={`checkbox checkbox-success ${hiddenClass}`} onChange={() => setFieldValue('route.route_id', +route.id)} />
                  </label>
                </div>)
            })
          }
        </div>)
      case 2:
        return (<div key={`form-order-${activeIndex}-${steps[activeIndex - 1]}`}>
          <div className={`flex flex-col gap-4 items-end gap-2 sm:py-2 lg:py-10 `}>
            <div className={`${errors.route?.date ? styles.error : ""} w-[220px] flex flex-col items-end`}>
              <label htmlFor="route.date" className="text-xs pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 ">{errors.route?.date ? `${errors.route?.date}` : `Дата`}</label>
              <Field as={'input'} id="route.date" name="route.date" type="date" min={nowDate}
                error={'false'}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('route.date', e.target.value)}
                className="error h-12  px-4 rounded-sm outline outline-neutral-700 w-[100%] " />
            </div>
            <div className={`w-[220px]  flex flex-col items-end ${errors.route?.route_id ? styles.error : ""}`}>
              <label htmlFor="route.departure" className="text-xs pb-2 after:content-['*'] after:ml-0.5 after:text-red-500" >{errors.route?.route_id ? `${errors.route?.route_id}` : `Время отправления`}</label>
              <Field as="select" id="route.departure" name="route.departure_id" className="h-12  w-full  rounded-sm px-4 outline outline-neutral-700"
                disabled={values.route.route_id === 0}
              >
                {
                  currentRoute && Array.isArray(currentRoute.attributes.departures.data) && currentRoute.attributes.departures.data.map((depart) => {
                    // return <option >{JSON.stringify(depart)}</option>
                    console.log('##@#@#@', currentRoute.attributes.departures.data)
                    return <option key={depart.attributes.time + "-" + depart.id} value={depart.id}>{depart.attributes.time.slice(0, 5)}</option>
                  })
                }
              </Field>
            </div>
            <div className={`w-[220px]  flex flex-col items-end ${errors.route?.count ? styles.error : ""}`}>
              <label htmlFor="route.count" className="text-xs pb-2 after:content-['*'] after:ml-0.5 after:text-red-500" >{errors.route?.count ? `${errors.route?.count}` : `Количество пассажиров`}</label>
              <Field as="input" type='number' id="route.count" name="route.count" min="0" max="12" className="h-12  w-full rounded-sm px-4 outline outline-neutral-700"
              />
            </div>
          </div>
        </div>)
      case 3:
        return (<div key={`form-order-${activeIndex}-${steps[activeIndex - 1]}`} className="flex flex-col gap-10 xs:flex-col sm:flex-col md:flex-row xs:gap-2 sm:gap-4 md:gap-8 ">
          <div className={`flex flex-col gap-2 w-[300px] justify-center ${errors.user?.name ? styles.error : ""}`}>
            <label htmlFor="user.name" className="text-xs after:content-['*'] after:ml-0.5 after:text-red-500">{errors.user?.name ? `${errors.user?.name}` : `Ваше имя`}</label>
            <Field type="text" id="user.name" name="user.name" placeholder="" className="h-12  border border-black rounded-md px-4 " />

            <label htmlFor="user.phone" className="text-xs after:content-['*'] after:ml-0.5 after:text-red-500">{errors.user?.phone ? `${errors.user?.phone}` : `Телефон`}</label>

            <PhoneInput
              inputStyle={{
                zIndex: 2,
                height: '3rem',
                fontSize: '1.4rem',
                background: 'transparent',
                // borderRadius: '0.125rem',
                outline: '1px solid #404040',
              }}
              buttonStyle={{
                zIndex: 1,
                border: '1px solid transparent',
                borderRadius: '0.25 0 0 0.25',
                height: '3rem',
                fontSize: '1.4rem',
              }}
              buttonClass="rounded-md border border-black"
              inputClass="rounded-md px-4 border border-black"
              specialLabel="Номер телефона"
              country={"ru"}
              value={values.user.phone}
              onChange={(phone) => setFieldValue("user.phone", phone)}
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

                  if (!validNumberCount || value.length !== validNumberCount || errors.user?.phone) {
                    return "";
                  } else {
                    return true;
                  }
                }
                return true;
              }}
            />

            <label htmlFor="user.email" className="text-xs ">Почта (необязательно)</label>
            <Field
              id="user.email"
              name="user.email"
              placeholder="name@mail.ru"
              type="user.email"
              className="h-12  px-4 rounded-md border border-black"
            />
          </div>
          <div className="flex flex-col gap-2 w-[300px] flex-grow  justify-center">
            <label htmlFor="user.comment" className="text-xs " >Комментарий (необязательно)</label>
            <Field as="textarea" type='text' id="user.comment" name="user.comment" rows="5" className="h-34 xs:h-34 sm:h-34 md:h-64 w-full rounded-sm px-4 py-2 outline outline-neutral-700"
            />
          </div>

        </div>)
      case 4:
        const { name, departures } = routes.data.find(r => r.id === values.route.route_id)?.attributes ?? {}
        const currentDeparture = departures?.data[Number(values.route.departure_id)]
        const { time } = currentDeparture?.attributes ?? {}
        return (<div key={`form-order-${activeIndex}-${steps[activeIndex - 1]}`} className='flex flex-col justify-center'>
          <h3 className="text-nowrap">{name}</h3>
          <span className="text-nowrap">{formatDateToRender(new Date(values.route.date))} {time ? String('- ' + time.slice(0, 5)) : ""}</span>
          <span className="text-nowrap">мест забронировано - {values.route.count}</span>
          <span className="text-nowrap">сумма заказа - {(currentRoute?.attributes.price ?? 1) * values.route.count}</span>
        </div>)

      default:
        return <>default</>
    }
  }

  return (
    <div className={`bg-transparent ${styles.container} 
      drop-shadow-[0_15px_15px_rgba(255,255,255,0.25)] 
      hover:drop-shadow-[0_25px_25px_rgba(255,255,255,0.25)] 
      ease-in-out 
      pt-4 
      w-[1200px] 
      min-h-[100%]
    `}>
      <h1 className={`${styles.title} text-center xs:text-center sm:text-center  md:text-center lg:text-left lg:pl-40 `}>Забронировать поездку</h1>
     {formComplete ?<FormComplete formComplete={formComplete} setFormComplete={()=>setFormComplete(null)}/>: <Formik
        initialValues={{
          user: {
            name: "",
            email: "",
            phone: "",
            comment: "",
          },
          route: {
            route_id: 1,
            departure_id: '1',
            date: nowDate,
            count: 0,
          }
        }}
        onSubmit={async (
          values: IFromData,
          { setSubmitting, resetForm }: FormikHelpers<IFromData>
        ) => {
          // const currentDeparture = departures?.data[values.route.departure_id]
          try {
            const res = await AddOrder(values);
            if (res) {
              setCurrentStep(1);
              setCompleteStepper(false);
              resetForm()
              setFormComplete(res)
            } else {
              throw new Error(' ошибка данных')
            }
          } catch (error) {
            console.log('Не удалось создать заказ', JSON.stringify(error));

          }
        }}
      >
        {(props) => {
          const { values, setFieldValue, setFieldError, errors, submitForm } = props
          console.log(errors, values)

          // console.log("7777", currentRoute?.attributes.departures.data);
          const validateStep = (activeIndex: number): boolean => {
            console.log('valid', activeIndex);
            let result = false
            switch (activeIndex) {
              case 1:
                if (routes.data.find(r => r.id === +values.route.route_id)) {
                  return true;
                } else {
                  setFieldError('route.route_id', 'Маршрут не выбраны')
                  return false
                }
              case 2:
                result = true
                if (values.route.count <= 0) {
                  result = false
                  setFieldError('route.count', 'Количество не может быть 0 или отрицательным')
                }
                if (new Date(values.route.date).valueOf() < new Date().valueOf()) {
                  result = false
                  setFieldError('route.date', 'Дата не может быть в прошлом')
                }
                // if (new Date(values.route.date).getHours()<new Date().getHours()) {
                // TODO validate departure time by current time

                // console.log(new Date(values.route.departure_id).getHours(),new Date().getHours());

                // setFieldError('route.date', 'Время для поездки не верное')
                // result =  false
                // break;
                // } 
                return result
              case 3:
                if (values.user.name.length === 0) {
                  result = false
                  setFieldError('user.name', 'Обязательное поле')
                  return result
                }
                if (values.user.name.length < 2) {
                  result = false
                  setFieldError('user.name', 'Имя слишком короткое')
                  return result
                }
                if (values.user.name.length < 2) {
                  result = false
                  setFieldError('user.name', 'Имя слишком короткое')
                  return result
                }
                if (values.user.phone.length < 11) {
                  result = false
                  setFieldError('user.phone', 'Номер не существует')
                  return result
                }
                result = true
                return result
              case 4:
                submitForm()
                return true
              default:
                return result
            }
          }
          return (
            <Form className=" flex flex-col gap-2 pt-6 sm:px-2 lg:px-10 h-[fit-content]">
              <div className="bg-transparent flex flex-col gap-2 h-[fit-content] w-[100%] items-center justify-center">
                <Stepper
                  setComplete={setCompleteStepper}
                  setCurrentStep={setCurrentStep}
                  complete={completeStepper}
                  currentStep={currentStep}
                  steps={steps}
                  validate={validateStep}
                >
                  <div className={`min-h-[320px] flex justify-center ${styles.form_step}`}>
                    {renderStep(currentStep, values, setFieldValue, errors)}
                    <div className="flex flex-row justify-between w-[100%] h-[fit-content] ">
                      {
                        !firstStep && <button type="submit" className="button border border-black w-[200px] rounded  h-12 mt-20 border border-black">Оставить заявку</button>

                      }
                    </div>
                  </div>
                </Stepper>
              </div>
            </Form>
          )
        }}
      </Formik>}
    </div>
  );
}

export { OrderForm };