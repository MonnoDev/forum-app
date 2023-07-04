import { UserContext } from "../../context/UserContext";
import { useState, useContext } from "react";
import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";


const Register = () => {
  const {onRegister} = useContext(UserContext)
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const user = { displayName, email, password };
    onRegister(user);
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
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div>
        <Button>Register</Button>
      </div>
    </form>
  );
};

export default Register;
