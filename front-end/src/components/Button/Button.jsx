import PropTypes from "prop-types"
import "./Button.css";

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  onClick: () => {},
}

export default Button;
