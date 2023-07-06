import s from './application-stats.module.scss'
import { useSelector } from "react-redux";

export const DashboardStats = () => {
  const { invested, totalPlayers, totalLeadBonusReward } = useSelector(store => store.accountReducer.contractInfo)

  const { total_invested, total_withdrawn, leadBonusReward } = useSelector(store => store.accountReducer.userInfo)
  return (
    <div className={s.app_stats}>
      <b>Statistics of platform</b>

      <div className={s.app_stats__tile}>
        <small>Total invested</small>
        <span>{invested} BUSD</span>
      </div>
      <div className={s.app_stats__tile}>
        <small>Participants</small>
        <span>{totalPlayers}</span>
      </div>
      <div className={s.app_stats__tile}>
        <small>Referral Reward</small>
        <span>{totalLeadBonusReward} BUSD</span>
      </div>

      <b>Your Statistics</b>
      <div className={s.app_stats__tile}>
        <small>Total invested</small>
        <span>{total_invested} BUSD</span>
      </div>
      <div className={s.app_stats__tile}>
        <small>Total Withdrawal</small>
        <span>{total_withdrawn} BUSD</span>
      </div>
      <div className={s.app_stats__tile}>
        <small>Total Referral Reward</small>
        <span>{leadBonusReward} BUSD</span>
      </div>
    </div>
  )
}
