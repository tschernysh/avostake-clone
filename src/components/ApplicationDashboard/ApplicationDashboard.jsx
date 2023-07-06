import { useDispatch, useSelector } from "react-redux";
import { DepositBlock } from "../DepositBlock/DepositBlock";

import s from './application-dashboard.module.scss'
import { PiHandCoinsDuotone } from "react-icons/pi";
import { ApplicationActionCreator } from "store/reducers/application/action-creator";

export const ApplicationDashboard = () => {
  const { dividents, match_bonus, leader_bonus } = useSelector(state => state.accountReducer.userInfo)
  const dispatch = useDispatch()

  const handleWithdrawButton = () => {
    dispatch(ApplicationActionCreator.withdraw())
  }

  return (
    <>
      <DepositBlock showMin={true} />
      <div className={s.app_dashboard__withdraw}>
        <p className={s.app_dashboard__withdraw__header}>Withdraw</p>
        <div className={s.app_dashboard__withdraw__info}>
          <p>Deposit Earnings: <span>{dividents}  BUSD</span></p>
          <p>Referral Reward: <span>{match_bonus} BUSD</span></p>
          <p>Leadership Bonuses: <span>{leader_bonus} BUSD</span></p>
        </div>
        <div className={s.app_dashboard__withdraw__button_wrapper}>
          <PiHandCoinsDuotone />
          <p>Withdrawable (DEPS+REFS+LEAD)</p>
          <span>{dividents + match_bonus + leader_bonus} BUSD</span>
          <button onClick={handleWithdrawButton} >Withdraw</button>
        </div>
      </div>
    </>
  )
}
