import React from "react";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import "../../styles/Header.css";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      {" "}
      <h1> WTR! </h1> <h2> What The Rock </h2>
      <br />
      <div>
      <Link to="/"> <HomeRoundedIcon/> </Link>
        {Auth.loggedIn() ? (
          <>
            <Link to="/myprofile">
              {" "}
              <button> My profile</button>
            </Link>
            <button onClick={logout}><Link to="/">  Logout </Link> </button>
          </>
        ) : (
          <>
            {" "}
            <Link className="btn" to="/login">
              {" "}
              Login{" "}
            </Link>
            <Link className="btn" to="/signup">
              {" "}
              Sign up!
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
