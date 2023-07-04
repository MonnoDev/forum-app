import { useContext, useState } from "react";
import { useNavigate} from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button/Button";
import FormField from "../../components/FormField/FormField";
import {HOME_ROUTE} from "../../routes/const";

const Login = () => {
  const { onLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const user = {email, password};
    try{
      await onLogin(user, setError);
      navigate(HOME_ROUTE);
    }catch(error){
      setError("User email or password is incorrect")
    }
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
      <div>
        <Button>Login</Button>
      </div>
    </form>
  );
};

export default Login;


