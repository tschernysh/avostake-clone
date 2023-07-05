import { Navigate } from 'react-router-dom';
import {MainLayout} from "../layouts/MainLayout/MainLayout";
import {Landing} from "../components/Landing/Landing";
import {ProfileLayout} from "../layouts/ProfileLayout";
import {Dashboard} from "../components/Dashboard/Dashboard";

export const routerSchema = [{
    path: '/',
    title: 'Main',
    element: <MainLayout/>,
    children: [{
        index: true,
        element: <Landing/>,
    }],
}, {
    path: '/dashboard',
    title: 'Dashboard',
    element: <ProfileLayout/>,
    children: [{
        index: true,
        element: <Dashboard/>
    }]
}];
