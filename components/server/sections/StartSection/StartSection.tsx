import Image from "next/image";
import Link from "next/link";
import { FC, Suspense } from "react";
import {
  StartSectionData,
  Response,
} from "../../../../types/webSiteContentTypes";
import { ScrollWrapperHeaderSeparator } from "../../../client/motion/ScrollWrapperHeaderSeparator";
import { ScrollWrapperStartSection } from "../../../client/motion/ScrollWrapperStartSection";
import styles from "./StartSection.module.scss";

const StartSection = ({ content }: { content: Response<StartSectionData> }) => {
  const { title, background, sub_title } = content.data.attributes;

  const Arrow: FC = () => (<svg width="40px" height="40px" viewBox="0 -4.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Dribbble-Light-Preview" transform="translate(-220.000000, -6684.000000)" fill="#FFFFFF">
        <g id="icons" transform="translate(56.000000, 160.000000)">
          <path d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583" id="arrow_down-[#338]" />
        </g>
      </g>
    </g>
  </svg>)

  return (
    <>
      <section className={`${styles.container} section`} id='intro'>
      <Suspense fallback={<div className="flex items-center justify-center"><h1>Fallback suspense</h1></div>}>
        <video src={require('public/intro_video_cutted.mp4')} autoPlay muted loop style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
        }}
          playsInline
        />
      </Suspense>
        <div className="absolute bg-[rgba(0,0,0,0.5)] z-[1] h-[100dvh] w-[100dvw]"></div>

        <div className={styles.title_container}>
          <ScrollWrapperStartSection>
            <div className="flex flex-col gap-2 items-center">
              <h1 className={`${styles.title}  uppercase`}>{"Магия севера" ?? title}</h1>
              {true && <h2 className={`${styles.sub_title}  `}>{"путешествия по  Ладожскому озеру" ?? sub_title}</h2>}
              {true && <h2 className={`${styles.sub_title}  `}>{"город Сортавала" ?? sub_title}</h2>}

            </div>
          </ScrollWrapperStartSection>
        </div>
        {/* <Image
        src={API_URL + (background.data.attributes.url || "")}
        alt={background.data.attributes.alternativeText || ""}
        className={styles.image}
        fill={true}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={background.data.attributes.formats.small.url}
        priority
      // style={{
      //   objectFit: "cover",
      // }}
      // quality={100}
      /> */}
        <ScrollWrapperHeaderSeparator>
          <Link href="#about" className={styles.shake} >
            <Arrow />
          </Link>
        </ScrollWrapperHeaderSeparator>
      </section>
    </>
  );
};

export { StartSection };
