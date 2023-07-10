import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { HOME_ROUTE } from "../../routes/const";
import "../../layouts/SigninLayout/LoginLayout.css";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";

const Profile = () => {
  const { user, onUpdate, onLogout } = useContext(UserContext);
  const { onDelete } = useContext(UserContext);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { displayName, email, password };
    onUpdate(user);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div>
      <div className="profileButton">
        <Link to={HOME_ROUTE}>
          <Button>Back to Questions</Button>
        </Link>
      </div>
      <form className="loginConainer" onSubmit={handleSubmit}>
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
          <Button>Update</Button>
          <Button onClick={onLogout}>Log Out</Button>
        </div>
        <Button onClick={handleDelete}>Delete Account</Button>
      </form>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Profile;
