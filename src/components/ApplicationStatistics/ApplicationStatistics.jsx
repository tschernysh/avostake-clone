import {useLocation} from 'react-router-dom'
import {routerBook} from "../../routes/routerBook";
import {DashboardStats} from "./DashboardStats";
import {BonusesStats} from "./BonusesStats";

export const ApplicationStatistics = () => {
    const location = useLocation();

    if (location.pathname === routerBook.dashboard) return <DashboardStats/>

    if (location.pathname === routerBook.bonuses) return <BonusesStats/>

    return null;
}