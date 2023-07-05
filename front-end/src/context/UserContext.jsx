import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE} from "../routes/const";
import { createUser, getUser } from "../api/users";
import { checkUser } from "../utils/user";

const UserContext = createContext({
  user: null,
  loggedIn: false,
  onRegister: () => null,
  onLogin: () => null,
  onPostQuestion: () => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const loggedIn = !!user;
  const navigate = useNavigate();

  const onRegister = (newUser) => {
    createUser(newUser)
      .then(() => {
        navigate(LOGIN_ROUTE);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLogin = (user, setError) => {
    getUser()
    .then((response) => {
      const exisitingUser = checkUser(response, user);
      if(exisitingUser){
        setUser(exisitingUser);
        localStorage.setItem("user", JSON.stringify(exisitingUser));
      } else{
        setError("User email or password is incorrect");
      }
    })
    .catch((error) => {
      console.log(error);
    })

  };

  return (
    <UserContext.Provider value={{ user, loggedIn, onRegister, onLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
