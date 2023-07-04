import s from './landing.module.scss'
import {MainCarousel} from "./MainCarousel";

export const Landing = () => {
    return (
        <main className={s.landing}>
            <section className={s.landing__carousel}>
                <MainCarousel/>
            </section>
        </main>
    )
}