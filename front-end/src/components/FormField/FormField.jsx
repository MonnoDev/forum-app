import PropTypes from "prop-types"
import Input from "../Input/Input";

const FormField = ({ label, ...props }) => {
  return (
    <div>
      <div>
        <label>{label}:</label>
      </div>
      <Input {...props} />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

FormField.defaultProps = {
  label: "",
}

export default FormField;
