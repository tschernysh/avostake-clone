import { useSelector } from "react-redux";

import s from './leader-program.module.scss'
import { useCallback, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

export const LeaderProgram = () => {
  const [currentLevel, setCurrentLevel] = useState(7)

  const { rewards, turnover } = useSelector(store => store.accountReducer.leaderProgressData)

  const createLevelsRow = useCallback(() => {
    return rewards.map((_, i) => {
      return (
        <td data-current-level={i + 1 === currentLevel} key={`LP_LEVEL_${i}`}>
          {i + 1} Level
        </td>
      )
    })
  }, [currentLevel, rewards])

  const createRewardRow = useCallback(() => {
    return rewards.map((r, i) => {
      return (
        <td data-current-level={i + 1 === currentLevel} key={`LP_REWARD_${i}`}>
          <span>{r}<br />BUSD</span>
        </td>
      )
    })
  }, [currentLevel, rewards])

  const createTurnoverRow = useCallback(() => {
    return turnover.map((t, i) => {
      return (
        <td data-current-level={i + 1 === currentLevel} key={`LP_TURNOVER_${i}`}>
          <p>{t}<br />BUSD</p>
        </td>
      )
    })
  }, [currentLevel, turnover])

  const createCompletedRow = useCallback(() => {
    return rewards.map((_, i) => {
      return (
        <td data-current-level={i + 1 === currentLevel} key={`LP_COMPLETE_${i}`}>
          {i + 1 <= currentLevel ? <BsCheckLg color={'#e3af2e'} /> : <AiFillLock color={'#282c34'} />}
        </td>
      )
    })
  }, [currentLevel, turnover])

  const createStatusRow = useCallback(() => {
    return rewards.map((_, i) => {
      return (
        <td className={s.leader_program__body__progress_bar} data-current-level={i + 1 === currentLevel} key={`LP_STATUS_${i}`}>
          <span data-completed-level={i + 1 <= currentLevel} />
        </td>
      )
    })
  }, [currentLevel, turnover, rewards])


  return (
    <div className={s.leader_program}>
      <div className={s.leader_program__header}>
        <div className={s.leader_program__header__text}>
          <b>Leader Program</b>
          <small>The more active your team (the higher its turnover), the higher your Leader Bonus. Bonuses
            are single payouts issued to Leaders on reaching a certain Level. For instance, a 1 Level Leader
            gets a 12 BUSD bonus once their team taps 600 BUSD, while a 7 Level Leader gets a 5 000 BUSD
            reward as soon as their team hits 150 000 BUSD.</small>
        </div>
        <div className={s.leader_program__header__stats}>
          <div>
            <p>Your Level: <span>{currentLevel}</span></p>
          </div>
          <div >
            <p>Turnover: <span>{turnover[currentLevel - 1]} BUSD</span></p>
          </div>
        </div>
      </div>
      <table className={s.leader_program__body}>
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
    </div>
  )
}
