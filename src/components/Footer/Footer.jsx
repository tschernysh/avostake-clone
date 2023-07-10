import s from './footer.module.scss'
import { FaTelegramPlane } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";


export const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.footer__social}>
        <a href={'https://t.me/bixter_tech'} target='_blank'><FaTelegramPlane color={'#e3af2e'} /></a>
        <a href={'https://t.me/bixter_ru'} target='_blank'><FaTelegramPlane color={'#e3af2e'} /></a>
      </div>
      <div className={s.footer__links}>
        <a target={'_blank'} href={'https://bixter.gitbook.io/bixter-white-paper/'}>Terms of Use</a>
        <a target={'_blank'} href={'https://bixter.gitbook.io/bixter-white-paper/'}>Privacy Policy</a>
      </div>
      <small>© 2023 AvoStake. All rights reserved.</small>
    </footer>
  )
}
