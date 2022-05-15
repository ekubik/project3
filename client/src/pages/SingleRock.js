import React from "react";
import {Link} from "react-router-dom"
import CommentList from "../../src/components/CommentList"

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_ROCK } from "../utils/queries";

const SingleRock = () => {
  const { rockId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_ROCK, {
    variables: { rockId: rockId  },
  });
  const rock = data?.rock || {};

  if (loading) {
      return <div> Your page is loading...</div>;
  }
  return (
    <div key={rock._id} className="card">
      <h3> {rock.name} </h3>
      <p> {rock.type} </p>
      <h4>Origin: {rock.origin} </h4>
      <h4>Description:</h4>
      <div>{rock.description}</div>
      <p>
        {" "}
        <Link to={`/users/${rock.user}`}> {rock.user} </Link> added this rock to
        their collection on {rock.dateCollected}
      </p>
      <div className="col-12 col-md-10 mb-5">
        <CommentList
          comments={rock.comments}
        />
      </div>
    </div>
  );
};

export default SingleRock;