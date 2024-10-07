"use client";
import "react-phone-input-2/lib/style.css";
import { Field, Form, Formik, FormikErrors, FormikHelpers } from "formik";
import React, { ChangeEvent, FC, useState } from "react";
import styles from "./OrderForm.module.scss";
import PhoneInput from "react-phone-input-2";
import { Response, RouteSectionData } from "../../../types/webSiteContentTypes";
import { formatDate } from "../../utils/formatDate";
import Stepper from "./components/Stepper";
import { formatDateToRender } from "../../utils/formatDateToRender";
import { FormComplete } from "./components/FormComplete";
import { IOrderResponse } from "../../../services/orders";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatPhone } from "../../utils/formatPhone";
import { getTimeInHour } from "../../utils/getTimeInHour";
import { FormError } from "./components/FormError";
import { AddOrder } from "./components/form-action";
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
  const API_URL = process.env.API_URL || 'https://ladoga-travel.ru/cms'

  const [firstStep, setFirstStep] = useState(true)
  const nowDate = formatDate(new Date())
  const steps = ["Маршрут", "Отправление", "Контакты", "Подтверждение"];

  const [currentStep, setCurrentStep] = useState(1);
  const [completeStepper, setCompleteStepper] = useState(false);
  const [formComplete, setFormComplete] = useState<IOrderResponse | null>(null)
  const [error, setError] = useState<boolean>(false)
  const renderStep = (activeIndex: number, values: IFromData, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => any, errors: FormikErrors<IFromData>) => {

    const currentRoute = routes.data.find(r => r.id === +values.route.route_id)

    const settings: Settings = {
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      speed: 500,
      arrows: true,
      className: "slider variable-width",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    switch (activeIndex) {
      case 1:
        return (<div key={`form-order-${activeIndex}-${steps[activeIndex - 1]}`} className="pt-20 pb-10 flex-grow gap-12 min-w-[100%] h-[350px] carousel carousel-center overflow-visible">
          <Slider {...settings}
            // @ts-ignore
            style={{
              zIndex: 3,
              width: '100%',
              height: '350px',

            }}>
            {
              routes && routes?.data && routes?.data.map((route) => {
                const image = route.attributes.images.data[0]
                const isActive = values.route.route_id === route.id
                const isExtraRoute = route.attributes.name.trim().toLowerCase().includes('свой маршрут')
                return (
                  <div
                    className={`${styles.route_list_item} ${isActive ? styles.active_item : ''} cursor-pointer border relative m-2`}
                    key={route.attributes.name + "-" + route.id}
                    onClick={() => setFieldValue('route.route_id', +route.id)}
                  >
                    <Image
                      src={API_URL + image.attributes.formats.small.url}
                      alt={`Route image ${image.id}`}
                      fill={false}
                      height={213}
                      width={213}
                      style={{
                        minWidth: '213px',
                        height: '213px',
                        objectFit: 'cover',
                      }}
                    />
                    {isActive && <div className={styles.check_icon}><IoCheckmarkCircleSharp /></div>}
                    <div className={`${styles.route_info} flex flex-col`}>
                      <span className={`${styles.route_name} label-text  text-nowrap text-accent`}>{route.attributes.name.trim()}</span>
                      <span className={`${styles.route_price} label-text  `}>Длительность{isExtraRoute ? " от" : ""}: {getTimeInHour(route.attributes.duration)}</span>
                      <span className={`${styles.route_price} label-text  `}>Цена с человека{isExtraRoute ? " от" : ""}: {route.attributes.price} руб.</span>
                    </div>
                  </div>)
              })
            }
          </Slider>
        </div>)

      case 2:
        return (<div key={`form-order-${activeIndex}-${steps[activeIndex - 1]}`}>
          <div className={`mx-[auto] flex flex-col gap-4 items-end gap-2 sm:py-2 lg:py-10 `}>
            <div className={`${styles.form_input} ${errors.route?.date ? styles.error : ""} w-[280px] flex flex-col items-start`}>
              <label htmlFor="route.date" className="text-xs text-[rgba(35,36,35,.73)] pb-2  ">{errors.route?.date ? `${errors.route?.date}` : `Дата поездки`}</label>
              <Field
                as={'input'}
                id="route.date"
                name="route.date"
                type="date"
                min={nowDate}
                error={'false'}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('route.date', e.target.value)}
                className="error h-12  px-4 rounded-sm border-b-2 border-[rgba(35,36,35,.73)] border-solid w-[100%] bg-[transparent]"
              />
            </div>
            <div className={`${styles.form_input} w-[280px]  flex flex-col items-start ${errors.route?.route_id ? styles.error : ""}`}>
              <label htmlFor="route.departure" className="text-xs pb-2  text-[rgba(35,36,35,.73)]" >{errors.route?.route_id ? `${errors.route?.route_id}` : `Время отправления`}</label>
              <Field
                as="select"
                id="route.departure"
                name="route.departure_id"
                className="h-12 w-full rounded-sm px-4 border-b-2 border-[rgba(35,36,35,.73)] border-solid bg-[transparent]"
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
            <div className={`${styles.form_input} w-[280px]  flex flex-col items-start ${errors.route?.count ? styles.error : ""}`}>
              <label htmlFor="route.count" className="text-xs pb-2  text-[rgba(35,36,35,.73)]" >{errors.route?.count ? `${errors.route?.count}` : `Количество пассажиров`}</label>
              <Field as="input" type='number' id="route.count" name="route.count" min="0" max="12" className="h-12  w-full rounded-sm px-4 border-b-2 border-[rgba(35,36,35,.73)] border-solid bg-[transparent]"
              />
            </div>
          </div>
        </div>)
      case 3:
        return (<div
          key={`form-order-${activeIndex}-${steps[activeIndex - 1]}`}
          className={`${styles.user_info_block} min-w-[100%] flex flex-col gap-[32px] xs:flex-col sm:flex-col md:flex-row xs:gap-2 sm:gap-4 md:gap-8 justify-between `}
        >
          <div className={`${styles.form_input} flex flex-col gap-2 w-[300px] justify-center ${errors.user?.name ? styles.error : ""}`}>
            <label htmlFor="user.name" className="text-xs ">{errors.user?.name ? `${errors.user?.name}` : `Ваше имя`}</label>
            <Field type="text" id="user.name" name="user.name" placeholder="" className="h-12  px-4 border-b-2 border-[rgba(35,36,35,.73)] border-solid  bg-[transparent]" />

            <label htmlFor="user.phone" className="text-xs ">{errors.user?.phone ? `${errors.user?.phone}` : `Телефон`}</label>

            <PhoneInput
              inputStyle={{
                zIndex: 2,
                height: '3rem',
                fontSize: '1.4rem',
                background: 'transparent',
                outline: 'none',
                border: 'none',
                borderBottom: '2px solid rgba(35,36,35,.73)',
                borderRadius: '0',
              }}
              buttonStyle={{
                zIndex: 1,
                border: '1px solid transparent',
                borderRadius: '0',
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
                    return false;
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
              className="h-12 px-4  border-b-2 border-[rgba(35,36,35,.73)] border-solid  bg-[transparent]"
            />
          </div>
          <div className={`${styles.form_input} flex flex-col gap-2 max-w-[300px] flex-grow  justify-center bg-[transparent]`}>
            <label htmlFor="user.comment" className="text-xs " >Комментарий (необязательно)</label>
            <Field as="textarea" type='text' id="user.comment" name="user.comment" rows="5" className="h-34 xs:h-34 sm:h-34 md:h-64 w-full rounded-sm px-4 py-2 outline outline-neutral-700  bg-[transparent]"
            />
          </div>

        </div>)
      case 4:
        const { name, departures } = routes.data.find(r => r.id === values.route.route_id)?.attributes ?? {}
        const currentDeparture = departures?.data[Number(values.route.departure_id)]
        const { time } = currentDeparture?.attributes ?? {}
        return (<div key={`form-order-${activeIndex}-${steps[activeIndex - 1]}`} className={`${styles.confirmation} flex flex-row justify-center`}>
          <div className={`${styles.left_block} w-[50%]`}>
            <div className={styles.item}>
              <span className={styles.label} id=""> Маршрут</span>
              <span className="text-nowrap" style={{ fontSize: '36px' }}>{name} </span>
            </div>

            <div className={styles.item}>
              <span className={styles.label} id=""> Отправление</span>
              <span className={`${styles.date_time} text-nowrap flex justify-between`}>{formatDateToRender(new Date(values.route.date))}<br className={styles.brake}/> {time ? String('- ' + time.slice(0, 5)) : ""}
                <span className="pl-2">
                  {values.route.count} чел.
                </span>
              </span>
            </div>

            {values.user.comment && <div className={`${styles.item} max-w-[760px]`}>
              <span className={styles.label} id=""> Комментарий</span>
              <span className="">{values.user.comment} </span>
            </div>}
          </div>

          <div className={styles.right_block} >
            <div className={styles.item}>
              <span className={styles.label} id=""> Заказчик</span>
              <span className="text-nowrap">{values.user.name} </span>
              <span className="text-nowrap" style={{ color: 'rgba(35, 36, 35, .5)' }}>{formatPhone(values.user.phone.slice(-10))} </span>
            </div>
            <div className={styles.item}>
              <span className={styles.label} id=""> Cумма</span>
              <span className="text-nowrap" style={{ fontSize: '36px' }}>{(currentRoute?.attributes.price ?? 1) * values.route.count} </span>
            </div>
          </div>
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
      min-h-[100%]
    `}>
      {formComplete ?
        <FormComplete formComplete={formComplete} setFormComplete={() => setFormComplete(null)} /> :
        <Formik
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
              setError(true)
            }
          }}
        >
          {(props) => {
            const { values, setFieldValue, setFieldError, errors, submitForm, resetForm } = props
            const validateStep = (activeIndex: number): boolean => {
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
            if (error) return <FormError refreshError={() => {
              setError(false)
              setCurrentStep(1);
              setCompleteStepper(false);
              resetForm()
            }} />
            return (
              <Form className=" flex flex-col gap-2 pt-6 sm:px-2 h-[fit-content]">
                <div className="bg-transparent flex flex-col gap-2 h-[fit-content] min-w-[100%] items-center justify-center">
                  <Stepper
                    setComplete={setCompleteStepper}
                    setCurrentStep={setCurrentStep}
                    complete={completeStepper}
                    currentStep={currentStep}
                    steps={steps}
                    validate={validateStep}
                  >
                    <div className={`px-10 w-[100%] min-h-[320px] flex justify-center ${styles.form_step}`}>
                      {renderStep(currentStep, values, setFieldValue, errors)}

                      {
                        !firstStep && <div className="  flex flex-row justify-between w-[100%] h-[fit-content] ">
                          <button
                            type="submit"
                            className="button border border-black w-[200px] rounded  h-12 mt-20 border border-black"
                          >Оставить заявку</button>
                        </div>

                      }

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