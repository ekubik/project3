import React from "react";
import {Link} from "react-router-dom"
import CommentList from "../../src/components/CommentList";
import CommentForm from "../../src/components/CommentForm";
import "../styles/RockList.css";

import Auth from "../utils/auth";

import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_SINGLE_ROCK } from "../utils/queries";
import { DELETE_ROCK} from "../utils/mutations"

const SingleRock = () => {
  const { rockId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_ROCK, {
    variables: { rockId: rockId  },
  });

  const rock = data?.rock || {};

  const [deleteRock, { error }] = useMutation(DELETE_ROCK, { variables: {rockId: rockId }});
  const handleDelete = async (rockId) => {
    console.log("handle delete", rockId);
    try {
      const { data } = await deleteRock({rockId});
    } catch (error) {
      console.error(error);
    }
    window.location.href ='/myprofile';
  };

  if (loading) {
      return <div> Your page is loading...</div>;
  }
  return (
    <div>
      <div>
        <div>
          {Auth.loggedIn() && Auth.getProfile().data.username === rock.user ? (
            <div>
              {/* <Link to={`/users/${rock.user}`}> */}
              <button className="btn deleteRockBtn" key={rock._id} onClick={() => handleDelete(rockId)}>
               Delete Rock{" "}
              </button>{" "}
              {/* </Link>{" "} */}
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
      <div className="container-fluid" key={rock._id}>
        <h3> {rock.name} </h3>
        <img src={require("../../src/assets/angry-rock.jpg")} />
        <h4>Type: {rock.type} </h4>
        <h4>Origin: {rock.origin} </h4>
        <h4>Description:</h4>
        <div>{rock.description}</div>
        <p className="mt-4">
          <div>
            {" "}
            <Link to={`/users/${rock.user}`}> {rock.user} </Link> added this
            rock to their collection on {rock.dateCollected}
          </div>
        </p>
        <div className="col-12 col-md-10 mb-5">
          <CommentList
            comments={rock.comments}
            username={rock.user}
            rockId={rock._id}
          />
        </div>
        <div className="m-3 p-4">
          <CommentForm rockId={rock._id} />
        </div>
      </div>
    </div>
  );
};

export default SingleRock;