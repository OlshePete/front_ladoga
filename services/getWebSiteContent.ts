import { AboutSectionData, ContactInfoData, Response, StartSectionData, ServicesInfoData, FeedbacksInfoData } from "../types/webSiteContentTypes";
import { wrapRequest } from "./utils";
const { API_TOKEN, API_URL } = process.env
const headers = {
  Authorization:
    `bearer ${API_TOKEN}`,
}

const getContent = async () => {
  const response = await fetch(`${API_URL}/api/naponenie-sajta?populate=*`, {
    headers,
    next:{
      revalidate:60
    }
  });

  if (!response.ok)
    throw new Error("Ошибка при загрузке наполнения для сайта.");

  return response.json();
};
const getIntro = async () => {
  const response = await fetch(`${API_URL}/api/intro?populate=*`, {
    headers,
    next:{
      revalidate:60
    }
  });

  if (!response.ok)
    throw new Error(
      "Ошибка при загрузке наполнения для сайта. Стартовая страница."
    );
  const intro_content:Response<StartSectionData> = await response.json()
  return intro_content;
};
const getContacts = async () => {
  const response = await fetch(`${API_URL}/api/contact?populate=*`, {
    headers,
    next:{
      revalidate:60
    }
  });

  if (!response.ok)
    throw new Error(
      "Ошибка при загрузке наполнения для сайта. Раздел контакты."
    );

    const contacts_content:Response<ContactInfoData> = await response.json()
    return contacts_content;
};
const getAbout = async () => {
  const response = await fetch(`${API_URL}/api/about?populate=*`, {
    headers,
    next:{
      revalidate:60
    }
  });

  if (!response.ok)
    throw new Error(
      "Ошибка при загрузке наполнения для сайта. Раздел о проекте."
    );

    const intro_content:Response<AboutSectionData> = await response.json()
    return intro_content;
};
const getServices = async () => {
  const response = await fetch(`${API_URL}/api/services?populate=*`, {
    headers,
    next:{
      revalidate:60
    }
  });

  if (!response.ok)
    throw new Error(
      "Ошибка при загрузке наполнения для сайта. Раздел дополнительные услуги."
    );
    const intro_content:Response<ServicesInfoData> = await response.json()
    // console.log("__________________\n",JSON.stringify(intro_content))
    return intro_content;
};
const getFeedbacks = async () => {
  const response = await fetch(`${API_URL}/api/feedbacks?populate=*`, {
    headers,
    next:{
      revalidate:60
    }
  });

  if (!response.ok)
    throw new Error(
      "Ошибка при загрузке наполнения для сайта. Раздел отзывы."
    );
    const intro_content:Response<FeedbacksInfoData> = await response.json()
    return intro_content;
};
  export const wrappedGetContent = wrapRequest(getContent) 
  export const wrappedGetAbout = wrapRequest(getAbout) 
  export const wrappedGetContacts = wrapRequest(getContacts) 
  export const wrappedGetIntro = wrapRequest(getIntro) 
  export const wrappedGetServices = wrapRequest(getServices) 
  export const wrappedGetFeedbacks = wrapRequest(getFeedbacks) 
