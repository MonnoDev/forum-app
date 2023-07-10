import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { showDisplayName } from "../../utils/user";
import { RiUser6Line } from "react-icons/ri";
import { PROFILE_ROUTE } from "../../routes/const";
import logo from "../../utils/logo_transparent.png";
import "./Navigation.css";

const Navigation = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="navigationContainer">
      <img src={logo} alt={logo} />
      <div className="userContainer">
        <RiUser6Line />
        <div className="userName">
          <Link to={PROFILE_ROUTE}>{showDisplayName(user)}</Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
