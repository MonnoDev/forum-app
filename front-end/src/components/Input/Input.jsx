import PropTypes from "prop-types";

const Input = ({ className, minLength, maxLength, ...props }) => {
  return (
    <input
      className={`input ${className}`}
      minLength={minLength}
      maxLength={maxLength}
      {...props}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

Input.defaultTypes = {
  className: "",
  minLength: "",
  maxLength: "",
};

export default Input;
