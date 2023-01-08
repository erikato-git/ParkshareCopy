import { createBrowserRouter, RouteObject } from "react-router-dom";
import AccountDashboard from "../../features/accounts/dashboard/AccountDashboard";
import AccountDetails from "../../features/accounts/dashboard/details/AccountDetails";
import AccountForm from "../../features/accounts/dashboard/form/AccountForm";
import TestErrors from "../../features/errors/TestError";
import HomePage from "../home/HomePage";
import App from "../Layout/App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children:[
            {path: '', element: <HomePage/>},
            {path: 'accounts', element: <AccountDashboard/>},
            {path: 'accounts/:id', element: <AccountDetails/>},
            {path: 'createAccount', element: <AccountForm key='create'/>},
            {path: 'manage/:id', element: <AccountForm key='manage'/>},
            {path: 'errors', element: <TestErrors />}

        ]
    }
]


export const router = createBrowserRouter(routes);