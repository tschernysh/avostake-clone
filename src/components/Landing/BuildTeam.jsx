import s from './landing.module.scss'
import {LeaderProgram} from "../LeaderProgram/LeaderProgram";

const tilesData = [{
    percent: '5%',
},{
    percent: '2%',
},{
    percent: '1%',
},{
    percent: '0.5%',
},{
    percent: '0.5%',
}]
export const BuildTeam = () => {
    return (
        <section id={'section-rewards'} className={s.landing__build_team}>
            <h2>Build a team - <span>get a reward</span></h2>
            <div className={s.landing__build_team__referral_description}>
                <b>Referral Program</b>
                <small>BixTer offers its users a 5-level referral program with rewards as high as 9% of referral transactions.</small>
                <div className={s.landing__build_team__referral_description__tiles}>
                    {tilesData.map(({percent}, index) => {
                        return (
                            <div key={index} className={s.landing__build_team__referral_description__tiles__tile}>
                                <span>{percent}</span>
                                <p>Ref. <br/> Line {index + 1}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <LeaderProgram/>
        </section>
    )
}