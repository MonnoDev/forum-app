import PropTypes from "prop-types";
import ClientLayout from "../layouts/ClientLayout/ClientLayout";
import SigninLayout from "../layouts/SigninLayout/LoginLayout";
import EditQuestion from "../pages/EditQuestion/EditQuestion";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PostQuestion from "../pages/PostQuestion/PostQuestion";
import Register from "../pages/Register/Register";
import Question from "../pages/Question/Question";
import EditAnswer from "../pages/Answer/EditAnswer";
import Profile from "../pages/Profile/Profile";

export const LOGIN_ROUTE = "/";
export const REGISTER_ROUTE = "/register";
export const HOME_ROUTE = "/";
export const PROFILE_ROUTE = "/profile";
export const POST_QUESTION_ROUTE = `/post`;
export const QUESTION_ROUTE = "/question/:id";
export const EDIT_QUESTION_ROUTE = `${QUESTION_ROUTE}/edit`;
export const EDIT_ANSWER_ROUTE = `${QUESTION_ROUTE}/editAnswer/:answerId`;

export const signinRoutes = {
  Layout: SigninLayout,
  routes: [
    {
      path: LOGIN_ROUTE,
      Component: Login,
    },
    {
      path: REGISTER_ROUTE,
      Component: Register,
    },
  ],
};

export const clientRoutes = {
  Layout: ClientLayout,
  routes: [
    {
      path: HOME_ROUTE,
      Component: Home,
    },
    {
      path: PROFILE_ROUTE,
      Component: Profile,
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
    {
      path: EDIT_ANSWER_ROUTE,
      Component: EditAnswer,
    },
  ],
};

signinRoutes.Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

signinRoutes.routes.propTypes = {
  path: PropTypes.string.isRequired,
  Component: PropTypes.elementType.isRequired,
};

clientRoutes.Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

clientRoutes.routes.propTypes = {
  path: PropTypes.string.isRequired,
  Component: PropTypes.elementType.isRequired,
};
