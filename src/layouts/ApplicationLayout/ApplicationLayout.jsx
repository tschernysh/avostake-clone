import {Outlet} from 'react-router-dom'
import {ApplicationNavigation} from "../../components/ApplicationNavigation/ApplicationNavigation";

import s from './application-layout.module.scss'
import {ApplicationStatistics} from "../../components/ApplicationStatistics/ApplicationStatistics";
import {ApplicationHeader} from "../../components/ApplicationHeader/ApplicationHeader";

export const ApplicationLayout = () => {
    return (
        <main className={s.app}>
            <ApplicationNavigation/>
            <section className={s.app__body}>
                <ApplicationHeader/>
                <div className={s.app__body__content_wrapper}>
                    <div className={s.app__body__content_wrapper__content}>
                        <Outlet/>
                    </div>
                    <ApplicationStatistics/>
                </div>
            </section>
        </main>
    )
}