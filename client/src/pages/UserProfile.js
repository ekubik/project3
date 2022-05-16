import React from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {Delete} from "@mui/icons-material";
import MailOutlineRounded from "@mui/icons-material/MailOutlineRounded";
import "../styles/UserProfile.css";

import { QUERY_USER, QUERY_MY_PROFILE} from "../utils/queries";
import { DELETE_ROCK } from "../utils/mutations";
import Auth from "../utils/auth"

const Profile =() => {
    const {username} = useParams();
    const {loading, data} = useQuery(username ? QUERY_USER : QUERY_MY_PROFILE, {
       variables:  {username: username},
    });


    const user = data?.user || data?.myprofile|| {};
    console.log(user)
    const rocks = user.rocks || [];
    console.log(rocks);


    if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Navigate to="/myprofile" />;
};

if (loading) {
    return <div> Your page is still loading...</div>
};

if (!user?.username) {
    return ( <p> Sorry, you need to be logged in to view this page. </p>
    );
};

return (
  <div className="container-fluid">
    <h2 className="welcomeHeading">
      {" "}
      Welcome to {username ? `${user.username}'s` : "your"} profile!{" "}
    </h2>

    <div> {user.bio} </div>
    <div className="contactUser">
      {" "}
      <a href={`mailto:${user.email}`}>
        {" "}
        <MailOutlineRounded className="m-1"></MailOutlineRounded> Get in touch
        with {user.username}{" "}
      </a>
    </div>
    <div id="rock-collection">
      <h2>
        {" "}
        {username ? `${user.username}'s` : "Your"} Rock Collection{" "}
        {`(${rocks.length})`}{" "}
      </h2>{" "}
    </div>
    <div>
      {" "}
      {username ? (
        <br />
      ) : (
        <Link className="btn addRockBtn col-2" to="/addRock">
          {" "}
          Add a Rock
        </Link>
      )}{" "}
    </div>
    <div className=" rockContainer container-fluid d-flex justify-content-center">
      {!rocks ? (
        <div> This user hasn't collected any rocks yet </div>
      ) : (
        rocks.map((rock) => (
          <div className="row card rockCard col-3 col-5-sm" key={rock._id}>
            {" "}
            <Link className="rockLink" to={`/rocks/${rock._id}`}>
              {" "}
              <h3> {rock.name}</h3>{" "}
            </Link>
            <img className="placeholderImg" alt="placeholder image" src={require("../../src/assets/angry-rock.jpg")} />
            <p> {rock.description} </p>{" "}
            <p> This rock was collected on {rock.dateCollected} </p>
          </div>
        ))
      )}{" "}
    </div>
  </div>
);
}

export default Profile;