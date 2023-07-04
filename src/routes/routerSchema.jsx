import { Navigate } from 'react-router-dom';
import {MainLayout} from "../layouts/MainLayout/MainLayout";

export const routerSchema = [{
    path: '/',
    title: 'Main',
    element: <MainLayout/>,
    children: [{
        index: true,
        element: <Navigate to={'/'} />,
    }],
}];
