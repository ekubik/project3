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
        <Link to="/">
          <button className="btn navButton">
            {" "}
            <HomeRoundedIcon fontSize="large" />{" "}
          </button>{" "}
        </Link>
        {Auth.loggedIn() ? (
          <>
            <Link to="/myprofile">
              {" "}
              <button className="btn navButton"> My profile</button>
            </Link>
            
              <Link to="/"> <button className="btn navButton" onClick={logout}> Log out</button> </Link>{" "}
          </>
        ) : (
          <>
            {" "}
            <Link className="btn navButton" to="/login">
              {" "}
              Login{" "}
            </Link>
            <Link className="btn navButton" to="/signup">
              {" "}
              Sign up!
            </Link>
          </>
        )}
        <hr></hr>
      </div>
    </header>
  );
};

export default Header;
