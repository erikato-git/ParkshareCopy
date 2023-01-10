import { createBrowserRouter, RouteObject } from "react-router-dom";
import AccountDashboard from "../../features/accounts/dashboard/AccountDashboard";
import AccountDetails from "../../features/accounts/dashboard/details/AccountDetails";
import AccountForm from "../../features/accounts/dashboard/form/AccountForm";
import NotFound from "../../features/errors/NotFound";
import TestErrors from "../../features/errors/TestError";
import LoginForm from "../../features/users/LoginForm";
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
            {path: 'login', element: <LoginForm/>},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />}

        ]
    }
]


export const router = createBrowserRouter(routes);