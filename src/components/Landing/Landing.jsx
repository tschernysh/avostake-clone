import s from './landing.module.scss'
import {MainCarousel} from "./MainCarousel";
import {LastTransactions} from "./LastTransactions";
import {EasyStart} from "./EasyStart";

export const Landing = () => {
    return (
        <main className={s.landing}>
            <MainCarousel/>
            <LastTransactions/>
            <EasyStart/>
        </main>
    )
}