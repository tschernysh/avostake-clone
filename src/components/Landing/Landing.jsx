import s from './landing.module.scss'
import {MainCarousel} from "./MainCarousel";
import {LastTransactions} from "./LastTransactions";

export const Landing = () => {
    return (
        <main className={s.landing}>
            <section className={s.landing__carousel}>
                <MainCarousel/>
            </section>
            <section className={s.landing__carousel}>
               <LastTransactions/>
            </section>
        </main>
    )
}