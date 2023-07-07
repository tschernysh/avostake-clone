import s from './application-header.module.scss'
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { routerBook } from "../../routes/routerBook";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import metamaskIcon from 'media/img/metamask-icon.png'
import { useDispatch, useSelector } from "react-redux";
import { BsChevronCompactDown } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../media/img/logo.png";
import { useDisconnect } from 'wagmi';
import { AccountActionCreator } from 'store/reducers/account/action-creator';

export const ApplicationHeader = ({ isNavOpen = false, setIsNavOpen = () => { } }) => {
  const location = useLocation();
  const { walletAddress, bnbBalance, tokenBalance } = useSelector(store => store.applicationReducer)
  const dispatch = useDispatch()
  const { disconnect } = useDisconnect();
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const title = useMemo(() => {
    const [_title] = Object.keys(routerBook).filter(key => {
      return routerBook[key] === location.pathname;
    })

    return _title
  }, [location.pathname])

  const onMouseAccountHover = () => {
    if (!isNavOpen) {
      setIsDropDownOpen(true)
    }
  }

  const onMouseAccountLeave = () => {
    setIsDropDownOpen(false)
  }

  const handleWalletDisconnect = () => {
    disconnect()
  }

  useEffect(() => {
    if (isDropDownOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isDropDownOpen]);

  const disconnected = useDisconnect({
    onSuccess(data) {
      dispatch(AccountActionCreator.resetUserInfo())
    },
  })

  return (
    <div className={s.app_header}>
      {isNavOpen || isDropDownOpen ? null : <a className={s.app_header__logo} href={'#'}><img src={logo} alt={'logo'} /></a>}

      <b data-mobile={false} className={s.app_header__title}>{title}</b>
      <b data-mobile={true} className={s.app_header__title}>{isNavOpen ? 'Menu' : isDropDownOpen ? 'Wallet' : ''}</b>
      <div className={s.app_header__account_data}>
        <div data-mobile={false} onClick={setIsBalanceHidden.bind(null, !isBalanceHidden)} className={s.app_header__account_data__wallet_balance}>
          <div className={s.app_header__account_data__wallet_balance__data}>
            <small>Wallet balance</small>
            <div className={s.app_header__account_data__wallet_balance__data__numbers}>
              <span>{isBalanceHidden ? '***' : bnbBalance.toFixed(2)} BNB</span>
              <span>{isBalanceHidden ? '***' : tokenBalance.toFixed(2)} BUSD</span>
            </div>
          </div>
          {isBalanceHidden ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
        <div onMouseEnter={onMouseAccountHover} onMouseLeave={onMouseAccountLeave} className={s.app_header__account_data__profile_menu}>
          <div onClick={onMouseAccountHover} className={s.app_header__account_data__profile_menu__header}>
            <img src={metamaskIcon} alt={'metamask'} />
            <span>{walletAddress?.slice(0, 4)}...{walletAddress?.slice(-5)}</span>
            <BsChevronCompactDown />
          </div>
          <div data-open={isDropDownOpen} className={s.app_header__account_data__profile_menu__content}>
            <div className={s.app_header__account_data__profile_menu__content__buttons}>
              <div data-mobile={true} onClick={setIsBalanceHidden.bind(null, !isBalanceHidden)} className={s.app_header__account_data__wallet_balance}>
                <div className={s.app_header__account_data__wallet_balance__data}>
                  <small>Wallet balance</small>
                  <div className={s.app_header__account_data__wallet_balance__data__numbers}>
                    <span>{isBalanceHidden ? '***' : bnbBalance.toFixed(2)} BNB</span>
                    <span>{isBalanceHidden ? '***' : tokenBalance.toFixed(2)} BUSD</span>
                  </div>
                </div>
                {isBalanceHidden ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
              <button onClick={handleWalletDisconnect}><ImExit /> Log Out</button>
            </div>
          </div>
        </div>
        <button onClick={setIsNavOpen.bind(null, !isNavOpen)} className={s.app_header__burger_button}>
          {isNavOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
        </button>
      </div>
    </div>
  )
}
