import s from "./application-stats.module.scss";
import {useSelector} from "react-redux";

export const BonusesStats = () => {
    const {invested, totalPlayers, totalLeadBonusReward} = useSelector(store => store.accountReducer.contractInfo)

    const {total_invested, total_withdrawn, leadBonusReward} = useSelector(store => store.accountReducer.userInfo)

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
                <span>{totalLeadBonusReward}</span>
            </div>
            <div className={s.app_stats__tile}>
                <small>Structure Turnover</small>
                <span>{total_invested} BUSD</span>
            </div>
        </div>
    )
}