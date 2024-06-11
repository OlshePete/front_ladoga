import { AboutSectionData, Response, StartSectionData } from "../types/webSiteContentTypes";

const { CMS_TOKEN="", CMS_URL="" } = process.env
const headers = {
  Authorization:
    `Bearer ${CMS_TOKEN}`,
}
const getContent = async () => {
  const response = await fetch(`${CMS_URL}/api/naponenie-sajta?populate=*`, {
    headers,
  });

  if (!response.ok)
    throw new Error("Ошибка при загрузке наполнения для сайта.");

  return response.json();
};
const getIntro = async () => {
  const response = await fetch(`${CMS_URL}/api/intro?populate=*`, {
    headers,
    next:{
      revalidate:1
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
  const response = await fetch(`${CMS_URL}/api/contact`, {
    headers,
  });

  if (!response.ok)
    throw new Error(
      "Ошибка при загрузке наполнения для сайта. Раздел контакты."
    );

  return response.json();
};
const getAbout = async () => {
  const response = await fetch(`${CMS_URL}/api/about?populate=images`, {
    headers,
  });

  if (!response.ok)
    throw new Error(
      "Ошибка при загрузке наполнения для сайта. Раздел о проекте."
    );

    const intro_content:Response<AboutSectionData> = await response.json()
    return intro_content;
};
export { getContent, getAbout, getContacts, getIntro };
