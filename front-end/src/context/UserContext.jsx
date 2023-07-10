import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../routes/const";
import { createUser, getUsers, updateUser, deleteUser } from "../api/users";
import { checkUser } from "../utils/user";

const UserContext = createContext({
  user: null,
  loggedIn: false,
  onRegister: () => {},
  onLogin: () => {},
  onLogout: () => {},
  onUpdate: () => {},
  onDelete: () => {},
  error: null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const loggedIn = !!user;
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onRegister = (newUser) => {
    getUsers()
      .then((response) => {
        const existingUser = checkUser(response, newUser);
        if (existingUser) {
          if (existingUser.displayName === newUser.displayName) {
            throw new Error("Username is already taken");
          } else if (existingUser.email === newUser.email) {
            throw new Error("Email is already taken");
          }
        }
      })
      .then(() => {
        createUser(newUser)
          .then(() => {
            navigate(LOGIN_ROUTE);
          })
          .catch((error) => {
            setError(error.message); // Display the error message from the backend
          });
      })
      .catch((error) => {
        setError(error.message); // Display the error message
      });
  };

  const onLogin = (user) => {
    getUsers()
      .then((response) => {
        const existingUser = checkUser(response, user);
        if (existingUser) {
          setUser(existingUser);
          localStorage.setItem("user", JSON.stringify(existingUser));
        } else {
          throw new Error("Invalid email or password");
        }
      })
      .catch((error) => {
        setError(error.message); // Display the error message
      });
  };

  const onLogout = () => {
    setUser(null);
    localStorage.setItem("user", null);
    navigate(LOGIN_ROUTE)
  }
  
  const onUpdate = (updatingUser) => {
    updateUser(user._id, updatingUser)
      .then((response) => {
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response)); // Update user information in localStorage
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteUser(user._id)
        .then(() => {
          setUser(null);
          localStorage.removeItem("user"); // Remove user information from localStorage
          navigate(LOGIN_ROUTE);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loggedIn, onRegister, onLogin, onLogout,onUpdate, onDelete, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
