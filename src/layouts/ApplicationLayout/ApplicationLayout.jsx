import { Outlet, useNavigate } from 'react-router-dom'
import { ApplicationNavigation } from "../../components/ApplicationNavigation/ApplicationNavigation";
import s from './application-layout.module.scss'
import {ApplicationStatistics} from "../../components/ApplicationStatistics/ApplicationStatistics";
import {ApplicationHeader} from "../../components/ApplicationHeader/ApplicationHeader";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationActionCreator} from "../../store/reducers/application/action-creator";

export const ApplicationLayout = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const { redirectTo } = useSelector(state => state.applicationReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!!redirectTo) {
            const path = redirectTo
            dispatch(ApplicationActionCreator.setRedirectTo(null))
            navigate(path)
        }
    }, [redirectTo])

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