import {Outlet} from 'react-router-dom'
import {ApplicationNavigation} from "../../components/ApplicationNavigation/ApplicationNavigation";

import s from './application-layout.module.scss'
import {ApplicationStatistics} from "../../components/ApplicationStatistics/ApplicationStatistics";
import {ApplicationHeader} from "../../components/ApplicationHeader/ApplicationHeader";
import {useState} from "react";

export const ApplicationLayout = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <main className={s.app}>
            <ApplicationNavigation isNavOpen={isNavOpen}/>
            <section className={s.app__body}>
                <ApplicationHeader setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen}/>
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