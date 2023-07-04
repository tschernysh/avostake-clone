import s from './footer.module.scss'
import {FaTelegramPlane} from "react-icons/fa";
import {AiOutlineTwitter} from "react-icons/ai";


export const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.footer__social}>
                <a href={'#'}><FaTelegramPlane color={'#e3af2e'}/></a>
                <a href={'#'}><AiOutlineTwitter color={'#e3af2e'}/></a>
            </div>
            <div className={s.footer__links}>
                <a href={'#'}>Terms of Use</a>
                <a href={'#'}>Privacy Policy</a>
            </div>
            <small>© 2023 AvoStake. All rights reserved.</small>
        </footer>
    )
}