import ClientLayout from "../layouts/ClientLayout/ClientLayout";
import SigninLayount from "../layouts/SigninLayout/LoginLayount";
import EditQuestion from "../pages/EditQuestion/EditQuestion";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PostQuestion from "../pages/PostQuestion/PostQuestion";
import Register from "../pages/Register/Register";
import Question from "../pages/Question/Question";

export const LOGIN_ROUTE = "/";
export const REGISTER_ROUTE = "/register";
export const HOME_ROUTE = "/";
export const POST_QUESTION_ROUTE = `/post`;
export const QUESTION_ROUTE = "/question/:id";
export const EDIT_QUESTION_ROUTE = `${QUESTION_ROUTE}/edit`;


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
    {
        path: POST_QUESTION_ROUTE,
        Component: PostQuestion,
    },
    {
        path: EDIT_QUESTION_ROUTE,
        Component: EditQuestion,
    },
    {
        path: QUESTION_ROUTE,
        Component: Question,
    },
    ],
    
};