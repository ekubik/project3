import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_MY_PROFILE} from "../utils/queries";
import Auth from "../utils/auth"

const Profile =() => {
    const {username: userParam } = useParams();
    const {loading, data} = useQuery(userParam? QUERY_USER : QUERY_MY_PROFILE, {
       variables:  {username: userParam},
    });
    const user = data?.myprofile || data?.user || {};
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/myprofile" />;
}
if (loading) {
    return <div> Your page is still loading...</div>
}

if (!user?.username) {
    return ( <p> Sorry, you need to be logged in to view this page. </p>
    );
}

return (<div className = "container">
    <h2> Welcome to {userParam? `${user.username}'s profile`: "your" } profile! </h2>
    <div> {user.bio} </div>
    <div> <a href={`mailto:${user.email}`}> Get in touch with {user.username} </a></div>
    <div id="rock-collection">
        <h2> {userParam? `${user.username}'s`: "Your"} Rock Collection {`(${user.rocks})`} </h2>
    </div>
</div>)
}

export default Profile;