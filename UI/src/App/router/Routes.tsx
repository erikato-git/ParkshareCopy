import { createBrowserRouter, RouteObject } from "react-router-dom";
import AccountDashboard from "../../features/accounts/dashboard/AccountDashboard";
import AccountDetails from "../../features/accounts/dashboard/details/AccountDetails";
import AccountForm from "../../features/accounts/dashboard/form/AccountForm";
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
            {path: 'createAccount', element: <AccountForm/>}
        ]
    }
]


export const router = createBrowserRouter(routes);