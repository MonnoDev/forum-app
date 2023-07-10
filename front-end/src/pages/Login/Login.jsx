import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";
import { REGISTER_ROUTE } from "../../routes/const";

const Login = () => {
  const { onLogin, error } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const user = { email, password };
    onLogin(user);
  };

  return (
    <form onSubmit={onSubmitHandler}>
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
      {error && <div className="error">{error}</div>}{" "}
      <div>
        <Button>Login</Button>
        <Link to={REGISTER_ROUTE}><Button>Register</Button></Link>
      </div>
    </form>
  );
};

export default Login;
