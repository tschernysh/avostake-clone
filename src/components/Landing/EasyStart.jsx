
import {BsFillRocketTakeoffFill} from "react-icons/bs";

import s from './landing.module.scss'
import {IoWalletSharp} from "react-icons/io5";
import {GiPuzzle} from "react-icons/gi";
import {DepositBlock} from "../DepositBlock/DepositBlock";
import {useOutletContext} from "react-router-dom";

const tilesData = [{
    text: 'No crypto experience required',
    icon: IoWalletSharp,
}, {
    text: 'No technical skills required',
    icon: GiPuzzle,
}, {
    text: 'No big budget to start',
    icon: BsFillRocketTakeoffFill,
}]

export const EasyStart = () => {
    const [signInButtonClickHandler] = useOutletContext();

    return (
        <section id={'section-easy-start'}className={s.landing__easy_start}>
            <div className={s.landing__easy_start__decoration_text}>EASY</div>
            <h2>
                Easy start <span>with us</span>
            </h2>
            <div className={s.landing__easy_start__tiles}>
                {tilesData.map((el, i) => {
                    return (
                        <div key={i} className={s.landing__easy_start__tiles__tile}>
                            <el.icon color={'#9799a2'}/>
                            <span>{el.text}</span>
                        </div>
                    )
                })}
            </div>
            <DepositBlock signInButtonClickHandler={signInButtonClickHandler}/>
        </section>
    )
}