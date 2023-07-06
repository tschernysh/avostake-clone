import { Navigate } from 'react-router-dom';
import {MainLayout} from "../layouts/MainLayout/MainLayout";
import {Landing} from "../components/Landing/Landing";
import {ApplicationLayout} from "../layouts/ApplicationLayout/ApplicationLayout";
import {ApplicationDashboard} from "../components/ApplicationDashboard/ApplicationDashboard";
import {ApplicationBonuses} from "../components/ApplicationBonuses/ApplicationBonuses";

export const routerSchema = [{
    path: '/',
    exact: true,
    title: 'Main',
    element: <MainLayout/>,
    children: [{
        index: true,
        element: <Landing/>,
    }]
},{
    path: 'app',
    title: 'Application',
    element: <ApplicationLayout/>,
    children: [{
        path: 'dashboard',
        element: <ApplicationDashboard/>
    }, {
        path: 'bonuses',
        element: <ApplicationBonuses/>
    }, {
        index: true,
        exact: true,
        element: <Navigate to={'/app/dashboard'}/>
    }]
}, {
    path: '*',
    element: <Navigate to={'/'}/>
}];
