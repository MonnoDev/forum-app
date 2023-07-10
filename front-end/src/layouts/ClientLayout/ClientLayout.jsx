import PropTypes from "prop-types";
import Navigation from "../../components/Navigation/Navigation";

const ClientLayout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  );
};

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientLayout;
