import s from "./application-navigation.module.scss";
import logo from "../../media/img/logo.png";
import {Link, NavLink} from "react-router-dom";
import {MdOutlineDashboard} from "react-icons/md";
import {SlPresent} from "react-icons/sl";
import {routerBook} from "../../routes/routerBook";
import {AiOutlineAudit, AiOutlineInfoCircle, AiOutlineTwitter} from "react-icons/ai";
import {LiaFileContractSolid} from "react-icons/lia";
import Config from "../../config";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {GoCopy} from "react-icons/go";
import {FiExternalLink} from "react-icons/fi";
import {FaTelegramPlane} from "react-icons/fa";

export const ApplicationNavigation = () => {
    const baseUrl = Config().BASE_URL;

    const walletAddress = useSelector(store => store.applicationReducer.walletAddress)
    const defaultReferrer = useSelector(store => store.applicationReducer.defaultReferrer)
    const upline = useSelector(store => store.accountReducer.userInfo.upline)
    const referrer = upline|| localStorage.getItem('refAddress') || defaultReferrer

    const referralUrl = useMemo(() => {
        return `${baseUrl}${walletAddress}`
    }, [walletAddress])

    const copyReferralUrlToClipboard = () => {
        navigator.clipboard.writeText(referralUrl)
    }

    return (
        <nav className={s.app_nav}>
            <Link className={s.app_nav__logo} to={'/'}><img src={logo} alt={'logo'} /></Link>

            <div className={s.app_nav__links_wrapper}>
                <NavLink to={routerBook.dashboard} className={s.app_nav__links_wrapper__link}><MdOutlineDashboard/> Dashboard</NavLink>
                <NavLink to={routerBook.bonuses} className={s.app_nav__links_wrapper__link}><SlPresent/> Bonuses</NavLink>
            </div>

            <div className={s.app_nav__extra_links_wrapper}>
                <a href={'#'}><AiOutlineInfoCircle/> About</a>
                <a href={'#'}><AiOutlineAudit/> Audit</a>
                <a href={'#'}><LiaFileContractSolid/> Smart Contract</a>
            </div>

            <div className={s.app_nav__referral}>
                <span>Your referral link:</span>
                <div className={s.app_nav__referral__copy_field}>
                    <p>{referralUrl}</p>
                    <button onClick={copyReferralUrlToClipboard}><GoCopy/></button>
                </div>
                {referrer && (
                    <div className={s.app_nav__referrer}>
                        <span>Your referrer:</span>
                        <p>{referrer.slice(0, 5)}...{referrer.slice(-3)}<a target={'_blank'} href={`https://bscscan.com/address/${referrer}`}><FiExternalLink color={'#e3af2e'}/></a></p>
                    </div>
                )}
            </div>

            <div className={s.app_nav__socials}>
                <a href={'#'}><FaTelegramPlane color={'#e3af2e'}/></a>
                <a href={'#'}><AiOutlineTwitter color={'#e3af2e'}/></a>
            </div>
        </nav>
    )
}