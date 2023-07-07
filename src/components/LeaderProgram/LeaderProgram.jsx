import { useSelector } from "react-redux";

import s from './leader-program.module.scss'
import { useCallback, useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

export const LeaderProgram = ({ disableDescription = false }) => {

  const { refTurnover } = useSelector(store => store.accountReducer.userInfo)
  const { rewards, turnover } = useSelector(store => store.accountReducer.leaderProgressData)
  const [userLevel, setUserLevel] = useState(0)
  const [totalTurnover, setTotalTurnover] = useState(0)

  const getLevelData = () => {
    let totalTurnover = 0
    let userLevel

    for (let i = 0; i < refTurnover.length; i++) {
      totalTurnover += refTurnover[i]
    }

    for (let i = turnover.length - 1; i >= 0; i--) {
      if (turnover[i] <= totalTurnover) {
        userLevel = i + 1
        break
      }
    }

    return { totalTurnover, userLevel }
  }

  useEffect(() => {
    if (!!turnover.length && !!refTurnover.length) {
      const { totalTurnover, userLevel } = getLevelData()

      setTotalTurnover(totalTurnover)
      setUserLevel(userLevel)
    }
  }, [turnover, refTurnover])


  const createLevelsRow = useCallback(() => {
    return rewards.map((_, i) => {
      return (
        <td data-current-level={i + 1 === userLevel} key={`LP_LEVEL_${i}`}>
          {i + 1} Level
        </td>
      )
    })
  }, [userLevel, rewards])

  const createRewardRow = useCallback(() => {
    return rewards.map((r, i) => {
      return (
        <td data-current-level={i + 1 === userLevel} key={`LP_REWARD_${i}`}>
          <span>{r}<br />BUSD</span>
        </td>
      )
    })
  }, [userLevel, rewards])

  const createTurnoverRow = useCallback(() => {
    return turnover.map((t, i) => {
      return (
        <td data-current-level={i + 1 === userLevel} key={`LP_TURNOVER_${i}`}>
          <p>{t}<br />BUSD</p>
        </td>
      )
    })
  }, [userLevel, turnover])

  const createCompletedRow = useCallback(() => {
    return rewards.map((_, i) => {
      return (
        <td data-current-level={i + 1 === userLevel} key={`LP_COMPLETE_${i}`}>
          {i + 1 <= userLevel ? <BsCheckLg color={'#e3af2e'} /> : <AiFillLock color={'#282c34'} />}
        </td>
      )
    })
  }, [userLevel, turnover])

  const createStatusRow = useCallback(() => {
    return rewards.map((_, i) => {
      return (
        <td className={s.leader_program__body__progress_bar} data-current-level={i + 1 === userLevel} key={`LP_STATUS_${i}`}>
          <span data-completed-level={i + 1 <= userLevel} />
        </td>
      )
    })
  }, [userLevel, turnover, rewards])


  return (
    <div className={s.leader_program}>
      <div className={s.leader_program__header}>
        <div className={s.leader_program__header__text}>
          <b>Leader Program</b>
          {!disableDescription && (
            <small>The more active your team (the higher its turnover), the higher your Leader Bonus. Bonuses
              are single payouts issued to Leaders on reaching a certain Level. For instance, a 1 Level Leader
              gets a 12 BUSD bonus once their team taps 600 BUSD, while a 7 Level Leader gets a 5 000 BUSD
              reward as soon as their team hits 150 000 BUSD.</small>
          )}
        </div>
        <div className={s.leader_program__header__stats}>
          <div>
            <p>Your Level: <span>{userLevel}</span></p>
          </div>
          <div >
            <p>Turnover: <span>{totalTurnover} BUSD</span></p>
          </div>
        </div>
      </div>
      <table data-from-dashboard={disableDescription}  className={s.leader_program__body}>
        <tbody>
          <tr>
            <th>Level</th>
            {createLevelsRow()}
          </tr>
          <tr>
            <th>Reward</th>
            {createRewardRow()}
          </tr>
          <tr>
            <th>Progress bar</th>
            {createStatusRow()}
          </tr>
          <tr>
            <th>Turnover</th>
            {createTurnoverRow()}
          </tr>
          <tr>
            <th>Left</th>
            {createCompletedRow()}
          </tr>
        </tbody>
      </table>
      <div data-from-dashboard={disableDescription} className={s.leader_program__body_mobile}>
        {rewards.map((r, i) => {
          return (
              <div data-completed-level={i + 1 <= userLevel} className={s.leader_program__body_mobile__tile}>
                <div className={s.leader_program__body_mobile__tile__header}>
                  <p>Level <span>{i+ 1}</span></p>
                  {i + 1 <= userLevel && <BsCheckLg color={'#e3af2e'} />}
                </div>
                <div className={s.leader_program__body_mobile__tile__body}>
                  <p>Reward <span>{r} BUSD</span></p>
                  <p>Turnover <i>{turnover[i]}</i></p>
                </div>
              </div>
          )
        })}
      </div>
    </div>
  )
}
