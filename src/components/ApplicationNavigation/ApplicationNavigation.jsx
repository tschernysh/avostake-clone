import s from "./application-navigation.module.scss";
import logo from "../../media/img/logo.png";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { SlPresent } from "react-icons/sl";
import { routerBook } from "../../routes/routerBook";
import { AiOutlineAudit, AiOutlineInfoCircle, AiOutlineTwitter } from "react-icons/ai";
import { LiaFileContractSolid } from "react-icons/lia";
import Config from "../../config";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { GoCopy } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { useContext } from "react";
import { ToastifyContext } from "../../applicationContext";

export const ApplicationNavigation = ({ isNavOpen }) => {
  const baseUrl = Config().BASE_URL;
  const { deposits } = useSelector(store => store.accountReducer.userInfo)

  const walletAddress = useSelector(store => store.applicationReducer.walletAddress)
  const defaultReferrer = useSelector(store => store.applicationReducer.defaultReferrer)
  const upline = useSelector(store => store.accountReducer.userInfo.upline)
  const referrer = upline || localStorage.getItem('refAddress') || defaultReferrer

  const { setToasifyData } = useContext(ToastifyContext)

  const referralUrl = useMemo(() => {
    return `${baseUrl}${walletAddress}`
  }, [walletAddress, deposits])

  const copyReferralUrlToClipboard = () => {
    navigator.clipboard.writeText(referralUrl)

    setToasifyData({
      text: 'The referral link has been copied!',
      type: 'success',
      duration: 3000
    })
  }

  return (
    <nav data-is-open={isNavOpen} className={s.app_nav}>
      <Link className={s.app_nav__logo} to={'/'}><img src={logo} alt={'logo'} /></Link>

      <div className={s.app_nav__links_wrapper}>
        <NavLink to={routerBook.dashboard} className={s.app_nav__links_wrapper__link}><MdOutlineDashboard /> Dashboard</NavLink>
        <NavLink to={routerBook.bonuses} className={s.app_nav__links_wrapper__link}><SlPresent /> Bonuses</NavLink>
      </div>

      <div className={s.app_nav__extra_links_wrapper}>
        <a target={'_blank'} href={'https://bixter.gitbook.io/bixter-white-paper/'}><AiOutlineInfoCircle /> About</a>
        <a target={'_blank'} href={'https://bixter.gitbook.io/bixter-white-paper/'}><AiOutlineAudit /> Audit</a>
        <a target={'_blank'} href={'https://bscscan.com/address/0x9d247da6960e2503b9eafeb2f15acc9fbd19c276'}><LiaFileContractSolid /> Smart Contract</a>
      </div>

      <div className={s.app_nav__referral}>
        <span>Your referral link:</span>
        <div className={s.app_nav__referral__copy_field}>
          {deposits.length ? (
            <>
              <p>{referralUrl}</p>
              <button onClick={copyReferralUrlToClipboard}><GoCopy /></button>
            </>
          ) : (
            <p>You need to make one deposit at least</p>
          )}
        </div>
        {referrer && (
          <div className={s.app_nav__referrer}>
            <span>Your referrer:</span>
            <p>{referrer.slice(0, 5)}...{referrer.slice(-3)}<a target={'_blank'} href={`https://bscscan.com/address/${referrer}`}><FiExternalLink color={'#e3af2e'} /></a></p>
          </div>
        )}
      </div>

      <div className={s.app_nav__socials}>
        <a href={'https://t.me/bixter_tech'} target='_blank'><FaTelegramPlane color={'#e3af2e'} /></a>
        <a href={'https://t.me/bixter_ru'} target='_blank'><FaTelegramPlane color={'#e3af2e'} /></a>
      </div>
    </nav>
  )
}
