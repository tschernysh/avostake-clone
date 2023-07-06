import s from './application-header.module.scss'
import {useLocation} from "react-router-dom";
import {useEffect, useMemo, useRef, useState} from "react";
import {routerBook} from "../../routes/routerBook";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

import metamaskIcon from 'media/img/metamask-icon.png'
import {useSelector} from "react-redux";
import {BsChevronCompactDown} from "react-icons/bs";
import {FiExternalLink} from "react-icons/fi";
import {ImExit} from "react-icons/im";
import {GrRefresh} from "react-icons/gr";
import {MdOutlineRefresh} from "react-icons/md";

export const ApplicationHeader = () => {
    const location = useLocation();
    const walletAddress = useSelector(store => store.applicationReducer.walletAddress)

    const [isBalanceHidden, setIsBalanceHidden] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const title = useMemo(() => {
        const [_title] = Object.keys(routerBook).filter(key => {
            return routerBook[key] === location.pathname;
        })

        return _title
    }, [location.pathname])

    const onMouseAccountHover = () => {
        setIsDropDownOpen(true)
    }

    const onMouseAccountLeave = () => {
        setIsDropDownOpen(false)
    }

    return (
        <div className={s.app_header}>
            <b className={s.app_header__title}>{title}</b>
            <div className={s.app_header__account_data}>
                <div onClick={setIsBalanceHidden.bind(null, !isBalanceHidden)}
                     className={s.app_header__account_data__wallet_balance}>
                    <div className={s.app_header__account_data__wallet_balance__data}>
                        <small>Wallet balance</small>
                        <div className={s.app_header__account_data__wallet_balance__data__numbers}>
                            <span>## BNB</span>
                            <span>## BUSD</span>
                        </div>
                    </div>
                    {isBalanceHidden ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                </div>
                <div onMouseEnter={onMouseAccountHover} onMouseLeave={onMouseAccountLeave} className={s.app_header__account_data__profile_menu}>
                    <div className={s.app_header__account_data__profile_menu__header}>
                        <img src={metamaskIcon} alt={'metamask'}/>
                        <span>{walletAddress?.slice(0, 4)}...{walletAddress?.slice(-5)}</span>
                        <BsChevronCompactDown/>
                    </div>
                    <div data-open={isDropDownOpen} className={s.app_header__account_data__profile_menu__content}>
                        <div className={s.app_header__account_data__profile_menu__content__buttons}>
                            <button><MdOutlineRefresh/> Change wallet</button>
                            <a target={'_blank'} href={`https://bscscan.com/address/${walletAddress}`}><FiExternalLink/>Change wallet</a>
                            <button><ImExit/> Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}