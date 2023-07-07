import { ApplicationActionCreator } from 'store/reducers/application/action-creator';
import s from './deposit-block.module.scss'
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { routerBook } from 'routes/routerBook';

const config = {
  min: 10,
  max: 33
}

export const DepositBlock = ({ signInButtonClickHandler, showMin = false }) => {
  const {
    tokenBalance,
    walletAddress,
    isDepositTransaction,
    isWithdrawTransaction
  } = useSelector(state => state.applicationReducer)
  const { contractInfo } = useSelector(state => state.accountReducer)
  const [rangeValue, setRangeValue] = useState(33);
  const [depositAmount, setDepositAmount] = useState(1000);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const onInputHover = useCallback(() => {
    setIsNotificationVisible(true)
  }, [])

  const onInputHoverLeft = useCallback(() => {
    setIsNotificationVisible(false)
  }, [])

  const maxDepositButtonClickHandler = () => {
    setDepositAmount(tokenBalance)
  }

  const changeHandlers = ({ target: { name, value } }) => {
    switch (name) {
      case 'period-selector':
        setRangeValue(+value)
        break;
      case 'deposit-selector':
        if (value.match(/^\d*(\.|\,)?\d*$/)) {
          setDepositAmount(value)
        }
        break;
      default:
        break;
    }
  }

  const handleDeposit = () => {
    if (!!walletAddress) {
      if (location.pathname !== routerBook.dashboard) {
        navigate(routerBook.dashboard)
      } else {
        if (depositAmount > tokenBalance || depositAmount < 10) {

        } else {
          dispatch(ApplicationActionCreator.depositToken(+depositAmount, rangeValue))
        }
      }
    } else {
      signInButtonClickHandler()
    }
  }

  const bonusesField = depositAmount * (contractInfo.bonuses_obj[rangeValue - config.min] || '0') / 100

  return (
    <div onChange={changeHandlers} className={s.deposit}>
      <p className={s.deposit__header}>Deposit</p>
      <div data-dashboard={showMin} className={s.deposit__selectors}>
        <div data-dashboard={showMin} className={s.deposit__selectors__range_selector}>
          <p data-dashboard={showMin}>Deposit period (days)</p>
          <label htmlFor={'period-selector'}>
            {isNotificationVisible && <i className={s.deposit__selectors__range_notification}
              style={{ '--range-percent-width': `${((rangeValue - config.min) / (config.max - config.min)) * 100}%` }}>{rangeValue}</i>}
            <span data-dashboard={showMin}
              style={{ '--range-percent-width': `${((rangeValue - config.min) / (config.max - config.min)) * 100}%` }}
              className={s.deposit__selectors__range_indicator} />
            <input onMouseOver={onInputHover} onMouseLeave={onInputHoverLeft} name={'period-selector'}
              value={rangeValue} step={1} type={"range"} min={10} max={33} />
          </label>
          <div className={s.deposit__selectors__range_selector__period_labels}>
            <span>10 days</span>
            <span>33 days</span>
          </div>
        </div>
        <div className={s.deposit__selectors__deposite_selector}>
          <p data-dashboard={showMin}>Deposit Amount</p>
          {showMin && <small>Min 10 BUSD</small>}
          <div data-dashboard={showMin} className={s.deposit__selectors__deposite_selector__input_wrapper}>
            <button data-dashboard={showMin} onClick={maxDepositButtonClickHandler}>Max</button>
            <input data-dashboard={showMin} name={'deposit-selector'} value={depositAmount} />
            <span>BUSD</span>
          </div>
        </div>
      </div>
      <div data-dashboard={showMin} className={s.deposit__info}>
        <p>Bonus: <span>{bonusesField}</span></p>
        <p>Total profit: <span>{120 + (rangeValue - config.min) * 5 + '%'}</span></p>
        <p>In <i> {rangeValue} </i> days will
          earn: <span>{(depositAmount * (120 + (rangeValue - config.min) * 5) / 100).toFixed(2)} BUSD</span></p>
        <p>Daily ROI: <span>{(depositAmount * ((120 + (rangeValue - config.min) * 5) / 100) / rangeValue / 10).toFixed(2)} %</span>
        </p>
      </div>
      <div className={s.deposit__submit}>
        <button disabled={!!walletAddress ? depositAmount > tokenBalance || depositAmount < 10 : false}
          onClick={handleDeposit}>{isDepositTransaction ? (
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
          ) : 'Deposit'}</button>
      </div>
    </div>
  )
}
