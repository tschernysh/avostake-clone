import { useDispatch, useSelector } from "react-redux";
import { DepositBlock } from "../DepositBlock/DepositBlock";

import s from './application-dashboard.module.scss'
import { PiHandCoinsDuotone } from "react-icons/pi";
import { ApplicationActionCreator } from "store/reducers/application/action-creator";
import { useContext, useEffect, useMemo, useState } from "react";
import Config from "../../config";
import { ToastifyContext } from "../../applicationContext";

export const ApplicationDashboard = () => {
  const { dividents, match_bonus, leader_bonus, payoutOf, deposits } = useSelector(state => state.accountReducer.userInfo)
  const { walletAddress, isWithdrawTransaction } = useSelector(state => state.applicationReducer)
  const contractUnpausedTimestamp = useSelector(state => state.accountReducer.contractInfo?.contractUnpausedTimestamp)
  const dispatch = useDispatch()

  const [dataForDisplay, setDataForDisplay] = useState([])

  const handleWithdrawButton = () => {
    dispatch(ApplicationActionCreator.withdraw())
  }

  useEffect(() => {
    if (walletAddress) {
      //fetch(`https://avostake.com/api/getUserDeposits?address=0xa15daedb40f0a3f0b31fcd7989b1f862dadc51d5&chainId=56&contractAddress=0x7988bddb58439b9ab2675c85e85dd70a2720efb0`)
      fetch(`https://avostake.com/api/getUserDeposits?address=${walletAddress}&chainId=${Config().CHAIN_ID}&contractAddress=${Config().STAKE_CONTRACT_ADDRESS}`)
        .then((response) => response.body)
        .then((rb) => {
          const reader = rb.getReader();

          return new ReadableStream({
            start(controller) {
              function push() {
                reader.read().then(({ done, value }) => {
                  if (done) {
                    controller.close();
                    return;
                  }
                  controller.enqueue(value);
                  push();
                });
              }

              push();
            },
          });
        })
        .then((stream) =>
          new Response(stream, { headers: { "Content-Type": "text/html" } }).text()
        )
        .then((result) => {
          setDataForDisplay(JSON.parse(result) || [])
        }).catch(error => {
          console.log(error)
        })
    }
  }, [walletAddress])

  return (
    <>
      <DepositBlock showMin={true} />
      <div className={s.app_dashboard__deposits}>
        <p className={s.app_dashboard__deposits__header}>Your Deposits</p>
        <table className={s.app_dashboard__deposits__info}>
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Days</th>
              <th>Amount</th>
              <th>Progress</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {deposits?.map(({ tarif, amount, time }) => {
              let progress = null;
              const timestamp = time


              if (contractUnpausedTimestamp) {
                if (timestamp > contractUnpausedTimestamp) {
                  const currentProgress = (Date.now() / 1000) - timestamp

                  progress = (currentProgress / (tarif * 24 * 3600)) * 100
                } else {
                  const currentProgress = (Date.now() / 1000) - contractUnpausedTimestamp

                  progress = (currentProgress / (tarif * 24 * 3600)) * 100
                }
              } else {
                progress = 0;
              }

              return (
                <tr key={timestamp}>
                  <td>
                    {new Date(timestamp * 1000).toLocaleDateString('en', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour12: true,
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </td>
                  <td>{tarif}</td>
                  <td>{amount} BUSD</td>
                  <td><div className={s.app_dashboard__deposits__info__status}><span style={{ width: `${progress >= 100 ? 100 : progress}%` }} /></div></td>
                  <td>{(amount * (100 + tarif) / 100).toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className={s.app_dashboard__deposits__mobile_info}>
          {deposits?.map(({ tarif, amount, time }) => {
            let progress = null;
            const timestamp = time


            if (contractUnpausedTimestamp) {
              if (timestamp > contractUnpausedTimestamp) {
                const currentProgress = (Date.now() / 1000) - timestamp

                progress = (currentProgress / (tarif * 24 * 3600)) * 100
              } else {
                const currentProgress = (Date.now() / 1000) - contractUnpausedTimestamp

                progress = (currentProgress / (tarif * 24 * 3600)) * 100
              }
            } else {
              progress = 0;
            }

            return (
              <div className={s.app_dashboard__deposits__mobile_info__tile} key={timestamp}>
                <p>Date/Time <span>{new Date(timestamp * 1000).toLocaleDateString('en', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour12: true,
                  hour: 'numeric',
                  minute: 'numeric'
                })}</span></p>
                <p>Days <span>{tarif}</span></p>
                <p>Amount <span>{amount} BUSD</span></p>
                <p>Progress <span><div className={s.app_dashboard__deposits__info__status}><span style={{ width: `${progress >= 100 ? 100 : progress}%` }} /></div></span></p>
                <p>Profit <span>{(amount * (100 + tarif) / 100).toFixed(2)}</span></p>
              </div>
            )
          })}
        </div>
      </div>
      <div className={s.app_dashboard__withdraw}>
        <p className={s.app_dashboard__withdraw__header}>Withdraw</p>
        <div className={s.app_dashboard__withdraw__info}>
          <p>Deposit Earnings: <span>{payoutOf}  BUSD</span></p>
          <p>Referral Reward: <span>{match_bonus} BUSD</span></p>
          <p>Leadership Bonuses: <span>{leader_bonus} BUSD</span></p>
        </div>

        <div className={s.app_dashboard__withdraw__button_wrapper}>
          <PiHandCoinsDuotone />
          <p>Withdrawable (DEPS+REFS+LEAD)</p>
          <span>{+payoutOf + dividents + match_bonus + leader_bonus} BUSD</span>
          <button onClick={handleWithdrawButton} >{isWithdrawTransaction ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="100px" viewBox="0 0 100 50">
              <circle cx="84" cy="25" r="10" fill="black">
                <animate attributeName="r" repeatCount="indefinite" dur="0.25s" calcMode="spline"
                  keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
                <animate attributeName="fill" repeatCount="indefinite" dur="1s" calcMode="discrete"
                  keyTimes="0;0.25;0.5;0.75;1" values="#fcc337;#fff069;#ffe818;#ffe600;#fcc337"
                  begin="0s"></animate>
              </circle>
              <circle cx="16" cy="25" r="10" fill="black">
                <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline"
                  keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                  keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline"
                  keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                  keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
              </circle>
              <circle cx="50" cy="25" r="10" fill="black">
                <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline"
                  keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                  keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                  begin="-0.25s"></animate>
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline"
                  keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                  keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                  begin="-0.25s"></animate>
              </circle>
              <circle cx="84" cy="25" r="10" fill="black">
                <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline"
                  keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10"
                  keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                  begin="-0.5s"></animate>
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline"
                  keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
                  keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                  begin="-0.5s"></animate>
              </circle>
              <circle cx="16" cy="25" r="10" fill="black">
                <animate attributeName="r" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;9;9;9" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.75s"></animate>
              </circle>
            </svg>
          ) : 'Withdraw'}</button>
        </div>
      </div>
    </>
  )
}
