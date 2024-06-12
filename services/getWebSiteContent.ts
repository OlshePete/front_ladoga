import { AboutSectionData, Response, StartSectionData } from "../types/webSiteContentTypes";
const { API_TOKEN, API_URL } = process.env
const headers = {
  Authorization:
    `bearer ${API_TOKEN}`,
}

const getContent = async () => {
  console.log(`test/api/naponenie-sajta?populate=*`)
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

  return response.json();
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
export { getContent, getAbout, getContacts, getIntro };
