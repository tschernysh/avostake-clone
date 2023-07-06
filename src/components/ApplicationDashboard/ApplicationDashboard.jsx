import {DepositBlock} from "../DepositBlock/DepositBlock";

import s from './application-dashboard.module.scss'
import {PiHandCoinsDuotone} from "react-icons/pi";

export const ApplicationDashboard = () => {
    return (
        <>
            <DepositBlock showMin={true}/>
            <div className={s.app_dashboard__withdraw}>
                <p className={s.app_dashboard__withdraw__header}>Withdraw</p>
                <div className={s.app_dashboard__withdraw__info}>
                    <p>Deposit Earnings: <span>###  BUSD</span></p>
                    <p>Referral Reward: <span>### BUSD</span></p>
                    <p>Leadership Bonuses: <span>### BUSD</span></p>
                </div>
                <div className={s.app_dashboard__withdraw__button_wrapper}>
                    <PiHandCoinsDuotone/>
                    <p>Withdrawable (DEPS+REFS+LEAD)</p>
                    <span>### BUSD</span>
                    <button>Withdraw</button>
                </div>
            </div>
        </>
    )
}