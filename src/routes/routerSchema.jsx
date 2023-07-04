import { Navigate } from 'react-router-dom';
import {MainLayout} from "../layouts/MainLayout/MainLayout";
import {Landing} from "../components/Landing/Landing";

export const routerSchema = [{
    path: '/',
    title: 'Main',
    element: <MainLayout/>,
    children: [{
        index: true,
        element: <Landing/>,
    }],
}];
