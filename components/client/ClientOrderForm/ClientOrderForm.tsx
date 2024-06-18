"use client";
import React, { FC } from "react";
import styles from "./ClientOrderForm.module.css";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { Response, RouteSectionData } from "../../../types/webSiteContentTypes";
import { AddOrder } from "./form-action";
import { Field, Form, Formik } from "formik";
interface MyFormValues {
  user: {
    name: string;
    email?: string;
    phone: string;
  },
  order: {
    date: string;
    departure_id: string;
    route_id: number | null;
    count: number | null;
    comment?: string;
  } | null
}

const ClientOrderForm: FC<{ routes: Response<RouteSectionData[]> }> = ({
  routes,
}) => {
  const initialValues: MyFormValues = {
    user: {
      name: "",
      phone: "",
      email: ""
    },
    order: {
      date: "",
      departure_id: "",
      route_id: null,
      count: null,
      comment: "",
    },
  };
  return (
    <div className="container bg-white-600 w-dvw h-screen grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-40">

    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Form>
        <h1 className={styles.title}>Забронировать поездку</h1>
    <div className="flex border mt-48w-full lg:w-2/3 md:w-1/2 sm:w-full" >
      <div className="join join-vertical w-full md:w-30  pl-0 border border-red-400">
        {routes.data.map((route, index) => {
          const defaultChecked = index === 0;
          return (
            <div
              key={index}
              className="collapse  join-item border border-base-300"
            >
              <input
                type="radio"
                name="my-accordion-4"
                defaultChecked={defaultChecked}
              />
              <div
                className={`${styles.route_title} collapse-title text-xl font-medium text-white`}
              >
                {route.attributes.name}
              </div>
              <input type="checkbox" className="checkbox collapse-arrow" />
              <div className="collapse-content">
                <p className={`${styles.text} text-white`}>
                  {route.attributes.summary}
                </p>
                <p>{route.attributes.price} руб.</p>
              </div>
            </div>
          );
        })}
    </div>
  </div>
    <div className="w-full lg:w-1/3 md:w-1/2 sm:w-full flex flex-wrap  flex-col " style={{outline:'1px solid yellow'}}>
      <label htmlFor="name">Ваше имя:</label>
      <Field id="name" name="name" placeholder="Введите имя" />
      <label htmlFor="phone">Номер телефона:</label>
      <Field id="phone" name="phone" placeholder="Введите номер" />
      <label htmlFor="email">Электронная почта:</label>
      <Field id="email" name="email" placeholder="Введите адрес почты" />
      <button type="submit">Оставить заявку</button>
    </div>
      </Form>
    </Formik>
    </div>
  )
  return (
    <form className="container bg-white-600 w-dvw h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-40" action={AddOrder}>
      <div className=" lg:col-span-2">
        <h1 className={styles.title}>Забронировать поездку</h1>
        <div className="join join-vertical w-full p-48 pl-0">
          {routes.data.map((route, index) => {
            const defaultChecked = index === 0;
            return (
              <div
                key={index}
                className="collapse  join-item border border-base-300"
              >
                <input
                  type="radio"
                  name="my-accordion-4"
                  defaultChecked={defaultChecked}
                />
                <div
                  className={`${styles.route_title} collapse-title text-xl font-medium text-white`}
                >
                  {route.attributes.name}
                </div>
                <input type="checkbox" className="checkbox collapse-arrow" />
                <div className="collapse-content">
                  <p className={`${styles.text} text-white`}>
                    {route.attributes.summary}
                  </p>
                  <p>{route.attributes.price} руб.</p>
                </div>
              </div>
            );
          })}
        </div>
        <p>время </p>

        <p>количество </p>
        <input type='number' name="count" />
      </div>
      <div className="bg-teal">
        <div className="flex flex-wrap -mx-3 mb-6 flex-col">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Имя
            </label>
            <input
              type="text"
              name="name"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Номер телефона
            </label>
            <input
              type="tel"
              name="phoneNumber"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Электронная почта
            </label>
            <input
              type="email"
              name="email"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-transparent text-white hover:bg-[#ffa20de3] rounded-lg py-2 px-4 border border-white-200"
          >
            Забронировать поездку
          </button>
        </div>
      </div>
      {/* <div className="flex">
    <div className="bg-transparent text-white rounded-lg m-sm-4 m-md-16 m-lg-2 p-sm-5 p-md-5 p-lg-16">
      <div className="p-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <h2 className="text-2xl font-bold mb-3">Оставить заявку</h2>
            <p className="text-gray-500 mb-5">Fill up the form below to contact</p>
            <div className="py-5 md:py-8 lg:py-10">
              <div className="flex flex-col space-y-3">
                {routes.data.map((route, index) => (
                  <button
                    key={index}
                    className="bg-transparent hover:border-2 hover:border-[#1C6FEB] text-[#DCE2FF] w-200px h-48px rounded-lg"
                  >
                    <span className="mr-2">
                      <MdPhone size="20px" color="#1970F1" />
                    </span>
                    {route.attributes.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-start space-x-5 px-5 mt-10 md:mt-10">
              <button
                className="bg-transparent hover:bg-[#0D74FF] rounded-full"
                aria-label="facebook"
              >
                <MdFacebook size="28px" />
              </button>
              <button
                className="bg-transparent hover:bg-[#0D74FF] rounded-full"
                aria-label="github"
              >
                <BsGithub size="28px" />
              </button>
              <button
                className="bg-transparent hover:bg-[#0D74FF] rounded-full"
                aria-label="discord"
              >
                <BsDiscord size="28px" />
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <div className="bg-white rounded-lg p-8">
              <div className="text-[#0B0E3F]">
                <div className="space-y-5">
                  <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2" >
                      Ваше имя
                    </label>
                    <div className="flex items-center border border-[#E0E1E7] rounded-lg">
                      <span className="mr-2">
                        <BsPerson color="gray.800" />
                      </span>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 text-sm text-gray-700"
                        id="name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2" >
                      Номер телефона
                    </label>
                    <div className="flex items-center border border-[#E0E1E7] rounded-lg">
                      <span className="mr-2">
                        <MdOutlineEmail color="gray.800" />
                      </span>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 text-sm text-gray-700"
                        id="name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-bold mb-2" >
                      Комментарий
                    </label>
                    <textarea
                      className="w-full pl-4 pr-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                      placeholder="message"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-[#0D74FF] text-white hover:bg-[#0D74FF] rounded-lg py-2 px-4"
                    >
                      Забронировать поездку
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}

    </form>
  );
};

export default ClientOrderForm;
