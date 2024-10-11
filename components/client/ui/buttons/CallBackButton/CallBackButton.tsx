'use client'
import React, { FC, useEffect, useState } from 'react'
import { LuPhoneCall } from "react-icons/lu";
import styles from "./CallBackButton.module.scss";
import PhoneInput from 'react-phone-input-2';
import { ICountry } from '../../../OrderForm/OrderForm';
import { Form, Formik } from 'formik';
import { useScroll } from 'framer-motion';
import { AddCallbackCustomer } from '../../../OrderForm/components/form-action';

interface IProps {
}

const CallBackButton: FC<IProps> = () => {
  const [complete, setComplete] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const handleClick = () => {
    setOpen(p => !p)
  }

  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (event && event.target && !(event.target as HTMLElement).closest(`.${styles.dropdown}`)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if(open) {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [open]);
    
  if(complete) return <></>
  return (
    <div className={styles.container}>
      <button
        type='button'
        onClick={handleClick}
        className={styles.button}
      >
        <LuPhoneCall />
      </button>

      {open && (
        <div className={`${styles.dropdown} bg-white p-4 rounded shadow-md dropdown dropdown-left dropdown-end`}>
          <Formik
            initialValues={{ phone: '' }}
            onSubmit={async (values, actions) => {
              const newCustomer = {
                name:'Неизвестно',
                phone:values.phone
              }
              const isComplete = await AddCallbackCustomer(newCustomer)
              isComplete && setComplete(true)
            }}
          >
            {({ errors, values, touched, setFieldValue }) => {
              return <Form>
                <div  className="flex flex-col gap-10 items-center">

                <PhoneInput
                containerStyle={{
                  width:'fit-content',
                }}
                  inputStyle={{
                    zIndex: 2,
                    height: '3rem',
                    fontSize: '1rem',
                    background: 'transparent',
                    outline: 'none',
                    // border: 'none',
                    border: '1px solid rgba(35,36,35,.3)',
                    borderRadius: '0',
                  }}
                  buttonStyle={{
                    zIndex: 1,
                    border: '1px solid transparent',
                    borderRadius: '0',
                    height: '3rem',
                    fontSize: '1rem',
                  }}
                  buttonClass="rounded-md border border-black"
                  inputClass="rounded-md px-4 border border-black"
                  specialLabel="Номер телефона"
                  country={"ru"}
                  value={values.phone}
                  onChange={(phone) => setFieldValue("phone", phone)}
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

                      if (!validNumberCount || value.length !== validNumberCount || errors?.phone) {
                        return false;
                      } else {
                        return true;
                      }
                    }
                    return true;
                  }}

                />
                <button
                  type="submit"
                  className={styles.submit_button}
                  disabled={Boolean( values.phone.length<11 || errors.phone)}
                >
                  Перезвоните мне
                </button>
                </div>

              </Form>
            }}
          </Formik>

        </div>
      )}
    </div>
  )
}

export default CallBackButton