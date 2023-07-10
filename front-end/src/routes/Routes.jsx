import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";
import { Routes as RouteContainer, Route } from "react-router-dom";
import { signinRoutes, clientRoutes } from "./const";
import { useContext } from "react";

const Routes = () => {
  const { loggedIn } = useContext(UserContext);
  const { Layout, routes } = loggedIn ? clientRoutes : signinRoutes;

  return (
    <RouteContainer>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        />
      ))}
    </RouteContainer>
  );
};

Routes.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Routes;
