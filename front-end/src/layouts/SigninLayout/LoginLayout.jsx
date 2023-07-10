import PropTypes from "prop-types";
import "./LoginLayout.css";

const SigninLayout = ({ children }) => {
  return (
    <div className="loginConainer">
      <h2>Welcome to ForumFusion</h2>
      <div>
        Friendly and vibrant online forum where you can connect, discuss, and
        explore a variety of topics.
      </div>
      <div>Please log in or register to join the conversation!</div>
      {children}
    </div>
  );
};

SigninLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SigninLayout;
