import s from './landing.module.scss'

import coinImage from 'media/img/coins-image.png'

const tilesData = [{
    header: 'We are BUSD staking',
    text: "BUSD is BNB Chain's USD stable coin."
}, {
    header: 'We use PoS technology',
    text: "Proof of Stake (PoS) algorithm proof of ownership of a coin"
}, {
    header: 'We open for you',
    text: "Thanks to blockchain technology, all reporting is open to you. We also have a large friendly community"
}]

export const AboutUs = () => {
    return (
        <section className={s.about_us}>
            <div className={s.about_us__decoration}>ABOUT</div>
            <h2>About <span>us</span></h2>
            <div className={s.about_us__main_description}>
                <p>We offer you passive income, the foundation of which is classic staking of crypto currency, which is
                    an alternative to mining, from the 2nd mine you do not need to buy expensive equipment! You simply
                    stake cryptocurrencies and receive a reward in the form of % to your deposit!
                    <br/>
                    <br/>
                    You may ask why staking and why us?
                </p>
                <img src={coinImage} alt={'coins-image'}/>
            </div>
            <div className={s.about_us__tiles}>
                {tilesData.map((el, i) => {
                    return (
                        <div data-sub-text={`0${1 + i}`} key={i} className={s.about_us__tiles__tile}>
                            <b>{el.header}</b>
                            <p>{el.text}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}