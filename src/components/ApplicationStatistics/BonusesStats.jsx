import { useEffect, useState } from "react";
import s from "./application-stats.module.scss";
import { useSelector } from "react-redux";

export const BonusesStats = () => {
  const { invested, totalPlayers, totalLeadBonusReward } = useSelector(store => store.accountReducer.contractInfo)

  const { total_invested, total_withdrawn, leadBonusReward, referrals, refTurnover } = useSelector(store => store.accountReducer.userInfo)

  const [totalTurnover, setTotalTurnover] = useState(0)

  const getLevelData = () => {
    let totalTurnover = 0

    for (let i = 0; i < refTurnover.length; i++) {
      totalTurnover += refTurnover[i]
    }

    return totalTurnover
  }

  useEffect(() => {
    if (!!refTurnover.length) {
      const totalTurnover = getLevelData()

      setTotalTurnover(totalTurnover)
    }
  }, [refTurnover])

  return (
    <div className={s.app_stats}>
      <b>Your Statistics</b>

      <div className={s.app_stats__tile}>
        <small>Referral Reward</small>
        <span>{invested} BUSD</span>
      </div>
      <div className={s.app_stats__tile}>
        <small>Leadership Bonuses</small>
        <span>{totalPlayers}</span>
      </div>
      <div className={s.app_stats__tile}>
        <small>Structure Members</small>
        <span>{referrals.length}</span>
      </div>
      <div className={s.app_stats__tile}>
        <small>Structure Turnover</small>
        <span>{totalTurnover} BUSD</span>
      </div>
    </div>
  )
}
