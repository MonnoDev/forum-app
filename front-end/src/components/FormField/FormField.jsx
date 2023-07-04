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

export default FormField;
