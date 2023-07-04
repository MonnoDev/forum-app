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
          element={(
            <Layout>
              <Component />
            </Layout>
          )}
        />
      ))}
    </RouteContainer>
  );
};

export default Routes;

