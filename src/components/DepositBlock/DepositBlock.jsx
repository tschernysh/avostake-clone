import s from './deposit-block.module.scss'
import {useCallback, useState} from "react";

const config = {
    min: 10,
    max: 33
}

export const DepositBlock = ({signInButtonClickHandler}) => {
    const [rangeValue, setRangeValue] = useState(config.min);
    const [depositAmount, setDepositAmount] = useState(1000);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const onInputHover = useCallback(() => {
        setIsNotificationVisible(true)
    }, [])

    const onInputHoverLeft = useCallback(() => {
        setIsNotificationVisible(false)
    }, [])

    const maxDepositButtonClickHandler = () => {
        setDepositAmount(999)
    }

    const changeHandlers = ({target: {name, value}}) => {
        switch(name) {
            case 'period-selector':
                setRangeValue(+value)
                break;
            case 'deposit-selector':
                if (value.match(/^\d*(\.|\,)?\d*$/))  {
                    setDepositAmount(value)
                }
                break;
            default: break;
        }
    }

    return (
        <div onChange={changeHandlers} className={s.deposit}>
            <p className={s.deposit__header}>Deposit</p>
            <div className={s.deposit__selectors}>
                <div className={s.deposit__selectors__range_selector}>
                    <p>Deposit period (days)</p>
                    <label htmlFor={'period-selector'}>
                        {isNotificationVisible && <i className={s.deposit__selectors__range_notification} style={{'--range-percent-width': `${((rangeValue - config.min) / (config.max - config.min)) * 100}%`}}>{rangeValue}</i>}
                        <span style={{'--range-percent-width': `${((rangeValue - config.min) / (config.max - config.min)) * 100}%`}} className={s.deposit__selectors__range_indicator}/>
                        <input onMouseOver={onInputHover} onMouseLeave={onInputHoverLeft} name={'period-selector'} value={rangeValue} step={1} type={"range"} min={10} max={33}/>
                    </label>
                    <div className={s.deposit__selectors__range_selector__period_labels}>
                        <span>10 days</span>
                        <span>33 days</span>
                    </div>
                </div>
                <div className={s.deposit__selectors__deposite_selector}>
                    <p>Deposit Amount</p>
                    <div className={s.deposit__selectors__deposite_selector__input_wrapper}>
                        <button onClick={maxDepositButtonClickHandler}>Max</button>
                        <input name={'deposit-selector'} value={depositAmount}/>
                        <span>BUSD</span>
                    </div>
                </div>
            </div>
            <div className={s.deposit__info}>
                <p>Bonus: <span>###</span></p>
                <p>Total profit: <span>###</span></p>
                <p>Total profit: <span>###</span></p>
                <p>In <i> {rangeValue} </i> days will earn: <span>### BUSD</span></p>
                <p>Daily ROI: <span>### %</span></p>
            </div>
            <div className={s.deposit__submit}>
                <button onClick={signInButtonClickHandler}>Deposit</button>
            </div>
        </div>
    )
}