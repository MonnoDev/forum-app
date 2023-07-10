import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";

const Register = () => {
  const { onRegister, error } = useContext(UserContext);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newUser = { displayName, email, password };
    onRegister(newUser);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <FormField
        label="Display Name"
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        required
      />
      <FormField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormField
        label="Password"
        type="password"
        value={password}
        minLength={6}
        maxLength={20}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="error">{error}</div>}
      <div>
        <Button>Register</Button>
      </div>
    </form>
  );
};

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Register;

