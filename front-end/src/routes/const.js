import ClientLayout from "../layouts/ClientLayout/ClientLayout";
import SigninLayount from "../layouts/SigninLayout/LoginLayount";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const HOME_ROUTE = "/home"

export const signinRoutes = {
    Layout: SigninLayount,
    routes: [ {
        path: LOGIN_ROUTE,
        Component: Login,
    },
    {
        path: REGISTER_ROUTE,
        Component: Register,
    }
    ],
    
};

export const clientRoutes = {
    Layout: ClientLayout,
    routes: [ {
        path: HOME_ROUTE,
        Component: Home,
    },
    ],
    
};