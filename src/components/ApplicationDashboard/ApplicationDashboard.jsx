import { useDispatch, useSelector } from "react-redux";
import { DepositBlock } from "../DepositBlock/DepositBlock";

import s from './application-dashboard.module.scss'
import { PiHandCoinsDuotone } from "react-icons/pi";
import { ApplicationActionCreator } from "store/reducers/application/action-creator";
import { useEffect, useMemo, useState } from "react";
import Config from "../../config";

export const ApplicationDashboard = () => {
  const { dividents, match_bonus, leader_bonus, payoutOf } = useSelector(state => state.accountReducer.userInfo)
  const { walletAddress } = useSelector(state => state.applicationReducer)
  const dispatch = useDispatch()

  const [dataForDisplay, setDataForDisplay] = useState([])

  const handleWithdrawButton = () => {
    dispatch(ApplicationActionCreator.withdraw())
  }

  useEffect(() => {
    if (walletAddress) {
      //fetch(`https://avostake.com/api/getUserDeposits?address=${walletAddress}&chainId=97&contractAddress=${Config().STAKE_CONTRACT_ADDRESS}`)
      fetch(`https://avostake.com/api/getUserDeposits?address=0xa15daedb40f0a3f0b31fcd7989b1f862dadc51d5&chainId=56&contractAddress=0x7988bddb58439b9ab2675c85e85dd70a2720efb0`)
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
          setDataForDisplay(JSON.parse(result))
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
              <th>TXN Hash</th>
              <th>Date/Time</th>
              <th>Days</th>
              <th>Amount</th>
              <th>Progress</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {dataForDisplay?.map(({ transaction_hash, timestamp, tarif, amount, id }) => {
              const progress = Math.round(((Date.now() / 1000 - (tarif * 24 * 3600)) / timestamp) * 100);
              return (
                <tr key={id}>
                  <td>
                    {transaction_hash.slice(0, 5)}...{transaction_hash.slice(-5)}
                  </td>
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
                  <td><div className={s.app_dashboard__deposits__info__status}><span style={{ width: `${progress >= 100 ? 100 : 0}%` }} /></div></td>
                  <td>{(amount * (100 + tarif) / 100).toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div class={s.app_dashboard__deposits__mobile_info}>
          {dataForDisplay?.map(({ transaction_hash, timestamp, tarif, amount, id }) => {
            const progress = Math.round(((Date.now() / 1000 - (tarif * 24 * 3600)) / timestamp) * 100);
            return (
              <div className={s.app_dashboard__deposits__mobile_info__tile} key={id}>
                <p>TXN Hash <span>{transaction_hash.slice(0, 5)}...{transaction_hash.slice(-5)}</span></p>
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
                <p>Progress <span><div className={s.app_dashboard__deposits__info__status}><span style={{ width: `${progress >= 100 ? 100 : 0}%` }} /></div></span></p>
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
          <span>{payoutOf + dividents + match_bonus + leader_bonus} BUSD</span>
          <button onClick={handleWithdrawButton} >Withdraw</button>
        </div>
      </div>
    </>
  )
}
