import React from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

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

    const [deleteRock, { error }] = useMutation(DELETE_ROCK);
    const handleDelete = async (rockId) => {
        try {
            const {data} = await deleteRock({ rockId})
        }
        catch (error) {
            console.error(error);
        }

    }
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
  <div className="container">
    <h2> Welcome to {username ? `${user.username}'s` : "your"} profile! </h2>

    <div> {user.bio} </div>
    <div>
      {" "}
      <a href={`mailto:${user.email}`}> Get in touch with {user.username} </a>
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
        <Link className="btn" to="/addRock">
          {" "}
          Add a Rock
        </Link>
      )}{" "}
    </div>
    <div>
      {!rocks ? (
        <div> This user hasn't collected any rocks yet </div>
      ) : (
        rocks.map((rock) => (
          <div className="card" key={rock._id}>
            {" "}
           <Link to={`/rocks/${rock._id}`}> <h3> {rock.name}</h3> </Link><p> {rock.description} </p>{" "}
            <p> This rock was collected on {rock.dateCollected} </p>
            <button onClick={handleDelete}> Delete </button>
          </div>
        ))
      )}{" "}
    </div>
  </div>
);
}

export default Profile;