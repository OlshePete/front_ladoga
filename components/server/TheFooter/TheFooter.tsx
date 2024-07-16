import Link from 'next/link';
import { BiLogoTelegram, BiLogoVk, BiLogoYoutube } from 'react-icons/bi';
import styles from './TheFooter.module.scss'

const TheFooter = () => {
  return (
  <footer className={`${styles.container} footer footer-center bg-base-200 text-base-content rounded p-10`}>
  <nav className="flex flex-wrap gap-4 justify-center">
    <Link href={'#intro'} className="link link-hover">В начало</Link>
    <Link href={'#routes-list'} className="link link-hover">Маршруты</Link>
    <Link href={'#new-order'} className="link link-hover">Бронирование</Link>
    <Link href={'/policy'} className="link link-hover">Политика конфиденциальности</Link>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4 *:cursor-pointer ">
      <Link href={'https://telegram.org/'} target='_blank'>
      <BiLogoTelegram size={34} />
      </Link>
      <Link href={'https://www.youtube.com/'} target='_blank'>
       <BiLogoYoutube size={34}/>
      </Link>
      <Link href={'https://vk.com/magic_of_north'} target='_blank'>
        <BiLogoVk size={34}/>
      </Link>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - Магия Севера</p>
  </aside>
    </footer>
  );
};

export { TheFooter };