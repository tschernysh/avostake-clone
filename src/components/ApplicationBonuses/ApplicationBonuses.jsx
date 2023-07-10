import s from './application-bonuses.module.scss'
import { routerBook } from "../../routes/routerBook";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsFillPeopleFill } from "react-icons/bs";
import { LeaderProgram } from "../LeaderProgram/LeaderProgram";

export const ApplicationBonuses = () => {
  const { structure, refTurnover } = useSelector(store => store.accountReducer.userInfo)

  return (
    <>
      <div className={s.app_bonuses__banner}>
        <b>Get up to 10% deposit bonus and earn to 12% ROI daily</b>
        <p>We have prepared for you a bonus of 10% to your FIRST deposit, the offer may be limited in time.</p>
        <Link to={routerBook.dashboard}>Get to Bonuses</Link>
      </div>
      <div className={s.app_bonuses__referral_program}>
        <p className={s.app_bonuses__referral_program__header}>Referral Program</p>
        <div className={s.app_bonuses__referral_program__tiles}>
          {structure.slice(0, 5).map((rl, i) => {
            return (
              <div className={s.app_bonuses__referral_program__tiles__tile}>
                <div className={s.app_bonuses__referral_program__tiles__tile__header}>
                  <small>Ref Line {i + 1}</small>
                </div>
                <div className={s.app_bonuses__referral_program__tiles__tile__contributors}>
                  <BsFillPeopleFill />
                  <span>{rl}</span>
                </div>
                <div className={s.app_bonuses__referral_program__tiles__tile__balance}>
                  <p>{refTurnover[i]} <span>BUSD</span></p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <LeaderProgram disableDescription={true} />
      <span className={s.app_bonuses__footer}>The leadership bonus is calculated as the sum of all deposits of your first 3 referral lines, and the coefficient for the 1st level is 1, for the second 0.3 and for the third 0.15.</span>
    </>
  )
}
