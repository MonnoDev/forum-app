import PropTypes from "prop-types";
import { UserProvider } from "./UserContext";

const Providers = ({ children }) => {
  return (
    <div>
      <UserProvider>{children}</UserProvider>
    </div>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
