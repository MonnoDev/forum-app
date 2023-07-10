import PropTypes from "prop-types";

const TextArea = ({ label, ...props }) => {
  return (
    <div>
      <div>
        <label>{label}:</label>
      </div>
      <textarea {...props}></textarea>
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
};

TextArea.defaultTypes = {
  label: "",
};

export default TextArea;
